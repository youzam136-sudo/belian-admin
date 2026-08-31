export type InquiryStatus = "답변대기" | "답변완료";

export interface StoredInquiry {
  id: number;
  title: string;
  content: string;
  productName: string;
  authorName: string;
  isSecret: boolean;
  createdAt: string;
  status: InquiryStatus;
  answer?: string;
  answeredAt?: string;
}

const STORAGE_KEY = "belian-admin-inquiries";

const SEED_INQUIRIES: StoredInquiry[] = [
  {
    id: 1,
    title: "배송은 얼마나 걸리나요?",
    content:
      "주문한 지 3일이 지났는데 아직 배송 준비중이라고 나와요. 보통 며칠 정도 걸리나요?",
    productName: "와인베리 퍼밍 콜라겐 젤리",
    authorName: "김벨리",
    isSecret: false,
    createdAt: "2026-08-29",
    status: "답변대기",
  },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function getInquiries(): StoredInquiry[] {
  if (typeof window === "undefined") return SEED_INQUIRIES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage를 사용할 수 없는 환경이면 시드 데이터로 대체
  }
  saveInquiries(SEED_INQUIRIES);
  return SEED_INQUIRIES;
}

export function saveInquiries(inquiries: StoredInquiry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch {
    // 저장 실패 시 조용히 무시
  }
}

export function saveAnswer(id: number, answer: string): StoredInquiry[] {
  const inquiries = getInquiries();
  const next = inquiries.map((inq) =>
    inq.id === id
      ? {
          ...inq,
          answer,
          answeredAt: todayStr(),
          status: "답변완료" as InquiryStatus,
        }
      : inq
  );
  saveInquiries(next);
  return next;
}
