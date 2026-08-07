import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
}

interface CartStore {
  items: CartProduct[];
  coupon: { code: string; discount: number } | null;
  addItem: (item: Omit<CartProduct, "quantity">) => void;
  removeItem: (id: string, variantId?: string) => void;
  updateQuantity: (id: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: { code: string; discount: number }) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (item) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.id === item.id && i.variantId === item.variantId
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.variantId === variantId)
          ),
        });
      },

      updateQuantity: (id, quantity, variantId) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i.id === id && i.variantId === variantId
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().coupon?.discount ?? 0;
        return Math.max(0, subtotal - discount);
      },

      getItemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: "nevexa-cart" }
  )
);

interface FavoritesStore {
  items: string[];
  toggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const items = get().items;
        if (items.includes(productId)) {
          set({ items: items.filter((i) => i !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },
      isFavorite: (productId) => get().items.includes(productId),
    }),
    { name: "nevexa-favorites" }
  )
);

interface SearchStore {
  query: string;
  filters: {
    category: string | null;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string | null;
    discount: boolean;
  };
  setQuery: (query: string) => void;
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  filters: {
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
    sortBy: null,
    discount: false,
  },
  setQuery: (query) => set({ query }),
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  resetFilters: () =>
    set({
      filters: {
        category: null,
        brand: null,
        minPrice: null,
        maxPrice: null,
        sortBy: null,
        discount: false,
      },
    }),
}));
