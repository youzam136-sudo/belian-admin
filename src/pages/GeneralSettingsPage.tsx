import { useState, useRef } from "react";
import "../styles/generalsettings.css";
import { SearchIcon } from "../components/icons/SearchIcon";

function GeneralSettingsPage() {
  const [activeTab, setActiveTab] = useState<"basic" | "shop" | "access">(
    "basic"
  );

  const scrollTo = (id: "basic" | "shop" | "access") => {
    setActiveTab(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 사이트 기본 정보
  const [siteName, setSiteName] = useState("ddddd");
  const [siteDesc, setSiteDesc] = useState("");
  const [mailSiteNameEnabled, setMailSiteNameEnabled] = useState(false);
  const [mailSiteName, setMailSiteName] = useState("");

  // 이미지 업로드들
  const faviconLargeRef = useRef<HTMLInputElement>(null);
  const faviconSmallRef = useRef<HTMLInputElement>(null);
  const ogImageRef = useRef<HTMLInputElement>(null);
  const privateImageRef = useRef<HTMLInputElement>(null);

  const [faviconLarge, setFaviconLarge] = useState<string | null>(null);
  const [faviconSmall, setFaviconSmall] = useState<string | null>(null);
  const [ogImage, setOgImage] = useState<string | null>(null);
  const [privateImage, setPrivateImage] = useState<string | null>(null);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  // 공개 범위
  const [visibility, setVisibility] = useState<"public" | "private">(
    "public"
  );

  // 사이트 이용 옵션
  const [copyProtection, setCopyProtection] = useState(false);
  const [mobileZoom, setMobileZoom] = useState(false);
  const [keepLogin, setKeepLogin] = useState(true);

  // 사업자
  const [companyName, setCompanyName] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [ceoPhone, setCeoPhone] = useState("");
  const [ceoEmail, setCeoEmail] = useState("si5459@naver.com");
  const [isOverseas, setIsOverseas] = useState(false);

  // 주소
  const [region, setRegion] = useState("대한민국 (Korea, Republic of)");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  // 사업자 등록
  const [businessNumber, setBusinessNumber] = useState("000-00-00000");
  const [mailOrderNumber, setMailOrderNumber] = useState(
    "제2025-서울강남-0001호"
  );
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessType, setBusinessType] = useState("");

  // 접속 및 이동
  const [chinaAccessAllowed, setChinaAccessAllowed] = useState(false);
  const [autoLangRedirect, setAutoLangRedirect] = useState(false);
  const [noPageRedirectHome, setNoPageRedirectHome] = useState(false);
  const [excludeAdminStats, setExcludeAdminStats] = useState(false);

  // 구매 완료 후 버튼 설정
  const [purchaseButtonTab, setPurchaseButtonTab] = useState<
    "home" | "order"
  >("home");
  const [buttonNameChangeEnabled, setButtonNameChangeEnabled] =
    useState(false);
  const [buttonNameValue, setButtonNameValue] = useState("홈으로");
  const [buttonLinkChangeEnabled, setButtonLinkChangeEnabled] =
    useState(false);
  const [buttonLinkValue, setButtonLinkValue] = useState("홈으로 이동");

  return (
    <div className="dashboard-page">
      <div className="general-settings">
        <div className="general-settings__header">
          <h2 className="general-settings__title">일반</h2>
          <button className="general-settings__save-btn">저장</button>
        </div>

        <div className="general-settings__tabs">
          <button
            className={`general-settings__tab ${
              activeTab === "basic" ? "general-settings__tab--active" : ""
            }`}
            onClick={() => scrollTo("basic")}
          >
            기본 설정
          </button>
          <button
            className={`general-settings__tab ${
              activeTab === "shop" ? "general-settings__tab--active" : ""
            }`}
            onClick={() => scrollTo("shop")}
          >
            쇼핑몰 · 사이트 정보 설정
          </button>
          <button
            className={`general-settings__tab ${
              activeTab === "access" ? "general-settings__tab--active" : ""
            }`}
            onClick={() => scrollTo("access")}
          >
            접속 및 이동 설정
          </button>
        </div>

        {/* ===== 기본 설정 ===== */}
        <section id="section-basic" className="general-settings__card">
          <h3 className="gs-card__title">기본 설정</h3>
          <p className="gs-card__desc">
            사이트 정보와 관련된 기본적인 설정을 합니다. 검색엔진 최적화를
            위해 사이트 설명을 입력해 주세요.
          </p>

          <div className="gs-row">
            <label className="gs-row__label">사이트 기본 정보</label>
            <div className="gs-row__content">
              <div className="gs-field">
                <span className="gs-field__label">사이트 이름</span>
                <p className="gs-field__hint">
                  브라우저 탭이나 소셜 미디어에 공유할 때 표시됩니다.
                </p>
                <div className="gs-input-with-counter">
                  <input
                    type="text"
                    value={siteName}
                    maxLength={20}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                  <span>{siteName.length}/20</span>
                </div>
              </div>

              <div className="gs-field">
                <span className="gs-field__label">사이트 설명</span>
                <p className="gs-field__hint">
                  사이트를 대표하는 문장이나 키워드 사용을 추천합니다.
                </p>
                <input
                  type="text"
                  value={siteDesc}
                  onChange={(e) => setSiteDesc(e.target.value)}
                />
              </div>

              <div className="gs-toggle-row">
                <div>
                  <span className="gs-field__label">
                    메일 · SMS 전용 사이트 이름
                  </span>
                  <p className="gs-field__hint">
                    전용 이름을 지정하지 않으면 사이트 이름으로 적용됩니다.
                  </p>
                </div>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={mailSiteNameEnabled}
                    onChange={(e) =>
                      setMailSiteNameEnabled(e.target.checked)
                    }
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>

              {mailSiteNameEnabled && (
                <div className="gs-input-with-counter">
                  <input
                    type="text"
                    value={mailSiteName}
                    maxLength={40}
                    onChange={(e) => setMailSiteName(e.target.value)}
                  />
                  <span>{mailSiteName.length}/40 byte</span>
                </div>
              )}
            </div>
          </div>

          <div className="gs-row">
            <label className="gs-row__label">사이트 표시 이미지</label>
            <div className="gs-row__content">
              <div className="gs-field">
                <span className="gs-field__label">파비콘</span>
                <p className="gs-field__hint">
                  내 웹사이트를 볼 때 브라우저 탭에 표시되는 아이콘입니다.{" "}
                  <a href="#">자세히</a>
                </p>
                <div className="gs-upload-row">
                  <input
                    ref={faviconLargeRef}
                    type="file"
                    accept="image/*"
                    className="gs-file-input"
                    onChange={(e) => handleFileSelect(e, setFaviconLarge)}
                  />
                  <button
                    className="gs-upload-box"
                    onClick={() => faviconLargeRef.current?.click()}
                  >
                    {faviconLarge ? (
                      <img src={faviconLarge} alt="파비콘 512" />
                    ) : (
                      <>
                        <span className="gs-upload-box__icon">+</span>
                        <span>파일 선택 또는 끌어다 놓기</span>
                        <span className="gs-upload-box__hint">
                          최소 512x512 / PNG
                        </span>
                      </>
                    )}
                  </button>

                  <input
                    ref={faviconSmallRef}
                    type="file"
                    accept="image/*"
                    className="gs-file-input"
                    onChange={(e) => handleFileSelect(e, setFaviconSmall)}
                  />
                  <button
                    className="gs-upload-box"
                    onClick={() => faviconSmallRef.current?.click()}
                  >
                    {faviconSmall ? (
                      <img src={faviconSmall} alt="파비콘 16" />
                    ) : (
                      <>
                        <span className="gs-upload-box__icon">+</span>
                        <span>파일 선택 또는 끌어다 놓기</span>
                        <span className="gs-upload-box__hint">
                          최소 16x16 / ICO
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <div className="gs-browser-preview">
                  <div className="gs-browser-preview__tab">
                    {faviconSmall && <img src={faviconSmall} alt="" />}
                    <span>{siteName}</span>
                  </div>
                  <div className="gs-browser-preview__bar">
                    <span>←</span>
                    <span>→</span>
                    <span>⟳</span>
                    <span><SearchIcon className="search-icon-svg" /></span>
                  </div>
                </div>
              </div>

              <div className="gs-field">
                <span className="gs-field__label">대표 이미지 ⓘ</span>
                <p className="gs-field__hint">
                  카카오톡 또는 Facebook 등에서 링크와 함께 나타날 이미지를
                  설정합니다.
                </p>
                <input
                  ref={ogImageRef}
                  type="file"
                  accept="image/*"
                  className="gs-file-input"
                  onChange={(e) => handleFileSelect(e, setOgImage)}
                />
                <button
                  className="gs-upload-box gs-upload-box--wide"
                  onClick={() => ogImageRef.current?.click()}
                >
                  {ogImage ? (
                    <img src={ogImage} alt="대표 이미지" />
                  ) : (
                    <>
                      <span className="gs-upload-box__icon">+</span>
                      <span>파일을 선택하거나 끌어다 놓기</span>
                      <span className="gs-upload-box__hint">
                        권장 해상도: 1200x630 / 최소 해상도: 200x200 / 8MB
                        이하 / PNG
                      </span>
                    </>
                  )}
                </button>

                <div className="gs-og-preview">
                  <div className="gs-og-preview__image">
                    {ogImage ? (
                      <img src={ogImage} alt="" />
                    ) : (
                      <span className="gs-og-preview__placeholder">🖼</span>
                    )}
                  </div>
                  <div className="gs-og-preview__text">
                    <p className="gs-og-preview__title">{siteName}</p>
                    <p className="gs-og-preview__desc">(사이트 설명)</p>
                    <p className="gs-og-preview__url">
                      https://{siteName}.co.kr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="gs-row">
            <label className="gs-row__label">공개 범위</label>
            <div className="gs-row__content">
              <label className="gs-radio">
                <input
                  type="radio"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                />
                <div>
                  <span>전체 공개</span>
                  <p>누구나 내 사이트에 접속할 수 있어요</p>
                </div>
              </label>
              <label className="gs-radio">
                <input
                  type="radio"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                />
                <div>
                  <span>비공개</span>
                  <p>관리자만 접근할 수 있어요</p>
                </div>
              </label>

              {visibility === "private" && (
                <div className="gs-field">
                  <span className="gs-field__label">비공개용 이미지</span>
                  <p className="gs-field__hint">
                    비공개 상태인 내 사이트에 방문했을 때 표시할 이미지를
                    설정합니다.
                  </p>
                  <input
                    ref={privateImageRef}
                    type="file"
                    accept="image/*"
                    className="gs-file-input"
                    onChange={(e) => handleFileSelect(e, setPrivateImage)}
                  />
                  <button
                    className="gs-upload-box gs-upload-box--wide"
                    onClick={() => privateImageRef.current?.click()}
                  >
                    {privateImage ? (
                      <img src={privateImage} alt="비공개용 이미지" />
                    ) : (
                      <>
                        <span className="gs-upload-box__icon">+</span>
                        <span>파일을 선택하거나 끌어다 놓기</span>
                        <span className="gs-upload-box__hint">
                          PNG, JPG, GIF
                        </span>
                      </>
                    )}
                  </button>
                  <div className="gs-notice">
                    <p>ⓘ 모바일을 고려해 HD 처리하여 50% 크기로 적용됩니다.</p>
                    <p>이미지를 등록하면 밝은 회색 배경색에 적용됩니다.</p>
                    <p>
                      이미지를 등록하지 않으면 기본 비공개 페이지가
                      표시됩니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="gs-row">
            <label className="gs-row__label">사이트 이용 옵션</label>
            <div className="gs-row__content">
              <div className="gs-toggle-row">
                <div>
                  <span className="gs-field__label">복사 방지</span>
                  <p className="gs-field__hint">
                    마우스 오른쪽 버튼과 복사 단축키로 컨텐츠를 복사할 수
                    없게 하는 기능입니다.
                    <br />
                    (안드로이드 앱에서는 길게 클릭해서 저장, 캡쳐를 할 수
                    없게 하는 기능)
                  </p>
                </div>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={copyProtection}
                    onChange={(e) => setCopyProtection(e.target.checked)}
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>

              <div className="gs-toggle-row">
                <div>
                  <span className="gs-field__label">모바일 확대 허용</span>
                  <p className="gs-field__hint">
                    방문자 브라우저 설정에 따라 확대 허용 방지가 동작하지
                    않을 수 있습니다.
                  </p>
                </div>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={mobileZoom}
                    onChange={(e) => setMobileZoom(e.target.checked)}
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>

              <div className="gs-toggle-row">
                <div>
                  <span className="gs-field__label">로그인 상태 유지</span>
                  <p className="gs-field__hint">
                    사이트 로그인시 자동 로그인에 대한 기본값을 설정할 수
                    있습니다.
                  </p>
                </div>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={keepLogin}
                    onChange={(e) => setKeepLogin(e.target.checked)}
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 쇼핑몰 · 사이트 정보 설정 ===== */}
        <section id="section-shop" className="general-settings__card">
          <h3 className="gs-card__title">쇼핑몰 · 사이트 정보 설정</h3>
          <p className="gs-card__desc">
            쇼핑몰 운영에 필요한 여러가지 정보를 입력합니다.
          </p>
          <div className="gs-notice gs-notice--info">
            ⓘ 입력하신 정보는 토대로 회원 가입 시 주소 입력 형식 등이
            자동으로 변경되므로 정확한 정보를 입력해 주세요.
          </div>

          <div className="gs-row">
            <label className="gs-row__label">사업자</label>
            <div className="gs-row__content">
              <div className="gs-field">
                <span className="gs-field__label">회사 · 단체명</span>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="gs-field-row">
                <div className="gs-field">
                  <span className="gs-field__label">대표자 이름</span>
                  <input
                    type="text"
                    value={ceoName}
                    onChange={(e) => setCeoName(e.target.value)}
                  />
                </div>
                <div className="gs-field">
                  <span className="gs-field__label">대표 연락처</span>
                  <input
                    type="text"
                    value={ceoPhone}
                    onChange={(e) => setCeoPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="gs-field">
                <span className="gs-field__label">대표 메일</span>
                <input
                  type="text"
                  value={ceoEmail}
                  onChange={(e) => setCeoEmail(e.target.value)}
                />
                <label className="gs-checkbox">
                  <input
                    type="checkbox"
                    checked={isOverseas}
                    onChange={(e) => setIsOverseas(e.target.checked)}
                  />
                  해외
                </label>
              </div>
            </div>
          </div>

          <div className="gs-row">
            <label className="gs-row__label">주소</label>
            <div className="gs-row__content">
              <div className="gs-field">
                <span className="gs-field__label">지역</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option>대한민국 (Korea, Republic of)</option>
                </select>
              </div>
              <div className="gs-field">
                <span className="gs-field__label">주소</span>
                <div className="gs-zip-row">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button className="gs-zip-btn">주소 검색</button>
                </div>
              </div>
              <div className="gs-field-row">
                <div className="gs-field">
                  <span className="gs-field__label">우편 번호</span>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="gs-field">
                  <span className="gs-field__label">상세 주소</span>
                  <input
                    type="text"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="gs-row">
            <label className="gs-row__label">사업자 등록</label>
            <div className="gs-row__content">
              <div className="gs-field-row">
                <div className="gs-field">
                  <span className="gs-field__label">사업자등록번호</span>
                  <input
                    type="text"
                    value={businessNumber}
                    onChange={(e) => setBusinessNumber(e.target.value)}
                  />
                </div>
                <div className="gs-field">
                  <span className="gs-field__label">통신판매업신고번호</span>
                  <input
                    type="text"
                    value={mailOrderNumber}
                    onChange={(e) => setMailOrderNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="gs-field">
                <span className="gs-field__label">업태</span>
                <select
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                >
                  <option value="">선택해 주세요</option>
                  <option>도매 및 소매업</option>
                  <option>서비스업</option>
                  <option>제조업</option>
                </select>
              </div>
              <div className="gs-field">
                <span className="gs-field__label">종목</span>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 접속 및 이동 설정 ===== */}
        <section id="section-access" className="general-settings__card">
          <h3 className="gs-card__title">접속 및 이동 설정</h3>

          <div className="gs-row">
            <label className="gs-row__label">접근</label>
            <div className="gs-row__content">
              <div className="gs-toggle-row">
                <span className="gs-field__label">중국 내 접속 허용</span>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={chinaAccessAllowed}
                    onChange={(e) =>
                      setChinaAccessAllowed(e.target.checked)
                    }
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>
              <div className="gs-notice gs-notice--warning">
                ⚠ 중요한 기능 제약이 발생하므로 중국 접속을 크게 고려할 땐
                신중히 선택해 주세요.
                <br />
                이 옵션을 활성화 해야 중국 내에서 접속이 원활합니다. 단,
                Google, Facebook, Instagram, YouTube 및 소셜 로그인,
                네이버페이 구매, 다음 주소찾기, 일부 전환추적, 각종 공유
                등의 기능을 사용할 수 없게 됩니다. <a href="#">자세히 알아보기</a>
              </div>

              <div className="gs-toggle-row">
                <div>
                  <span className="gs-field__label">
                    접속 언어로 사이트 자동 이동
                  </span>
                  <p className="gs-field__hint">
                    다국어사이트 운영시 접속자의 언어에 따라 자동으로
                    이서시켜줍니다.
                  </p>
                </div>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={autoLangRedirect}
                    onChange={(e) => setAutoLangRedirect(e.target.checked)}
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>

              <div className="gs-toggle-row">
                <div>
                  <span className="gs-field__label">
                    없는 페이지 접근 시 홈으로 이동
                  </span>
                  <p className="gs-field__hint">
                    존재하지 않는 주소로 접근시 에러 페이지가 아닌 홈으로
                    이동시켜줍니다.
                  </p>
                </div>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={noPageRedirectHome}
                    onChange={(e) =>
                      setNoPageRedirectHome(e.target.checked)
                    }
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>
            </div>
          </div>

          <div className="gs-row">
            <label className="gs-row__label">통계</label>
            <div className="gs-row__content">
              <div className="gs-toggle-row">
                <div>
                  <span className="gs-field__label">
                    관리자 방문자 통계 포함하지 않기
                  </span>
                  <p className="gs-field__hint">
                    소유자 및 운영진 그룹 회원 접속시 사이트 방문자 통계에
                    포함되지 않는 설정입니다.
                  </p>
                </div>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={excludeAdminStats}
                    onChange={(e) =>
                      setExcludeAdminStats(e.target.checked)
                    }
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>
            </div>
          </div>

          <div className="gs-row">
            <label className="gs-row__label">구매</label>
            <div className="gs-row__content">
              <span className="gs-field__label">구매 완료 후 버튼 설정</span>
              <p className="gs-field__hint">
                결제 후 아이디로 이동시킬지 결정하는 버튼을 설정해 주세요.
              </p>

              <div className="gs-purchase-tabs">
                <button
                  className={`gs-purchase-tab ${
                    purchaseButtonTab === "home"
                      ? "gs-purchase-tab--active"
                      : ""
                  }`}
                  onClick={() => setPurchaseButtonTab("home")}
                >
                  홈으로
                </button>
                <button
                  className={`gs-purchase-tab ${
                    purchaseButtonTab === "order"
                      ? "gs-purchase-tab--active"
                      : ""
                  }`}
                  onClick={() => setPurchaseButtonTab("order")}
                >
                  주문서로
                </button>
              </div>

              <div className="gs-purchase-preview">
                {purchaseButtonTab === "home" ? (
                  <>
                    <p className="gs-purchase-preview__title">
                      결제가 완료되었습니다
                    </p>
                    <div className="gs-purchase-preview__row">
                      <span>배송 정보</span>
                      <span>서울시 강남구 테헤란로</span>
                    </div>
                    <div className="gs-purchase-preview__row">
                      <span>결제 금액</span>
                      <span>10,000원</span>
                    </div>
                    <button className="gs-purchase-preview__btn">
                      {buttonNameChangeEnabled && buttonNameValue
                        ? buttonNameValue
                        : "홈으로"}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="gs-purchase-preview__title">
                      주문 내역을 확인해 보세요
                    </p>
                    <div className="gs-purchase-preview__row">
                      <span>주문 번호</span>
                      <span>20260831-0001</span>
                    </div>
                    <div className="gs-purchase-preview__row">
                      <span>주문 상태</span>
                      <span>결제 완료</span>
                    </div>
                    <button className="gs-purchase-preview__btn">
                      {buttonNameChangeEnabled && buttonNameValue
                        ? buttonNameValue
                        : "주문서로"}
                    </button>
                  </>
                )}
              </div>

              <div className="gs-toggle-row">
                <span className="gs-field__label">버튼 이름 변경</span>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={buttonNameChangeEnabled}
                    onChange={(e) =>
                      setButtonNameChangeEnabled(e.target.checked)
                    }
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>
              {buttonNameChangeEnabled && (
                <input
                  type="text"
                  value={buttonNameValue}
                  onChange={(e) => setButtonNameValue(e.target.value)}
                />
              )}

              <div className="gs-toggle-row">
                <span className="gs-field__label">버튼 링크 변경</span>
                <label className="gs-toggle">
                  <input
                    type="checkbox"
                    checked={buttonLinkChangeEnabled}
                    onChange={(e) =>
                      setButtonLinkChangeEnabled(e.target.checked)
                    }
                  />
                  <span className="gs-toggle__slider" />
                </label>
              </div>
              {buttonLinkChangeEnabled && (
                <div className="gs-input-with-icon">
                  <span>🔗</span>
                  <input
                    type="text"
                    value={buttonLinkValue}
                    onChange={(e) => setButtonLinkValue(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default GeneralSettingsPage;
