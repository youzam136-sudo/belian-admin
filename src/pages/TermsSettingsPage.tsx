import { useState } from 'react';
import '../styles/termssettings.css';

type TabKey =
  | 'usage'
  | 'privacy'
  | 'domesticTravel'
  | 'overseasTravel'
  | 'marketing'
  | 'thirdParty'
  | 'minor'
  | 'coupon';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'usage', label: '이용약관' },
  { key: 'privacy', label: '개인정보처리방침' },
  { key: 'domesticTravel', label: '국내여행약관' },
  { key: 'overseasTravel', label: '해외여행약관' },
  { key: 'marketing', label: '마케팅활용동의 및 광고수신동의' },
  { key: 'thirdParty', label: '개인정보제3자제공동의' },
  { key: 'minor', label: '만 14세 이상 동의' },
  { key: 'coupon', label: '쿠폰 정기 혜택 서비스' },
];

const DEFAULT_USAGE_TERMS = `제1조 (목적)

이 약관은 회사가 운영하는 사이트(이하 "사이트")에서 제공하는 서비스의 이용조건 및 절차, 회원과 회사의 권리·의무 및 책임사항 등을 규정함을 목적으로 합니다.

제2조 (용어의 정의)

1. "회원"이란 사이트에 개인정보를 제공하여 회원등록을 한 자로서, 사이트와 이용계약을 체결하고 서비스를 이용하는 자를 말합니다.
2. "이용계약"이란 서비스 이용과 관련하여 사이트와 회원 간에 체결하는 계약을 말합니다.
3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 사이트가 승인하는 문자와 숫자의 조합을 말합니다.
4. "비밀번호"란 회원이 부여받은 아이디와 일치된 회원임을 확인하고 회원의 권익을 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다.

제3조 (약관 외 준칙)

회사는 필요한 경우 별도의 운영정책을 공지할 수 있으며, 본 약관과 운영정책이 중첩될 경우 운영정책이 우선하여 적용됩니다.

제4조 (이용계약의 체결)

1. 이용계약은 회원이 되고자 하는 자가 약관의 내용에 동의를 하고 가입신청을 한 후 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
2. 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.

제5조 (서비스 이용신청)

이용자가 사이트가 정한 절차에 따라 이용신청을 완료하고 회사가 이를 승낙함으로써 서비스 이용이 개시됩니다. 이용자는 신청 시 정확한 정보를 기재하여야 합니다.

제6조 (개인정보의 보호)

회사는 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력하며, 개인정보의 수집·이용·제공에 관한 사항은 별도의 개인정보처리방침에 따릅니다.

제7조 (회사의 의무)

회사는 관련 법령과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 안정적으로 서비스를 제공하기 위하여 노력합니다.

제8조 (회원의 의무)

1. 회원은 관계 법령, 이 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항을 준수하여야 합니다.
2. 회원은 아이디와 비밀번호를 제3자에게 대여, 양도할 수 없습니다.

제9조 (서비스 이용시간)

서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 다만 정기 점검 등의 사유로 서비스가 일시 중단될 수 있습니다.

제10조 (계약해지 및 이용제한)

1. 회원은 언제든지 서비스 초기화면의 회원탈퇴 메뉴를 통해 이용계약 해지를 신청할 수 있습니다.
2. 회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우 이용계약을 해지하거나 서비스 이용을 제한할 수 있습니다.

제11조 (손해배상)

회사는 무료로 제공하는 서비스와 관련하여 회원에게 발생한 손해에 대하여는 회사의 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.

제12조 (면책조항)

회사는 천재지변, 서비스용 설비의 보수·점검·교체 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.

제13조 (재판권 및 준거법)

이 약관과 관련한 분쟁에 대하여는 대한민국 법령을 적용하며, 회사 소재지 관할 법원을 전속 관할 법원으로 합니다.

부칙

이 약관은 사이트에 게시한 날로부터 시행합니다.`;

