
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, ShoppingBag, CreditCard, Heart, Settings } from "lucide-react";

const Account = () => {
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
                  <div className="w-20 h-20 bg-ecom-primary/10 rounded-full flex items-center justify-center mb-3">
                    <User size={36} className="text-ecom-primary" />
                  </div>
                  <CardTitle>Guest User</CardTitle>
                  <CardDescription>guest@example.com</CardDescription>
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
                  Manage your account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                        Guest
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                        User
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                        guest@example.com
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                        (555) 123-4567
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Default Address</label>
                    <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
                      123 Shop Street, Market City, ST 12345
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="bg-ecom-accent hover:bg-ecom-primary">
                      Edit Profile
                    </Button>
                  </div>
                </div>
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
