export type BlockType = "link" | "qr_link" | "map";

export interface LinkBlockConfig {
  label: string;
  url: string;
  description?: string;
  icon?: "whatsapp" | "instagram" | "generic";
}

export interface QrLinkConfig {
  kind: "wifi" | "pix" | "custom";
  label: string;
  description?: string;
  wifi?: { ssid: string; password: string };
  pix?: {
    key: string;
    receiverName: string;
    city: string;
  };
}

export interface MapBlockConfig {
  label: string;
  address: string;
  mapImageUrl: string;
  mapsUrl: string;
}

export type BlockConfig = LinkBlockConfig | QrLinkConfig | MapBlockConfig;

export interface Block {
  id: string;
  type: BlockType;
  position: number;
  config: BlockConfig;
}

export interface StoryItem {
  id: string;
  label: string;
  images: string[];
  position: number;
}

export interface BusinessHoursRule {
  dayOfWeek: number; // 0 = domingo ... 6 = sábado
  openTime: string; // "08:00"
  closeTime: string; // "18:00"
}

export interface HeroSlide {
  imageUrl: string;
  badge?: string;
}

export interface BentoItem {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  badge?: string;
}

export interface ComboItem {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  originalPrice?: string;
  originalPriceColor?: string;
  savingsLabel?: string;
  highlighted?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  quote: string;
}

export interface TestimonialsConfig {
  enabled: boolean;
  items: Testimonial[];
}

export interface StoreGalleryConfig {
  enabled: boolean;
  title: string;
  images: string[];
}

export interface SocialProofData {
  enabled: boolean;
  avatarUrls: string[];
  orderCountLabel: string;
  showRating: boolean;
  rating: number;
  ratingCount: string;
}

export interface BiositeData {
  slug: string;
  name: string;
  avatarUrl: string;
  verified: boolean;
  accentColor: string;
  backgroundColor: string;
  businessHours: BusinessHoursRule[];
  statusOverride?: "open" | "closed" | null;
  stories: StoryItem[];
  heroSlides: HeroSlide[];
  scarcityMessages: string[];
  socialProof: SocialProofData;
  bentoTitle: string;
  bentoItems: BentoItem[];
  combos: ComboItem[];
  testimonials: TestimonialsConfig;
  storeGallery: StoreGalleryConfig;
  blocks: Block[];
  whatsappNumber: string;
  footerCreditUrl: string;
}
