import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/inquirydetail.css";
import {
  getInquiries,
  saveAnswer,
  type StoredInquiry,
} from "../utils/inquiriesStore";

function InquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stateInquiry = (location.state as { inquiry?: StoredInquiry } | null)
    ?.inquiry;
  const found =
    stateInquiry ?? getInquiries().find((inq) => String(inq.id) === id);

  const [inquiry, setInquiry] = useState(found);
  const [answerDraft, setAnswerDraft] = useState(inquiry?.answer ?? "");
  const [saved, setSaved] = useState(false);

  if (!inquiry) {
    return (
      <div className="inquiry-detail-page">
        <div className="inquiry-detail__empty">
          <p>문의 정보를 찾을 수 없어요. 문의 목록에서 다시 들어와 주세요.</p>
          <button
            type="button"
            className="inquiry-detail__btn inquiry-detail__btn--outline"
            onClick={() => navigate("/products/inquiries")}
          >
            문의 목록으로
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitAnswer = () => {
    if (!answerDraft.trim()) return;
    const next = saveAnswer(inquiry.id, answerDraft.trim());
    const updated = next.find((inq) => inq.id === inquiry.id);
    if (updated) setInquiry(updated);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="inquiry-detail-page">
      <div className="inquiry-detail__header">
        <button
          type="button"
          className="inquiry-detail__back"
          onClick={() => navigate("/products/inquiries")}
        >
          ← 목록으로
        </button>
        <button
          type="button"
          className="inquiry-detail__btn inquiry-detail__btn--outline"
          onClick={() => navigate("/products/inquiries")}
        >
          목록으로
        </button>
      </div>

      <div className="inquiry-detail__card">
        <div className="inquiry-detail__top">
          <span
            className={`inquiry-detail__badge ${
              inquiry.status === "답변완료"
                ? "inquiry-detail__badge--done"
                : "inquiry-detail__badge--pending"
            }`}
          >
            {inquiry.status}
          </span>
          <h1 className="inquiry-detail__title">{inquiry.title}</h1>
          <p className="inquiry-detail__meta">
            {inquiry.productName} · {inquiry.authorName} ·{" "}
            {inquiry.isSecret ? "비밀글" : "공개글"} · {inquiry.createdAt}
          </p>
        </div>

        <div className="inquiry-detail__section">
          <h3 className="inquiry-detail__section-title">문의 내용</h3>
          <p className="inquiry-detail__content">{inquiry.content}</p>
        </div>

        <div className="inquiry-detail__section">
          <h3 className="inquiry-detail__section-title">답변</h3>

          {inquiry.status === "답변완료" && inquiry.answer && (
            <div className="inquiry-detail__answer">
              <p className="inquiry-detail__answer-text">{inquiry.answer}</p>
              <span className="inquiry-detail__answer-date">
                {inquiry.answeredAt} 답변
              </span>
            </div>
          )}

          <textarea
            className="inquiry-detail__answer-input"
            placeholder="답변 내용을 입력해 주세요."
            rows={5}
            value={answerDraft}
            onChange={(e) => setAnswerDraft(e.target.value)}
          />
          <div className="inquiry-detail__answer-actions">
            {saved && (
              <span className="inquiry-detail__saved-note">
                답변이 등록됐어요.
              </span>
            )}
            <button
              type="button"
              className="inquiry-detail__btn inquiry-detail__btn--primary"
              onClick={handleSubmitAnswer}
            >
              {inquiry.status === "답변완료" ? "답변 수정" : "답변 등록"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquiryDetailPage;
