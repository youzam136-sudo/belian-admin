export type ProductStatus = "판매중" | "품절" | "숨김" | "예약중" | "승인대기";

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
  /** 예약 게시 시각 (ISO, 예: "2026-09-10T09:00"). 이 시각이 지나면
   *  approvalRequired가 true면 "승인대기"로, 아니면 지정된 status로 전환된다. */
  scheduledAt?: string;
  /** true면 예약 시각 도달 후(또는 즉시) "승인대기" 상태가 되어
   *  관리자가 승인해야만 실제 판매 상태로 바뀐다. */
  approvalRequired?: boolean;
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
    promotion: "Velian",
    createdAt: "2026-08-21",
    updatedAt: "2026-08-28",
  },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/** 예약 게시 시각이 지난 상품을 찾아 다음 상태로 승격시킨다.
 *  - approvalRequired가 true면 "승인대기"로
 *  - 아니면 등록 시 선택했던 status(판매중/품절/숨김)로 */
function promoteScheduled(products: StoredProduct[]): {
  products: StoredProduct[];
  changed: boolean;
} {
  const now = Date.now();
  let changed = false;

  const next = products.map((p) => {
    if (
      p.status === "예약중" &&
      p.scheduledAt &&
      new Date(p.scheduledAt).getTime() <= now
    ) {
      changed = true;
      return {
        ...p,
        status: (p.approvalRequired ? "승인대기" : "판매중") as ProductStatus,
        updatedAt: todayStr(),
      };
    }
    return p;
  });

  return { products: next, changed };
}

export function getProducts(): StoredProduct[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    let products: StoredProduct[];
    if (raw) {
      const parsed = JSON.parse(raw);
      products = Array.isArray(parsed) ? parsed : SEED_PRODUCTS;
    } else {
      products = SEED_PRODUCTS;
    }

    const { products: promoted, changed } = promoteScheduled(products);
    if (changed) saveProducts(promoted);
    return promoted;
  } catch {
    return SEED_PRODUCTS;
  }
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

/** 상품 등록/수정 폼에서 저장할 때 사용. id가 이미 있으면 수정, 없으면 새로 추가.
 *  scheduledAt/approvalRequired가 있으면 최종 상태를 그에 맞게 재계산한다. */
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
  scheduledAt?: string;
  approvalRequired?: boolean;
}): StoredProduct[] {
  const products = getProducts();
  const today = todayStr();

  // 예약/승인 설정에 따라 실제 저장될 최초 상태를 계산한다.
  let resolvedStatus: ProductStatus = input.status;
  const hasFutureSchedule =
    !!input.scheduledAt && new Date(input.scheduledAt).getTime() > Date.now();

  if (hasFutureSchedule) {
    resolvedStatus = "예약중";
  } else if (input.approvalRequired) {
    resolvedStatus = "승인대기";
  }

  if (input.id != null) {
    const idx = products.findIndex((p) => p.id === input.id);
    if (idx >= 0) {
      products[idx] = {
        ...products[idx],
        name: input.name || products[idx].name,
        price: input.price,
        category: input.category || "미지정",
        status: resolvedStatus,
        regularPrice: input.regularPrice,
        summary: input.summary,
        description: input.description,
        origin: input.origin,
        manufacturer: input.manufacturer,
        brand: input.brand,
        imageDataUrl: input.imageDataUrl,
        scheduledAt: input.scheduledAt,
        approvalRequired: input.approvalRequired,
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
    status: resolvedStatus,
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
    scheduledAt: input.scheduledAt,
    approvalRequired: input.approvalRequired,
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

/** "승인대기" 상품을 관리자가 승인 처리할 때 사용. 판매중 상태로 전환된다. */
export function approveProduct(id: number) {
  const products = getProducts();
  const today = todayStr();
  const next = products.map((p) =>
    p.id === id
      ? { ...p, status: "판매중" as ProductStatus, updatedAt: today }
      : p
  );
  saveProducts(next);
  return next;
}
