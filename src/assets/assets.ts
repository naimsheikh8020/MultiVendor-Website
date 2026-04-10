import Category from "./Category.svg";
import logo from "./logo.svg"
import Popular_Product1 from "./Popular_Product-1.svg"
import Popular_Product2 from "./Popular_Product-2.svg"
import Popular_Product3 from "./Popular_Product-3.svg"
import Popular_Product4 from "./Popular_Product-4.svg"
import Popular_Product5 from "./Popular_Product-5.svg"
import Popular_Product6 from "./Popular_Product-6.svg"
import Popular_Product7 from "./Popular_Product-7.svg"
import Popular_Product8 from "./Popular_Product-8.svg"
import Hero_headPhone from "./Hero_headPhone.svg"
import Hero_laptop from "./Hero_laptop.svg"
import Hero_phone from "./hero_phone.png"
import hero_vegetable from "./Hero_vegetable-removebg-preview.png"
import AddToCart from "./AddToCart.svg"
import type { TopCategory } from "../types/topcatagory";
import BlackJacket from "./BlackJacket.png"
import Cloth from "./Cloth.png"
import Watch from "./Watch.png"
import Coffee from "./Coffee.png"
import Laptop from "./Laptop.png"
import MobilePhone from "./MobilePhone.png"
import redBag from "./redBag.png"
import HeadPhone from "./HeadPhone.svg"
import Best_Price from "./Best_Price.svg"
import Refund from "./Refund.svg"
import Shipping from "./Shipping.svg"
import HeadPhoneImg2 from "./HeadPhone-img2.png"
import automotive from "./automotive.jpg"
import books from "./books.jpg"
import electronics from "./electronics.jpg"
import groceries from "./groceries.jpg"
import health from "./health-beauty.jpg"
import homeKitchen from "./home-kitchen.jpg"
import homeLiving from "./home-living.jpg"
import jewelry from "./jewelry.jpg"
import lifeStyel from "./lifestyle-hobbies.jpg"
import medicine from "./medicine.jpg"
import motherBaby from "./mother-baby.jpg"
import officeSupplies from "./office-supplies.jpg"
import PetToy from "./PetToy.jpg"
import sportsOutdoors from "./sports-outdoors.jpg"
import toyGames from "./toys-games.jpg"
import watchBags from "./watches-bags.jpg"
import WomenFashion from "./Women-Fashinon.jpg"
import loginImg from "./loginImg.svg"
import Vendor_Plane from "./Vendor_Plane.png"
import VendorNetEarning from "./VendorNetEarning.png"
import VendorTotalOrder from "./VendorTotalOrder.png"
import VendorTotalProduct from "./VendorTotalProduct.png"
import VendorTotalSales from "./VendorTotalSales.png"
import VendorCommsion from "./VendorCommsion.png"
import CommsionStructure from "./CommsionStructure.png"
import VendorPayout from "./VendorPayoutPending.png"
import VendorLifeTimeEarning from "./VendorNetEarning.png"
import ActiveVendor from "./ActiveVendor.png"

export const assets = {
  VendorNetEarning,
  VendorPayout,
  VendorCommsion,
  VendorLifeTimeEarning,
  ActiveVendor,
  CommsionStructure,
  VendorTotalOrder,
  VendorTotalProduct,
  VendorTotalSales,
  automotive,
  books,
  Vendor_Plane,
  electronics,
  loginImg,
  groceries,
  health,
  homeKitchen,
  homeLiving,
  jewelry,
  lifeStyel,
  medicine,
  motherBaby,
  officeSupplies,
  PetToy,
  sportsOutdoors,
  toyGames,
  watchBags,
  WomenFashion,
  Category,
  Best_Price,
  HeadPhoneImg2,
  Refund,
  Shipping,
  hero_vegetable,
  logo,
  AddToCart,
  Popular_Product1,
  Popular_Product2,
  Popular_Product3,
  Popular_Product4,
  Popular_Product5,
  Popular_Product6,
  Popular_Product7,
  Popular_Product8,
  Hero_headPhone,
  Hero_laptop,
  Hero_phone,
  BlackJacket,
  Cloth,
  Watch,
  Coffee,
  Laptop,
  MobilePhone,
  redBag,
  HeadPhone,
}

export const categoryNames = [
  "mens-fashion",
  "womens-fashion",
  "health-beauty",
  "electronics",
  "home-living",
  "lifestyle-hobbies",
  "sports-outdoors",
  "home-kitchen",
  "watches-bags",
  "mother-baby",
  "office-supplies",
  "toys-games",
  "jewelry",
] as const;

