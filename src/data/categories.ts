import { ProductCategory, LocalizedString } from "@/types";

export interface CategoryInfo {
  slug: ProductCategory;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  heroImage: string;
  itemCount: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "women",
    name: {
      fr: "Femme",
      en: "Women",
      ar: "النساء",
    },
    tagline: {
      fr: "Silhouettes architecturales & matières nobles",
      en: "Architectural silhouettes & noble fibers",
      ar: "قصات معمارية وأنسجة ملكية فاخرة",
    },
    description: {
      fr: "Manteaux en laine double face, caftans contemporains en soie sauvage de Fès et tailleurs d'exception.",
      en: "Double-faced wool coats, contemporary Fez silk caftans, and poised tailoring.",
      ar: "معاطف صوف بوجهين، قفاطين معاصرة من حرير فاس الطبيعي وبدلات سموكينغ نسائية.",
    },
    heroImage: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
    itemCount: 9,
  },
  {
    slug: "men",
    name: {
      fr: "Homme",
      en: "Men",
      ar: "الرجال",
    },
    tagline: {
      fr: "Élégance sartoriale & coupes déstructurées",
      en: "Sartorial nobility & deconstructed tailoring",
      ar: "أناقة الخياطة الرفيعة وقصات مريحة واثقة",
    },
    description: {
      fr: "Manteaux croisés en alpaga, djellabas modernes en crêpe de laine et chemises en coton égyptien Giza.",
      en: "Alpaca double-breasted overcoats, modern wool crep djellabas, and fine Giza Egyptian poplin shirts.",
      ar: "معاطف شتوية بأزرار مزدوجة، جلابيب معاصرة بكريب الصوف وقمصان قطن الجيزة المصري.",
    },
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    itemCount: 8,
  },
  {
    slug: "shoes",
    name: {
      fr: "Souliers",
      en: "Footwear",
      ar: "الأحذية الراقية",
    },
    tagline: {
      fr: "L'art du bottier d'exception",
      en: "Master bootmaker cordwaining",
      ar: "حرفية صناعة الأحذية الراقية",
    },
    description: {
      fr: "Mocassins babouches en cuir d'agneau plongé, bottines Chelsea veau velours et derbies patinés à la main.",
      en: "Hybrid babouche loafers, calf suede Chelsea boots, and hand-patinated Goodyear derbies.",
      ar: "أحذية بابوش لوفر هجينة، أحذية تشيلسي من الشامواه وأحذية ديربي مصقولة باليد.",
    },
    heroImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
    itemCount: 7,
  },
  {
    slug: "bags",
    name: {
      fr: "Maroquinerie",
      en: "Leather Goods",
      ar: "حقائب ومصنوعات جلدية",
    },
    tagline: {
      fr: "Cuirs de sellerie & finitions joaillières",
      en: "Saddle-grade hides & jeweler hardware",
      ar: "جلود سراجة ملكية وإكسسوارات ذهبية",
    },
    description: {
      fr: "Le Cabas Signature en cuir tanné végétal, sacs seau en cuir grainé et minaudières brodées d'or.",
      en: "The Signature vegetable-tanned tote, pebbled bucket bags, and gold-embroidered minaudières.",
      ar: "حقيبة كاباس التوقيعية، حقائب الدلو المحببة وحقائب كلاتش للسهرات مطرزة بالذهب.",
    },
    heroImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
    itemCount: 6,
  },
  {
    slug: "accessories",
    name: {
      fr: "Accessoires",
      en: "Accessories",
      ar: "إكسسوارات",
    },
    tagline: {
      fr: "Les accents d'une silhouette d'exception",
      en: "The definitive finishing touches",
      ar: "لمسات التميز والفرادة",
    },
    description: {
      fr: "Carrés de soie imprimés zellige, ceintures réversibles boucle étrier, argent 925 et extrait de parfum.",
      en: "Silk twill zellige scarves, reversible stirrup belts, 925 sterling silver, and haute extrait de parfum.",
      ar: "أوشحة حريرية بنقوش الزليج، أحزمة جلدية مزدوجة، فضة 925 وعطور مركزة نيش.",
    },
    heroImage: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop",
    itemCount: 6,
  },
];

