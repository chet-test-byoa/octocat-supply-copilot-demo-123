import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// CartItem interface matching the Product structure
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imgName: string;
  quantity: number;
  discount?: number;
}

// Product interface (same as in Products.tsx)
export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  sku: string;
  unit: string;
  supplierId: number;
  discount?: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  cartItemCount: number;
  cartTotal: number;
  shippingCost: number;
  finalTotal: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = 'octocat-cart';
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 25;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initialization
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Calculate cart totals
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount ? item.price * (1 - item.discount) : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = cartTotal + shippingCost;

  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.productId);
      
      if (existingItem) {
        // Update quantity of existing item
        return prev.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          imgName: product.imgName,
          quantity: quantity,
          discount: product.discount
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        cartTotal,
        shippingCost,
        finalTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}