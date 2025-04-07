
// src/pages/Products.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Heart, Search, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Products: React.FC = () => {
  const { products, loading, addToWishlist, removeFromWishlist, isInWishlist, incrementProductClicks } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by search term
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (category && category !== 'All') {
      result = result.filter(product => product.category === category);
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, category]);
  
  const handleWishlistToggle = (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to add items to your wishlist.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };
  
  const handleBuyNow = (product: Product) => {
    incrementProductClicks(product.id);
    window.open(product.buyLink, '_blank');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg mb-4">No products found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setCategory('');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden card-shadow hover-scale">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden h-48">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                      aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Tag size={16} className="text-gray-500 mr-2" />
                    <CardDescription>{product.category}</CardDescription>
                  </div>
                  
                  <p className="text-gray-700 line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleBuyNow(product)}
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
