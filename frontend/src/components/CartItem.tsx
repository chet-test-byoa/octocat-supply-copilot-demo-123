import { useCart, type CartItem as CartItemType } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { darkMode } = useTheme();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(item.productId);
    } else {
      updateQuantity(item.productId, newQuantity);
    }
  };

  const itemPrice = item.discount ? item.price * (1 - item.discount) : item.price;
  const originalPrice = item.price;
  const totalPrice = itemPrice * item.quantity;

  return (
    <div className={`flex flex-col sm:flex-row gap-4 p-4 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg transition-colors duration-300`}>
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className={`w-24 h-24 ${darkMode ? 'bg-gradient-to-t from-gray-600 to-gray-700' : 'bg-gradient-to-t from-gray-200 to-white'} rounded-lg overflow-hidden transition-colors duration-300`}>
          <img 
            src={`/${item.imgName}`} 
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex-grow">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {item.discount && item.discount > 0 ? (
                <>
                  <span className={`text-lg font-bold text-primary transition-colors duration-300`}>
                    ${itemPrice.toFixed(2)}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} line-through transition-colors duration-300`}>
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    {Math.round(item.discount * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className={`text-lg font-bold text-primary transition-colors duration-300`}>
                  ${itemPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                Qty:
              </span>
              <button 
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'} rounded transition-colors duration-300`}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <span aria-hidden="true">-</span>
              </button>
              <span 
                className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center font-medium transition-colors duration-300`}
                aria-label={`Quantity of ${item.name}`}
              >
                {item.quantity}
              </span>
              <button 
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'} rounded transition-colors duration-300`}
                aria-label={`Increase quantity of ${item.name}`}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <div className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                ${totalPrice.toFixed(2)}
              </div>
              {item.quantity > 1 && (
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                  ${itemPrice.toFixed(2)} each
                </div>
              )}
            </div>

            {/* Remove Button */}
            <button 
              onClick={() => removeFromCart(item.productId)}
              className={`p-1 ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'} transition-colors duration-300`}
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}