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

// ====== CATEGORIES ======

export const CATEGORIES = [
  { key: "all", label: "Tất cả", icon: "📦" },
  { key: "Sơn", label: "Sơn", icon: "🎨" },
  { key: "Gạch & Đá", label: "Gạch & Đá", icon: "🧱" },
  { key: "Xi Măng & Vữa", label: "Xi Măng & Vữa", icon: "🏗️" },
  { key: "Thép & Nhôm", label: "Thép & Nhôm", icon: "⚙️" },
  { key: "Nội thất", label: "Nội thất", icon: "🛋️" },
  { key: "Kim khí", label: "Kim khí", icon: "🔩" },
  { key: "Điện nước", label: "Điện nước", icon: "💡" },
  { key: "Thiết bị nhà", label: "Thiết bị nhà", icon: "🚿" },
];

// ====== MOCK DATA ======

export const MOCK_SUPPLIERS: Supplier[] = [
  // === VẬT LIỆU XÂY DỰNG ===
  { id: "s1", name: "Sơn Kova Vietnam", country: "VN", city: "TP.HCM", rating: 4.8, verified: true, logo: "🇻🇳", categories: ["Sơn"], shipping: "Giao toàn quốc", leadTimeDays: 3 },
  { id: "s2", name: "Gạch Đồng Tâm", country: "VN", city: "Bình Dương", rating: 4.7, verified: true, logo: "🇻🇳", categories: ["Gạch & Đá"], shipping: "Giao toàn quốc", leadTimeDays: 5 },
  { id: "s3", name: "TQ Building Direct", country: "CN", city: "Quảng Đông", rating: 4.6, verified: true, logo: "🇨🇳", categories: ["Gạch & Đá", "Thiết bị nhà"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 12 },
  { id: "s4", name: "Xi Măng Hà Tiên 1", country: "VN", city: "TP.HCM", rating: 4.9, verified: true, logo: "🇻🇳", categories: ["Xi Măng & Vữa"], shipping: "Giao toàn quốc", leadTimeDays: 2 },
  { id: "s5", name: "Foshan Steel & Alu", country: "CN", city: "Phúc Kiến", rating: 4.5, verified: true, logo: "🇨🇳", categories: ["Thép & Nhôm", "Kim khí"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 15 },

  // === NỘI THẤT ===
  { id: "s6", name: "Nội Thất Hòa Phát", country: "VN", city: "Hà Nội", rating: 4.7, verified: true, logo: "🇻🇳", categories: ["Nội thất"], shipping: "Giao toàn quốc", leadTimeDays: 5 },
  { id: "s7", name: "Foshan Furniture City", country: "CN", city: "Phật Sơn", rating: 4.4, verified: true, logo: "🇨🇳", categories: ["Nội thất"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 18 },
  { id: "s8", name: "Gỗ An Cường", country: "VN", city: "Bình Dương", rating: 4.8, verified: true, logo: "🇻🇳", categories: ["Nội thất"], shipping: "Giao toàn quốc", leadTimeDays: 7 },

  // === KIM KHÍ ===
  { id: "s9", name: "Kim Khí Việt Tiệp", country: "VN", city: "Hải Phòng", rating: 4.6, verified: true, logo: "🇻🇳", categories: ["Kim khí"], shipping: "Giao toàn quốc", leadTimeDays: 3 },
  { id: "s10", name: "Yongkang Hardware", country: "CN", city: "Chiết Giang", rating: 4.3, verified: true, logo: "🇨🇳", categories: ["Kim khí"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 14 },

  // === ĐIỆN NƯỚC ===
  { id: "s11", name: "Thiết Bị Điện Cadisun", country: "VN", city: "Hà Nội", rating: 4.7, verified: true, logo: "🇻🇳", categories: ["Điện nước"], shipping: "Giao toàn quốc", leadTimeDays: 3 },
  { id: "s12", name: "Ống Nhựa Bình Minh", country: "VN", city: "TP.HCM", rating: 4.9, verified: true, logo: "🇻🇳", categories: ["Điện nước"], shipping: "Giao toàn quốc", leadTimeDays: 2 },
  { id: "s13", name: "Wenzhou Valve & Pipe", country: "CN", city: "Ôn Châu", rating: 4.2, verified: true, logo: "🇨🇳", categories: ["Điện nước"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 15 },

  // === THIẾT BỊ NHÀ ===
  { id: "s14", name: "Inax Vietnam", country: "VN", city: "Đồng Nai", rating: 4.8, verified: true, logo: "🇻🇳", categories: ["Thiết bị nhà"], shipping: "Giao toàn quốc", leadTimeDays: 5 },
  { id: "s15", name: "Foshan Sanitary", country: "CN", city: "Quảng Đông", rating: 4.5, verified: true, logo: "🇨🇳", categories: ["Thiết bị nhà"], shipping: "Kho TQ → Công trình VN", leadTimeDays: 14 },
];

export const MOCK_PRODUCTS: Product[] = [
  // === SƠN ===
  { id: "p1", supplierId: "s1", supplierName: "Sơn Kova Vietnam", name: "Sơn ngoại thất Kova Nano", category: "Sơn", unit: "Thùng 18L", priceVnd: 2_400_000, origin: "VN", moq: 2, leadDays: 3, tag: "Best Value" },
  { id: "p2", supplierId: "s1", supplierName: "Sơn Kova Vietnam", name: "Sơn nội thất Kova Silk", category: "Sơn", unit: "Thùng 18L", priceVnd: 1_800_000, origin: "VN", moq: 2, leadDays: 3 },

  // === GẠCH & ĐÁ ===
  { id: "p3", supplierId: "s2", supplierName: "Gạch Đồng Tâm", name: "Gạch ceramic 60×60 DTG", category: "Gạch & Đá", unit: "m²", priceVnd: 260_000, origin: "VN", moq: 50, leadDays: 5 },
  { id: "p4", supplierId: "s3", supplierName: "TQ Building Direct", name: "Gạch 60×60 Foshan Premium", category: "Gạch & Đá", unit: "m²", priceVnd: 180_000, origin: "CN", moq: 100, leadDays: 12, tag: "Best Value" },

  // === XI MĂNG ===
  { id: "p5", supplierId: "s4", supplierName: "Xi Măng Hà Tiên 1", name: "Xi măng Hà Tiên PCB40", category: "Xi Măng & Vữa", unit: "Bao 50kg", priceVnd: 105_000, origin: "VN", moq: 20, leadDays: 2, tag: "Fast Ship" },

  // === THÉP & NHÔM ===
  { id: "p6", supplierId: "s5", supplierName: "Foshan Steel & Alu", name: "Cửa nhôm Foshan 4 cánh", category: "Thép & Nhôm", unit: "Bộ", priceVnd: 8_500_000, origin: "CN", moq: 1, leadDays: 15 },
  { id: "p7", supplierId: "s5", supplierName: "Foshan Steel & Alu", name: "Thép xây dựng CB300-V Ø14", category: "Thép & Nhôm", unit: "Tấn", priceVnd: 14_200_000, origin: "CN", moq: 1, leadDays: 15, tag: "Best Value" },

  // === NỘI THẤT ===
  { id: "p8", supplierId: "s6", supplierName: "Nội Thất Hòa Phát", name: "Tủ bếp gỗ MDF phủ Melamine", category: "Nội thất", unit: "Mét dài", priceVnd: 3_200_000, origin: "VN", moq: 1, leadDays: 7 },
  { id: "p9", supplierId: "s6", supplierName: "Nội Thất Hòa Phát", name: "Bàn ăn gỗ cao su 6 ghế", category: "Nội thất", unit: "Bộ", priceVnd: 6_800_000, origin: "VN", moq: 1, leadDays: 5, tag: "Best Value" },
  { id: "p10", supplierId: "s7", supplierName: "Foshan Furniture City", name: "Sofa da Ý nhập TQ L-shape", category: "Nội thất", unit: "Bộ", priceVnd: 18_500_000, origin: "CN", moq: 1, leadDays: 18 },
  { id: "p11", supplierId: "s7", supplierName: "Foshan Furniture City", name: "Giường ngủ gỗ sồi 1m8", category: "Nội thất", unit: "Cái", priceVnd: 12_000_000, origin: "CN", moq: 1, leadDays: 18, tag: "Best Value" },
  { id: "p12", supplierId: "s8", supplierName: "Gỗ An Cường", name: "Sàn gỗ công nghiệp 12mm AC5", category: "Nội thất", unit: "m²", priceVnd: 420_000, origin: "VN", moq: 20, leadDays: 5 },
  { id: "p13", supplierId: "s8", supplierName: "Gỗ An Cường", name: "Tủ quần áo 4 cánh MFC", category: "Nội thất", unit: "Cái", priceVnd: 8_900_000, origin: "VN", moq: 1, leadDays: 10 },

  // === KIM KHÍ ===
  { id: "p14", supplierId: "s9", supplierName: "Kim Khí Việt Tiệp", name: "Khóa cửa tay gạt inox 304", category: "Kim khí", unit: "Bộ", priceVnd: 450_000, origin: "VN", moq: 5, leadDays: 3 },
  { id: "p15", supplierId: "s9", supplierName: "Kim Khí Việt Tiệp", name: "Bản lề lá inox 4 inch", category: "Kim khí", unit: "Cặp", priceVnd: 85_000, origin: "VN", moq: 10, leadDays: 2, tag: "Fast Ship" },
  { id: "p16", supplierId: "s10", supplierName: "Yongkang Hardware", name: "Ray trượt ngăn kéo bi 3 tầng", category: "Kim khí", unit: "Cặp", priceVnd: 45_000, origin: "CN", moq: 50, leadDays: 14, tag: "Best Value" },
  { id: "p17", supplierId: "s10", supplierName: "Yongkang Hardware", name: "Tay nắm tủ hợp kim nhôm 128mm", category: "Kim khí", unit: "Cái", priceVnd: 22_000, origin: "CN", moq: 100, leadDays: 14, tag: "Best Value" },
  { id: "p18", supplierId: "s9", supplierName: "Kim Khí Việt Tiệp", name: "Ke góc vuông sắt mạ kẽm", category: "Kim khí", unit: "Cái", priceVnd: 15_000, origin: "VN", moq: 20, leadDays: 2 },

  // === ĐIỆN NƯỚC ===
  { id: "p19", supplierId: "s11", supplierName: "Thiết Bị Điện Cadisun", name: "Dây điện CVV 2×2.5mm²", category: "Điện nước", unit: "Cuộn 100m", priceVnd: 1_250_000, origin: "VN", moq: 1, leadDays: 2, tag: "Fast Ship" },
  { id: "p20", supplierId: "s11", supplierName: "Thiết Bị Điện Cadisun", name: "Aptomat MCB 2P 32A Schneider", category: "Điện nước", unit: "Cái", priceVnd: 285_000, origin: "VN", moq: 1, leadDays: 3 },
  { id: "p21", supplierId: "s12", supplierName: "Ống Nhựa Bình Minh", name: "Ống PVC D21 nước sạch", category: "Điện nước", unit: "Cây 4m", priceVnd: 32_000, origin: "VN", moq: 10, leadDays: 2, tag: "Fast Ship" },
  { id: "p22", supplierId: "s12", supplierName: "Ống Nhựa Bình Minh", name: "Ống PPR nóng D25 Bình Minh", category: "Điện nước", unit: "Cây 4m", priceVnd: 68_000, origin: "VN", moq: 10, leadDays: 2 },
  { id: "p23", supplierId: "s13", supplierName: "Wenzhou Valve & Pipe", name: "Van bi đồng 1/2 inch CW617N", category: "Điện nước", unit: "Cái", priceVnd: 48_000, origin: "CN", moq: 50, leadDays: 15, tag: "Best Value" },
  { id: "p24", supplierId: "s11", supplierName: "Thiết Bị Điện Cadisun", name: "Ổ cắm đôi âm tường Panasonic", category: "Điện nước", unit: "Cái", priceVnd: 95_000, origin: "VN", moq: 5, leadDays: 3 },

  // === THIẾT BỊ NHÀ (vòi, bồn, kệ, máy nước nóng) ===
  { id: "p25", supplierId: "s14", supplierName: "Inax Vietnam", name: "Bồn cầu 1 khối Inax AC-900VRN", category: "Thiết bị nhà", unit: "Cái", priceVnd: 5_200_000, origin: "VN", moq: 1, leadDays: 5 },
  { id: "p26", supplierId: "s14", supplierName: "Inax Vietnam", name: "Lavabo đặt bàn Inax L-300V", category: "Thiết bị nhà", unit: "Cái", priceVnd: 1_450_000, origin: "VN", moq: 1, leadDays: 5, tag: "Best Value" },
  { id: "p27", supplierId: "s15", supplierName: "Foshan Sanitary", name: "Vòi sen tắm nhiệt độ mạ vàng", category: "Thiết bị nhà", unit: "Bộ", priceVnd: 2_800_000, origin: "CN", moq: 1, leadDays: 14, tag: "Best Value" },
  { id: "p28", supplierId: "s15", supplierName: "Foshan Sanitary", name: "Bồn tắm đứng kính cường lực 90×90", category: "Thiết bị nhà", unit: "Bộ", priceVnd: 7_500_000, origin: "CN", moq: 1, leadDays: 14 },
  { id: "p29", supplierId: "s14", supplierName: "Inax Vietnam", name: "Gương phòng tắm LED chống sương", category: "Thiết bị nhà", unit: "Cái", priceVnd: 3_200_000, origin: "VN", moq: 1, leadDays: 5 },
  { id: "p30", supplierId: "s3", supplierName: "TQ Building Direct", name: "Máy nước nóng bơm nhiệt 150L", category: "Thiết bị nhà", unit: "Cái", priceVnd: 22_000_000, origin: "CN", moq: 1, leadDays: 18 },
];

// ====== ESTIMATION LOGIC ======

const RATIOS: Record<string, Record<ProjectInputs["standard"], number>> = {
  //               unit per m2 of floor area
  "Sơn":          { "Cơ bản": 1/15, "Trung cấp": 1/12, "Cao cấp": 1/10 },
  "Gạch & Đá":   { "Cơ bản": 1.05, "Trung cấp": 1.08, "Cao cấp": 1.10 },
  "Xi Măng & Vữa":{ "Cơ bản": 0.18, "Trung cấp": 0.22, "Cao cấp": 0.25 },
  "Thép & Nhôm": { "Cơ bản": 0.005,"Trung cấp": 0.007,"Cao cấp": 0.010 },
  "Nội thất":    { "Cơ bản": 0.8,  "Trung cấp": 1.0,  "Cao cấp": 1.2 },
  "Kim khí":     { "Cơ bản": 2.0,  "Trung cấp": 3.0,  "Cao cấp": 4.0 },
  "Điện nước":   { "Cơ bản": 0.05, "Trung cấp": 0.08, "Cao cấp": 0.12 },
  "Thiết bị nhà":{ "Cơ bản": 0.003,"Trung cấp": 0.005,"Cao cấp": 0.008 },
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
