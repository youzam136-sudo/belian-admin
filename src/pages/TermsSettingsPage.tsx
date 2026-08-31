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

type PrivacySubTabKey = 'full' | 'memberSignup' | 'guestPurchase';

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

const PRIVACY_SUB_TABS: { key: PrivacySubTabKey; label: string }[] = [
  { key: 'full', label: '개인정보 처리방침 전체내용' },
  { key: 'memberSignup', label: '개인정보 수집 및 이용 동의(회원가입시)' },
  { key: 'guestPurchase', label: '개인정보 수집 및 이용 동의(비회원 구매시)' },
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

const DEFAULT_PRIVACY_FULL = `회사(이하 "회사"라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립·공개합니다.

제1조 (개인정보의 처리목적)

회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. 홈페이지 회원 가입 및 관리
회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보처리 시 법정대리인의 동의 여부 확인, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.

2. 재화 또는 서비스 제공
물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 요금 결제 및 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.

3. 고충 처리
민원인의 신원 확인, 민원사항 확인, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.

제2조 (개인정보의 처리 및 보유기간)

① 회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.

1. 홈페이지 회원 가입 및 관리 : 회원 탈퇴 시까지
다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
- 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지

2. 재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 완료 시까지
다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지
- 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록
  - 표시·광고에 관한 기록 : 6개월
  - 계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년
  - 소비자 불만 또는 분쟁 처리에 관한 기록 : 3년
- 「통신비밀보호법」에 따른 통신사실확인자료 보관
  - 접속지 추적자료 : 1년

제3조 (개인정보의 제3자 제공)

① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
② 회사가 개인정보를 제3자에게 제공하는 경우, 제공받는 자, 제공 목적, 제공하는 개인정보 항목, 보유·이용 기간을 정보주체에게 사전에 안내하고 동의를 받습니다.

제4조 (개인정보처리의 위탁)

① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
- 위탁받는 자 : 결제대행사
  위탁하는 업무 내용 : 결제 및 에스크로 업무
- 위탁받는 자 : 배송업체
  위탁하는 업무 내용 : 상품 배송 업무
- 위탁받는 자 : 고객상담센터
  위탁하는 업무 내용 : 고객상담 업무
- 위탁받는 자 : 본인확인기관
  위탁하는 업무 내용 : 본인확인 업무
② 회사는 위탁계약 체결 시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.

제5조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)

① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
1. 개인정보 열람 요구
2. 오류 등이 있을 경우 정정 요구
3. 삭제요구
4. 처리정지 요구
② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.

제6조 (처리하는 개인정보 항목)

회사는 다음의 개인정보 항목을 처리하고 있습니다.

1. 홈페이지 회원 가입 및 관리
필수항목 : 성명, 아이디, 비밀번호, 휴대전화번호, 이메일주소
선택항목 : 생년월일, 성별

2. 재화 또는 서비스 제공
필수항목 : 성명, 휴대전화번호, 주소, 결제정보

제7조 (개인정보의 파기)

① 회사는 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
② 파기의 절차 및 방법은 다음과 같습니다.
1. 파기절차 : 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
2. 파기방법 : 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.

제8조 (개인정보의 안전성 확보조치)

회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다.
1. 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육
2. 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치
3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제

제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)

① 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
② 정보주체는 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다. 다만 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.

제10조 (개인정보 보호책임자)

① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자
성명 : 담당자
직책 : 담당자
연락처 : 사업장 대표 연락처를 통해 문의해 주시기 바랍니다.

② 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보 보호책임자로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.

제11조 (개인정보 열람청구)

정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람 청구가 신속하게 처리되도록 노력하겠습니다.

제12조 (권익침해 구제방법)

정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
- 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
- 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
- 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
- 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)

부칙

이 개인정보처리방침은 사이트에 게시한 날로부터 시행합니다.`;

const DEFAULT_PRIVACY_MEMBER_SIGNUP = `개인정보 수집 및 이용 동의 (회원가입 시)

1. 수집 항목
- 필수항목 : 성명, 아이디, 비밀번호, 휴대전화번호, 이메일주소
- 선택항목 : 생년월일, 성별

2. 수집 및 이용목적
- 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증
- 부정 이용 방지 및 서비스 관련 고지·통지

3. 보유 및 이용기간
- 회원 탈퇴 시까지 보유하며, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.

※ 위 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 회원가입이 제한될 수 있습니다.`;

const DEFAULT_PRIVACY_GUEST_PURCHASE = `개인정보 수집 및 이용 동의 (비회원 구매 시)

1. 수집 항목
- 필수항목 : 성명, 휴대전화번호, 이메일주소, 배송지 주소, 결제정보

2. 수집 및 이용목적
- 주문 확인 및 상품 배송, 고객 문의 응대
- 결제 및 정산, 청약철회 등 거래 관련 업무 처리

3. 보유 및 이용기간
- 재화 또는 서비스 공급이 완료되고 요금결제·정산이 완료된 시점까지 보유하며, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.

※ 위 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 비회원 주문 진행이 제한될 수 있습니다.`;

const OTHER_TAB_PLACEHOLDERS: Record<
  Exclude<TabKey, 'usage' | 'privacy'>,
  string
> = {
  domesticTravel: '국내여행약관 내용을 입력해 주세요.',
  overseasTravel: '해외여행약관 내용을 입력해 주세요.',
  marketing: '마케팅활용동의 및 광고수신동의 내용을 입력해 주세요.',
  thirdParty: '개인정보제3자제공동의 내용을 입력해 주세요.',
  minor: '만 14세 이상 동의 내용을 입력해 주세요.',
  coupon: '쿠폰 정기 혜택 서비스 안내 내용을 입력해 주세요.',
};

function getPrivacyKey(subTab: PrivacySubTabKey) {
  return `privacy:${subTab}`;
}

function TermsSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('usage');
  const [activePrivacySubTab, setActivePrivacySubTab] =
    useState<PrivacySubTabKey>('full');

  const [contents, setContents] = useState<Record<string, string>>({
    usage: DEFAULT_USAGE_TERMS,
    [getPrivacyKey('full')]: DEFAULT_PRIVACY_FULL,
    [getPrivacyKey('memberSignup')]: DEFAULT_PRIVACY_MEMBER_SIGNUP,
    [getPrivacyKey('guestPurchase')]: DEFAULT_PRIVACY_GUEST_PURCHASE,
    domesticTravel: '',
    overseasTravel: '',
    marketing: '',
    thirdParty: '',
    minor: '',
    coupon: '',
  });
  const [saved, setSaved] = useState(false);

  const activeContentKey =
    activeTab === 'privacy' ? getPrivacyKey(activePrivacySubTab) : activeTab;

  const currentValue = contents[activeContentKey] ?? '';
  const currentPlaceholder =
    activeTab === 'usage' || activeTab === 'privacy'
      ? ''
      : OTHER_TAB_PLACEHOLDERS[
          activeTab as Exclude<TabKey, 'usage' | 'privacy'>
        ];

  const handleContentChange = (value: string) => {
    setContents((prev) => ({ ...prev, [activeContentKey]: value }));
  };

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    if (tab === 'privacy') {
      setActivePrivacySubTab('full');
    }
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

  const resetPrivacyToDefault = () => {
    const defaults: Record<PrivacySubTabKey, string> = {
      full: DEFAULT_PRIVACY_FULL,
      memberSignup: DEFAULT_PRIVACY_MEMBER_SIGNUP,
      guestPurchase: DEFAULT_PRIVACY_GUEST_PURCHASE,
    };
    setContents((prev) => ({
      ...prev,
      [getPrivacyKey(activePrivacySubTab)]: defaults[activePrivacySubTab],
    }));
  };

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="terms-settings-page">
      <div className="terms-settings-header">
        <h1 className="terms-settings-title">약관</h1>
        <div className="terms-settings-header-actions">
          <button type="button" className="terms-btn terms-btn-outline">
            약관 바로가기
          </button>
          <button
            type="button"
            className="terms-btn terms-btn-primary"
            onClick={handleSave}
          >
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
              className={`terms-tab ${
                activeTab === tab.key ? 'terms-tab-active' : ''
              }`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="terms-notice-box">
          <p className="terms-notice-item">
            법률 자문이나 법적 검토가 이루어지지 않았다면, 공정거래위원회의
            표준약관을 수정 없이 사용해야 합니다.
          </p>
          <p className="terms-notice-item">
            아래 양식은 샘플로 제공되는 서식으로 운영형태에 따른 수정이
            필요합니다.
          </p>
          <p className="terms-notice-item">
            HTML태그 사용이 가능하지만 줄바꿈(BR태그)은 자동으로 처리되어
            입력하실 필요가 없습니다.
          </p>
        </div>

        {activeTab === 'usage' && (
          <div className="terms-actions-row">
            <button
              type="button"
              className="terms-btn terms-btn-outline"
              onClick={applyStandardTerms}
            >
              표준약관 적용
            </button>
            <button
              type="button"
              className="terms-btn terms-btn-outline"
              onClick={applyMallStandardTerms}
            >
              쇼핑몰 표준약관 적용
            </button>
          </div>
        )}

        {activeTab === 'privacy' && (
          <>
            <div className="terms-sub-tabs-row">
              <div className="terms-sub-tabs">
                {PRIVACY_SUB_TABS.map((sub) => (
                  <button
                    key={sub.key}
                    type="button"
                    className={`terms-sub-tab ${
                      activePrivacySubTab === sub.key
                        ? 'terms-sub-tab-active'
                        : ''
                    }`}
                    onClick={() => setActivePrivacySubTab(sub.key)}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="terms-btn terms-btn-outline"
                onClick={resetPrivacyToDefault}
              >
                기본값으로 되돌리기
              </button>
            </div>
          </>
        )}

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
