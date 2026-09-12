import type { BiositeData } from "@/lib/types";

const PLACEHOLDER_AVATAR =
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop";
const PLACEHOLDER_PRODUCT =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop";
const PLACEHOLDER_HERO =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop";

export interface NewBiositeInput {
  slug: string;
  name: string;
  whatsappNumber: string;
  accentColor: string;
  backgroundColor: string;
  avatarUrl: string;
  verified: boolean;
}

export function buildBiositeTemplate(input: NewBiositeInput): BiositeData {
  const whatsappUrl = `https://wa.me/${input.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Vim pelo biosite e quero fazer um pedido.",
  )}`;

  return {
    slug: input.slug,
    name: input.name,
    avatarUrl: input.avatarUrl || PLACEHOLDER_AVATAR,
    verified: input.verified,
    accentColor: input.accentColor,
    backgroundColor: input.backgroundColor,
    businessHours: [
      { dayOfWeek: 0, openTime: "09:00", closeTime: "18:00" },
      { dayOfWeek: 1, openTime: "08:00", closeTime: "18:00" },
      { dayOfWeek: 2, openTime: "08:00", closeTime: "18:00" },
      { dayOfWeek: 3, openTime: "08:00", closeTime: "18:00" },
      { dayOfWeek: 4, openTime: "08:00", closeTime: "18:00" },
      { dayOfWeek: 5, openTime: "08:00", closeTime: "18:00" },
      { dayOfWeek: 6, openTime: "09:00", closeTime: "13:00" },
    ],
    statusOverride: null,
    stories: [],
    heroSlides: [{ imageUrl: PLACEHOLDER_HERO }],
    scarcityMessages: [],
    socialProof: {
      enabled: false,
      avatarUrls: [],
      orderCountLabel: "",
      showRating: false,
      rating: 0,
      ratingCount: "",
    },
    bentoTitle: "Destaques",
    bentoItems: [
      { id: "produto-1", imageUrl: PLACEHOLDER_PRODUCT, title: "Produto 1", price: "R$ 0" },
      { id: "produto-2", imageUrl: PLACEHOLDER_PRODUCT, title: "Produto 2", price: "R$ 0" },
    ],
    combos: [],
    testimonials: { enabled: false, items: [] },
    storeGallery: { enabled: false, title: "Nossa Loja", images: [] },
    blocks: [
      {
        id: "block-whatsapp",
        type: "link",
        position: 0,
        config: {
          label: "Peça Agora",
          description: "Toque para chamar no WhatsApp",
          icon: "whatsapp",
          url: whatsappUrl,
        },
      },
    ],
    whatsappNumber: input.whatsappNumber,
    footerCreditUrl: "https://wa.me/5511999999999",
  };
}
