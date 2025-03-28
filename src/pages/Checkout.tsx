
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard, 
  Landmark, 
  ArrowLeft,
  Shield,
  CheckCircle2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Checkout = () => {
  const { cart, cartTotal, placeOrder } = useStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    sameAsBilling: true
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    const requiredFields = [
      "firstName", "lastName", "email", "phone", 
      "address", "city", "state", "zipCode"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    // Zip code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code";
    }
    
    // Payment method validation
    if (paymentMethod === "card") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\D/g, ''))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      
      if (!formData.cardName) {
        newErrors.cardName = "Name on card is required";
      }
      
      if (!formData.expiry) {
        newErrors.expiry = "Expiration date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = "Please use MM/YY format";
      }
      
      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const orderId = placeOrder();
      setIsSubmitting(false);
      
      if (orderId) {
        navigate(`/order-confirmation/${orderId}`);
      }
    }, 1500);
  };
  
  return (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-600 hover:text-ecom-accent"
          onClick={() => navigate('/cart')}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Cart
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-ecom-primary">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>
                    Please enter your shipping details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={errors.state ? "border-red-500" : ""}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={errors.zipCode ? "border-red-500" : ""}
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sameAsBilling" 
                        checked={formData.sameAsBilling}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, sameAsBilling: checked as boolean})
                        }
                      />
                      <label
                        htmlFor="sameAsBilling"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Billing address same as shipping
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Information */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Select your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as "card" | "bank")}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="card" className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Credit Card
                      </TabsTrigger>
                      <TabsTrigger value="bank" className="flex items-center">
                        <Landmark className="w-4 h-4 mr-2" />
                        Bank Transfer
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={errors.cardNumber ? "border-red-500" : ""}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className={errors.cardName ? "border-red-500" : ""}
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input
                              id="expiry"
                              name="expiry"
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              className={errors.expiry ? "border-red-500" : ""}
                            />
                            {errors.expiry && (
                              <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className={errors.cvv ? "border-red-500" : ""}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mt-4">
                          <Shield size={16} className="mr-2 text-green-500" />
                          <span>Your payment information is secure and encrypted</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bank">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-md">
                          <p className="text-sm text-blue-800">
                            Please use the following details to make a bank transfer. Your order will be processed once payment is confirmed.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Bank:</span>
                            <span>SleekShopper Bank</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Account Number:</span>
                            <span>123456789</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Routing Number:</span>
                            <span>987654321</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Reference:</span>
                            <span className="font-mono">ORD-{Date.now().toString().slice(-6)}</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Button 
                type="submit"
                className="w-full bg-ecom-primary hover:bg-ecom-accent"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{cartTotal >= 50 ? 'Free' : '$4.99'}</span>
                  </div>
                  
                  {cartTotal < 50 && (
                    <div className="text-xs text-gray-500">
                      Add ${(50 - cartTotal).toFixed(2)} more to qualify for free shipping
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>${(cartTotal * 0.07).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        ${(
                          cartTotal + 
                          (cartTotal >= 50 ? 0 : 4.99) + 
                          (cartTotal * 0.07)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-600">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-600">30-day easy returns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-600">Secure checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
