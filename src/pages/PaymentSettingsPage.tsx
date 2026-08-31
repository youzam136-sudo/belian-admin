import { useState, type ReactNode } from 'react';
import '../styles/paymentsettings.css';

interface PaymentMethodCardProps {
  title: string;
  description: string;
  required?: boolean;
  highlighted?: boolean;
  children?: ReactNode;
  connected: boolean;
  onToggleConnect: () => void;
}

function PaymentMethodCard({
  title,
  description,
  required,
  highlighted,
  children,
  connected,
  onToggleConnect,
}: PaymentMethodCardProps) {
  return (
    <div
      className={`payment-method-card ${
        highlighted ? 'payment-method-card-highlighted' : ''
      }`}
    >
      <div className="payment-method-card-header">
        <h3 className="payment-method-card-title">
          {title}
          {required && <span className="payment-required-badge">필수</span>}
        </h3>
      </div>
      <p className="payment-method-card-desc">{description}</p>

      {children}

      <button
        type="button"
        className={`payment-connect-btn ${
          connected ? 'payment-connect-btn-connected' : ''
        }`}
        onClick={onToggleConnect}
      >
        {connected ? '연결됨' : '+ 연결'}
      </button>
    </div>
  );
}

interface ChecklistItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

function ChecklistItem({ title, isOpen, onToggle, children }: ChecklistItemProps) {
  return (
    <div className="payment-checklist-item">
      <button
        type="button"
        className="payment-checklist-header"
        onClick={onToggle}
      >
        <span>{title}</span>
        <span
          className={`payment-checklist-chevron ${
            isOpen ? 'payment-checklist-chevron-open' : ''
          }`}
        >
          ⌄
        </span>
      </button>
      {isOpen && children && (
        <div className="payment-checklist-body">{children}</div>
      )}
    </div>
  );
}

function PaymentSettingsPage() {
  const [pgConnected, setPgConnected] = useState(false);
  const [easyPayConnected, setEasyPayConnected] = useState(false);
  const [etcConnected, setEtcConnected] = useState(false);

  const [openChecklistKey, setOpenChecklistKey] = useState<string | null>(
    'businessInfo'
  );

  const toggleChecklist = (key: string) => {
    setOpenChecklistKey((prev) => (prev === key ? null : key));
  };

  const completedCount = [pgConnected, easyPayConnected, etcConnected].filter(
    Boolean
  ).length;

  return (
    <div className="payment-settings-page">
      <div className="payment-settings-header">
        <h1 className="payment-settings-title">전자결제 (PG)</h1>
        <button type="button" className="payment-btn-outline">
          결제 설정
        </button>
      </div>

      <div className="payment-settings-layout">
        <div className="payment-settings-main">
          <PaymentMethodCard
            title="기본 결제(PG)"
            description="카드 결제, 실시간 계좌이체, 가상계좌 같은 기본 결제를 연결해요"
            required
            highlighted
            connected={pgConnected}
            onToggleConnect={() => setPgConnected((v) => !v)}
          >
            <div className="payment-pg-option-row">
              <div className="payment-pg-logo">KG</div>
              <div className="payment-pg-option-info">
                <div className="payment-pg-option-name">오직 KG이니시스만</div>
                <div className="payment-pg-option-sub">
                  가입비 <strong>0원</strong> · 연회비 <strong>평생 무료</strong>
                </div>
              </div>
              <button
                type="button"
                className="payment-pg-connect-small"
                onClick={() => setPgConnected(true)}
              >
                + 연결
              </button>
            </div>
          </PaymentMethodCard>

          <PaymentMethodCard
            title="간편 결제"
            description="네이버, 토스, 카카오, 삼성페이를 연결해요"
            connected={easyPayConnected}
            onToggleConnect={() => setEasyPayConnected((v) => !v)}
          />

          <PaymentMethodCard
            title="기타 결제"
            description="무통장 입금, 휴대폰 결제 등 보조 결제 수단을 연결해요"
            connected={etcConnected}
            onToggleConnect={() => setEtcConnected((v) => !v)}
          />
        </div>

        <div className="payment-settings-side">
          <div className="payment-review-card">
            <div className="payment-review-header">
              <h3 className="payment-review-title">결제 심사 준비</h3>
              <span className="payment-review-progress">
                {completedCount}/5 완료
              </span>
            </div>

            <ChecklistItem
              title="사이트 하단에 사업자 정보 입력"
              isOpen={openChecklistKey === 'businessInfo'}
              onToggle={() => toggleChecklist('businessInfo')}
            >
              <ol className="payment-checklist-steps">
                <li>사업자 정보를 복사해 주세요.</li>
                <li>디자인 모드에서 사이트 하단에 붙여넣어 주세요.</li>
              </ol>
              <button type="button" className="payment-checklist-cta">
                입력하기
              </button>
            </ChecklistItem>

            <ChecklistItem
              title="이용약관 및 개인정보처리방침 수정"
              isOpen={openChecklistKey === 'terms'}
              onToggle={() => toggleChecklist('terms')}
            >
              <p className="payment-checklist-text">
                설정 &gt; 약관 메뉴에서 이용약관과 개인정보처리방침 내용을
                실제 운영 정보에 맞게 수정해 주세요.
              </p>
            </ChecklistItem>

            <ChecklistItem
              title="상품 등록"
              isOpen={openChecklistKey === 'products'}
              onToggle={() => toggleChecklist('products')}
            >
              <p className="payment-checklist-text">
                결제 심사를 위해 판매할 상품을 1개 이상 등록해 주세요.
              </p>
            </ChecklistItem>

            <ChecklistItem
              title="반품/교환/환불 안내 문구 추가"
              isOpen={openChecklistKey === 'returnPolicy'}
              onToggle={() => toggleChecklist('returnPolicy')}
            >
              <p className="payment-checklist-text">
                상품 상세페이지 또는 안내 페이지에 반품, 교환, 환불 절차와
                기준을 안내하는 문구를 추가해 주세요.
              </p>
            </ChecklistItem>

            <ChecklistItem
              title="비회원 주문 허용"
              isOpen={openChecklistKey === 'guestOrder'}
              onToggle={() => toggleChecklist('guestOrder')}
            >
              <p className="payment-checklist-text">
                고객 설정에서 비회원 주문 허용 여부를 확인하고 필요한 경우
                활성화해 주세요.
              </p>
            </ChecklistItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSettingsPage;
