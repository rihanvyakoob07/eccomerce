
// src/pages/Profile.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { User, LogOut, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      setIsLoading(false);
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={40} className="text-gray-500" />
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1 mt-2">
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </p>
                  </div>
                  
                  <div className="w-full space-y-2 mt-4">
                    {user.role === 'admin' && (
                      <Button 
                        className="w-full justify-start" 
                        variant="ghost"
                        onClick={() => navigate('/admin/dashboard')}
                      >
                        Dashboard
                      </Button>
                    )}
                    
                    <Button 
                      className="w-full justify-start" 
                      variant="ghost"
                      onClick={() => navigate('/wishlist')}
                    >
                      <Heart size={16} className="mr-2" /> Wishlist
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      className="w-full mt-4"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account Settings</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account information here. Changes will be reflected across your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <Button type="submit" disabled={isLoading} className="mt-2">
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                      />
                    </div>
                    
                    <Button type="button" className="mt-2">
                      Change Password
                    </Button>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t px-6 py-4">
                    <p className="text-sm text-gray-500">
                      Last password change: Never
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
