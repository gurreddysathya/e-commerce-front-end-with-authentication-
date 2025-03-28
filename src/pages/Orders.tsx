
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Package, 
  ShoppingBag,
  CheckCircle, 
  Truck, 
  Home,
  ArrowRight
} from "lucide-react";
import { Order } from "@/contexts/StoreContext";

const Orders = () => {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      const filtered = orders.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };
  
  const getStatusStep = (status: string): number => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  if (orders.length === 0) {
    return (
      <div className="py-12 animate-fade-in">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-ecom-primary">My Orders</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4">
              <ShoppingBag size={48} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <Button 
              asChild
              className="bg-ecom-accent hover:bg-ecom-primary"
            >
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-ecom-primary">My Orders</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit" className="bg-ecom-accent hover:bg-ecom-primary">
              Search
            </Button>
          </form>
        </div>
        
        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4">
              <Package size={48} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6">
              {searchTerm ? `No orders matching "${searchTerm}"` : "You haven't placed any orders yet"}
            </p>
            {searchTerm && (
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setFilteredOrders(orders);
                }}
                variant="outline"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center">
                        <Package size={18} className="text-ecom-primary mr-2" />
                        <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                      <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Order Status Progress */}
                <div className="px-6 py-4 border-b">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 ${getStatusStep(order.status) >= 0 ? 'bg-ecom-primary text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center z-10`}>
                        <CheckCircle size={16} />
                      </div>
                      <div className={`w-8 h-8 ${getStatusStep(order.status) >= 1 ? 'bg-ecom-primary text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center z-10`}>
                        <Package size={16} />
                      </div>
                      <div className={`w-8 h-8 ${getStatusStep(order.status) >= 2 ? 'bg-ecom-primary text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center z-10`}>
                        <Truck size={16} />
                      </div>
                      <div className={`w-8 h-8 ${getStatusStep(order.status) >= 3 ? 'bg-ecom-primary text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center z-10`}>
                        <Home size={16} />
                      </div>
                    </div>
                    
                    {/* Progress line */}
                    <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                    <div 
                      className="absolute top-4 left-0 h-1 bg-ecom-primary -z-10" 
                      style={{ 
                        width: `${getStatusStep(order.status) * 33.33}%`
                      }}
                    ></div>
                    
                    <div className="flex justify-between text-xs mt-2">
                      <div className="text-center w-16">
                        <p className={`font-medium ${getStatusStep(order.status) >= 0 ? 'text-ecom-primary' : 'text-gray-500'}`}>
                          Order Placed
                        </p>
                      </div>
                      <div className="text-center w-16">
                        <p className={`font-medium ${getStatusStep(order.status) >= 1 ? 'text-ecom-primary' : 'text-gray-500'}`}>
                          Processing
                        </p>
                      </div>
                      <div className="text-center w-16">
                        <p className={`font-medium ${getStatusStep(order.status) >= 2 ? 'text-ecom-primary' : 'text-gray-500'}`}>
                          Shipped
                        </p>
                      </div>
                      <div className="text-center w-16">
                        <p className={`font-medium ${getStatusStep(order.status) >= 3 ? 'text-ecom-primary' : 'text-gray-500'}`}>
                          Delivered
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Items Preview */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="w-16 h-16">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                    <Button 
                      asChild
                      variant="outline" 
                      size="sm"
                      className="text-ecom-accent hover:text-ecom-primary"
                    >
                      <Link to={`/order-confirmation/${order.id}`}>
                        View Details
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
