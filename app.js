/**
 * TTY MOBILE CLUB - Main E-Commerce Application Controller
 * Buy • Sell • Exchange | Estd. 2021
 */

class TTYMobileClubApp {
  constructor() {
    this.cart = [];
    this.activeCategory = 'All';
    this.searchQuery = '';
    this.selectedBrands = [];
    this.selectedConditions = [];
    this.maxPrice = 150000;
    this.currentProduct = null;
    this.adminAuthenticated = false;
    this.init();
  }

  init() {
    this.loadCart();
    this.bindEvents();
    this.renderProducts();
    this.updateCartUI();
  }

  /* Cart Management */
  loadCart() {
    try {
      const saved = localStorage.getItem('tmc_cart_items');
      this.cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.cart = [];
    }
  }

  saveCart() {
    localStorage.setItem('tmc_cart_items', JSON.stringify(this.cart));
    this.updateCartUI();
  }

  addToCart(productId, qty = 1) {
    const product = window.productStore.getProductById(productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.cart[existingIndex].qty += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        color: product.color,
        storage: product.storage,
        condition: product.condition,
        price: product.price,
        image: product.images[0] || '',
        qty: qty
      });
    }

    this.saveCart();
    this.showNotification(`Added "${product.name}" to your cart! 🛒`);
    this.openCart();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQty(productId, delta) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeFromCart(productId);
    } else {
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const cartBadgeElements = document.querySelectorAll('.cart-badge');
    cartBadgeElements.forEach(el => el.textContent = totalCount);

    const cartList = document.getElementById('cartItemsList');
    if (!cartList) return;

    if (this.cart.length === 0) {
      cartList.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">🛒</div>
          <p style="font-weight: 600; color: #fff;">Your cart is empty</p>
          <p style="font-size: 0.85rem; margin-top: 4px;">Explore our store to find your favorite mobiles & gadgets!</p>
        </div>
      `;
    } else {
      cartList.innerHTML = this.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">${item.storage} • ${item.color}</div>
            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="app.updateQty('${item.id}', -1)">-</button>
            <span style="font-size: 0.85rem; font-weight: 700; color: #fff;">${item.qty}</span>
            <button class="qty-btn" onclick="app.updateQty('${item.id}', 1)">+</button>
          </div>
          <button onclick="app.removeFromCart('${item.id}')" style="color: var(--text-muted); font-size: 1.1rem; padding: 4px;">&times;</button>
        </div>
      `).join('');
    }

    const subtotal = this.getCartSubtotal();
    document.getElementById('cartSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('cartTotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  openCart() {
    document.getElementById('cartDrawer')?.classList.add('open');
  }

  closeCart() {
    document.getElementById('cartDrawer')?.classList.remove('open');
  }

  /* Filtering & Search */
  renderProducts() {
    const catalogContainer = document.getElementById('catalogGrid');
    const featuredContainer = document.getElementById('featuredGrid');
    const latestMobilesContainer = document.getElementById('latestMobilesGrid');
    const laptopsGrid = document.getElementById('laptopsGrid');

    const allProducts = window.productStore.getProducts();

    // Filter catalog products
    let filtered = allProducts.filter(p => {
      // Category
      if (this.activeCategory !== 'All' && p.category !== this.activeCategory) return false;

      // Search Query
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCategory) return false;
      }

      // Brand
      if (this.selectedBrands.length > 0 && !this.selectedBrands.includes(p.brand)) return false;

      // Condition
      if (this.selectedConditions.length > 0 && !this.selectedConditions.includes(p.condition)) return false;

      // Price
      if (p.price > this.maxPrice) return false;

      return true;
    });

    // Render Catalog
    if (catalogContainer) {
      if (filtered.length === 0) {
        catalogContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
            <h3 style="color: #fff; margin-bottom: 6px;">No Products Found</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Try adjusting your search terms or filters.</p>
            <button onclick="app.resetFilters()" class="btn-outline-accent" style="margin-top: 16px;">Reset All Filters</button>
          </div>
        `;
      } else {
        catalogContainer.innerHTML = filtered.map(p => this.createProductCardHTML(p)).join('');
      }
    }

    // Render Featured Section
    if (featuredContainer) {
      const featured = allProducts.filter(p => p.isFeatured).slice(0, 4);
      featuredContainer.innerHTML = featured.map(p => this.createProductCardHTML(p)).join('');
    }

    // Render Latest Mobiles
    if (latestMobilesContainer) {
      const latest = allProducts.filter(p => p.category === 'Mobiles' && p.isLatest).slice(0, 4);
      latestMobilesContainer.innerHTML = latest.map(p => this.createProductCardHTML(p)).join('');
    }

    // Render Laptops
    if (laptopsGrid) {
      const laptops = allProducts.filter(p => p.category === 'Laptops').slice(0, 4);
      laptopsGrid.innerHTML = laptops.map(p => this.createProductCardHTML(p)).join('');
    }
  }

  createProductCardHTML(p) {
    const conditionClass = p.condition === 'Brand New' ? 'brand-new' : 'used';
    const conditionLabel = p.condition === 'Used' ? `Used • ${p.usedSpecs?.batteryHealth || '100'}% Batt` : 'Brand New';

    return `
      <div class="product-card">
        <div class="card-badge-container">
          <span class="badge-condition ${conditionClass}">${conditionLabel}</span>
          ${p.discount ? `<span class="badge-discount">${p.discount}% OFF</span>` : ''}
        </div>
        
        <div class="card-img-wrap" onclick="app.openProductModal('${p.id}')" style="cursor: pointer;">
          <img src="${p.images[0] || ''}" alt="${p.name}" loading="lazy">
        </div>

        <div>
          <div class="card-brand">${p.brand}</div>
          <h3 class="card-title" onclick="app.openProductModal('${p.id}')" style="cursor: pointer;">${p.name}</h3>
          
          <div class="card-specs">
            ${p.storage ? `<span class="spec-tag">${p.storage}</span>` : ''}
            ${p.ram && p.ram !== 'N/A' ? `<span class="spec-tag">${p.ram} RAM</span>` : ''}
            ${p.color ? `<span class="spec-tag">${p.color}</span>` : ''}
          </div>

          <div class="card-price-row">
            <span class="card-price">₹${p.price.toLocaleString('en-IN')}</span>
            ${p.mrp > p.price ? `<span class="card-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>` : ''}
          </div>

          <div class="card-stock-status ${p.stock > 0 ? 'stock-in' : 'stock-low'}">
            <span class="stock-dot"></span>
            ${p.stock > 0 ? (p.stock < 3 ? `Only ${p.stock} Left in Stock` : 'In Stock') : 'Out of Stock'}
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-card-outline" onclick="app.openProductModal('${p.id}')">DETAILS</button>
          <button class="btn-card-book" onclick="app.openBookOrderModal('${p.id}')">BOOK NOW</button>
          <button class="btn-card-cart" onclick="app.addToCart('${p.id}')" title="Add to Cart">🛒</button>
        </div>
      </div>
    `;
  }

  setCategory(cat) {
    this.activeCategory = cat;
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.cat === cat);
    });
    this.renderProducts();
  }

  resetFilters() {
    this.activeCategory = 'All';
    this.searchQuery = '';
    this.selectedBrands = [];
    this.selectedConditions = [];
    this.maxPrice = 150000;

    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) searchInput.value = '';

    const priceSlider = document.getElementById('priceRangeSlider');
    if (priceSlider) priceSlider.value = 150000;

    document.querySelectorAll('.brand-checkbox, .condition-checkbox').forEach(cb => cb.checked = false);
    this.setCategory('All');
  }

  /* Product Modal & Used Report */
  openProductModal(productId) {
    const product = window.productStore.getProductById(productId);
    if (!product) return;

    this.currentProduct = product;
    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productDetailContent');

    const conditionClass = product.condition === 'Brand New' ? 'brand-new' : 'used';

    content.innerHTML = `
      <div class="product-detail-grid">
        <div>
          <div class="gallery-main-img">
            <img id="detailMainImg" src="${product.images[0] || ''}" alt="${product.name}">
          </div>
          <div class="gallery-thumbs">
            ${product.images.map((img, i) => `
              <img src="${img}" class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="app.changeDetailImage('${img}', this)">
            `).join('')}
          </div>
        </div>

        <div>
          <div class="card-brand" style="font-size: 0.9rem; margin-bottom: 4px;">${product.brand}</div>
          <h2 style="font-size: 1.8rem; color: #fff; line-height: 1.2; margin-bottom: 10px;">${product.name}</h2>
          
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 16px;">
            <span class="badge-condition ${conditionClass}">${product.condition}</span>
            ${product.discount ? `<span class="badge-discount">${product.discount}% OFF</span>` : ''}
            <span style="font-size: 0.85rem; color: var(--text-secondary);">${product.warranty}</span>
          </div>

          <div class="card-price-row" style="margin-bottom: 16px;">
            <span class="card-price" style="font-size: 2rem;">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.mrp > product.price ? `<span class="card-mrp" style="font-size: 1.1rem;">₹${product.mrp.toLocaleString('en-IN')}</span>` : ''}
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
            <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; text-align: center;">
              <div style="font-size: 0.75rem; color: var(--text-muted);">Storage</div>
              <div style="font-weight: 700; color: #fff;">${product.storage}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; text-align: center;">
              <div style="font-size: 0.75rem; color: var(--text-muted);">RAM</div>
              <div style="font-weight: 700; color: #fff;">${product.ram || 'Standard'}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; text-align: center;">
              <div style="font-size: 0.75rem; color: var(--text-muted);">Color</div>
              <div style="font-weight: 700; color: #fff;">${product.color}</div>
            </div>
          </div>

          ${product.condition === 'Used' && product.usedSpecs ? `
            <div class="used-phone-report">
              <div class="used-report-title">
                <span>🛡️ Certified Used Inspection Report</span>
              </div>
              <div class="used-report-grid">
                <div class="used-report-item">🔋 Battery Health: <strong>${product.usedSpecs.batteryHealth}%</strong></div>
                <div class="used-report-item">📱 Screen: <strong>${product.usedSpecs.screenCondition}</strong></div>
                <div class="used-report-item">✨ Body: <strong>${product.usedSpecs.bodyCondition}</strong></div>
                <div class="used-report-item">📷 Camera: <strong>${product.usedSpecs.cameraCondition}</strong></div>
                <div class="used-report-item">🔒 Biometrics: <strong>${product.usedSpecs.biometrics}</strong></div>
                <div class="used-report-item">🔧 Parts: <strong>${product.usedSpecs.partStatus}</strong></div>
                <div class="used-report-item">📦 Box/Charger: <strong>${product.usedSpecs.boxAndCharger}</strong></div>
                <div class="used-report-item">✅ Checking: <strong>${product.usedSpecs.checkingWarranty}</strong></div>
              </div>
            </div>
          ` : ''}

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
            ${product.description}
          </p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 12px;">
              <button class="btn-primary" style="flex: 1; justify-content: center;" onclick="app.openBookOrderModal('${product.id}')">
                🔥 BOOK ORDER NOW
              </button>
              <button class="btn-outline-accent" style="width: 50px; justify-content: center;" onclick="app.addToCart('${product.id}')">
                🛒
              </button>
            </div>
            
            <button class="whatsapp-header-btn" style="width: 100%; justify-content: center; padding: 14px; font-size: 1rem;" onclick="app.orderOnWhatsApp('${product.id}')">
              💬 ORDER ON WHATSAPP
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  changeDetailImage(src, thumbEl) {
    document.getElementById('detailMainImg').src = src;
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
  }

  /* Order Booking System */
  openBookOrderModal(productId) {
    const product = productId ? window.productStore.getProductById(productId) : (this.cart[0] ? window.productStore.getProductById(this.cart[0].id) : null);
    
    if (!product && this.cart.length === 0) {
      this.showNotification("Please select a product to book an order.");
      return;
    }

    this.currentProduct = product;
    this.closeModal('productDetailModal');

    const modal = document.getElementById('bookOrderModal');
    const summaryContainer = document.getElementById('bookOrderSummary');

    if (product) {
      summaryContainer.innerHTML = `
        <div style="display: flex; gap: 14px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); align-items: center; margin-bottom: 20px;">
          <img src="${product.images[0]}" style="width: 60px; height: 60px; object-fit: contain;">
          <div>
            <div style="font-weight: 700; color: #fff;">${product.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">${product.storage} • ${product.color} • ${product.condition}</div>
            <div style="font-weight: 800; color: var(--accent-cyan); font-size: 1.1rem; margin-top: 2px;">₹${product.price.toLocaleString('en-IN')}</div>
          </div>
        </div>
      `;
    } else {
      const total = this.getCartSubtotal();
      summaryContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 20px;">
          <div style="font-weight: 700; color: #fff; margin-bottom: 6px;">Shopping Cart Items (${this.cart.length}):</div>
          ${this.cart.map(i => `<div style="font-size: 0.85rem; color: var(--text-secondary);">${i.name} (x${i.qty}) - ₹${(i.price * i.qty).toLocaleString('en-IN')}</div>`).join('')}
          <div style="font-weight: 800; color: var(--accent-cyan); font-size: 1.1rem; margin-top: 10px;">Total: ₹${total.toLocaleString('en-IN')}</div>
        </div>
      `;
    }

    modal.classList.add('active');
  }

  submitOrderForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.fullName.value.trim();
    const phone = form.mobileNumber.value.trim();
    const whatsapp = form.whatsappNumber.value.trim() || phone;
    const email = form.email.value.trim();
    const address = form.deliveryAddress.value.trim();
    const city = form.city.value.trim();
    const district = form.district.value.trim();
    const state = form.state.value.trim();
    const pincode = form.pincode.value.trim();
    const paymentMethod = form.paymentPreference.value;

    if (!name || !phone || !address || !city || !state || !pincode) {
      alert("Please fill in all required delivery fields.");
      return;
    }

    const isTamilNaduOrPy = state.toLowerCase().includes('tamil nadu') || state.toLowerCase().includes('puducherry') || state.toLowerCase().includes('pondicherry');
    const deliveryFee = isTamilNaduOrPy ? 0 : 150;

    let productName = '';
    let variant = '';
    let itemPrice = 0;
    let qty = 1;

    if (this.currentProduct) {
      productName = this.currentProduct.name;
      variant = `${this.currentProduct.storage} • ${this.currentProduct.color} • ${this.currentProduct.condition}`;
      itemPrice = this.currentProduct.price;
    } else if (this.cart.length > 0) {
      productName = this.cart.map(c => `${c.name} (x${c.qty})`).join(', ');
      variant = "Cart Order";
      itemPrice = this.getCartSubtotal();
    }

    const totalAmount = itemPrice + deliveryFee;
    const orderId = "TMC-2026-" + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      orderId,
      customerName: name,
      phone,
      whatsapp,
      email,
      address,
      city,
      district,
      state,
      pincode,
      productName,
      variant,
      price: itemPrice,
      quantity: qty,
      deliveryFee,
      totalAmount,
      paymentMethod,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    window.productStore.addOrder(newOrder);

    this.closeModal('bookOrderModal');
    this.clearCart();

    // Show Success Modal
    this.showOrderSuccessModal(newOrder);
  }

  showOrderSuccessModal(order) {
    const modal = document.getElementById('orderSuccessModal');
    document.getElementById('successOrderId').textContent = order.orderId;
    document.getElementById('successCustomerName').textContent = order.customerName;

    // Attach WhatsApp trigger
    const waBtn = document.getElementById('successWhatsAppBtn');
    waBtn.onclick = () => {
      this.sendWhatsAppDirectMessage(order);
    };

    modal.classList.add('active');
  }

  /* WhatsApp Order Generator */
  orderOnWhatsApp(productId) {
    const product = window.productStore.getProductById(productId);
    if (!product) return;

    const message = `Hello TTY Mobile Club 👋\n\nI would like to order:\n\nProduct: ${product.name}\nVariant: ${product.storage} • ${product.color} (${product.condition})\nPrice: ₹${product.price.toLocaleString('en-IN')}\nQuantity: 1\n\nPlease confirm availability and delivery details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/916385396977?text=${encoded}`, '_blank');
  }

  sendWhatsAppDirectMessage(order) {
    const message = `Hello TTY Mobile Club 👋\n\nI have placed an order request on your website!\n\nOrder ID: ${order.orderId}\nProduct: ${order.productName}\nVariant: ${order.variant}\nTotal Amount: ₹${order.totalAmount.toLocaleString('en-IN')}\nPayment: ${order.paymentMethod}\n\nCustomer Name: ${order.customerName}\nPhone: ${order.phone}\nDelivery Address: ${order.address}, ${order.city}, ${order.state} - ${order.pincode}\n\nPlease confirm my order request!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/916385396977?text=${encoded}`, '_blank');
  }

  /* Sell / Exchange Phones Handler */
  submitSellForm(e) {
    e.preventDefault();
    const form = e.target;

    const data = {
      id: "SELL-" + Date.now(),
      name: form.sellerName.value,
      phone: form.sellerPhone.value,
      brand: form.sellBrand.value,
      model: form.sellModel.value,
      storage: form.sellStorage.value,
      condition: form.sellCondition.value,
      batteryHealth: form.sellBattery.value,
      expectedPrice: form.sellPrice.value,
      date: new Date().toISOString().split('T')[0]
    };

    window.productStore.addSellRequest(data);

    const waMsg = `Hello TTY Mobile Club 👋\n\nI want to SELL my phone:\nBrand: ${data.brand}\nModel: ${data.model}\nStorage: ${data.storage}\nCondition: ${data.condition}\nBattery Health: ${data.batteryHealth}%\nExpected Price: ₹${data.expectedPrice}\n\nName: ${data.name}\nPhone: ${data.phone}\n\nPlease provide your best quotation!`;

    window.open(`https://wa.me/916385396977?text=${encodeURIComponent(waMsg)}`, '_blank');
    alert("Your Sell Request has been generated! Opening WhatsApp to connect with our valuation expert.");
    form.reset();
  }

  /* Admin Dashboard Logic */
  openAdminModal() {
    if (!this.adminAuthenticated) {
      const password = prompt("Enter Security Admin Password (default: admin123):");
      if (password === 'admin123') {
        this.adminAuthenticated = true;
        this.showNotification("Admin Authentication Successful! 🔐");
      } else {
        alert("Invalid Password!");
        return;
      }
    }
    document.getElementById('adminDashboardModal')?.classList.add('active');
    this.renderAdminProducts();
    this.renderAdminOrders();
  }

  renderAdminProducts() {
    const tbody = document.getElementById('adminProductTableBody');
    if (!tbody) return;

    const products = window.productStore.getProducts();
    tbody.innerHTML = products.map(p => `
      <tr>
        <td><img src="${p.images[0]}" style="width: 40px; height: 40px; object-fit: contain;"></td>
        <td><strong>${p.name}</strong><br><small style="color: var(--text-muted);">${p.brand} • ${p.category}</small></td>
        <td><span class="badge-condition ${p.condition === 'Brand New' ? 'brand-new' : 'used'}">${p.condition}</span></td>
        <td><strong>₹${p.price.toLocaleString('en-IN')}</strong></td>
        <td>
          <input type="number" value="${p.stock}" style="width: 60px; padding: 4px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px;" onchange="app.updateProductStock('${p.id}', this.value)">
        </td>
        <td>
          <button style="color: var(--accent-cyan); margin-right: 8px;" onclick="app.editProduct('${p.id}')">✏️ Edit</button>
          <button style="color: var(--danger);" onclick="app.deleteProduct('${p.id}')">🗑️ Delete</button>
        </td>
      </tr>
    `).join('');
  }

  renderAdminOrders() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    const orders = window.productStore.getOrders();
    tbody.innerHTML = orders.map(o => `
      <tr>
        <td><strong>${o.orderId}</strong><br><small style="color: var(--text-muted);">${o.date}</small></td>
        <td><strong>${o.customerName}</strong><br><small style="color: var(--text-muted);">${o.phone}</small></td>
        <td>${o.productName}<br><small style="color: var(--text-muted);">${o.variant}</small></td>
        <td><strong>₹${o.totalAmount.toLocaleString('en-IN')}</strong></td>
        <td>${o.city}, ${o.state}</td>
        <td>
          <select onchange="app.changeOrderStatus('${o.orderId}', this.value)" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px;">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Packed" ${o.status === 'Packed' ? 'selected' : ''}>Packed</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `).join('');
  }

  updateProductStock(id, newStock) {
    window.productStore.updateProduct(id, { stock: Number(newStock) });
    this.showNotification("Stock quantity updated!");
    this.renderProducts();
  }

  changeOrderStatus(orderId, status) {
    window.productStore.updateOrderStatus(orderId, status);
    this.showNotification(`Order ${orderId} status set to ${status}`);
    this.renderAdminOrders();
  }

  deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
      window.productStore.deleteProduct(id);
      this.renderAdminProducts();
      this.renderProducts();
      this.showNotification("Product deleted successfully!");
    }
  }

  openAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.add('active');
  }

  saveNewProduct(e) {
    e.preventDefault();
    const form = e.target;
    
    const productData = {
      name: form.adminProdName.value,
      brand: form.adminProdBrand.value,
      category: form.adminProdCategory.value,
      condition: form.adminProdCondition.value,
      price: Number(form.adminProdPrice.value),
      mrp: Number(form.adminProdMRP.value),
      storage: form.adminProdStorage.value,
      ram: form.adminProdRAM.value,
      color: form.adminProdColor.value,
      stock: Number(form.adminProdStock.value),
      images: [form.adminProdImage.value || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
      description: form.adminProdDesc.value,
      warranty: form.adminProdWarranty.value || '1 Year Warranty',
      isFeatured: form.adminProdFeatured.checked,
      isLatest: true
    };

    window.productStore.addProduct(productData);
    this.closeModal('addProductModal');
    this.renderAdminProducts();
    this.renderProducts();
    this.showNotification("New product added to store inventory! 🎉");
    form.reset();
  }

  switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');

    document.getElementById(`adminTabBtn_${tabName}`)?.classList.add('active');
    document.getElementById(`adminTab_${tabName}`).style.display = 'block';
  }

  /* Utilities */
  showNotification(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, var(--bg-card), #1e293b);
      border: 1px solid var(--accent-blue);
      color: #fff;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5), var(--shadow-glow);
      z-index: 9999;
      transition: all 0.3s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  bindEvents() {
    // Search Listener
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderProducts();
      });
    }

    const headerSearch = document.getElementById('headerSearchInput');
    if (headerSearch) {
      headerSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const catalogSec = document.getElementById('catalog');
        if (catalogSec) catalogSec.scrollIntoView({ behavior: 'smooth' });
        this.renderProducts();
      });
    }

    // Price Slider Listener
    const priceSlider = document.getElementById('priceRangeSlider');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = Number(e.target.value);
        document.getElementById('priceRangeValue').textContent = `₹${this.maxPrice.toLocaleString('en-IN')}`;
        this.renderProducts();
      });
    }

    // Brand Checkboxes
    document.querySelectorAll('.brand-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        this.selectedBrands = Array.from(document.querySelectorAll('.brand-checkbox:checked')).map(c => c.value);
        this.renderProducts();
      });
    });

    // Condition Checkboxes
    document.querySelectorAll('.condition-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        this.selectedConditions = Array.from(document.querySelectorAll('.condition-checkbox:checked')).map(c => c.value);
        this.renderProducts();
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new TTYMobileClubApp();
});
