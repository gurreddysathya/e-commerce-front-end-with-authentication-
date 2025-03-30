
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star, Search, FilterX, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Product } from "@/contexts/StoreContext";

const Products = () => {
  const { products, addToCart } = useStore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(queryParams.get("category") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Search term filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Rating filter
    if (minRating > 0) {
      result = result.filter(product => product.rating >= minRating);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, priceRange, minRating]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange([0, 1500]);
    setMinRating(0);
  };

  // Function to generate reliable product images
  const getProductImage = (category: string, productId: number) => {
    return `https://placehold.co/600x400/eee/333?text=${encodeURIComponent(category)}+${productId}`;
  };
  
  return (
    <div className="py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-ecom-primary">Products</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-gray-500 hover:text-ecom-accent"
                >
                  <FilterX size={16} className="mr-1" />
                  Reset
                </Button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-8"
                  />
                  <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </form>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => 
                          setSelectedCategory(selectedCategory === category ? "" : category)
                        }
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm capitalize"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 1500]}
                  max={1500}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-4"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Rating */}
              <div>
                <h3 className="text-sm font-medium mb-2">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox 
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={() => 
                          setMinRating(minRating === rating ? 0 : rating)
                        }
                      />
                      <label 
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm flex items-center"
                      >
                        {rating}+ 
                        <div className="flex ml-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < rating ? "currentColor" : "none"} 
                              className={i < rating ? "text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button className="w-full bg-white text-ecom-primary border border-gray-200 hover:bg-gray-50">
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filter Products
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter products by category, price, and rating
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-8"
                      />
                      <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </form>
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox 
                            id={`mobile-category-${category}`}
                            checked={selectedCategory === category}
                            onCheckedChange={() => {
                              setSelectedCategory(selectedCategory === category ? "" : category);
                            }}
                          />
                          <label 
                            htmlFor={`mobile-category-${category}`}
                            className="ml-2 text-sm capitalize"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Price Range</h3>
                    <Slider
                      defaultValue={[0, 1500]}
                      max={1500}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mt-4"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox 
                            id={`mobile-rating-${rating}`}
                            checked={minRating === rating}
                            onCheckedChange={() => 
                              setMinRating(minRating === rating ? 0 : rating)
                            }
                          />
                          <label 
                            htmlFor={`mobile-rating-${rating}`}
                            className="ml-2 text-sm flex items-center"
                          >
                            {rating}+ 
                            <div className="flex ml-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={12} 
                                  fill={i < rating ? "currentColor" : "none"} 
                                  className={i < rating ? "text-yellow-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      onClick={() => {
                        resetFilters();
                        setIsFilterOpen(false);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Reset
                    </Button>
                    <Button 
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 bg-ecom-accent hover:bg-ecom-primary"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                    <Link to={`/product/${product.id}`}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={getProductImage(product.category, product.id)} 
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
