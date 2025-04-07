
// src/pages/Index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { ShoppingBag, UserCheck, LineChart, ShieldCheck } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-r from-brand-blue to-brand-darkBlue">
        <div className="absolute inset-0 z-0 opacity-10 bg-grid-white/[0.2]"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              MERN MarketHub Platform
            </h1>
            <p className="text-xl text-white/80 mb-8 animate-slide-in">
              A comprehensive marketplace solution with user and admin functionalities, built with the MERN stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="hover-scale">
                  Browse Products
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover-scale">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-gray-600">
              Explore the powerful features that make our marketplace stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-brand-blue" />
                  </div>
                </div>
                <CardTitle className="text-center mb-2">Product Management</CardTitle>
                <p className="text-center text-gray-600">
                  Easily manage products with multiple images, descriptions, and customer reviews.
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Link to="/products">
                  <Button variant="ghost">View Products</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="card-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <UserCheck className="h-7 w-7 text-brand-orange" />
                  </div>
                </div>
                <CardTitle className="text-center mb-2">Dual Authentication</CardTitle>
                <p className="text-center text-gray-600">
                  Separate user and admin authentication with dedicated dashboards and permissions.
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="card-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <LineChart className="h-7 w-7 text-purple-500" />
                  </div>
                </div>
                <CardTitle className="text-center mb-2">Analytics Dashboard</CardTitle>
                <p className="text-center text-gray-600">
                  Comprehensive analytics to track user engagement, clicks, and product performance.
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Link to="/admin/dashboard">
                  <Button variant="ghost">View Dashboard</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="card-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                    <ShieldCheck className="h-7 w-7 text-green-500" />
                  </div>
                </div>
                <CardTitle className="text-center mb-2">User Wishlist</CardTitle>
                <p className="text-center text-gray-600">
                  Users can save favorite products to their wishlist for easy access and future purchase.
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-center">
                <Link to="/wishlist">
                  <Button variant="ghost">View Wishlist</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">Try Our Demo</h2>
              <p className="text-gray-600 mb-8 text-center">
                We've set up demo accounts for you to explore both user and admin functionality.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">User Account</h3>
                  <p className="text-gray-500 mb-1">Email: user@example.com</p>
                  <p className="text-gray-500 mb-4">Password: password</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Browse products</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Add to wishlist</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Update profile</span>
                    </li>
                  </ul>
                  <Link to="/login">
                    <Button className="w-full">Login as User</Button>
                  </Link>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Admin Account</h3>
                  <p className="text-gray-500 mb-1">Email: admin@example.com</p>
                  <p className="text-gray-500 mb-4">Password: password</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Add/edit products</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>View analytics</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Manage product listings</span>
                    </li>
                  </ul>
                  <Link to="/login">
                    <Button className="w-full">Login as Admin</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