const OTHER_TAB_PLACEHOLDERS: Record<Exclude<TabKey, 'usage'>, string> = {
  privacy: '개인정보처리방침 내용을 입력해 주세요.',
  domesticTravel: '국내여행약관 내용을 입력해 주세요.',
  overseasTravel: '해외여행약관 내용을 입력해 주세요.',
  marketing: '마케팅활용동의 및 광고수신동의 내용을 입력해 주세요.',
  thirdParty: '개인정보제3자제공동의 내용을 입력해 주세요.',
  minor: '만 14세 이상 동의 내용을 입력해 주세요.',
  coupon: '쿠폰 정기 혜택 서비스 안내 내용을 입력해 주세요.',
};

function TermsSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('usage');
  const [contents, setContents] = useState<Record<TabKey, string>>({
    usage: DEFAULT_USAGE_TERMS,
    privacy: '',
    domesticTravel: '',
    overseasTravel: '',
    marketing: '',
    thirdParty: '',
    minor: '',
    coupon: '',
  });
  const [saved, setSaved] = useState(false);

  const handleContentChange = (value: string) => {
    setContents((prev) => ({ ...prev, [activeTab]: value }));
  };

  const applyStandardTerms = () => {
    if (activeTab !== 'usage') return;
    setContents((prev) => ({ ...prev, usage: DEFAULT_USAGE_TERMS }));
  };

  const applyMallStandardTerms = () => {
    if (activeTab !== 'usage') return;
    setContents((prev) => ({
      ...prev,
      usage: `${DEFAULT_USAGE_TERMS}\n\n제14조 (쇼핑몰 이용에 관한 특칙)\n\n1. 회원은 상품 주문 시 사이트가 안내하는 방식에 따라 결제하여야 합니다.\n2. 청약철회, 환불, 교환에 관한 사항은 전자상거래 등에서의 소비자보호에 관한 법률을 따릅니다.`,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const currentValue = contents[activeTab];
  const currentPlaceholder =
    activeTab === 'usage' ? '' : OTHER_TAB_PLACEHOLDERS[activeTab];

  return (
    <div className="terms-settings-page">
      <div className="terms-settings-header">
        <h1 className="terms-settings-title">약관</h1>
        <div className="terms-settings-header-actions">
          <button type="button" className="terms-btn terms-btn-outline">
            약관 바로가기
          </button>
          <button type="button" className="terms-btn terms-btn-primary" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>

      <div className="terms-settings-card">
        <div className="terms-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`terms-tab ${activeTab === tab.key ? 'terms-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="terms-notice-box">
          <p className="terms-notice-item">
            법률 자문이나 법적 검토가 이루어지지 않았다면, 공정거래위원회의 표준약관을 수정 없이 사용해야 합니다.
          </p>
          <p className="terms-notice-item">
            아래 양식은 샘플로 제공되는 서식으로 운영형태에 따른 수정이 필요합니다.
          </p>
          <p className="terms-notice-item">
            HTML태그 사용이 가능하지만 줄바꿈(BR태그)은 자동으로 처리되어 입력하실 필요가 없습니다.
          </p>
        </div>

        <div className="terms-actions-row">
          <button
            type="button"
            className="terms-btn terms-btn-outline"
            onClick={applyStandardTerms}
            disabled={activeTab !== 'usage'}
          >
            표준약관 적용
          </button>
          <button
            type="button"
            className="terms-btn terms-btn-outline"
            onClick={applyMallStandardTerms}
            disabled={activeTab !== 'usage'}
          >
            쇼핑몰 표준약관 적용
          </button>
        </div>

        <textarea
          className="terms-editor"
          value={currentValue}
          placeholder={currentPlaceholder}
          onChange={(e) => handleContentChange(e.target.value)}
          spellCheck={false}
        />

        {saved && <div className="terms-save-toast">저장되었습니다.</div>}
      </div>
    </div>
  );
}

export default TermsSettingsPage;
