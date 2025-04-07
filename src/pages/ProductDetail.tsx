
// src/pages/ProductDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { Heart, Tag, Star, Calendar, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToWishlist, removeFromWishlist, isInWishlist, incrementProductClicks } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeImage, setActiveImage] = useState(0);
  
  // Find the product by id
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg mb-4">Product not found</p>
            <Button variant="outline" onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleWishlistToggle = () => {
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
  
  const handleBuyNow = () => {
    incrementProductClicks(product.id);
    window.open(product.buyLink, '_blank');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center" 
          onClick={() => navigate('/products')}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-96 object-cover transition-all duration-300"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 transition-all
                    ${activeImage === index ? 'border-brand-blue' : 'border-transparent'}`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <button
                onClick={handleWishlistToggle}
                className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} size={24} />
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <Tag size={18} className="text-gray-500 mr-2" />
              <span className="text-gray-600">{product.category}</span>
            </div>
            
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <p className={`text-lg font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
            
            <Button 
              className="w-full mb-3" 
              size="lg"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              size="lg"
              onClick={handleWishlistToggle}
            >
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
        
        {/* Reviews and Additional Info */}
        <div className="mt-10">
          <Tabs defaultValue="reviews">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="py-4">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              
              {product.reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{review.userName}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar size={14} className="mr-1" />
                            {review.date}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-2">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="details" className="py-4">
              <h3 className="text-xl font-bold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-2">ID: {product.id}</p>
                  <p className="text-gray-600 mb-2">Category: {product.category}</p>
                  <p className="text-gray-600 mb-2">Added On: {new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Price: ${product.price.toFixed(2)}</p>
                  <p className="text-gray-600 mb-2">Availability: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                  <p className="text-gray-600 mb-2">Click Count: {product.clicks}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
