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

