/**
 * TTY MOBILE CLUB - Products Seed Database & Storage Helper
 * Estd. 2021 | Buy • Sell • Exchange
 */

const INITIAL_PRODUCTS = [
  {
    id: "tmc-m01",
    name: "Apple iPhone 15 Pro",
    brand: "Apple",
    category: "Mobiles",
    condition: "Used",
    storage: "256GB",
    ram: "8GB",
    color: "Natural Titanium",
    price: 92999,
    mrp: 134900,
    discount: 31,
    stock: 3,
    isFeatured: true,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Apple iPhone 15 Pro in pristine Natural Titanium. Powered by the A17 Pro chip with titanium design, customizable Action button, and pro camera system.",
    warranty: "Apple Care Active till Nov 2026 + 1 Day Checking Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Original Type-C Braided Cable & Original Box",
    usedSpecs: {
      batteryHealth: 96,
      screenCondition: "Flawless - 100% Scratchless",
      bodyCondition: "Mint Condition (9.8 / 10)",
      cameraCondition: "Tested & Crystal Clear",
      biometrics: "Face ID 100% Functional",
      partStatus: "All 100% Original Parts - No Repairs",
      boxAndCharger: "Original Box & Braided Cable Included",
      checkingWarranty: "1 Day Instant Replacement / Checking Warranty"
    }
  },
  {
    id: "tmc-m02",
    name: "Samsung Galaxy S24 Ultra 5G",
    brand: "Samsung",
    category: "Mobiles",
    condition: "Brand New",
    storage: "512GB",
    ram: "12GB",
    color: "Titanium Black",
    price: 119999,
    mrp: 139999,
    discount: 14,
    stock: 5,
    isFeatured: true,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Brand New Sealed Pack Samsung Galaxy S24 Ultra 5G. Features Snapdragon 8 Gen 3 for Galaxy, Galaxy AI features, Built-in S-Pen, and 200MP Zoom Camera.",
    warranty: "1 Year Official Samsung India Brand Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Sealed Box (S-Pen, Type-C Cable, SIM Ejector)",
    usedSpecs: null
  },
  {
    id: "tmc-m03",
    name: "OnePlus 12 5G",
    brand: "OnePlus",
    category: "Mobiles",
    condition: "Used",
    storage: "256GB",
    ram: "12GB",
    color: "Silky Black",
    price: 48999,
    mrp: 64999,
    discount: 25,
    stock: 2,
    isFeatured: true,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Super fast OnePlus 12 5G with Hasselblad 4th Gen Camera System, Snapdragon 8 Gen 3, and 100W SUPERVOOC Charging.",
    warranty: "6 Months TTY Mobile Warranty + 1 Day Checking Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Original 100W SUPERVOOC Charger & Red Cable",
    usedSpecs: {
      batteryHealth: 98,
      screenCondition: "Screen Protector Applied - Flawless",
      bodyCondition: "Like New (9.9 / 10)",
      cameraCondition: "Hasselblad Lenses Immaculate",
      biometrics: "In-display Fingerprint 100% Instant",
      partStatus: "All 100% Factory Original",
      boxAndCharger: "Original 100W Charger & Red Cable Included",
      checkingWarranty: "1 Day Checking Warranty Available"
    }
  },
  {
    id: "tmc-m04",
    name: "Apple iPhone 14",
    brand: "Apple",
    category: "Mobiles",
    condition: "Used",
    storage: "128GB",
    ram: "6GB",
    color: "Blue",
    price: 46999,
    mrp: 69900,
    discount: 33,
    stock: 4,
    isFeatured: false,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Apple iPhone 14 128GB in Stunning Blue. Dual 12MP camera with Photonic Engine, Crash Detection, and All-Day Battery Life.",
    warranty: "3 Months Store Warranty + 1 Day Checking Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Original Box & Lightning Cable",
    usedSpecs: {
      batteryHealth: 91,
      screenCondition: "Clean Screen, No Scratches",
      bodyCondition: "Minor pocket mark on lower corner (9.2 / 10)",
      cameraCondition: "Tested 100% Working",
      biometrics: "Face ID 100% Fast",
      partStatus: "100% Original - Never Opened",
      boxAndCharger: "Original Box & Cable Included",
      checkingWarranty: "1 Day Full Checking Warranty"
    }
  },
  {
    id: "tmc-m05",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Mobiles",
    condition: "Brand New",
    storage: "128GB",
    ram: "12GB",
    color: "Bay Blue",
    price: 74999,
    mrp: 106999,
    discount: 30,
    stock: 2,
    isFeatured: true,
    isLatest: false,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Google Tensor G3 chip, advanced AI camera editing, Super Actua display, and 7 years of OS updates.",
    warranty: "1 Year Google India Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Sealed Box & Accessories",
    usedSpecs: null
  },
  {
    id: "tmc-m06",
    name: "Xiaomi 14 Pro 5G",
    brand: "Xiaomi",
    category: "Mobiles",
    condition: "Used",
    storage: "512GB",
    ram: "16GB",
    color: "Titanium Gray",
    price: 54999,
    mrp: 79999,
    discount: 31,
    stock: 2,
    isFeatured: false,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Leica Summilux Optical Lens, Snapdragon 8 Gen 3, HyperOS, 120W HyperCharge.",
    warranty: "4 Months Official Warranty + 1 Day Checking Warranty",
    boxIncluded: true,
    accessoriesIncluded: "120W Fast Charger + Original Case",
    usedSpecs: {
      batteryHealth: 97,
      screenCondition: "Flawless",
      bodyCondition: "Mint (9.7 / 10)",
      cameraCondition: "Leica Quad Camera Perfect",
      biometrics: "Fingerprint & Face Unlock 100%",
      partStatus: "Original Untouched Parts",
      boxAndCharger: "120W Charger & Box Included",
      checkingWarranty: "1 Day Checking Warranty"
    }
  },
  {
    id: "tmc-m07",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    category: "Mobiles",
    condition: "Used",
    storage: "256GB",
    ram: "12GB",
    color: "Dark Gray",
    price: 31999,
    mrp: 49999,
    discount: 36,
    stock: 3,
    isFeatured: true,
    isLatest: false,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Glyph Interface light notifications, Snapdragon 8+ Gen 1, Nothing OS 2.5, Dual 50MP Cameras.",
    warranty: "2 Months Store Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Type-C Cable & Nothing SIM Tool",
    usedSpecs: {
      batteryHealth: 94,
      screenCondition: "Clean",
      bodyCondition: "Excellent (9.5 / 10)",
      cameraCondition: "Tested Working",
      biometrics: "In-display Fingerprint Active",
      partStatus: "Original Parts",
      boxAndCharger: "Original Box Included",
      checkingWarranty: "1 Day Checking Warranty"
    }
  },
  {
    id: "tmc-l01",
    name: "Apple MacBook Air M2",
    brand: "Apple",
    category: "Laptops",
    condition: "Used",
    storage: "256GB SSD",
    ram: "8GB",
    color: "Midnight Blue",
    price: 73999,
    mrp: 119900,
    discount: 38,
    stock: 2,
    isFeatured: true,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Redesigned ultra-thin Apple MacBook Air with M2 Chip, Liquid Retina display, MagSafe charging, and 18-hour battery life.",
    warranty: "6 Months Store Warranty + 1 Day Checking Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Original MagSafe 35W Dual Charger & Cable",
    usedSpecs: {
      batteryHealth: 95,
      screenCondition: "No Scratches or Keyboard Marks",
      bodyCondition: "Mint Metallic Body (9.8 / 10)",
      cameraCondition: "1080p FaceTime HD Camera Clean",
      biometrics: "Touch ID Instant Response",
      partStatus: "100% Original Apple Factory Sealed Logic Board",
      boxAndCharger: "Original MagSafe Charger & Box",
      checkingWarranty: "1 Day Full Checking Warranty"
    }
  },
  {
    id: "tmc-l02",
    name: "Asus ROG Strix G16 Gaming Laptop",
    brand: "Asus",
    category: "Laptops",
    condition: "Brand New",
    storage: "1TB NVMe SSD",
    ram: "16GB DDR5",
    color: "Eclipse Gray",
    price: 114999,
    mrp: 149999,
    discount: 23,
    stock: 2,
    isFeatured: true,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Intel Core i7-13650HX, NVIDIA GeForce RTX 4060 8GB VRAM, 165Hz FHD+ Display, Per-Key RGB Keyboard.",
    warranty: "1 Year Official Asus India Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Original 280W Adapter & ROG Gaming Backpack",
    usedSpecs: null
  },
  {
    id: "tmc-w01",
    name: "Apple Watch Series 9 GPS",
    brand: "Apple",
    category: "Smart Watches",
    condition: "Used",
    storage: "64GB",
    ram: "N/A",
    color: "Midnight Aluminum (45mm)",
    price: 27999,
    mrp: 44900,
    discount: 37,
    stock: 4,
    isFeatured: true,
    isLatest: false,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "S9 SiP chip, Double Tap gesture control, brighter Always-On Retina display, ECG, Blood Oxygen monitoring.",
    warranty: "3 Months Store Warranty + 1 Day Checking Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Original Magnetic Fast Charger Puck & Midnight Sport Band",
    usedSpecs: {
      batteryHealth: 98,
      screenCondition: "Micro scratches barely visible",
      bodyCondition: "Very Good (9.5 / 10)",
      cameraCondition: "N/A",
      biometrics: "Passcode & Heart Rate Sensors 100% Tested",
      partStatus: "All Original Apple Parts",
      boxAndCharger: "Magnetic Fast Charger & Box Included",
      checkingWarranty: "1 Day Checking Warranty"
    }
  },
  {
    id: "tmc-e01",
    name: "Apple AirPods Pro (2nd Gen) USB-C",
    brand: "Apple",
    category: "Earbuds",
    condition: "Brand New",
    storage: "N/A",
    ram: "N/A",
    color: "White",
    price: 19499,
    mrp: 24900,
    discount: 21,
    stock: 8,
    isFeatured: true,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "H2 Chip with Active Noise Cancellation, Adaptive Audio, USB-C MagSafe Charging Case with Speaker & Lanyard Loop.",
    warranty: "1 Year Official Apple Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Ear tips (XS, S, M, L), USB-C Charge Cable",
    usedSpecs: null
  },
  {
    id: "tmc-e02",
    name: "Sony WF-1000XM5 Wireless Noise Canceling",
    brand: "Sony",
    category: "Earbuds",
    condition: "Used",
    storage: "N/A",
    ram: "N/A",
    color: "Black",
    price: 14999,
    mrp: 24990,
    discount: 40,
    stock: 3,
    isFeatured: false,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Industry-leading noise canceling with Integrated Processor V2 and HD Noise Canceling Processor QN2e.",
    warranty: "3 Months Store Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Original Case & Extra Foam Tips",
    usedSpecs: {
      batteryHealth: 96,
      screenCondition: "N/A",
      bodyCondition: "Clean Case & Buds (9.6 / 10)",
      cameraCondition: "N/A",
      biometrics: "Touch Sensors Tested 100%",
      partStatus: "Original Drivers",
      boxAndCharger: "Charging Case & Cable",
      checkingWarranty: "1 Day Checking Warranty"
    }
  },
  {
    id: "tmc-s01",
    name: "JBL Flip 6 Portable Bluetooth Speaker",
    brand: "JBL",
    category: "Speakers",
    condition: "Brand New",
    storage: "N/A",
    ram: "N/A",
    color: "Squad Camo",
    price: 8999,
    mrp: 13999,
    discount: 35,
    stock: 6,
    isFeatured: false,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "2-way speaker system delivers loud, crystal clear, powerful sound. IP67 waterproof and dustproof.",
    warranty: "1 Year JBL India Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Type-C Cable & Quick Start Guide",
    usedSpecs: null
  },
  {
    id: "tmc-a01",
    name: "Anker 65W GaN Fast Wall Charger",
    brand: "Anker",
    category: "Accessories",
    condition: "Brand New",
    storage: "N/A",
    ram: "N/A",
    color: "Black",
    price: 2499,
    mrp: 3999,
    discount: 37,
    stock: 15,
    isFeatured: false,
    isLatest: false,
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    description: "PowerIQ 3.0 65W High-Speed Fast Charger for iPhone, Samsung, MacBooks, and Laptops.",
    warranty: "18 Months Anker Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Retail Pack",
    usedSpecs: null
  },
  {
    id: "tmc-g01",
    name: "Sony PS5 DualSense Wireless Controller",
    brand: "Sony",
    category: "Gaming",
    condition: "Brand New",
    storage: "N/A",
    ram: "N/A",
    color: "Midnight Black",
    price: 5299,
    mrp: 6390,
    discount: 17,
    stock: 7,
    isFeatured: true,
    isLatest: true,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Haptic feedback, dynamic adaptive triggers, built-in microphone and headset jack.",
    warranty: "6 Months Official Sony Warranty",
    boxIncluded: true,
    accessoriesIncluded: "Sealed Box",
    usedSpecs: null
  }
];

