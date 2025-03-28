
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Product Type
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

// Cart Item Type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Order Type
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: Date;
}

// Context Type
interface StoreContextType {
  products: Product[];
  featuredProducts: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  getProductById: (id: number) => Product | undefined;
  placeOrder: () => string;
  getOrderById: (id: string) => Order | undefined;
}

// Create the context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "https://source.unsplash.com/random/300x300/?headphones",
    category: "electronics",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for travel, work, or enjoying your favorite music without distractions.",
    rating: 4.5
  },
  {
    id: 2,
    name: "Ultra HD Smart TV - 55\"",
    price: 699.99,
    image: "https://source.unsplash.com/random/300x300/?tv",
    category: "electronics",
    description: "Experience stunning 4K resolution on this 55-inch smart TV. Features include HDR support, built-in streaming apps, voice control, and a sleek, modern design that complements any living space.",
    rating: 4.3
  },
  {
    id: 3,
    name: "Professional Digital Camera",
    price: 1299.99,
    image: "https://source.unsplash.com/random/300x300/?camera",
    category: "electronics",
    description: "Capture breathtaking photos and videos with this professional-grade digital camera. Includes a 24.2MP sensor, 4K video recording, advanced autofocus, and a versatile lens kit for any shooting situation.",
    rating: 4.7
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 289.99,
    image: "https://source.unsplash.com/random/300x300/?chair",
    category: "furniture",
    description: "Work comfortably with this premium ergonomic office chair. Features adjustable height, lumbar support, breathable mesh back, and smooth-rolling casters for improved mobility and all-day comfort.",
    rating: 4.2
  },
  {
    id: 5,
    name: "Stainless Steel Cookware Set",
    price: 199.99,
    image: "https://source.unsplash.com/random/300x300/?cookware",
    category: "kitchen",
    description: "Complete 10-piece cookware set made from premium stainless steel. Includes pots, pans, and lids with stay-cool handles. Dishwasher safe and compatible with all stovetop types including induction.",
    rating: 4.4
  },
  {
    id: 6,
    name: "Wireless Bluetooth Speaker",
    price: 129.99,
    image: "https://source.unsplash.com/random/300x300/?speaker",
    category: "electronics",
    description: "Powerful wireless speaker with rich, room-filling sound and deep bass. Features 12-hour battery life, waterproof design, and built-in microphone for calls. Perfect for home or outdoor use.",
    rating: 4.1
  },
  {
    id: 7,
    name: "Premium Leather Jacket",
    price: 349.99,
    image: "https://source.unsplash.com/random/300x300/?leather-jacket",
    category: "clothing",
    description: "Classic leather jacket made from genuine, high-quality leather. Features a comfortable fit, stylish design, and durable construction that will last for years. Available in various sizes.",
    rating: 4.6
  },
  {
    id: 8,
    name: "Automatic Coffee Maker",
    price: 159.99,
    image: "https://source.unsplash.com/random/300x300/?coffee-maker",
    category: "kitchen",
    description: "Programmable coffee maker with 12-cup capacity and built-in grinder for the freshest coffee. Features include auto-start, adjustable brew strength, and a thermal carafe to keep coffee hot for hours.",
    rating: 4.0
  },
  {
    id: 9,
    name: "Fitness Smartwatch",
    price: 199.99,
    image: "https://source.unsplash.com/random/300x300/?smartwatch",
    category: "electronics",
    description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance. Tracks steps, calories, sleep, and various workout types. Compatible with iOS and Android devices.",
    rating: 4.4
  },
  {
    id: 10,
    name: "Designer Sunglasses",
    price: 129.99,
    image: "https://source.unsplash.com/random/300x300/?sunglasses",
    category: "accessories",
    description: "Premium polarized sunglasses with UV protection and lightweight frame. Features scratch-resistant lenses and comfortable fit. Includes a protective case and cleaning cloth.",
    rating: 4.2
  },
  {
    id: 11,
    name: "Ceramic Dinner Set",
    price: 89.99,
    image: "https://source.unsplash.com/random/300x300/?dinnerware",
    category: "kitchen",
    description: "Elegant 16-piece ceramic dinner set for four people. Includes dinner plates, salad plates, bowls, and mugs. Microwave and dishwasher safe with a modern design that complements any table setting.",
    rating: 4.3
  },
  {
    id: 12,
    name: "Portable External SSD - 1TB",
    price: 159.99,
    image: "https://source.unsplash.com/random/300x300/?hard-drive",
    category: "electronics",
    description: "Ultra-fast external SSD with 1TB storage capacity. Features compact design, shock resistance, and transfer speeds up to 1000MB/s. Compatible with PC, Mac, and gaming consoles.",
    rating: 4.5
  }
];

// Sample featured products (a subset of all products)
const sampleFeaturedProducts = sampleProducts.filter(p => [1, 3, 7, 9].includes(p.id));

// Provider Component
export const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [featuredProducts] = useState<Product[]>(sampleFeaturedProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const { toast } = useToast();

  // Calculate cart total whenever cart changes
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cart]);

  // Get product by ID
  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  // Add to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if product already in cart
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) added to your cart`,
    });
  };

  // Remove from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Place order
  const placeOrder = (): string => {
    if (cart.length === 0) return "";
    
    const orderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      date: new Date()
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    
    toast({
      title: "Order placed successfully",
      description: `Your order #${orderId} has been placed`,
    });
    
    return orderId;
  };

  // Get order by ID
  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        featuredProducts,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        getProductById,
        placeOrder,
        getOrderById
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
