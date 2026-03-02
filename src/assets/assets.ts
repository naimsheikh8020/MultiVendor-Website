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
import type { TopCategory } from "../types/topcatagory";

export const assets = {
  Category,
  hero_vegetable,
  logo,
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
}

export const categoryNames = [
  "Men's Fashion",
  "Women's Fashion",
  "Health & Beauty",
  "Electronics",
  "Home & Living",
  "Lifestyle & Hobbies",
  "Sports & Outdoors",
  "Home & Kitchen",
  "Watches & Bags",
  "Mother & Baby",
  "Office Supplies",
  "Toys & Games",
  "Jewelry",
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
    image: Category,
    items: 198,
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    slug: "health-beauty",
    image: Category,
    items: 312,
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    image: Category,
    items: 245,
  },
  {
    id: "home-living",
    name: "Home & Living",
    slug: "home-living",
    image: Category,
    items: 500,
  },
  {
    id: "lifestyle-hobbies",
    name: "Lifestyle & Hobbies",
    slug: "lifestyle-hobbies",
    image: Category,
    items: 150,
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    image: Category,
    items: 300,
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: Category,
    items: 198,
  },
  {
    id: "watches-bags",
    name: "Watches & Bags",
    slug: "watches-bags",
    image: Category,
    items: 85,
  },
  {
    id: "mother-baby",
    name: "Mother & Baby",
    slug: "mother-baby",
    image: Category,
    items: 220,
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    slug: "office-supplies",
    image: Category,
    items: 175,
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    slug: "toys-games",
    image: Category,
    items: 400,
  },
  {
    id: "jewelry",
    name: "Jewelry",
    slug: "jewelry",
    image: Category,
    items: 85,
  },
];