export type CategoryName = typeof categoryNames[number];

// src/data/categories.ts



export const categories: TopCategory[] = [
  {
    id: "mens-fashion",
    name: "Men's Fashion",
    slug: "mens-fashion",
    image: Category,
    items: 110,
  },
  {
    id: "womens-fashion",
    name: "Women's Fashion",
    slug: "womens-fashion",
    image: WomenFashion,
    items: 198,
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    slug: "health-beauty",
    image: health,
    items: 312,
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    image: electronics,
    items: 245,
  },
  {
    id: "home-living",
    name: "Home & Living",
    slug: "home-living",
    image: homeLiving,
    items: 500,
  },
  {
    id: "lifestyle-hobbies",
    name: "Lifestyle & Hobbies",
    slug: "lifestyle-hobbies",
    image: lifeStyel,
    items: 150,
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    image: sportsOutdoors,
    items: 300,
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: homeKitchen,
    items: 198,
  },
  {
    id: "watches-bags",
    name: "Watches & Bags",
    slug: "watches-bags",
    image: watchBags,
    items: 85,
  },
  {
    id: "mother-baby",
    name: "Mother & Baby",
    slug: "mother-baby",
    image: motherBaby,
    items: 220,
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    slug: "office-supplies",
    image: officeSupplies,
    items: 175,
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    slug: "toys-games",
    image: toyGames,
    items: 400,
  },
  {
    id: "jewelry",
    name: "Jewelry",
    slug: "jewelry",
    image: jewelry,
    items: 85,
  },
  {
  id: "medicine-healthcare",
  name: "Medicine & Healthcare",
  slug: "medicine-healthcare",
  image: medicine,
  items: 210,
},
{
  id: "automotive",
  name: "Automotive",
  slug: "automotive",
  image: automotive,
  items: 130,
},
{
  id: "pet-supplies",
  name: "Pet Supplies",
  slug: "pet-supplies",
  image: PetToy,
  items: 95,
},
{
  id: "books-stationery",
  name: "Books & Stationery",
  slug: "books-stationery",
  image: books,
  items: 160,
},
{
  id: "groceries",
  name: "Groceries",
  slug: "groceries",
  image: groceries,
  items: 420,
}
];

export const popularProducts = [
  {
  id: 1,
  image: assets.HeadPhone,
  image2: assets.HeadPhoneImg2,
  title: "Premium Headphones",
  category: "Laptop",
  rating: 4,
  reviewCount: 4,
  author: "Mr.Shop",
  price: 2,
  oldPrice: 3.99,
  discount: 20,

  description:
    "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",

  specifications: {
    brand: "Not specified",
    type: "Cookware Set",
    material: "Likely non-stick coated",
    color: "Red with black interiors",
    pieces: "8 pieces"
  },

  includedItems: [
    "Two saucepans with lids",
    "Two frying pans",
    "Three cooking utensils (spatula, ladle, pasta server)"
  ],

  features: [
    "Non-stick coating for easy food release and cleaning",
    "Ergonomic handles for comfortable and safe handling",
    "Heat-resistant lids with steam vent holes",
    "Compatible with gas, electric, and induction cooktops"
  ]
},
  {
    id: 2,
    image: assets.Watch,
    title: "Smart Watch Series X",
    category: "Smartphone",
    rating: 4,
    reviewCount: 10,
    author: "TechWorld",
    price: 1,
    oldPrice: 2.99,
    discount: 15,
  },
  {
    id: 3,
    image: assets.redBag,
    title: "Leather Handbag",
    category: "Tablet",
    rating: 4,
    reviewCount: 6,
    author: "GadgetHub",
    price: 3,
    oldPrice: 4.49,
    discount: 25,
  },
  {
    id: 4,
    image: assets.BlackJacket,
    title: "Casual Denim Jacket",
    category: "Monitor",
    rating: 3,
    reviewCount: 7,
    author: "DisplayMax",
    price: 5,
    oldPrice: 7.99,
    discount: 10,
  },
  {
    id: 5,
    image: assets.Laptop,
    title: "Gaming Laptop Pro",
    category: "Laptop",
    rating: 4,
    reviewCount: 9,
    author: "Mr.Shop",
    price: 2,
    oldPrice: 3.99,
    discount: 20,
  },
  {
    id: 6,
    image: assets.MobilePhone,
    title: "Smartphone Pro Max",
    category: "Tablet",
    rating: 4,
    reviewCount: 7,
    author: "GadgetHub",
    price: 3,
    oldPrice: 4.49,
    discount: 33,
  },
  {
    id: 7,
    image: assets.Cloth,
    title: "Yoga Mat Premium",
    category: "Smartphone",
    rating: 4,
    reviewCount: 10,
    author: "TechWorld",
    price: 1.5,
    oldPrice: 2.99,
    discount: 50,
  },
  {
    id: 8,
    image: assets.Coffee,
    title: "Coffee Maker Deluxe",
    category: "Headphones",
    rating: 3,
    reviewCount: 5,
    author: "SoundMax",
    price: 0.5,
    oldPrice: 1.99,
    discount: 75,
  },
];