class ProductStore {
  constructor() {
    this.storageKey = 'ttymobileclub_products_v1';
    this.ordersKey = 'ttymobileclub_orders_v1';
    this.sellRequestsKey = 'ttymobileclub_sell_requests_v1';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(this.ordersKey)) {
      // Seed a sample order for demonstration
      const sampleOrders = [
        {
          orderId: "TMC-2026-8492",
          customerName: "Ramesh Kumar",
          phone: "9840123456",
          whatsapp: "9840123456",
          email: "ramesh.k@gmail.com",
          address: "No. 45, Anna Salai, T. Nagar",
          city: "Chennai",
          district: "Chennai",
          state: "Tamil Nadu",
          pincode: "600017",
          productName: "Apple iPhone 15 Pro",
          variant: "256GB • Natural Titanium • Used",
          price: 92999,
          quantity: 1,
          deliveryFee: 0,
          totalAmount: 92999,
          paymentMethod: "Cash on Delivery",
          status: "Confirmed",
          date: "2026-09-19"
        }
      ];
      localStorage.setItem(this.ordersKey, JSON.stringify(sampleOrders));
    }
    if (!localStorage.getItem(this.sellRequestsKey)) {
      localStorage.setItem(this.sellRequestsKey, JSON.stringify([]));
    }
  }

  getProducts() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch (e) {
      console.error("Error parsing products from localStorage", e);
      return INITIAL_PRODUCTS;
    }
  }

  saveProducts(products) {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  addProduct(productData) {
    const products = this.getProducts();
    const newId = "tmc-cust-" + Date.now().toString(36);
    const newProduct = {
      id: newId,
      ...productData,
      price: Number(productData.price),
      mrp: Number(productData.mrp || productData.price),
      discount: Math.round(((productData.mrp - productData.price) / productData.mrp) * 100) || 0,
      stock: Number(productData.stock || 1)
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    let products = this.getProducts();
    products = products.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updatedFields };
        if (updatedFields.price || updatedFields.mrp) {
          const price = Number(merged.price);
          const mrp = Number(merged.mrp || price);
          merged.discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
        }
        return merged;
      }
      return p;
    });
    this.saveProducts(products);
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  }

  resetToDefaults() {
    localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_PRODUCTS));
  }

  // Orders
  getOrders() {
    try {
      const data = localStorage.getItem(this.ordersKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  addOrder(orderData) {
    const orders = this.getOrders();
    orders.unshift(orderData);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
  }

  updateOrderStatus(orderId, newStatus) {
    let orders = this.getOrders();
    orders = orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
  }

  // Sell Requests
  getSellRequests() {
    try {
      const data = localStorage.getItem(this.sellRequestsKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  addSellRequest(requestData) {
    const requests = this.getSellRequests();
    requests.unshift(requestData);
    localStorage.setItem(this.sellRequestsKey, JSON.stringify(requests));
  }
}

window.productStore = new ProductStore();
