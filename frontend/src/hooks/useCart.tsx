/* eslint-disable react-refresh/only-export-components */
import { useCart as useCartContext } from '../context/CartContext';

// Re-export the useCart hook for convenience
// This follows the pattern used in the codebase where hooks are separated
export const useCart = useCartContext;