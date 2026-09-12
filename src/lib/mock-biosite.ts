import type { BiositeData } from "@/lib/types";

export const mockBiosite: BiositeData = {
  slug: "sabor-arte-bistro",
  name: "Sabor & Arte Bistro",
  avatarUrl:
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=200&auto=format&fit=crop",
  verified: true,
  accentColor: "#EA580C",
  backgroundColor: "#0F1115",
  businessHours: [
    { dayOfWeek: 0, openTime: "10:00", closeTime: "16:00" },
    { dayOfWeek: 1, openTime: "08:00", closeTime: "22:00" },
    { dayOfWeek: 2, openTime: "08:00", closeTime: "22:00" },
    { dayOfWeek: 3, openTime: "08:00", closeTime: "22:00" },
    { dayOfWeek: 4, openTime: "08:00", closeTime: "22:00" },
    { dayOfWeek: 5, openTime: "08:00", closeTime: "23:00" },
    { dayOfWeek: 6, openTime: "09:00", closeTime: "23:00" },
  ],
  statusOverride: null,
  stories: [
    {
      id: "story-cardapio",
      label: "Cardápio",
      position: 0,
      images: [
        "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "story-bolos",
      label: "Bolos",
      position: 1,
      images: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "story-doces",
      label: "Doces",
      position: 2,
      images: [
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "story-cafe",
      label: "Café",
      position: 3,
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
      ],
    },
  ],
  heroSlides: [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
      badge: "MAIS PEDIDO 🔥",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop",
    },
  ],
  scarcityMessages: ["⏰ Promoção Só Hoje", "Estoque Limitado"],
  socialProof: {
    enabled: true,
    avatarUrls: [
      "https://i.pravatar.cc/100?u=1",
      "https://i.pravatar.cc/100?u=2",
      "https://i.pravatar.cc/100?u=3",
    ],
    orderCountLabel: "+500 pedidos esta semana",
    showRating: true,
    rating: 4.9,
    ratingCount: "1.2k",
  },
  bentoTitle: "Destaques da Casa",
  bentoItems: [
    {
      id: "bento-1",
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
      title: "Pizza Trufada",
      price: "R$ 89",
      badge: "MAIS VENDIDO",
    },
    {
      id: "bento-2",
      imageUrl:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&auto=format&fit=crop",
      title: "Donuts Glacé",
      price: "R$ 18",
    },
    {
      id: "bento-3",
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
      title: "Latte Art Special",
      price: "R$ 12",
    },
    {
      id: "bento-4",
      imageUrl:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
      title: "Pizza Margherita",
      price: "R$ 65",
    },
    {
      id: "bento-5",
      imageUrl:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
      title: "Bolo de Chocolate",
      price: "R$ 55",
      badge: "NOVIDADE",
    },
    {
      id: "bento-6",
      imageUrl:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
      title: "Brigadeiro Gourmet",
      price: "R$ 8",
    },
  ],
  combos: [
    {
      id: "combo-1",
      imageUrl:
        "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=200&auto=format&fit=crop",
      title: "Combo Casal: 2 Pizzas + Refri",
      price: "R$ 129",
      originalPrice: "R$ 149",
      originalPriceColor: "#F87171",
      savingsLabel: "ECONOMIZE R$ 20",
      highlighted: true,
    },
    {
      id: "combo-2",
      imageUrl:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=200&auto=format&fit=crop",
      title: "Café da Manhã Completo",
      price: "R$ 45",
      originalPrice: "R$ 55",
    },
  ],
  testimonials: {
    enabled: false,
    items: [
      {
        id: "t1",
        name: "Mariana Silva",
        avatarUrl: "https://i.pravatar.cc/100?u=4",
        rating: 5,
        quote: "A melhor pizza que já comi! A entrega foi super rápida e chegou quentinha.",
      },
      {
        id: "t2",
        name: "Roberto G.",
        avatarUrl: "https://i.pravatar.cc/100?u=5",
        rating: 5,
        quote: "Os doces são obras de arte. O de brigadeiro gourmet é simplesmente divino!",
      },
    ],
  },
  storeGallery: {
    enabled: true,
    title: "Nossa Loja",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=400&auto=format&fit=crop",
    ],
  },
  blocks: [
    {
      id: "block-whatsapp",
      type: "link",
      position: 0,
      config: {
        label: "Peça Agora",
        description: "Toque para chamar no WhatsApp",
        icon: "whatsapp",
        url: "https://wa.me/5511999999999?text=" +
          encodeURIComponent("Olá! Vim pelo biosite e quero fazer um pedido."),
      },
    },
    {
      id: "block-wifi",
      type: "qr_link",
      position: 1,
      config: {
        kind: "wifi",
        label: "Wi-Fi Grátis",
        description: "Toque para ver QR Code",
        wifi: { ssid: "SaborArteBistro", password: "bistro2026" },
      },
    },
    {
      id: "block-pix",
      type: "qr_link",
      position: 2,
      config: {
        kind: "pix",
        label: "Pagamento via PIX",
        description: "Toque para ver QR Code",
        pix: { key: "55629648000113", receiverName: "Sabor Arte Bistro LTDA", city: "Sao Paulo" },
      },
    },
    {
      id: "block-map",
      type: "map",
      position: 3,
      config: {
        label: "Onde estamos",
        address: "Rua da Gastronomia, 123 - Centro",
        mapImageUrl:
          "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=400&auto=format&fit=crop",
        mapsUrl: "https://maps.google.com",
      },
    },
  ],
  whatsappNumber: "5511999999999",
  footerCreditUrl: "https://seudominio.com/criar-biosite",
};
