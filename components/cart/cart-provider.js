"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const storageKey = "apexstride-cart";
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

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedItems = window.localStorage.getItem(storageKey);
      return normalizeCartItems(storedItems ? JSON.parse(storedItems) : []);
    } catch {
      return [];
    }
  });
  const hydrated = true;

  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== storageKey) {
        return;
      }

      try {
        setItems(normalizeCartItems(event.newValue ? JSON.parse(event.newValue) : []));
      } catch {
        setItems([]);
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((product, quantity = 1) => {
    const normalizedProduct = normalizeCartItem({
      ...product,
      quantity,
    });

    if (!normalizedProduct) {
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === normalizedProduct.slug);

      if (!existingItem) {
        return [...currentItems, normalizedProduct];
      }

      return currentItems.map((item) =>
        item.slug === normalizedProduct.slug
          ? {
              ...item,
              quantity: normalizeQuantity(item.quantity + normalizedProduct.quantity),
            }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((slug, quantity) => {
    const normalizedQuantity = Number(quantity);

    setItems((currentItems) => {
      if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
        return currentItems.filter((item) => item.slug !== slug);
      }

      return currentItems.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity: normalizeQuantity(normalizedQuantity),
            }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
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
