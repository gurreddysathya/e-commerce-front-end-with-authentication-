
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, ShoppingBag, CreditCard, Heart, Settings, Mail, Phone } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Account = () => {
  const { user, userProfile, signOut, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userProfile?.first_name || "",
    last_name: userProfile?.last_name || "",
    avatar_url: userProfile?.avatar_url || "",
  });

  // If not logged in, redirect to login page
  if (!loading && !user) {
    return <Navigate to="/auth" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      first_name: userProfile?.first_name || "",
      last_name: userProfile?.last_name || "",
      avatar_url: userProfile?.avatar_url || "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="py-8 animate-fade-in">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-ecom-primary">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-ecom-primary">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center">
                  <Avatar className="w-20 h-20 mb-3">
                    {userProfile?.avatar_url ? (
                      <AvatarImage src={userProfile.avatar_url} alt={`${userProfile.first_name || ''} ${userProfile.last_name || ''}`} />
                    ) : (
                      <AvatarFallback className="bg-ecom-primary/10 text-ecom-primary text-xl">
                        {userProfile?.first_name?.[0] || user?.email?.[0] || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <CardTitle>
                    {userProfile?.first_name && userProfile?.last_name 
                      ? `${userProfile.first_name} ${userProfile.last_name}`
                      : "Profile"}
                  </CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start mt-4"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Edit your account details below" 
                    : "Manage your account details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex items-center mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                          <Mail className="mr-2 h-4 w-4 text-gray-400" />
                          {user?.email}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="avatar_url">Avatar URL</Label>
                        <Input
                          id="avatar_url"
                          name="avatar_url"
                          value={formData.avatar_url}
                          onChange={handleChange}
                          placeholder="https://example.com/avatar.jpg"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-ecom-accent hover:bg-ecom-primary"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700">First Name</label>
                        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                          {userProfile?.first_name || "Not provided"}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                          {userProfile?.last_name || "Not provided"}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-gray-400" />
                          {user?.email}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Account ID</label>
                        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-500 truncate">
                          {user?.id}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        className="bg-ecom-accent hover:bg-ecom-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                    <p>No recent orders</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                    <p>No saved addresses</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
