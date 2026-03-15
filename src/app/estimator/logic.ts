export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  pricePerUnit: number;
  description: string;
}

export const MOCK_MATERIALS: Material[] = [
  { id: "p1", name: "Premium Exterior Paint", category: "Paint", unit: "Bucket (18L)", pricePerUnit: 2500000, description: "Weather-resistant, high-durability paint." },
  { id: "p2", name: "Interior Silk Paint", category: "Paint", unit: "Bucket (18L)", pricePerUnit: 1800000, description: "Smooth finish, washable interior paint." },
  { id: "t1", name: "Ceramic Floor Tile (60x60)", category: "Tiles", unit: "m2", pricePerUnit: 280000, description: "High-quality ceramic tiles for living spaces." },
  { id: "t2", name: "Anti-slip Bathroom Tile", category: "Tiles", unit: "m2", pricePerUnit: 220000, description: "Safe and durable tiles for wet areas." },
  { id: "m1", name: "Ready-mix Mortar", category: "Mortar", unit: "Bag (50kg)", pricePerUnit: 120000, description: "High-strength, easy-to-use industrial mortar." },
  { id: "s1", name: "Smart Lighting Hub", category: "Smart Home", unit: "Set", pricePerUnit: 4500000, description: "Central controller for home automation." },
];

export function calculateEstimate(projectSize: number, materialType: string) {
  // Simple heuristic for demonstration
  const quantities = {
    "Paint": projectSize / 15, // 15m2 per bucket
    "Tiles": projectSize * 1.05, // 5% wastage
    "Mortar": projectSize / 5, // 5m2 per bag
  };
  return quantities;
}
