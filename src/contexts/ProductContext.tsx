// src/contexts/ProductContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  createdAt: string;
  reviews: Review[];
  buyLink: string;
  clicks: number;
};

type ProductContextType = {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'clicks'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  incrementProductClicks: (id: string) => void;
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Sample initial products
const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Professional Laptop',
    description: 'High-performance laptop for professionals with the latest technology.',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1433&auto=format&fit=crop'
    ],
    category: 'Electronics',
    inStock: true,
    createdAt: new Date().toISOString(),
    reviews: [
      {
        id: 'r1',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'Amazing laptop! Fast and reliable.',
        date: '2023-12-10'
      },
      {
        id: 'r2',
        userName: 'John Doe',
        rating: 4,
        comment: 'Great value for money. Battery life could be better.',
        date: '2023-11-28'
      }
    ],
    buyLink: 'https://example.com/buy/laptop',
    clicks: 42
  },
  {
    id: '2',
    title: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones with crystal clear sound.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1470&auto=format&fit=crop'
    ],
    category: 'Audio',
    inStock: true,
    createdAt: new Date().toISOString(),
    reviews: [
      {
        id: 'r3',
        userName: 'Michael Brown',
        rating: 5,
        comment: 'Best headphones I\'ve ever owned. Worth every penny!',
        date: '2023-12-15'
      }
    ],
    buyLink: 'https://example.com/buy/headphones',
    clicks: 28
  },
  {
    id: '3',
    title: 'Smartphone X',
    description: 'Next-generation smartphone with advanced camera technology.',
    price: 999.99,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1374&auto=format&fit=crop'
    ],
    category: 'Electronics',
    inStock: false,
    createdAt: new Date().toISOString(),
    reviews: [
      {
        id: 'r4',
        userName: 'Emily Johnson',
        rating: 4,
        comment: 'Great phone but a bit pricey.',
        date: '2023-11-05'
      },
      {
        id: 'r5',
        userName: 'Alex Williams',
        rating: 5,
        comment: 'The camera is outstanding! Battery lasts all day.',
        date: '2023-10-22'
      }
    ],
    buyLink: 'https://example.com/buy/smartphone',
    clicks: 65
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, fetch from API
    // Simulating API call
    const loadProducts = () => {
      setTimeout(() => {
        setProducts(initialProducts);
        setLoading(false);
      }, 1000);
    };

    loadProducts();

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'clicks'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString(),
      clicks: 0
    };

    setProducts([...products, newProduct]);
    toast({
      title: 'Product Added',
      description: `${product.title} has been added successfully.`
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(
      products.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    );
    toast({
      title: 'Product Updated',
      description: `The product has been updated successfully.`
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: 'Product Deleted',
      description: `The product has been deleted.`
    });
  };

  const incrementProductClicks = (id: string) => {
    setProducts(
      products.map(product => 
        product.id === id 
          ? { ...product, clicks: product.clicks + 1 } 
          : product
      )
    );
  };

  const addToWishlist = (productId: string) => {
    if (!wishlist.includes(productId)) {
      setWishlist([...wishlist, productId]);
      toast({
        title: 'Added to Wishlist',
        description: 'Product has been added to your wishlist.'
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(id => id !== productId));
    toast({
      title: 'Removed from Wishlist',
      description: 'Product has been removed from your wishlist.'
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        incrementProductClicks,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
