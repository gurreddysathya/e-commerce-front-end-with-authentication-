
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="py-12 animate-fade-in">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-ecom-primary">Your Cart</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4">
              <ShoppingCart size={48} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-ecom-accent hover:bg-ecom-primary"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-ecom-primary">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">
                  Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})
                </h2>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-6 flex flex-col md:flex-row">
                    <div className="md:w-24 md:h-24 mb-4 md:mb-0 flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 md:ml-6">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-medium text-ecom-primary hover:text-ecom-accent transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-1 mb-4">
                        <span className="font-bold text-gray-800">
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap justify-between items-center">
                        <div className="flex items-center border rounded-md mb-2 md:mb-0">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 rounded-none"
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-none"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash size={16} className="mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t">
                <Link to="/products">
                  <Button variant="outline" size="sm" className="text-ecom-accent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{cartTotal >= 50 ? 'Free' : '$4.99'}</span>
                </div>
                
                {cartTotal < 50 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Add ${(50 - cartTotal).toFixed(2)} more to qualify for free shipping
                  </div>
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(cartTotal >= 50 ? cartTotal : cartTotal + 4.99).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-ecom-primary hover:bg-ecom-accent"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>Secure payments. Easy returns.</p>
                <p>100% Purchase Protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
