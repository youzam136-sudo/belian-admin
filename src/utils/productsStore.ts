export type ProductStatus = "판매중" | "품절" | "숨김";

export interface StoredProduct {
  id: number;
  name: string;
  imageLabel: string;
  price: number;
  discountPrice: string;
  status: ProductStatus;
  stock: string;
  category: string;
  promotion: string;
  createdAt: string;
  updatedAt: string;
  regularPrice?: number;
  summary?: string;
  description?: string;
  origin?: string;
  manufacturer?: string;
  brand?: string;
  imageDataUrl?: string;
}

const STORAGE_KEY = "belian-admin-products";

const SEED_PRODUCTS: StoredProduct[] = [
  {
    id: 101,
    name: "와인베리 퍼밍 콜라겐 젤리",
    imageLabel: "IMG",
    price: 30000,
    discountPrice: "-",
    status: "판매중",
    stock: "-",
    category: "미지정",
    promotion: "Belian",
    createdAt: "2026-08-21",
    updatedAt: "2026-08-28",
  },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function getProducts(): StoredProduct[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage를 사용할 수 없는 환경이면 시드 데이터로 대체
  }
  saveProducts(SEED_PRODUCTS);
  return SEED_PRODUCTS;
}

export function saveProducts(products: StoredProduct[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // 저장 실패 시 조용히 무시 (모의 데이터 저장용이므로)
  }
}

export function nextProductId(products: StoredProduct[]) {
  if (products.length === 0) return 101;
  return Math.max(...products.map((p) => p.id)) + 1;
}

/** 상품 등록/수정 폼에서 저장할 때 사용. id가 이미 있으면 수정, 없으면 새로 추가 */
export function upsertProduct(input: {
  id?: number;
  name: string;
  price: number;
  category: string;
  status: ProductStatus;
  regularPrice?: number;
  summary?: string;
  description?: string;
  origin?: string;
  manufacturer?: string;
  brand?: string;
  imageDataUrl?: string;
}): StoredProduct[] {
  const products = getProducts();
  const today = todayStr();

  if (input.id != null) {
    const idx = products.findIndex((p) => p.id === input.id);
    if (idx >= 0) {
      products[idx] = {
        ...products[idx],
        name: input.name || products[idx].name,
        price: input.price,
        category: input.category || "미지정",
        status: input.status,
        regularPrice: input.regularPrice,
        summary: input.summary,
        description: input.description,
        origin: input.origin,
        manufacturer: input.manufacturer,
        brand: input.brand,
        imageDataUrl: input.imageDataUrl,
        updatedAt: today,
      };
      saveProducts(products);
      return products;
    }
  }

  const newProduct: StoredProduct = {
    id: nextProductId(products),
    name: input.name || "이름 없는 상품",
    imageLabel: "IMG",
    price: input.price,
    discountPrice: "-",
    status: input.status,
    stock: "-",
    category: input.category || "미지정",
    promotion: "-",
    createdAt: today,
    updatedAt: today,
    regularPrice: input.regularPrice,
    summary: input.summary,
    description: input.description,
    origin: input.origin,
    manufacturer: input.manufacturer,
    brand: input.brand,
    imageDataUrl: input.imageDataUrl,
  };

  const next = [newProduct, ...products];
  saveProducts(next);
  return next;
}

export function updateProductStatus(id: number, status: ProductStatus) {
  const products = getProducts();
  const today = todayStr();
  const next = products.map((p) =>
    p.id === id ? { ...p, status, updatedAt: today } : p
  );
  saveProducts(next);
  return next;
}
