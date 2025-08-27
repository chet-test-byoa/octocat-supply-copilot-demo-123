import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import CartItem from './CartItem';

export default function Cart() {
  const { cartItems, cartTotal, shippingCost, finalTotal, clearCart } = useCart();
  const { darkMode } = useTheme();

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 text-center transition-colors duration-300`}>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mx-auto mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6m-8 0V9a2 2 0 012-2h2a2 2 0 012 2v4"
                />
              </svg>
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
              Your Cart is Empty
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-8 transition-colors duration-300`}>
              Looks like you haven't added any items to your cart yet. Explore our products to get started!
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-300`}>
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                  Shopping Cart
                </h1>
                <button
                  onClick={clearCart}
                  className={`${darkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} px-3 py-1 rounded text-sm font-medium transition-colors duration-300`}
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <Link 
                  to="/products"
                  className={`inline-flex items-center ${darkMode ? 'text-primary hover:text-accent' : 'text-primary hover:text-accent'} font-medium transition-colors duration-300`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-300 sticky top-24`}>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                Order Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                    Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium transition-colors duration-300`}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                    Shipping
                  </span>
                  <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium transition-colors duration-300`}>
                    {shippingCost === 0 ? (
                      <span className="text-primary">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {shippingCost > 0 && (
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                    Free shipping on orders over $100
                  </div>
                )}
                
                <hr className={`${darkMode ? 'border-gray-600' : 'border-gray-200'} transition-colors duration-300`} />
                
                <div className="flex justify-between text-lg font-bold">
                  <span className={`${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                    Total
                  </span>
                  <span className={`${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-primary hover:bg-accent text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}