import { LookbookCampaign } from "@/types";

export const LOOKBOOK_CAMPAIGNS: LookbookCampaign[] = [
  {
    id: "campaign-atlas-2026",
    title: {
      fr: "Ombres & Lumières de l'Atlas",
      en: "Atlas Shadows & Light",
      ar: "أضواء وظلال الأطلس",
    },
    subtitle: {
      fr: "Campagne Signature — Collection Printemps-Été 2026",
      en: "Signature Campaign — Spring-Summer 2026",
      ar: "الحملة التوقيعية — مجموعة ربيع وصيف 2026",
    },
    season: {
      fr: "Printemps-Été 2026",
      en: "Spring-Summer 2026",
      ar: "ربيع وصيف 2026",
    },
    description: {
      fr: "Une odyssée visuelle au cœur des contreforts du Haut-Atlas. Les teintes minérales ocre et ivoire répondent à la fluidité des soies et à la rigueur des laines d'Italie.",
      en: "A visual pilgrimage across the High Atlas foothills. Mineral ochre and warm ivory dialog with fluid silks and crisp sartorial wools.",
      ar: "ملحمة بصرية ساحرة في سفوح جبال الأطلس الكبير. تمتزج درجات الطين العاجي والترابي مع انسيابية الحرير الخالص وفخامة الصوف الإيطالي.",
    },
    heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
    ],
    hotspots: [
      {
        id: "hs-1",
        x: 48,
        y: 35,
        productId: "prod-w-01",
        label: {
          fr: "Manteau Laine Double Face Camel",
          en: "Double-Faced Wool Coat in Camel",
          ar: "معطف صوف وكشمير بوجهين",
        },
      },
      {
        id: "hs-2",
        x: 62,
        y: 65,
        productId: "prod-b-01",
        label: {
          fr: "Cabas Signature Cuir Tanné Végétal",
          en: "Signature Vegetable-Tanned Tote",
          ar: "حقيبة كاباس التوقيعية",
        },
      },
      {
        id: "hs-3",
        x: 44,
        y: 85,
        productId: "prod-s-01",
        label: {
          fr: "Mocassins Babouches Hybrides",
          en: "Hybrid Babouche Loafers",
          ar: "حذاء لوفر بابوش هجين",
        },
      },
    ],
    featuredProductIds: ["prod-w-01", "prod-b-01", "prod-s-01", "prod-a-01"],
  },
  {
    id: "campaign-soir-marrakech",
    title: {
      fr: "Une Nuit à Guéliz",
      en: "A Night in Guéliz",
      ar: "ليلة في كليز",
    },
    subtitle: {
      fr: "Cérémonie & Soirée Privée — Édition Limitée",
      en: "Evening & Gala — Limited Edition",
      ar: "السهرات والمناسبات الخاصة — إصدار محدود",
    },
    season: {
      fr: "Soirée & Gala 2026",
      en: "Evening & Gala 2026",
      ar: "السهرات والمناسبات 2026",
    },
    description: {
      fr: "L'allure nocturne magnifiée par la soie sauvage et les reflets du laiton ciselé. Quand l'audace contemporaine embrasse les codes de la haute société marocaine.",
      en: "Nocturnal glamour elevated by raw silk luster and chiseled brass reflections. Where contemporary swagger meets Moroccan salon elegance.",
      ar: "سحر المساء الفاخر المتألق ببريق الحرير الطبيعي وانعكاسات النحاس المنقوش يدوياً، حيث تلتقي الجرأة العصرية مع أرقى تقاليد الصالونات المغربية.",
    },
    heroImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1600&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop",
    ],
    hotspots: [
      {
        id: "hs-4",
        x: 52,
        y: 40,
        productId: "prod-w-02",
        label: {
          fr: "Caftan Contemporain en Soie Sauvage",
          en: "Contemporary Raw Silk Caftan",
          ar: "قفطان معاصر من حرير فاس",
        },
      },
      {
        id: "hs-5",
        x: 70,
        y: 60,
        productId: "prod-b-03",
        label: {
          fr: "Pochette Minaudière Broderie Or",
          en: "Gold-Thread Minaudière Clutch",
          ar: "حقيبة كلاتش مطرزة بالذهب",
        },
      },
      {
        id: "hs-6",
        x: 50,
        y: 88,
        productId: "prod-s-03",
        label: {
          fr: "Escarpins Slingback Bride Bijou",
          en: "Ivory Jewel Slingback Pumps",
          ar: "حذاء كعب عالي سلينغ باك",
        },
      },
    ],
    featuredProductIds: ["prod-w-02", "prod-b-03", "prod-s-03", "prod-a-06"],
  },
  {
    id: "campaign-gentleman-tangier",
    title: {
      fr: "Le Dandy de Tanger",
      en: "The Tangier Sartorialist",
      ar: "أناقة طنجة الكلاسيكية",
    },
    subtitle: {
      fr: "Vestiaire Masculin Tailleur & Villégiature",
      en: "Masculine Tailoring & Coastal Leisure",
      ar: "الخياطة الرجالية الرفيعة والأناقة الساحلية",
    },
    season: {
      fr: "Signature Sartoriale",
      en: "Sartorial Signature",
      ar: "المجموعة الرسمية التوقيعية",
    },
    description: {
      fr: "Entre le vent du détroit et les cafés mythiques de Tanger. Des lins lourds et des vestes déstructurées pour une élégance nonchalante qui traverse le temps.",
      en: "Poised between strait breezes and legendary Tangier literary cafes. Textured Irish linens and deconstructed blazers embodying timeless ease.",
      ar: "بين نسيم مضيق جبل طارق ومقاهي طنجة التاريخية العريقة. كتان ثقيل وسترات ناعمة غير مبطنة تجسد الأناقة الخالدة دون عناء.",
    },
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop",
    secondaryImages: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop",
    ],
    hotspots: [
      {
        id: "hs-7",
        x: 50,
        y: 42,
        productId: "prod-m-02",
        label: {
          fr: "Veste Déstructurée Lin & Soie",
          en: "Deconstructed Linen & Silk Blazer",
          ar: "سترة غير مبطنة من الكتان والحرير",
        },
      },
      {
        id: "hs-8",
        x: 48,
        y: 28,
        productId: "prod-m-04",
        label: {
          fr: "Chemise Col Officier Popeline Giza",
          en: "Giza Cotton Band Collar Shirt",
          ar: "قميص بياقة صينية من قطن الجيزة",
        },
      },
      {
        id: "hs-9",
        x: 65,
        y: 70,
        productId: "prod-b-05",
        label: {
          fr: "Le Weekender 48h Cuir Pleine Fleur",
          en: "48h Full-Grain Leather Weekender",
          ar: "حقيبة السفر لعطلة نهاية الأسبوع",
        },
      },
    ],
    featuredProductIds: ["prod-m-02", "prod-m-04", "prod-b-05", "prod-a-03"],
  },
];
