import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/data/products';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantWeight: string) => void;
  updateQuantity: (productId: string, variantWeight: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('goldenHarvestCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const savedWishlist = localStorage.getItem('goldenHarvestWishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('goldenHarvestCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('goldenHarvestWishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id && item.variant.weight === variant.weight
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && item.variant.weight === variant.weight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { product, variant, quantity }];
    });
  };

  const removeFromCart = (productId: string, variantWeight: string) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item => !(item.product.id === productId && item.variant.weight === variantWeight)
      )
    );
  };

  const updateQuantity = (productId: string, variantWeight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantWeight);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.variant.weight === variantWeight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.variant.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const addToWishlist = (productId: string) => {
    setWishlistItems(prevItems => {
      if (!prevItems.find(item => item.productId === productId)) {
        return [...prevItems, { productId }];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems =>
      prevItems.filter(item => item.productId !== productId)
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
