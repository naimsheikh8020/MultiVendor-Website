// Product interface for unified product structure
export interface UnifiedProduct {
  id: number;
  image: string;
  image2?: string;
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  author: string; // Store/Seller name
  price: number;
  oldPrice: number;
  discount: number;
  description?: string;
  specifications?: {
    brand: string;
    type: string;
    material: string;
    color: string;
    pieces: string;
  };
  includedItems?: string[];
  features?: string[];
}

// Normalize different product formats to unified structure
export const normalizeProduct = (product: any): UnifiedProduct => {
  // If already in unified format (popularProducts)
  if (product.reviewCount && product.author) {
    return {
      id: product.id,
      image: product.image,
      image2: product.image2,
      title: product.title,
      category: product.category,
      rating: product.rating,
      reviewCount: product.reviewCount,
      author: product.author,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      description: product.Description || product.description,
      specifications: product.specifications,
      includedItems: product.includedItems,
      features: product.features
    };
  }

  // If from bestProducts format
  if (product.reviews && product.seller) {
    return {
      id: product.id,
      image: product.image,
      image2: product.image, // Use same image as fallback
      title: product.title,
      category: product.category,
      rating: product.rating,
      reviewCount: product.reviews,
      author: product.seller,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: typeof product.discount === 'string' 
        ? (parseInt(product.discount) || 0) 
        : (product.discount || 0),
      description: `High-quality ${product.title} from ${product.seller}. This product offers excellent value and quality that meets your needs.`,
      specifications: {
        brand: product.seller,
        type: product.category,
        material: "Premium Quality",
        color: "As shown in image",
        pieces: "1"
      },
      includedItems: [
        `1 x ${product.title}`,
        "User manual",
        "Warranty card"
      ],
      features: [
        "High-quality construction and materials",
        "Excellent performance and durability",
        "Designed for optimal user experience",
        "Backed by manufacturer warranty"
      ]
    };
  }

  // Return as-is if unknown format
  return product;
};

// Get product by ID from all sources
// TODO: Replace this with API call
export const getProductById = async (id: number): Promise<UnifiedProduct | null> => {
  // Import product arrays
  const { popularProducts, bestProducts } = await import('../assets/assets');
  
  // Combine all product sources
  const allProducts = [
    ...popularProducts,
    ...bestProducts,
    // Add more product sources here as needed
  ];

  // Find product by ID
  const product = allProducts.find(p => p.id === id);
  
  if (!product) return null;

  // Normalize to unified format
  return normalizeProduct(product);
};

// TODO: Replace with actual API call
// export const getProductById = async (id: number): Promise<UnifiedProduct | null> => {
//   try {
//     const response = await fetch(`/api/products/${id}`);
//     if (!response.ok) return null;
//     const data = await response.json();
//     return normalizeProduct(data);
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null;
//   }
// };

// Mock reviews - TODO: Replace with API call
export const getProductReviews = (_productId: number) => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/products/${_productId}/reviews`);
  // return response.json();
  
  return [
    {
      id: 1,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    },
    {
      id: 2,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    },
    {
      id: 3,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    },
    {
      id: 4,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    }
  ];
};