export const bestProducts = [
  {
    id: 101,
    title: "Gaming Laptop Pro",
    category: "Laptop",
    image: assets.Laptop,
    rating: 4,
    reviews: 4,
    seller: "Mr.Shop",
    price: 2,
    oldPrice: 3.99,
    discount: "20%",
  },
  {
    id: 102,
    title: "Ipod's",
    category: "Pod's",
    image: assets.HeadPhone,
    rating: 4,
    reviews: 4,
    seller: "Mr.food",
    price: 2,
    oldPrice: 3.99,
    discount: "20%",
  },
  {
    id: 103,
    title: "Mobile phone",
    category: "Mobile",
    image: assets.MobilePhone,
    rating: 4,
    reviews: 4,
    seller: "Mr.food",
    price: 2,
    oldPrice: 3.99,
    discount: "20%",
  },
  {
    id: 104,
    title: "Head Phone",
    category: "Head Phone",
    image: assets.HeadPhone,
    rating: 4,
    reviews: 4,
    seller: "Mr.food",
    price: 2,
    oldPrice: 3.99,
    discount: "20%",
  },
   {
    id: 1043,
    title: "Mobile phone",
    category: "Mobile",
    image: assets.MobilePhone,
    rating: 4,
    reviews: 4,
    seller: "Mr.food",
    price: 2,
    oldPrice: 3.99,
   }
];

export const topStores = [
  {
    id: 1,
    label: "Since 2023",
    title: "Just Look",
    products: 6,
    rating: 5,
    reviews: 100,
    image: assets.Laptop,
  },
  {
    id: 2,
    label: "Since 2023",
    title: "Explore More",
    products: 8,
    rating: 5,
    reviews: 150,
    image: assets.Laptop,
  },
  {
    id: 3,
    label: "Since 2023",
    title: "Discover Now",
    products: 10,
    rating: 5,
    reviews: 200,
    image: assets.Laptop,
  },
  {
    id: 4,
    label: "Since 2023",
    title: "Just Look",
    products: 6,
    rating: 5,
    reviews: 100,
    image: assets.Laptop,
  },
  {
    id: 5,
    label: "Innovation Ahead",
    title: "Future Tech",
    products: 12,
    rating: 5,
    reviews: 250,
    image: assets.Laptop,
  },
  {
    id: 6,
    label: "Trending Now",
    title: "Eco-Friendly",
    products: 8,
    rating: 5,
    reviews: 150,
    image: assets.Laptop,
  },
];



export const dummyProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    image: "https://picsum.photos/60?random=1",
    category: "Electronic Accessories",
    price: 159.99,
    variants: 3,
    stock: 45,
    status: "In Stock",
    sell: 20,
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    image: "https://picsum.photos/60?random=2",
    category: "Watches & Bags",
    price: 299.99,
    variants: 0,
    stock: 26,
    status: "In Stock",
    sell: 15,
  },
  {
    id: 3,
    name: "Gaming Laptop Pro",
    image: "https://picsum.photos/60?random=3",
    category: "Computer & Gaming",
    price: 1299.99,
    variants: 0,
    stock: 35,
    status: "In Stock",
    sell: 10,
  },
  {
    id: 4,
    name: "Smartphone Pro Max",
    image: "https://picsum.photos/60?random=4",
    category: "Phones & Accessories",
    price: 999.99,
    variants: 0,
    stock: 65,
    status: "In Stock",
    sell: 25,
  },
  {
    id: 5,
    name: "Coffee Maker Deluxe",
    image: "https://picsum.photos/60?random=5",
    category: "Home Appliances",
    price: 89.99,
    variants: 0,
    stock: 76,
    status: "In Stock",
    sell: 30,
  },

  // pagination testing
  ...Array.from({ length: 150 }, (_, i) => ({
    id: i + 6,
    name: `Product ${i + 6}`,
    image: `https://picsum.photos/60?random=${i + 6}`,
    category: "Category",
    price: 50 + i,
    variants: i % 2,
    stock: 10 + i,
    status: "In Stock",
    sell: Math.floor(Math.random() * 50) + 5,
  })),
];