// src/pages/Wishlist.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { Trash2, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Wishlist: React.FC = () => {
  const { products, wishlist, removeFromWishlist, incrementProductClicks } = useProducts();
  const navigate = useNavigate();
  
  // Get products that are in the wishlist
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));
  
  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };
  
  const handleBuyNow = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      incrementProductClicks(productId);
      window.open(product.buyLink, '_blank');
    }
  };
  
  const handleClearWishlist = () => {
    if (wishlistProducts.length === 0) return;
    
    wishlistProducts.forEach(product => {
      removeFromWishlist(product.id);
    });
    
    toast({
      title: 'Wishlist Cleared',
      description: 'All items have been removed from your wishlist.',
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          
          {wishlistProducts.length > 0 && (
            <Button variant="outline" onClick={handleClearWishlist}>
              Clear All
            </Button>
          )}
        </div>
        
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-500 mb-4">Your wishlist is empty</p>
            <Button onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden card-shadow">
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
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
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
                    onClick={() => handleBuyNow(product.id)}
                    disabled={!product.inStock}
                  >
                    <ExternalLink size={16} className="mr-2" /> Buy Now
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

export default Wishlist;
