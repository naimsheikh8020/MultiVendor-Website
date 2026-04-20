import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  author: string;
  category: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isGuestCart: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;
  clearUserCart: () => void;
  markAsUserCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getShippingFee: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isGuestCart: true,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            // If item exists, increment quantity
            toast.success(`${item.title} added to cart!`);
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            // Add new item with quantity 1
            toast.success(`${item.title} added to cart!`);
            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      incrementQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decrementQuantity: (id) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item && item.quantity > 1) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              ),
            };
          } else {
            // Remove item if quantity would be 0
            return {
              items: state.items.filter((i) => i.id !== id),
            };
          }
        });
      },

      clearCart: () => {
        set({ items: [], isGuestCart: true });
      },

      clearUserCart: () => {
        set({ items: [], isGuestCart: true });
      },

      markAsUserCart: () => {
        set({ isGuestCart: false });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getDiscount: () => {
        // 10% discount if subtotal is over $10
        const subtotal = get().getSubtotal();
        return subtotal > 10 ? 2 : 0;
      },

      getTax: () => {
        // 5% tax
        const subtotal = get().getSubtotal();
        return subtotal * 0.05;
      },

      getShippingFee: () => {
        // Free shipping if subtotal is over $50
        const subtotal = get().getSubtotal();
        return subtotal > 50 ? 0 : 0;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const tax = get().getTax();
        const shipping = get().getShippingFee();
        return subtotal - discount + tax + shipping;
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
