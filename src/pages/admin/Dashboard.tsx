
// src/pages/admin/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { BarChart, LineChart, PieChart } from 'recharts';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { Users, ShoppingBag, TrendingUp, Eye, PlusCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { products } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not an admin
  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }
  
  // Sample analytics data
  const productsByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const categoryData = Object.keys(productsByCategory).map(category => ({
    name: category,
    count: productsByCategory[category],
  }));
  
  const clickData = products.map(product => ({
    name: product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title,
    clicks: product.clicks,
  }));
  
  // Sort products by clicks for the top products chart
  const topProducts = [...products]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)
    .map(product => ({
      name: product.title.length > 15 ? product.title.substring(0, 15) + '...' : product.title,
      clicks: product.clicks,
    }));
  
  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Mock user data
  const userData = [
    { name: 'Jan', users: 50 },
    { name: 'Feb', users: 60 },
    { name: 'Mar', users: 75 },
    { name: 'Apr', users: 90 },
    { name: 'May', users: 100 },
    { name: 'Jun', users: 120 },
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          
          <Button onClick={() => navigate('/admin/products/new')}>
            <PlusCircle size={16} className="mr-2" />
            Add New Product
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <CardDescription>Total Products</CardDescription>
                <CardTitle className="text-3xl">{products.length}</CardTitle>
              </div>
              <ShoppingBag className="h-10 w-10 text-brand-blue opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">231</CardTitle>
              </div>
              <Users className="h-10 w-10 text-brand-orange opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <CardDescription>Total Sales</CardDescription>
                <CardTitle className="text-3xl">$12,456</CardTitle>
              </div>
              <TrendingUp className="h-10 w-10 text-green-600 opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <CardDescription>Total Visits</CardDescription>
                <CardTitle className="text-3xl">9,342</CardTitle>
              </div>
              <Eye className="h-10 w-10 text-purple-600 opacity-80" />
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics Overview</CardTitle>
                <CardDescription>
                  Monthly user growth and engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={userData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#2563eb"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Products by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Products by Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topProducts}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip />
                        <Bar dataKey="clicks" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Monthly new user registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => navigate('/admin/products')}>
              Manage Products
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/products/new')}>
              Add New Product
            </Button>
            <Button variant="secondary" onClick={() => navigate('/products')}>
              View Store Front
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
