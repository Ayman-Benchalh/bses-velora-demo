import { Order, Customer, PromoCampaign } from "@/types";
import { INITIAL_PRODUCTS } from "./products";

export const INITIAL_PROMO_CAMPAIGNS: PromoCampaign[] = [
  {
    id: "promo-velora10",
    code: "VELORA10",
    discountPercentage: 10,
    description: {
      fr: "10% de remise privilège sur toute la collection",
      en: "10% privilege discount across the entire collection",
      ar: "خصم امتياز 10% على كامل المجموعة",
    },
    isActive: true,
  },
  {
    id: "promo-welcome2026",
    code: "WELCOME2026",
    discountPercentage: 15,
    description: {
      fr: "15% de bienvenue pour votre première commande d'exception",
      en: "15% welcome discount on your initial signature order",
      ar: "خصم ترحيبي 15% على طلبيتكم الأولى",
    },
    isActive: true,
    minSpend: 3000,
  },
  {
    id: "promo-vipvelora",
    code: "VIPVELORA",
    discountPercentage: 20,
    description: {
      fr: "20% réservé au Cercle Privé VELORA & clients VIP",
      en: "20% exclusive to VELORA Private Circle & VIP clients",
      ar: "خصم خاص 20% مخصص لأعضاء الدائرة الخاصة والعملاء VIP",
    },
    isActive: true,
    minSpend: 5000,
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-01",
    fullName: "Kenza El Amrani",
    email: "kenza.elamrani@example.ma",
    phone: "+212 6 61 24 89 10",
    city: "Casablanca",
    totalOrders: 4,
    totalSpent: 28400,
    lastOrderDate: "2026-02-14",
    status: "vip",
  },
  {
    id: "cust-02",
    fullName: "Mehdi Benjelloun",
    email: "mehdi.benjelloun@example.ma",
    phone: "+212 6 63 92 14 55",
    city: "Rabat",
    totalOrders: 3,
    totalSpent: 19800,
    lastOrderDate: "2026-02-15",
    status: "vip",
  },
  {
    id: "cust-03",
    fullName: "Sofia Berrada",
    email: "sofia.berrada@example.ma",
    phone: "+212 6 70 45 12 88",
    city: "Marrakech",
    totalOrders: 2,
    totalSpent: 12200,
    lastOrderDate: "2026-02-11",
    status: "active",
  },
  {
    id: "cust-04",
    fullName: "Youssef Tazi",
    email: "youssef.tazi@example.ma",
    phone: "+212 6 61 78 32 90",
    city: "Tanger",
    totalOrders: 2,
    totalSpent: 11700,
    lastOrderDate: "2026-02-09",
    status: "active",
  },
  {
    id: "cust-05",
    fullName: "Ghita Alami",
    email: "ghita.alami@example.ma",
    phone: "+212 7 00 12 34 56",
    city: "Fès",
    totalOrders: 2,
    totalSpent: 14200,
    lastOrderDate: "2026-02-10",
    status: "active",
  },
];

/**
 * 7 initial orders spanning Monday to Sunday of the reporting period.
 * Daily revenue distribution:
 * - Lun (Mon, Feb 9): 4,800 MAD
 * - Mar (Tue, Feb 10): 6,200 MAD
 * - Mer (Wed, Feb 11): 3,900 MAD
 * - Jeu (Thu, Feb 12): 8,400 MAD
 * - Ven (Fri, Feb 13): 10,500 MAD
 * - Sam (Sat, Feb 14): 12,300 MAD
 * - Dim (Sun, Feb 15): 7,600 MAD
 * Total sum: exactly 53,700 MAD (Average Order Value: 7,671 MAD)
 */
