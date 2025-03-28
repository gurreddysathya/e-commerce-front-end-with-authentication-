
import { useParams, Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Box, Home } from "lucide-react";

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useStore();
  
  const order = getOrderById(id || "");
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-6">Sorry, we couldn't find the order you're looking for.</p>
        <Button 
          asChild
          className="bg-ecom-accent hover:bg-ecom-primary"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(order.date);
  
  return (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-ecom-primary to-ecom-accent p-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <CheckCircle size={32} />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Thank You for Your Order!</h1>
            <p className="text-white/80">
              Your order has been placed successfully and is being processed.
            </p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase">Order Number</h2>
                <p className="text-lg font-semibold">{order.id}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <h2 className="text-sm font-medium text-gray-500 uppercase">Order Date</h2>
                <p className="text-lg font-semibold">{formattedDate}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <h2 className="text-sm font-medium text-gray-500 uppercase">Total Amount</h2>
                <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
              </div>
            </div>
            
            {/* Order Status */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-ecom-primary text-white rounded-full flex items-center justify-center z-10">
                    <CheckCircle size={18} />
                  </div>
                  <div className="w-10 h-10 bg-ecom-primary text-white rounded-full flex items-center justify-center z-10">
                    <Package size={18} />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center z-10">
                    <Truck size={18} />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center z-10">
                    <Home size={18} />
                  </div>
                </div>
                
                {/* Progress line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                <div className="absolute top-5 left-0 w-1/3 h-1 bg-ecom-primary -z-10"></div>
                
                <div className="flex justify-between text-sm mt-2">
                  <div className="text-center w-20">
                    <p className="font-medium text-ecom-primary">Confirmed</p>
                  </div>
                  <div className="text-center w-20">
                    <p className="font-medium text-ecom-primary">Processing</p>
                  </div>
                  <div className="text-center w-20">
                    <p className="font-medium text-gray-500">Shipped</p>
                  </div>
                  <div className="text-center w-20">
                    <p className="font-medium text-gray-500">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded object-cover" 
                                src={item.product.image} 
                                alt={item.product.name} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          ${item.product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <th 
                        scope="row" 
                        colSpan={3} 
                        className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                      >
                        Subtotal
                      </th>
                      <td className="px-6 py-3 text-right text-sm text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <th 
                        scope="row" 
                        colSpan={3} 
                        className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                      >
                        Shipping
                      </th>
                      <td className="px-6 py-3 text-right text-sm text-gray-900">
                        {order.total >= 50 ? 'Free' : '$4.99'}
                      </td>
                    </tr>
                    <tr>
                      <th 
                        scope="row" 
                        colSpan={3} 
                        className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                      >
                        Tax (7%)
                      </th>
                      <td className="px-6 py-3 text-right text-sm text-gray-900">
                        ${(order.total * 0.07).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <th 
                        scope="row" 
                        colSpan={3} 
                        className="px-6 py-3 text-right text-sm font-bold text-gray-900"
                      >
                        Total
                      </th>
                      <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                        ${(
                          order.total + 
                          (order.total >= 50 ? 0 : 4.99) + 
                          (order.total * 0.07)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <Button 
                asChild
                className="bg-ecom-accent hover:bg-ecom-primary flex-1"
              >
                <Link to="/orders">Track Orders</Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="flex-1"
              >
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
