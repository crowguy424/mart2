import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Heart, Star, Plus, Minus, Filter, Menu, X, CreditCard, Truck, MapPin, Phone, Mail } from 'lucide-react';

const WalmartStyleEcommerce = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [sortBy, setSortBy] = useState('name');

  // Expanded Walmart-style product catalog
  const sampleProducts = [
    // Groceries
    { id: 1, name: 'Great Value Whole Milk', price: 3.48, originalPrice: 3.98, category: 'dairy', image: '🥛', rating: 4.5, stock: 150, unit: 'gallon', brand: 'Great Value', rollback: true },
    { id: 2, name: 'Bananas', price: 0.58, category: 'produce', image: '🍌', rating: 4.3, stock: 200, unit: 'lb', brand: 'Fresh' },
    { id: 3, name: 'Wonder Bread Classic White', price: 1.24, category: 'bakery', image: '🍞', rating: 4.2, stock: 85, unit: 'loaf', brand: 'Wonder' },
    { id: 4, name: 'Eggs Large Grade A', price: 2.12, category: 'dairy', image: '🥚', rating: 4.6, stock: 120, unit: 'dozen', brand: 'Great Value' },
    { id: 5, name: 'Ground Beef 80/20', price: 4.98, category: 'meat', image: '🥩', rating: 4.4, stock: 45, unit: 'lb', brand: 'Fresh' },
    
    // Electronics
    { id: 6, name: 'Apple iPhone 15', price: 799.00, originalPrice: 899.00, category: 'electronics', image: '📱', rating: 4.8, stock: 25, unit: 'each', brand: 'Apple', rollback: true },
    { id: 7, name: 'Samsung 55" 4K Smart TV', price: 348.00, originalPrice: 498.00, category: 'electronics', image: '📺', rating: 4.7, stock: 12, unit: 'each', brand: 'Samsung', rollback: true },
    { id: 8, name: 'Apple AirPods Pro', price: 179.00, originalPrice: 249.00, category: 'electronics', image: '🎧', rating: 4.6, stock: 38, unit: 'each', brand: 'Apple', rollback: true },
    { id: 9, name: 'HP Laptop 15.6"', price: 449.00, category: 'electronics', image: '💻', rating: 4.3, stock: 18, unit: 'each', brand: 'HP' },
    
    // Clothing
    { id: 10, name: 'Hanes Men\'s T-Shirt Pack', price: 12.97, category: 'clothing', image: '👕', rating: 4.4, stock: 95, unit: 'pack', brand: 'Hanes' },
    { id: 11, name: 'Levi\'s 501 Original Jeans', price: 39.97, originalPrice: 59.50, category: 'clothing', image: '👖', rating: 4.6, stock: 65, unit: 'each', brand: 'Levi\'s', rollback: true },
    { id: 12, name: 'Nike Air Max Sneakers', price: 89.97, originalPrice: 120.00, category: 'clothing', image: '👟', rating: 4.7, stock: 42, unit: 'pair', brand: 'Nike', rollback: true },
    
    // Home & Garden
    { id: 13, name: 'Bounty Paper Towels 12-Pack', price: 24.97, category: 'household', image: '🧻', rating: 4.5, stock: 78, unit: 'pack', brand: 'Bounty' },
    { id: 14, name: 'Tide Laundry Detergent', price: 11.97, category: 'household', image: '🧴', rating: 4.7, stock: 88, unit: 'bottle', brand: 'Tide' },
    { id: 15, name: 'Better Homes & Gardens Pillow', price: 8.88, category: 'home', image: '🛏️', rating: 4.2, stock: 156, unit: 'each', brand: 'Better Homes & Gardens' },
    
    // Health & Beauty
    { id: 16, name: 'Crest Toothpaste 3-Pack', price: 7.47, category: 'health', image: '🦷', rating: 4.6, stock: 134, unit: 'pack', brand: 'Crest' },
    { id: 17, name: 'Pantene Shampoo & Conditioner', price: 5.97, category: 'health', image: '🧴', rating: 4.3, stock: 92, unit: 'bottle', brand: 'Pantene' },
    
    // Sports & Outdoors
    { id: 18, name: 'Coleman Camping Chair', price: 19.88, category: 'sports', image: '🪑', rating: 4.4, stock: 67, unit: 'each', brand: 'Coleman' },
    { id: 19, name: 'Wilson Basketball', price: 14.97, category: 'sports', image: '🏀', rating: 4.5, stock: 43, unit: 'each', brand: 'Wilson' },
    
    // Baby & Kids
    { id: 20, name: 'Pampers Diapers Size 3', price: 47.97, category: 'baby', image: '👶', rating: 4.8, stock: 89, unit: 'box', brand: 'Pampers' },
  ];

  const categories = [
    'all', 'produce', 'dairy', 'meat', 'bakery', 'electronics', 'clothing', 
    'home', 'household', 'health', 'sports', 'baby'
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'rollback', label: 'Rollback First' }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'rollback': return (b.rollback ? 1 : 0) - (a.rollback ? 1 : 0);
      default: return a.name.localeCompare(b.name);
    }
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogin = (email, password) => {
    setUser({ name: 'John Doe', email });
    setShowLogin(false);
  };

  const processPayment = (paymentData) => {
    // Simulate payment processing
    setTimeout(() => {
      alert('Order placed successfully! Your items will be delivered in 2-3 business days.');
      setCart([]);
      setShowCheckout(false);
      setIsCartOpen(false);
    }, 2000);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {product.rollback && (
        <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 absolute z-10 rounded-br-lg">
          ROLLBACK
        </div>
      )}
      <div className="relative p-4 text-center bg-gray-50">
        <div className="text-4xl mb-3">{product.image}</div>
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
            wishlist.find(item => item.id === product.id)
              ? 'text-red-500 bg-white'
              : 'text-gray-400 hover:text-red-500 bg-white'
          }`}
        >
          <Heart size={16} fill={wishlist.find(item => item.id === product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.rating})</span>
        </div>
        <div className="mb-3">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
            )}
          </div>
          <div className="text-xs text-gray-500">per {product.unit}</div>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium text-sm transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const Cart = () => (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
      isCartOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-4 border-b bg-blue-600 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Cart ({getTotalItems()} items)</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🛒</div>
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-4 p-3 border rounded-lg">
              <div className="flex items-center flex-1">
                <span className="text-2xl mr-3">{item.image}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-600">{item.brand}</p>
                  <p className="text-sm font-bold text-blue-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center ml-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus size={14} />
                </button>
                <span className="mx-2 font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold">Subtotal:</span>
            <span className="text-xl font-bold">${getTotalPrice()}</span>
          </div>
          <div className="text-xs text-gray-600 mb-3">
            <div className="flex items-center mb-1">
              <Truck size={14} className="mr-1" />
              FREE shipping on orders $35+
            </div>
          </div>
          <button 
            onClick={() => setShowCheckout(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );

  const CheckoutModal = () => (
    showCheckout && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Checkout</h2>
              <button onClick={() => setShowCheckout(false)}>
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-bold">
                  <div className="flex justify-between">
                    <span>Total: ${getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-3">Shipping Information</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="State"
                    className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Payment Information</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => processPayment()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <CreditCard className="mr-2" size={20} />
              Place Order ${getTotalPrice()}
            </button>
          </div>
        </div>
      </div>
    )
  );

  const LoginModal = () => (
    showLogin && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <button onClick={() => setShowLogin(false)}>
              <X size={24} />
            </button>
          </div>
          <div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email or Phone"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                if (email && password) {
                  handleLogin(email, password);
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Walmart</h1>
              <span className="ml-2 text-sm">Save Money. Live Better.</span>
            </div>
            
            <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search everything at Walmart online and in store"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-l-full text-black focus:outline-none"
                />
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-full hover:bg-yellow-500">
                  <Search size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="text-sm">
                  <div>Hi, {user.name.split(' ')[0]}</div>
                  <div className="text-xs opacity-75">Account</div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex flex-col items-center text-sm hover:bg-blue-700 px-2 py-1 rounded"
                >
                  <User size={20} />
                  <span className="text-xs">Sign In</span>
                </button>
              )}
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center hover:bg-blue-700 px-2 py-1 rounded"
              >
                <ShoppingCart size={20} />
                <span className="text-xs">Cart</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search everything"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6 overflow-x-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Save Big on Everything</h2>
          <p className="text-lg opacity-90">Free shipping on orders $35+ • Free pickup • Great prices</p>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {categories.slice(1, 7).map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                selectedCategory === category
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-2">
                {category === 'electronics' && '📱'}
                {category === 'clothing' && '👕'}
                {category === 'home' && '🏠'}
                {category === 'health' && '🏥'}
                {category === 'sports' && '⚽'}
                {category === 'baby' && '👶'}
              </div>
              <div className="text-sm font-medium capitalize">{category}</div>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-xl text-gray-500">No products found matching your search.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">MegaShop</h3>
              <p className="text-gray-400 mb-4">Buy better products at the Correct Price</p>
              <div className="flex space-x-4">
                <Phone size={20} />
                <Mail size={20} />
                <MapPin size={20} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get to Know Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About MegaShop</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press Center</a></li>
                <li><a href="#" className="hover:text-white">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Track Your Order</a></li>
                <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">MegaShop+</a></li>
                <li><a href="#" className="hover:text-white">Grocery Pickup</a></li>
                <li><a href="#" className="hover:text-white">Pharmacy</a></li>
                <li><a href="#" className="hover:text-white">Money Services</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Walmart Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Login Modal */}
      <LoginModal />

      {/* Overlays */}
      {(isCartOpen || showCheckout || showLogin) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsCartOpen(false);
            setShowCheckout(false);
            setShowLogin(false);
          }}
        />
      )}
    </div>
  );
};

export default WalmartStyleEcommerce;