export const INITIAL_ORDERS: Order[] = [
  // 1. Monday (Lun) - 4,800 MAD
  {
    id: "ord-1001",
    orderNumber: "VEL-2026-4891",
    customer: {
      fullName: "Youssef Tazi",
      phone: "+212 6 61 78 32 90",
      email: "youssef.tazi@example.ma",
      city: "Tanger",
      address: "Avenue d'Espagne, Résidence Malabata, Apt 12",
      deliveryNotes: "Appeler en arrivant",
    },
    items: [
      {
        id: "prod-m-04-M-Blanc Cassé",
        productId: "prod-m-04",
        product: INITIAL_PRODUCTS[12] || INITIAL_PRODUCTS[0],
        selectedSize: "M",
        selectedColor: "Blanc Cassé",
        quantity: 2,
        price: 2400,
      },
    ],
    subtotal: 4800,
    shipping: 0,
    discount: 0,
    total: 4800,
    paymentMethod: "cod",
    paymentStatus: "paid",
    status: "delivered",
    timeline: [
      {
        status: "pending",
        title: { fr: "Commande confirmée", en: "Order Confirmed", ar: "تم تأكيد الطلب" },
        description: { fr: "Reçue et validée par nos équipes", en: "Received and validated", ar: "تم استلام الطلب وتأكيده بنجاح" },
        timestamp: "2026-02-09 10:00",
        completed: true,
      },
      {
        status: "processing",
        title: { fr: "En préparation à l'atelier", en: "Atelier Preparation", ar: "قيد التجهيز في الورشة" },
        description: { fr: "Contrôle qualité et mise sous écrin", en: "Quality inspection & presentation boxing", ar: "فحص الجودة والتغليف الفاخر" },
        timestamp: "2026-02-09 14:00",
        completed: true,
      },
      {
        status: "shipped",
        title: { fr: "Expédiée (Simulé)", en: "Dispatched (Simulated)", ar: "تم الشحن (محاكاة)" },
        description: { fr: "Numéro de suivi : AM-2026-98141MA", en: "Tracking: AM-2026-98141MA", ar: "رقم التتبع: AM-2026-98141MA" },
        timestamp: "2026-02-10 09:30",
        completed: true,
      },
      {
        status: "delivered",
        title: { fr: "Livrée en mains propres", en: "Delivered", ar: "تم التسليم بنجاح" },
        description: { fr: "Remise au destinataire contre signature", en: "Delivered against signature", ar: "التسليم مقابل التوقيع" },
        timestamp: "2026-02-11 11:30",
        completed: true,
      },
    ],
    createdAt: "2026-02-09T10:00:00Z",
  },

  // 2. Tuesday (Mar) - 6,200 MAD
  {
    id: "ord-1002",
    orderNumber: "VEL-2026-4892",
    customer: {
      fullName: "Ghita Alami",
      phone: "+212 7 00 12 34 56",
      email: "ghita.alami@example.ma",
      city: "Fès",
      address: "Route d'Imouzzer, Résidence Les Oliviers, Villa 5",
      deliveryNotes: "Livraison en matinée de préférence",
    },
    items: [
      {
        id: "prod-w-01-38-Camel Doré",
        productId: "prod-w-01",
        product: INITIAL_PRODUCTS[0],
        selectedSize: "38",
        selectedColor: "Camel Doré",
        quantity: 1,
        price: 5900,
      },
      {
        id: "prod-a-01-Unique-Noir",
        productId: "prod-a-01",
        product: INITIAL_PRODUCTS[28] || INITIAL_PRODUCTS[22],
        selectedSize: "Unique",
        selectedColor: "Noir",
        quantity: 1,
        price: 300,
      },
    ],
    subtotal: 6200,
    shipping: 0,
    discount: 0,
    total: 6200,
    paymentMethod: "cod",
    paymentStatus: "paid",
    status: "delivered",
    timeline: [
      {
        status: "pending",
        title: { fr: "Commande confirmée", en: "Order Confirmed", ar: "تم تأكيد الطلب" },
        description: { fr: "Reçue et validée", en: "Received and validated", ar: "تم استلام الطلب وتأكيده بنجاح" },
        timestamp: "2026-02-10 11:30",
        completed: true,
      },
      {
        status: "shipped",
        title: { fr: "Expédiée (Simulé)", en: "Dispatched (Simulated)", ar: "تم الشحن (محاكاة)" },
        description: { fr: "Prise en charge plateforme régionale", en: "Handed over to courier", ar: "تم التسليم للناقل" },
        timestamp: "2026-02-11 08:30",
        completed: true,
      },
      {
        status: "delivered",
        title: { fr: "Livrée en mains propres", en: "Delivered", ar: "تم التسليم بنجاح" },
        description: { fr: "Règlement en espèces collecté", en: "Cash payment collected", ar: "تم استلام المبلغ نقداً" },
        timestamp: "2026-02-12 15:00",
        completed: true,
      },
    ],
    createdAt: "2026-02-10T11:30:00Z",
  },

  // 3. Wednesday (Mer) - 3,900 MAD
  {
    id: "ord-1003",
    orderNumber: "VEL-2026-4893",
    customer: {
      fullName: "Sofia Berrada",
      phone: "+212 6 70 45 12 88",
      email: "sofia.berrada@example.ma",
      city: "Marrakech",
      address: "Palmeraie, Route de Fès, Circuit de la Palmeraie",
      deliveryNotes: "Livraison en conciergerie",
    },
    items: [
      {
        id: "prod-b-03-Unique-Or & Noir",
        productId: "prod-b-03",
        product: INITIAL_PRODUCTS[24] || INITIAL_PRODUCTS[22],
        selectedSize: "Unique",
        selectedColor: "Or & Noir",
        quantity: 1,
        price: 3900,
      },
    ],
    subtotal: 3900,
    shipping: 0,
    discount: 0,
    total: 3900,
    paymentMethod: "cmi_card",
    paymentStatus: "paid",
    status: "delivered",
    timeline: [
      {
        status: "pending",
        title: { fr: "Commande confirmée", en: "Order Confirmed", ar: "تم تأكيد الطلب" },
        description: { fr: "Paiement carte validé", en: "Card payment confirmed", ar: "تم تأكيد الدفع بالبطاقة" },
        timestamp: "2026-02-11 16:15",
        completed: true,
      },
      {
        status: "delivered",
        title: { fr: "Livrée", en: "Delivered", ar: "تم التسليم" },
        description: { fr: "Remise en conciergerie", en: "Delivered to concierge", ar: "تم التسليم" },
        timestamp: "2026-02-13 14:00",
        completed: true,
      },
    ],
    createdAt: "2026-02-11T16:15:00Z",
  },

  // 4. Thursday (Jeu) - 8,400 MAD
  {
    id: "ord-1004",
    orderNumber: "VEL-2026-4894",
    customer: {
      fullName: "Mehdi Benjelloun",
      phone: "+212 6 63 92 14 55",
      email: "mehdi.benjelloun@example.ma",
      city: "Rabat",
      address: "Avenue Mohammed VI, Villa 18, Souissi",
      deliveryNotes: "Déposer auprès du gardien",
    },
    items: [
      {
        id: "prod-w-02-38-Ivoire Minéral",
        productId: "prod-w-02",
        product: INITIAL_PRODUCTS[1],
        selectedSize: "38",
        selectedColor: "Ivoire Minéral",
        quantity: 1,
        price: 8400,
      },
    ],
    subtotal: 8400,
    shipping: 0,
    discount: 0,
    total: 8400,
    paymentMethod: "cod",
    paymentStatus: "paid",
    status: "delivered",
    timeline: [
      {
        status: "pending",
        title: { fr: "Commande confirmée", en: "Order Confirmed", ar: "تم تأكيد الطلب" },
        description: { fr: "Validation par nos conseillers", en: "Validated", ar: "تم تأكيد الطلب" },
        timestamp: "2026-02-12 10:45",
        completed: true,
      },
      {
        status: "delivered",
        title: { fr: "Livrée", en: "Delivered", ar: "تم التسليم" },
        description: { fr: "Remise en mains propres", en: "Delivered", ar: "تم التسليم" },
        timestamp: "2026-02-14 11:00",
        completed: true,
      },
    ],
    createdAt: "2026-02-12T10:45:00Z",
  },

  // 5. Friday (Ven) - 10,500 MAD
  {
    id: "ord-1005",
    orderNumber: "VEL-2026-4895",
    customer: {
      fullName: "Mehdi Benjelloun",
      phone: "+212 6 63 92 14 55",
      email: "mehdi.benjelloun@example.ma",
      city: "Rabat",
      address: "Avenue Mohammed VI, Villa 18, Souissi",
      deliveryNotes: "Sonner à l'entrée principale",
    },
    items: [
      {
        id: "prod-m-01-50-Gris Charbon",
        productId: "prod-m-01",
        product: INITIAL_PRODUCTS[9] || INITIAL_PRODUCTS[0],
        selectedSize: "50",
        selectedColor: "Gris Charbon",
        quantity: 1,
        price: 6900,
      },
      {
        id: "prod-s-01-42-Noir d'Encre",
        productId: "prod-s-01",
        product: INITIAL_PRODUCTS[17] || INITIAL_PRODUCTS[0],
        selectedSize: "42",
        selectedColor: "Noir d'Encre",
        quantity: 1,
        price: 3600,
      },
    ],
    subtotal: 10500,
    shipping: 0,
    discount: 0,
    total: 10500,
    paymentMethod: "cmi_card",
    paymentStatus: "paid",
    status: "shipped",
    timeline: [
      {
        status: "pending",
        title: { fr: "Commande confirmée", en: "Order Confirmed", ar: "تم تأكيد الطلب" },
        description: { fr: "Règlement carte CMI validé", en: "Card payment confirmed", ar: "تم تأكيد الأداء بالبطاقة البنكية" },
        timestamp: "2026-02-13 14:20",
        completed: true,
      },
      {
        status: "shipped",
        title: { fr: "Expédiée vers Rabat", en: "Dispatched to Rabat", ar: "تم الشحن باتجاه الرباط" },
        description: { fr: "En cours d'acheminement express", en: "In express transit", ar: "في مسار التوصيل السريع" },
        timestamp: "2026-02-14 09:00",
        completed: true,
      },
    ],
    createdAt: "2026-02-13T14:20:00Z",
  },

  // 6. Saturday (Sam) - 12,300 MAD
  {
    id: "ord-1006",
    orderNumber: "VEL-2026-4896",
    customer: {
      fullName: "Kenza El Amrani",
      phone: "+212 6 61 24 89 10",
      email: "kenza.elamrani@example.ma",
      city: "Casablanca",
      address: "14 Boulevard d'Anfa, Résidence Le Majorelle, Apt 4B",
      deliveryNotes: "Appeler 30 minutes avant svp",
    },
    items: [
      {
        id: "prod-w-01-38-Camel Doré",
        productId: "prod-w-01",
        product: INITIAL_PRODUCTS[0],
        selectedSize: "38",
        selectedColor: "Camel Doré",
        quantity: 1,
        price: 8400,
      },
      {
        id: "prod-b-03-Unique-Or & Noir",
        productId: "prod-b-03",
        product: INITIAL_PRODUCTS[24] || INITIAL_PRODUCTS[22],
        selectedSize: "Unique",
        selectedColor: "Or & Noir",
        quantity: 1,
        price: 3900,
      },
    ],
    subtotal: 12300,
    shipping: 0,
    discount: 0,
    total: 12300,
    paymentMethod: "cod",
    paymentStatus: "pending_cod",
    status: "in_delivery",
    timeline: [
      {
        status: "pending",
        title: { fr: "Commande confirmée", en: "Order Confirmed", ar: "تم تأكيد الطلب" },
        description: { fr: "En cours de livraison à Casablanca", en: "Out for delivery in Casablanca", ar: "في مسار التوصيل بالدار البيضاء" },
        timestamp: "2026-02-14 10:15",
        completed: true,
      },
      {
        status: "in_delivery",
        title: { fr: "En cours de livraison", en: "Out for delivery", ar: "في مسار التوصيل" },
        description: { fr: "Le livreur est en tournée dans votre quartier", en: "Courier is in your neighborhood", ar: "مندوب التوصيل في الحي" },
        timestamp: "2026-02-15 11:30",
        completed: true,
      },
    ],
    createdAt: "2026-02-14T10:15:00Z",
  },

  // 7. Sunday (Dim) - 7,600 MAD
  {
    id: "ord-1007",
    orderNumber: "VEL-2026-4897",
    customer: {
      fullName: "Mehdi Benjelloun",
      phone: "+212 6 63 92 14 55",
      email: "mehdi.benjelloun@example.ma",
      city: "Rabat",
      address: "Avenue Mohammed VI, Villa 18, Souissi",
      deliveryNotes: "Déposer au concierge si absent",
    },
    items: [
      {
        id: "prod-m-02-50-Bleu Nuit",
        productId: "prod-m-02",
        product: INITIAL_PRODUCTS[10] || INITIAL_PRODUCTS[0],
        selectedSize: "50",
        selectedColor: "Bleu Nuit",
        quantity: 1,
        price: 7600,
      },
    ],
    subtotal: 7600,
    shipping: 0,
    discount: 0,
    total: 7600,
    paymentMethod: "cod",
    paymentStatus: "pending_cod",
    status: "processing",
    timeline: [
      {
        status: "pending",
        title: { fr: "Commande confirmée", en: "Order Confirmed", ar: "تم تأكيد الطلب" },
        description: { fr: "Reçue et en cours de préparation atelier", en: "Under atelier preparation", ar: "قيد التجهيز في الورشة" },
        timestamp: "2026-02-15 15:10",
        completed: true,
      },
      {
        status: "processing",
        title: { fr: "En préparation à l'atelier", en: "Atelier Preparation", ar: "قيد التجهيز في الورشة" },
        description: { fr: "Mise sous housse et emballage de luxe", en: "Luxury boxing", ar: "التغليف الفاخر" },
        timestamp: "2026-02-15 16:30",
        completed: true,
      },
    ],
    createdAt: "2026-02-15T15:10:00Z",
  },
];
