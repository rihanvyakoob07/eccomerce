
// src/pages/admin/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts, Product } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, X, Plus, Trash2, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProductFormValues {
  title: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  inStock: boolean;
  buyLink: string;
  reviews: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

const initialFormValues: ProductFormValues = {
  title: '',
  description: '',
  price: '',
  images: [''],
  category: '',
  inStock: true,
  buyLink: '',
  reviews: [],
};

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addProduct, updateProduct } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState<ProductFormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: '',
  });
  
  const isEditMode = !!id;
  
  // Redirect if not an admin
  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }
  
  useEffect(() => {
    if (isEditMode) {
      const product = products.find(p => p.id === id);
      
      if (product) {
        setFormValues({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          images: product.images.length ? product.images : [''],
          category: product.category,
          inStock: product.inStock,
          buyLink: product.buyLink,
          reviews: product.reviews,
        });
      } else {
        navigate('/admin/products');
        toast({
          title: 'Product Not Found',
          description: 'The product you are trying to edit does not exist.',
          variant: 'destructive',
        });
      }
    }
  }, [isEditMode, id, products, navigate]);
  
  const handleInputChange = (field: keyof ProductFormValues, value: string | boolean) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };
  
  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formValues.images];
    updatedImages[index] = value;
    setFormValues({
      ...formValues,
      images: updatedImages,
    });
  };
  
  const addImageField = () => {
    setFormValues({
      ...formValues,
      images: [...formValues.images, ''],
    });
  };
  
  const removeImageField = (index: number) => {
    if (formValues.images.length <= 1) return;
    
    const updatedImages = formValues.images.filter((_, i) => i !== index);
    setFormValues({
      ...formValues,
      images: updatedImages,
    });
  };
  
  const handleReviewInputChange = (field: keyof typeof newReview, value: string | number) => {
    setNewReview({
      ...newReview,
      [field]: value,
    });
  };
  
  const addReview = () => {
    if (!newReview.userName || !newReview.comment) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both user name and comment for the review.',
        variant: 'destructive',
      });
      return;
    }
    
    const newReviewWithId = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    
    setFormValues({
      ...formValues,
      reviews: [...formValues.reviews, newReviewWithId],
    });
    
    // Reset the form
    setNewReview({
      userName: '',
      rating: 5,
      comment: '',
    });
  };
  
  const removeReview = (reviewId: string) => {
    setFormValues({
      ...formValues,
      reviews: formValues.reviews.filter(review => review.id !== reviewId),
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formValues.title || !formValues.description || !formValues.price || !formValues.category) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate all image URLs are filled
    if (formValues.images.some(url => !url)) {
      toast({
        title: 'Invalid Images',
        description: 'Please fill in all image URLs or remove empty fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const productData = {
        title: formValues.title,
        description: formValues.description,
        price: parseFloat(formValues.price),
        images: formValues.images,
        category: formValues.category,
        inStock: formValues.inStock,
        buyLink: formValues.buyLink,
        reviews: formValues.reviews,
      };
      
      if (isEditMode && id) {
        updateProduct(id, productData);
        toast({
          title: 'Product Updated',
          description: 'Product has been successfully updated.',
        });
      } else {
        addProduct(productData);
        toast({
          title: 'Product Added',
          description: 'New product has been successfully added.',
        });
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: 'Operation Failed',
        description: 'There was an error processing your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center" 
          onClick={() => navigate('/admin/products')}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formValues.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Product Title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formValues.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed product description"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formValues.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formValues.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g. Electronics, Clothing, etc."
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={formValues.inStock}
                  onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buyLink">Buy Now Link</Label>
                <Input
                  id="buyLink"
                  value={formValues.buyLink}
                  onChange={(e) => handleInputChange('buyLink', e.target.value)}
                  placeholder="https://example.com/buy-product"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formValues.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                  />
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeImageField(index)}
                    disabled={formValues.images.length <= 1}
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addImageField}
                className="flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Image
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Reviews */}
              {formValues.reviews.length > 0 && (
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-medium">Existing Reviews</h3>
                  
                  <div className="space-y-3">
                    {formValues.reviews.map((review) => (
                      <div key={review.id} className="flex items-start justify-between p-3 border rounded-md">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <p className="font-medium">{review.userName}</p>
                            <span className="mx-2 text-gray-400">•</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeReview(review.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add New Review */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium">Add Mock Review</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reviewUserName">Customer Name</Label>
                    <Input
                      id="reviewUserName"
                      value={newReview.userName}
                      onChange={(e) => handleReviewInputChange('userName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reviewRating">Rating</Label>
                    <Select 
                      value={newReview.rating.toString()} 
                      onValueChange={(value) => handleReviewInputChange('rating', parseInt(value))}
                    >
                      <SelectTrigger id="reviewRating">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reviewComment">Review Comment</Label>
                  <Textarea
                    id="reviewComment"
                    value={newReview.comment}
                    onChange={(e) => handleReviewInputChange('comment', e.target.value)}
                    placeholder="Write a review comment"
                    rows={3}
                  />
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addReview}
                  className="flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  Add Review
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode ? 'Updating...' : 'Creating...'
                : isEditMode ? 'Update Product' : 'Create Product'
              }
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProductForm;
