"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const storageKey = "apexstride-cart";
const cartChangeEvent = "apexstride-cart-change";
const emptyCartItems = [];
let cachedSerializedCart = null;
let cachedCartItems = emptyCartItems;
const emptyCartContext = {
  items: emptyCartItems,
  hydrated: false,
  itemCount: 0,
  subtotal: 0,
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
};
const CartContext = createContext(null);

function normalizeQuantity(quantity) {
  const numericQuantity = Number(quantity);

  if (!Number.isFinite(numericQuantity) || numericQuantity < 1) {
    return 1;
  }

  return Math.min(99, Math.floor(numericQuantity));
}

function normalizeCartItem(item) {
  if (!item || typeof item !== "object" || !item.slug || !item.name) {
    return null;
  }

  const basePrice = Number(item.basePrice ?? 0);

  return {
    id: typeof item.id === "string" ? item.id : "",
    slug: String(item.slug),
    name: String(item.name),
    basePrice: Number.isFinite(basePrice) ? basePrice : 0,
    currency: item.currency ? String(item.currency) : "INR",
    quantity: normalizeQuantity(item.quantity ?? 1),
    categoryName: item.categoryName ? String(item.categoryName) : "",
    brandName: item.brandName ? String(item.brandName) : "",
  };
}

function normalizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(normalizeCartItem).filter(Boolean);
}

function getEmptyCartSnapshot() {
  return emptyCartItems;
}

function readStoredCartItems() {
  if (typeof window === "undefined") {
    return emptyCartItems;
  }

  try {
    const storedItems = window.localStorage.getItem(storageKey);
    const serializedCart = storedItems ?? "[]";

    if (serializedCart === cachedSerializedCart) {
      return cachedCartItems;
    }

    cachedSerializedCart = serializedCart;
    cachedCartItems = normalizeCartItems(JSON.parse(serializedCart));

    return cachedCartItems;
  } catch {
    cachedSerializedCart = "[]";
    cachedCartItems = emptyCartItems;

    return cachedCartItems;
  }
}

function writeStoredCartItems(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(items));
  window.dispatchEvent(new Event(cartChangeEvent));
}

function subscribeToCart(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleStorage(event) {
    if (event.type === cartChangeEvent || event.key === storageKey) {
      callback();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(cartChangeEvent, handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(cartChangeEvent, handleStorage);
  };
}

function subscribeToHydration() {
  return () => {};
}

function getHydratedSnapshot() {
  return true;
}

function getHydratedServerSnapshot() {
  return false;
}

export function CartProvider({ children }) {
  const items = useSyncExternalStore(subscribeToCart, readStoredCartItems, getEmptyCartSnapshot);
  const hydrated = useSyncExternalStore(subscribeToHydration, getHydratedSnapshot, getHydratedServerSnapshot);

  const addItem = useCallback((product, quantity = 1) => {
    const normalizedProduct = normalizeCartItem({
      ...product,
      quantity,
    });

    if (!normalizedProduct) {
      return;
    }

    const currentItems = readStoredCartItems();
    const existingItem = currentItems.find((item) => item.slug === normalizedProduct.slug);

    if (!existingItem) {
      writeStoredCartItems([...currentItems, normalizedProduct]);
      return;
    }

    writeStoredCartItems(
      currentItems.map((item) =>
        item.slug === normalizedProduct.slug
          ? {
              ...item,
              quantity: normalizeQuantity(item.quantity + normalizedProduct.quantity),
            }
          : item
      )
    );
  }, []);

  const updateQuantity = useCallback((slug, quantity) => {
    const normalizedQuantity = Number(quantity);
    const currentItems = readStoredCartItems();

    if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
      writeStoredCartItems(currentItems.filter((item) => item.slug !== slug));
      return;
    }

    writeStoredCartItems(
      currentItems.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity: normalizeQuantity(normalizedQuantity),
            }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((slug) => {
    writeStoredCartItems(readStoredCartItems().filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    writeStoredCartItems([]);
  }, []);

  const value = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.basePrice * item.quantity, 0);

    return {
      items,
      hydrated,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [addItem, clearCart, hydrated, items, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}

export function useOptionalCart() {
  return useContext(CartContext) ?? emptyCartContext;
}
