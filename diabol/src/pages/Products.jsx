import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/products.css';

const Products = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlistItems');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const storedViewed = localStorage.getItem('recentlyViewed');
    return storedViewed ? JSON.parse(storedViewed) : [];
  });
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Refs
  const productsGridRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // Save to localStorage whenever these states change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Notification system
  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Helper function to format as Indian Rupee
  const formatINR = (amount) => `₹${parseFloat(amount).toFixed(2)}`;

  // Product actions
  const handleAddToCart = (product) => {
    if (!cartItems.some((item) => item._id === product._id)) {
      setCartItems(prev => [...prev, {...product, quantity: 1}]);
      showToast(`${product.name} added to cart!`);
    } else {
      showToast(`${product.name} is already in your cart`);
    }
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item._id === product._id);
      const message = exists ? `${product.name} removed from wishlist` : `${product.name} added to wishlist!`;
      showToast(message);
      return exists ? prev.filter(item => item._id !== product._id) : [...prev, product];
    });
  };

  const viewProductDetails = (product) => {
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const existingIndex = prev.findIndex(item => item._id === product._id);
      if (existingIndex >= 0) {
        // Move to front of array if already exists
        const newArray = [...prev];
        const [item] = newArray.splice(existingIndex, 1);
        return [item, ...newArray].slice(0, 5); // Keep only the 5 most recent
      } else {
        return [product, ...prev].slice(0, 5); // Keep only the 5 most recent
      }
    });

    setExpandedProduct(expandedProduct?._id === product._id ? null : product);
  };

  // Enhanced filtering and sorting
  const filterAndSortProducts = () => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesPrice =
          activePriceRange === 'all' ||
          (activePriceRange === 'under10' && product.price < 10) ||
          (activePriceRange === '10-20' && product.price >= 10 && product.price <= 20) ||
          (activePriceRange === 'over20' && product.price > 20);
        
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  };

  // Clear all filters function
  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setActivePriceRange('all');
    setSortBy('default');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Animation function for adding to cart
  const animateAddToCart = (event, productId) => {
    // Create a clone of the button
    const button = event.currentTarget;
    const clone = button.cloneNode(true);
    
    // Get positions
    const rect = button.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart-icon'); // Assuming there's a cart icon in the header
    
    if (!cartIcon) return;
    
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Style the clone
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.opacity = '0.9';
    clone.style.zIndex = '1000';
    clone.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    clone.style.pointerEvents = 'none';
    
    // Add to body
    document.body.appendChild(clone);
    
    // Trigger animation
    setTimeout(() => {
      clone.style.transform = 'scale(0.3)';
      clone.style.left = `${cartRect.left + cartRect.width/2 - rect.width/6}px`;
      clone.style.top = `${cartRect.top + cartRect.height/2 - rect.height/6}px`;
      clone.style.opacity = '0';
      
      // Remove after animation
      setTimeout(() => {
        clone.remove();
      }, 800);
    }, 10);
  };

  // Get unique categories from products
  const getCategories = () => {
    const categories = ['all', ...new Set(products.map(product => product.category))];
    return categories.filter(Boolean);
  };

  // JSX for product cards
  const renderProductCard = (product) => {
    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    const isInCart = cartItems.some(item => item._id === product._id);
    const isExpanded = expandedProduct?._id === product._id;
    
    return (
      <div 
        className={`product-card ${viewMode === 'list' ? 'list-view' : ''} ${isExpanded ? 'expanded' : ''}`} 
        key={product._id}
      >
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className="product-badge">{product.badge}</span>}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="discount-badge">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <div className="product-info">
          <div className="product-header">
            <h3 className="product-title" onClick={() => viewProductDetails(product)}>{product.name}</h3>
            {product.rating && (
              <div className="product-rating">
                <span className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : i < product.rating ? 'half-filled' : ''}`}
                    ></i>
                  ))}
                </span>
                {product.reviews && <span className="rating-count">({product.reviews})</span>}
              </div>
            )}
          </div>
          
          <div className="product-price">
            <span className="current-price">{formatINR(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">{formatINR(product.originalPrice)}</span>
            )}
          </div>
          
          {/* Tags */}
          {product.tags && (
            <div className="product-tags">
              {product.tags.slice(0, 3).map(tag => (
                <span key={tag} className="product-tag">{tag}</span>
              ))}
            </div>
          )}
          
          {/* Description (only visible in list view or when expanded) */}
          {(viewMode === 'list' || isExpanded) && product.description && (
            <p className="product-description">{product.description}</p>
          )}
          
          {/* Additional details (only visible when expanded) */}
          {isExpanded && (
            <div className="product-extended-info">
              {product.stock !== undefined && (
                <div className="product-stock">
                  <span className={`stock-status ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                  <span className="stock-count">{product.stock} remaining</span>
                </div>
              )}
              
              {product.dosage && (
                <div className="product-dosage">
                  <h4>Recommended Dosage:</h4>
                  <p>{product.dosage}</p>
                </div>
              )}
              
              {product.ingredients && (
                <div className="product-ingredients">
                  <h4>Ingredients:</h4>
                  <p>{Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="product-actions">
            <button 
              className={`add-to-cart ${isInCart ? 'in-cart' : ''}`} 
              onClick={(e) => {
                if (!isInCart) {
                  handleAddToCart(product);
                  animateAddToCart(e, product._id);
                }
              }}
              disabled={product.stock === 0}
            >
              <i className={`fas ${isInCart ? 'fa-check' : 'fa-shopping-cart'}`}></i> 
              {isInCart ? 'Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            <div className="secondary-actions">
              <button
                className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <span className="btn-char">♥</span>
                <i className={isInWishlist ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
              
              <button 
                className={`details-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => viewProductDetails(product)}
                aria-label={isExpanded ? "Show less details" : "Show more details"}
              >
                <span className="btn-char">{isExpanded ? '▲' : '▼'}</span>
                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredProducts = filterAndSortProducts();

  return (
    <>
      <Header cartItemCount={cartItems.length} wishlistItemCount={wishlistItems.length} />
      
      {/* Toast notification */}
      <div className={`toast-notification ${showNotification ? 'show' : ''}`}>
        {notificationMessage}
      </div>
      
      <main className="products-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Explore Our Health Products</h1>
            <p>Quality healthcare products for your wellbeing</p>
          </div>
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              ref={searchInputRef}
              type="text"
              className="search-box"
              placeholder="Search for medicines, health products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </section>
        
        <div className="products-container">
          <div className="control-panel">
            <div className="filter-section">
              <div className="filter-group">
                <h3>Categories</h3>
                <div className="filter-options">
                  {getCategories().map((cat) => (
                    <button
                      key={cat}
                      className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-group">
                <h3>Price Range</h3>
                <div className="filter-options">
                  {[
                    { label: 'All', value: 'all' },
                    { label: 'Under ₹10', value: 'under10' },
                    { label: '₹10-₹20', value: '10-20' },
                    { label: 'Over ₹20', value: 'over20' },
                  ].map(({ label, value }) => (
                    <button
                      key={value}
                      className={`filter-btn ${activePriceRange === value ? 'active' : ''}`}
                      onClick={() => setActivePriceRange(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Active filters display */}
              {(activeCategory !== 'all' || activePriceRange !== 'all' || searchTerm) && (
                <div className="active-filters">
                  <h3>Active Filters:</h3>
                  <div className="filter-tags">
                    {activeCategory !== 'all' && (
                      <span className="filter-tag">
                        Category: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ')}
                        <button onClick={() => setActiveCategory('all')}>×</button>
                      </span>
                    )}
                    {activePriceRange !== 'all' && (
                      <span className="filter-tag">
                        Price: {
                          activePriceRange === 'under10' ? 'Under ₹10' :
                          activePriceRange === '10-20' ? '₹10-₹20' :
                          'Over ₹20'
                        }
                        <button onClick={() => setActivePriceRange('all')}>×</button>
                      </span>
                    )}
                    {searchTerm && (
                      <span className="filter-tag">
                        Search: "{searchTerm}"
                        <button onClick={() => setSearchTerm('')}>×</button>
                      </span>
                    )}
                    <button className="clear-all-filters" onClick={clearFilters}>
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="products-tools">
              <div className="products-count">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </div>
              
              <div className="sorting-view-options">
                <div className="sort-container">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select 
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                
                <div className="view-toggle">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <i className="fas fa-th"></i>
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recently viewed products */}
          {recentlyViewed.length > 0 && (
            <div className="recently-viewed">
              <h3>Recently Viewed</h3>
              <div className="recently-viewed-list">
                {recentlyViewed.map(product => (
                  <div 
                    key={product._id} 
                    className="recently-viewed-item"
                    onClick={() => viewProductDetails(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Loading state */}
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="no-results">
                  <i className="fas fa-search-minus"></i>
                  <h2>No products found</h2>
                  <p>Try adjusting your filters or search term.</p>
                  <button className="reset-search" onClick={clearFilters}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div 
                  ref={productsGridRef}
                  className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}
                >
                  {filteredProducts.map(product => renderProductCard(product))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

    </>
  );
};

export default Products;