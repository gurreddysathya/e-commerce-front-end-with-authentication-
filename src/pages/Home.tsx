
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingBag, TrendingUp, Award, Truck } from "lucide-react";

const Home = () => {
  const { featuredProducts, products, addToCart } = useStore();
  
  // Categories derived from products
  const categories = [...new Set(products.map(product => product.category))];
  
  return (
    <div className="animate-fade-in">
      {/* Categories Section - Moved to top */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-ecom-primary mb-6 text-center">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category}
                to={`/products?category=${category}`}
                className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="text-ecom-accent capitalize font-medium">
                  {category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ecom-primary to-ecom-accent text-white py-12 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Shop the Latest Trends
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Discover quality products at competitive prices with free shipping on orders over $50.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-ecom-primary hover:bg-gray-100">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/products?sale=true">View Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-ecom-primary/10 p-3 rounded-full mb-4">
                <Truck className="w-6 h-6 text-ecom-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-ecom-primary/10 p-3 rounded-full mb-4">
                <ShoppingBag className="w-6 h-6 text-ecom-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-ecom-primary/10 p-3 rounded-full mb-4">
                <Award className="w-6 h-6 text-ecom-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600">Verified by our team</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-ecom-primary/10 p-3 rounded-full mb-4">
                <TrendingUp className="w-6 h-6 text-ecom-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Deals</h3>
              <p className="text-gray-600">Competitive pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-ecom-primary">
              Featured Products
            </h2>
            <Link 
              to="/products" 
              className="text-ecom-accent hover:text-ecom-primary transition-colors font-medium"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <Link to={`/product/${product.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image || `https://source.unsplash.com/random/600x400/?${encodeURIComponent(product.category)}&id=${product.id}`} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                          className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{product.rating}</span>
                  </div>
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-medium mb-1 text-ecom-primary hover:text-ecom-accent transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-bold text-gray-800 mb-3">${product.price.toFixed(2)}</p>
                  <div className="mt-auto">
                    <Button 
                      onClick={() => addToCart(product)}
                      size="sm"
                      className="w-full bg-ecom-accent hover:bg-ecom-primary transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-ecom-accent text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Browse our extensive catalog and find exactly what you need at the best prices.
          </p>
          <Button asChild size="lg" className="bg-white text-ecom-accent hover:bg-gray-100 animate-bounce">
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
