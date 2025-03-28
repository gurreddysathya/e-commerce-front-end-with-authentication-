
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowLeft, 
  Truck, 
  Shield,
  Repeat 
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, addToCart, products } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const product = getProductById(Number(id));
  
  useEffect(() => {
    if (product) {
      // Get related products based on category
      const related = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, products]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button 
          onClick={() => navigate('/products')}
          className="bg-ecom-accent hover:bg-ecom-primary"
        >
          Browse Products
        </Button>
      </div>
    );
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-600 hover:text-ecom-accent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain aspect-square"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-ecom-primary mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-500">({product.rating})</span>
            </div>
            
            <div className="text-2xl font-bold text-gray-800 mb-4">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 mr-2">Category:</span>
                <span className="text-sm capitalize">{product.category}</span>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium text-gray-600 mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={increaseQuantity}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              size="lg"
              className="w-full md:w-auto bg-ecom-accent hover:bg-ecom-primary mb-4"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            
            {/* Product Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Truck size={24} className="text-ecom-primary mb-2" />
                <span className="text-sm font-medium">Free Shipping</span>
                <span className="text-xs text-gray-500">On orders over $50</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Shield size={24} className="text-ecom-primary mb-2" />
                <span className="text-sm font-medium">Warranty</span>
                <span className="text-xs text-gray-500">12 months coverage</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Repeat size={24} className="text-ecom-primary mb-2" />
                <span className="text-sm font-medium">Easy Returns</span>
                <span className="text-xs text-gray-500">30-day policy</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-ecom-primary mb-6">
              Related Products
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div 
                    className="h-48 overflow-hidden cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${relatedProduct.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(relatedProduct.rating) ? "currentColor" : "none"} 
                            className={i < Math.floor(relatedProduct.rating) ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{relatedProduct.rating}</span>
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${relatedProduct.id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <h3 className="font-medium mb-1 text-ecom-primary hover:text-ecom-accent transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </div>
                    <p className="font-bold text-gray-800 mb-3">${relatedProduct.price.toFixed(2)}</p>
                    <Button 
                      onClick={() => addToCart(relatedProduct)}
                      size="sm"
                      className="w-full bg-ecom-accent hover:bg-ecom-primary transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
