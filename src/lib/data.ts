// =============================================
// BASAO BUILD – Shared Data & Types
// =============================================

export interface Supplier {
  id: string;
  name: string;
  country: "VN" | "CN";
  city: string;
  rating: number;
  verified: boolean;
  logo: string;
  categories: string[];
  shipping: string;
  leadTimeDays: number; // lead time from warehouse to site
}

export interface Product {
  id: string;
  supplierId: string;
  supplierName: string;
  name: string;
  category: string;
  unit: string;
  priceVnd: number;
  origin: "VN" | "CN";
  moq: number; // minimum order qty
  leadDays: number;
  tag?: string; // "Best Value" | "Fast Ship"
}

export interface ProjectInputs {
  type: "Nhà phố" | "Biệt thự" | "Nhà cấp 4" | "Căn hộ";
  area: number; // m2 mỗi tầng
  floors: number;
  standard: "Cơ bản" | "Trung cấp" | "Cao cấp";
}

export interface QuoteLineItem {
  product: Product;
  quantity: number;
  totalVnd: number;
}

// ====== MOCK DATA ======

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: "s1", name: "Sơn Kova Vietnam", country: "VN", city: "TP.HCM", rating: 4.8, verified: true, logo: "🇻🇳", categories: ["Sơn"], shipping: "Giao toàn quốc", leadTimeDays: 3 },
  { id: "s2", name: "Gạch Đồng Tâm", country: "VN", city: "Bình Dương", rating: 4.7, verified: true, logo: "🇻🇳", categories: ["Gạch & Đá"], shipping: "Giao toàn quốc", leadTimeDays: 5 },
  { id: "s3", name: "TQ Building Direct", country: "CN", city: "Quảng Đông", rating: 4.6, verified: true, logo: "🇨🇳", categories: ["Thiết bị", "Gạch & Đá"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 12 },
  { id: "s4", name: "Xi Măng Hà Tiên 1", country: "VN", city: "TP.HCM", rating: 4.9, verified: true, logo: "🇻🇳", categories: ["Xi Măng & Vữa"], shipping: "Giao toàn quốc", leadTimeDays: 2 },
  { id: "s5", name: "Foshan Steel & Alu", country: "CN", city: "Phúc Kiến", rating: 4.5, verified: true, logo: "🇨🇳", categories: ["Thép & Nhôm"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 15 },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: "p1", supplierId: "s1", supplierName: "Sơn Kova Vietnam", name: "Sơn ngoại thất Kova Nano", category: "Sơn", unit: "Thùng 18L", priceVnd: 2_400_000, origin: "VN", moq: 2, leadDays: 3, tag: "Best Value" },
  { id: "p2", supplierId: "s1", supplierName: "Sơn Kova Vietnam", name: "Sơn nội thất Kova Silk", category: "Sơn", unit: "Thùng 18L", priceVnd: 1_800_000, origin: "VN", moq: 2, leadDays: 3 },
  { id: "p3", supplierId: "s2", supplierName: "Gạch Đồng Tâm", name: "Gạch ceramic 60×60 DTG", category: "Gạch & Đá", unit: "m²", priceVnd: 260_000, origin: "VN", moq: 50, leadDays: 5 },
  { id: "p4", supplierId: "s3", supplierName: "TQ Building Direct", name: "Gạch 60×60 Foshan Premium", category: "Gạch & Đá", unit: "m²", priceVnd: 180_000, origin: "CN", moq: 100, leadDays: 12, tag: "Best Value" },
  { id: "p5", supplierId: "s4", supplierName: "Xi Măng Hà Tiên 1", name: "Xi măng Hà Tiên PCB40", category: "Xi Măng & Vữa", unit: "Bao 50kg", priceVnd: 105_000, origin: "VN", moq: 20, leadDays: 2, tag: "Fast Ship" },
  { id: "p6", supplierId: "s3", supplierName: "TQ Building Direct", name: "Cửa nhôm Foshan 4 cánh", category: "Thiết bị", unit: "Bộ", priceVnd: 8_500_000, origin: "CN", moq: 1, leadDays: 15 },
  { id: "p7", supplierId: "s5", supplierName: "Foshan Steel & Alu", name: "Thép xây dựng CB300-V Ø14", category: "Thép & Nhôm", unit: "Tấn", priceVnd: 14_200_000, origin: "CN", moq: 1, leadDays: 15, tag: "Best Value" },
];

// ====== ESTIMATION LOGIC ======

const RATIOS: Record<Product["category"], Record<ProjectInputs["standard"], number>> = {
  //               unit per m2 of floor area
  "Sơn":          { "Cơ bản": 1/15, "Trung cấp": 1/12, "Cao cấp": 1/10 },
  "Gạch & Đá":   { "Cơ bản": 1.05, "Trung cấp": 1.08, "Cao cấp": 1.10 },
  "Xi Măng & Vữa":{ "Cơ bản": 0.18, "Trung cấp": 0.22, "Cao cấp": 0.25 },
  "Thiết bị":    { "Cơ bản": 0.001,"Trung cấp": 0.002,"Cao cấp": 0.003 },
  "Thép & Nhôm": { "Cơ bản": 0.005,"Trung cấp": 0.007,"Cao cấp": 0.010 },
};

export function generateQuote(inputs: ProjectInputs): QuoteLineItem[] {
  const total = inputs.area * inputs.floors;
  // Pick cheapest product per category
  const cats = Object.keys(RATIOS);
  const items: QuoteLineItem[] = [];

  cats.forEach(cat => {
    const product = MOCK_PRODUCTS
      .filter(p => p.category === cat)
      .sort((a, b) => a.priceVnd - b.priceVnd)[0];
    if (!product) return;
    const ratio = RATIOS[cat][inputs.standard];
    const qty = Math.ceil(total * ratio);
    items.push({ product, quantity: qty, totalVnd: qty * product.priceVnd });
  });

  return items;
}

export function formatVnd(n: number) {
  if (n >= 1_000_000_000) return `${(n/1_000_000_000).toFixed(1)} tỷ`;
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(1).replace(".0","")}M`;
  return `${n.toLocaleString()} đ`;
}
