
/**
 * Utility function to get a reliable product image based on category
 */
export const getProductImage = (category: string) => {
  // Map of categories to reliable image URLs from Unsplash
  const imageMap: Record<string, string> = {
    "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format",
    "clothing": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=600&auto=format",
    "books": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format",
    "toys": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=600&auto=format",
    "furniture": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format",
    "jewelry": "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format",
    "sports": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format",
    "beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format",
    "home": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format",
    "food": "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=600&auto=format"
  };
  
  // Default image if category is not found
  return imageMap[category.toLowerCase()] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format";
};

/**
 * Get a hero/banner image by index
 */
export const getHeroImage = (index: number) => {
  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format",
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1600&auto=format"
  ];
  
  return heroImages[index % heroImages.length];
};
