export type Locale = "fr" | "en" | "ar";

export type ProductCategory = "women" | "men" | "shoes" | "bags" | "accessories";

export interface LocalizedString {
  fr: string;
  en: string;
  ar: string;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  colorName: LocalizedString;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  price: number; // in MAD (Moroccan Dirham)
  salePrice?: number;
  category: ProductCategory;
  collection: LocalizedString;
  images: string[];
  materials: LocalizedString;
  care: LocalizedString;
  origin: LocalizedString;
  details: LocalizedString[];
  sizes: string[];
  colors: {
    name: LocalizedString;
    hex: string;
  }[];
  variants: ProductVariant[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item id: productId-size-color
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  postalCode?: string;
  deliveryNotes?: string;
}

export type PaymentMethod = "cod" | "cmi_card";

export type OrderStatus = "pending" | "processing" | "shipped" | "in_delivery" | "delivered" | "cancelled";

export interface OrderTimelineItem {
  status: OrderStatus;
  title: LocalizedString;
  description: LocalizedString;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "paid" | "pending_cod";
  status: OrderStatus;
  timeline: OrderTimelineItem[];
  createdAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "active" | "vip" | "regular";
}

export interface PromoCampaign {
  id: string;
  code: string;
  discountPercentage: number;
  description: LocalizedString;
  isActive: boolean;
  minSpend?: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
  sortBy: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  searchQuery: string;
}

export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  productId: string;
  label: LocalizedString;
}

export interface LookbookCampaign {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  season: LocalizedString;
  description: LocalizedString;
  heroImage: string;
  secondaryImages: string[];
  hotspots: Hotspot[];
  featuredProductIds: string[];
}

