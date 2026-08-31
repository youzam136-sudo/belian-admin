import { useState } from "react";
import "../styles/seosettings.css";

function SeoSettingsPage() {
  // SEO 권한 설정
  const [searchEngineAllowed, setSearchEngineAllowed] = useState(true);
  const [domainOption, setDomainOption] = useState<"default" | "none">(
    "default"
  );
  const [productAutoSeo, setProductAutoSeo] = useState(true);
  const [contentAutoSeo, setContentAutoSeo] = useState(true);

  // 기본 설정
  const [isBasicOpen, setIsBasicOpen] = useState(true);
  const [metaTitle, setMetaTitle] = useState("ddddd");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // 고급 설정
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(true);
  const [robotsEnabled, setRobotsEnabled] = useState(true);
  const [robotsTxt, setRobotsTxt] = useState("");
  const [llmsEnabled, setLlmsEnabled] = useState(true);
  const [llmsTxt, setLlmsTxt] = useState(
    "User-agent: *\nAllow: /\nCommercial-use: allowed\nResearch-use: allowed"
  );
  const [commonCodeEnabled, setCommonCodeEnabled] = useState(true);
  const [headerTopCode, setHeaderTopCode] = useState("");
  const [headerCode, setHeaderCode] = useState("");
  const [bodyCode, setBodyCode] = useState("");
  const [footerCode, setFooterCode] = useState("");
  const [adsTxtEnabled, setAdsTxtEnabled] = useState(true);
  const [adsTxt, setAdsTxt] = useState("");
  const [appAdsTxtEnabled, setAppAdsTxtEnabled] = useState(true);
  const [appAdsTxt, setAppAdsTxt] = useState("");

  return (
    <div className="dashboard-page">
      <div className="seo-settings">
        <div className="seo-settings__header">
          <h2 className="seo-settings__title">SEO (검색 엔진 최적화)</h2>
          <button className="seo-settings__save-btn">저장</button>
        </div>

        {/* SEO 권한 설정 */}
        <section className="seo-card">
          <h3 className="seo-card__title">SEO 권한 설정</h3>

          <div className="seo-toggle-row">
            <div>
              <span className="seo-field__label">
                검색 엔진과 AI에 검색 허용
              </span>
              <p className="seo-field__hint">
                포털 사이트 등에서 내 웹사이트를 참고해요.
              </p>
            </div>
            <label className="seo-toggle">
              <input
                type="checkbox"
                checked={searchEngineAllowed}
                onChange={(e) => setSearchEngineAllowed(e.target.checked)}
              />
              <span className="seo-toggle__slider" />
            </label>
          </div>

          {searchEngineAllowed && (
            <div className="seo-radio-group">
              <label className="seo-radio">
                <input
                  type="radio"
                  checked={domainOption === "default"}
                  onChange={() => setDomainOption("default")}
                />
                <div>
                  <span>기본 도메인이 검색되는 것을 허용해요.</span>
                </div>
              </label>
              <label className="seo-radio">
                <input
                  type="radio"
                  checked={domainOption === "none"}
                  onChange={() => setDomainOption("none")}
                />
                <div>
                  <span>기본 도메인만 검색되지 않도록 해요.</span>
                  <p>별도의 커스텀 도메인이 설정된 경우 추천</p>
                </div>
              </label>
            </div>
          )}

          <div className="seo-toggle-row">
            <div>
              <span className="seo-field__label">상품별 SEO 자동 생성</span>
              <p className="seo-field__hint">
                쇼핑&gt;상품 페이지에 업로드한 상품이 포털 사이트 검색 결과에
                노출되도록 자동으로 SEO를 설정해요.
              </p>
            </div>
            <label className="seo-toggle">
              <input
                type="checkbox"
                checked={productAutoSeo}
                onChange={(e) => setProductAutoSeo(e.target.checked)}
              />
              <span className="seo-toggle__slider" />
            </label>
          </div>

          <div className="seo-toggle-row">
            <div>
              <span className="seo-field__label">콘텐츠별 SEO 자동 설정</span>
              <p className="seo-field__hint">
                콘텐츠&gt;게시물 페이지에 작성된 콘텐츠가 검색 결과에
                노출되도록 자동으로 SEO를 설정해요.
              </p>
            </div>
            <label className="seo-toggle">
              <input
                type="checkbox"
                checked={contentAutoSeo}
                onChange={(e) => setContentAutoSeo(e.target.checked)}
              />
              <span className="seo-toggle__slider" />
            </label>
          </div>
        </section>

        {/* 기본 설정 */}
        <section className="seo-card">
          <button
            className="seo-card__collapse-header"
            onClick={() => setIsBasicOpen((prev) => !prev)}
          >
            <h3 className="seo-card__title">기본 설정</h3>
            <span>{isBasicOpen ? "︿" : "﹀"}</span>
          </button>

          {isBasicOpen && (
            <div className="seo-card__body">
              <div className="seo-preview-diagram">
                <div className="seo-preview-diagram__row">
                  <span className="seo-preview-diagram__label">
                    메타 키워드
                  </span>
                  <span className="seo-preview-diagram__arrow">→</span>
                  <div className="seo-preview-diagram__search">
                    <span>🔍</span>
                    <input
                      readOnly
                      placeholder="메타 키워드를 입력해 주세요"
                    />
                    <button>검색</button>
                  </div>
                </div>
                <div className="seo-preview-diagram__row">
                  <span className="seo-preview-diagram__label">
                    메타 타이틀
                  </span>
                  <span className="seo-preview-diagram__arrow">→</span>
                  <div className="seo-preview-diagram__result">
                    <span className="seo-preview-diagram__favicon" />
                    <div>
                      <p className="seo-preview-diagram__title">
                        {metaTitle || "ddddd"}
                      </p>
                      <p className="seo-preview-diagram__url">
                        https://ddddd123.co.kr
                      </p>
                    </div>
                  </div>
                </div>
                <div className="seo-preview-diagram__row">
                  <span className="seo-preview-diagram__label">
                    메타 디스크립션
                  </span>
                  <span className="seo-preview-diagram__arrow">→</span>
                  <p className="seo-preview-diagram__desc">
                    {metaDesc || "{웹사이트 설명}"}
                  </p>
                </div>
              </div>
              <p className="seo-hint-small">
                * 위 내용은 마다지가 실제와 다를 수 있어요
                <br />* SEO 설정에서 메타 타이틀과 메타 디스크립션은 설정 &gt;
                일반에서 사이트 이름을 설정해두면, 오에서 수정해도 모두
                업데이트돼요
              </p>

              <div className="seo-field">
                <label>메타 타이틀(웹사이트 이름)</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>

              <div className="seo-field">
                <label>메타 디스크립션(웹사이트 설명)</label>
                <div className="seo-input-with-counter">
                  <textarea
                    rows={3}
                    maxLength={455}
                    placeholder="메타 디스크립션(웹사이트 설명)을 입력해 주세요"
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                  />
                  <span>{metaDesc.length}/455</span>
                </div>
                <div className="seo-notice">
                  <p className="seo-notice__title">
                    ⓘ 메타 디스크립션(웹사이트 설명) 작성 방법
                  </p>
                  <p>
                    1. 한글 80자, 영문 160자 정도의 길이의 간결하고
                    매력적으로 작성하는 것을 추천드려요.
                  </p>
                  <p>
                    2. '더 자세한 내용을 확인해 보세요', '지금 바로
                    알아보세요' 와 같은 클릭을 유도하는 문구로 마무리하면
                    좋아요.
                  </p>
                  <p>
                    3. 어색한 메타 키워드를 포함하는 자연스러운 문장으로
                    구성하면 더 효과가 좋아요.
                  </p>
                </div>
              </div>

              <div className="seo-field">
                <label>메타 키워드</label>
                <div className="seo-input-with-counter">
                  <input
                    type="text"
                    maxLength={254}
                    placeholder="엔터를 입력해 키워드를 생성할 수 있어요"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                  />
                  <span>{metaKeywords.length}/254</span>
                </div>
                <div className="seo-notice">
                  <p className="seo-notice__title">
                    ⓘ 메타 키워드 작성 방법
                  </p>
                  <p>
                    1. 웹사이트 내용과 직접적으로 관련있는 키워드를
                    입력해 보세요. 예를 들어 어떤 가방을 판매하는
                    웹사이트라면 '여름 가방', '캐리어', '가방 쇼핑',
                    '가죽 가방' 같은 키워드를 사용할 수 있어요.
                  </p>
                  <p>
                    2. 키워드는 5~10개 정도의 짧은 단어나 구문으로
                    간결하게 작성하는 것이 좋아요.
                  </p>
                  <p>
                    3. 어떤 키워드를 입력해야 할지 고민이라면 구글
                    트렌드, 네이버 데이터랩 등을 통해 인기있는 키워드를
                    확인해 보세요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 고급 설정 */}
        <section className="seo-card">
          <button
            className="seo-card__collapse-header"
            onClick={() => setIsAdvancedOpen((prev) => !prev)}
          >
            <h3 className="seo-card__title">고급 설정</h3>
            <span>{isAdvancedOpen ? "︿" : "﹀"}</span>
          </button>

          {isAdvancedOpen && (
            <div className="seo-card__body">
              <div className="seo-field">
                <div className="seo-field__label-row">
                  <label>사이트맵(sitemap.xml)·RSS</label>
                  <span className="seo-badge">자동 업데이트중</span>
                </div>
                <p className="seo-field__hint">
                  네이버나 구글과 같은 포털의 효율적인 정보 수집에 도움을
                  주며 긍정적인 영향을 끼쳐요.
                </p>
                <p className="seo-link-line">
                  나의 사이트맵 주소:{" "}
                  <a href="#">https://ddddd123.co.kr/sitemap.xml</a>
                </p>
                <p className="seo-link-line">
                  나의 RSS 주소: <a href="#">https://ddddd123.co.kr/rss</a>
                </p>
              </div>

              <div className="seo-toggle-row">
                <span className="seo-field__label">robots.txt 사용</span>
                <label className="seo-toggle">
                  <input
                    type="checkbox"
                    checked={robotsEnabled}
                    onChange={(e) => setRobotsEnabled(e.target.checked)}
                  />
                  <span className="seo-toggle__slider" />
                </label>
              </div>
              {robotsEnabled && (
                <div className="seo-field">
                  <p className="seo-field__hint">
                    robots.txt를 통해 웹사이트의 특정 페이지에 대해
                    검색엔진에게 접근 여부를 알려줄 수 있어요. 검색
                    결과에 나오되 되는 페이지와 나오면 안되는 페이지가
                    구분되어 있다면 robots.txt 를 사용하여 내용을
                    입력해 주세요.
                  </p>
                  <textarea
                    className="seo-code-editor"
                    rows={6}
                    placeholder="여기에 robots.txt를 입력해 주세요"
                    value={robotsTxt}
                    onChange={(e) => setRobotsTxt(e.target.value)}
                  />
                </div>
              )}

              <div className="seo-toggle-row">
                <span className="seo-field__label">llms.txt 사용</span>
                <label className="seo-toggle">
                  <input
                    type="checkbox"
                    checked={llmsEnabled}
                    onChange={(e) => setLlmsEnabled(e.target.checked)}
                  />
                  <span className="seo-toggle__slider" />
                </label>
              </div>
              {llmsEnabled && (
                <div className="seo-field">
                  <p className="seo-field__hint">
                    llms.txt를 통해 웹사이트의 특정 페이지에 대해 AI에게
                    접근, 학습 가능 여부를 알려줄 수 있어요. AI의 학습
                    또는 응답 결과에 나오되 되는 페이지와 나오면 안되는
                    페이지가 구분되어 있다면 llms.txt를 사용하고 내용을
                    입력해 주세요.
                  </p>
                  <textarea
                    className="seo-code-editor"
                    rows={6}
                    value={llmsTxt}
                    onChange={(e) => setLlmsTxt(e.target.value)}
                  />
                </div>
              )}

              <div className="seo-toggle-row">
                <span className="seo-field__label">공통 코드 삽입</span>
                <label className="seo-toggle">
                  <input
                    type="checkbox"
                    checked={commonCodeEnabled}
                    onChange={(e) =>
                      setCommonCodeEnabled(e.target.checked)
                    }
                  />
                  <span className="seo-toggle__slider" />
                </label>
              </div>
              {commonCodeEnabled && (
                <div className="seo-field">
                  <p className="seo-field__hint">
                    웹사이트에 공통으로 삽입되는 각종 코드를 입력하는
                    기능이에요. 각종 추적 코드를 포함한 HTML, CSS,
                    JavaScript 등의 코드를 직접 입력하거나 사용할 수
                    있어요. Free 버전에서는 &lt;script&gt;를 사용할 수
                    없어요.
                  </p>

                  <div className="seo-notice">
                    <p className="seo-notice__title">
                      Header Code 상단 - &lt;head&gt; 바로 아래에
                      들어가요. 반드시 데이터 연결에서 제공되지 않는
                      선언에 대해 처리해야 하는 코드를 넣어주세요.
                    </p>
                    <p>
                      • 광고 캠페인을 위한 로그 분석 및 픽셀 추적 코드는
                      모두 데이터 연결에서 설정해 주세요.
                    </p>
                    <p>
                      • 데이터 연결에서 지원되지 않는 항목이 이곳에
                      입력해도 처리되지 않을 수 있으니 참고해 주세요.
                    </p>
                    <p>
                      • 위젯을 연결하는 코드는 항상 업데이트로 인해
                      적용되지 않을 수 있어요.
                    </p>
                    <p>
                      • jQuery, Bootstrap 등의 JavaScript 및 CSS 파일을
                      호출하기 위해서는 우선 별도의 안내가 필요할 수
                      있어요. 자세한 내용은 가이드를 참고해 보세요.
                    </p>
                  </div>
                  <textarea
                    className="seo-code-editor"
                    rows={6}
                    placeholder="여기에 Header Code 상단을 입력해 주세요"
                    value={headerTopCode}
                    onChange={(e) => setHeaderTopCode(e.target.value)}
                  />

                  <label className="seo-sub-label">Header Code</label>
                  <p className="seo-field__hint">
                    Header에 삽입할 HTML 및 자바스크립트 코드를 입력할
                    수 있어요. 모든 페이지의 &lt;head&gt; 와
                    &lt;/head&gt; 사이에 들어가요.
                  </p>
                  <textarea
                    className="seo-code-editor"
                    rows={6}
                    placeholder="여기에 Header Code를 입력해 주세요"
                    value={headerCode}
                    onChange={(e) => setHeaderCode(e.target.value)}
                  />

                  <label className="seo-sub-label">Body Code</label>
                  <p className="seo-field__hint">
                    모든 페이지의 &lt;body&gt; 바로 아래에 들어갈 HTML
                    및 자바스크립트 코드를 삽입해 주세요.
                  </p>
                  <textarea
                    className="seo-code-editor"
                    rows={6}
                    placeholder="여기에 Body Code를 입력해 주세요"
                    value={bodyCode}
                    onChange={(e) => setBodyCode(e.target.value)}
                  />

                  <label className="seo-sub-label">Footer Code</label>
                  <p className="seo-field__hint">
                    Footer에 삽입할 HTML 및 자바스크립트 코드를 입력할
                    수 있어요. 모든 페이지의 &lt;/body&gt; 앞에
                    들어가요.
                  </p>
                  <textarea
                    className="seo-code-editor"
                    rows={6}
                    placeholder="여기에 Footer Code를 입력해 주세요"
                    value={footerCode}
                    onChange={(e) => setFooterCode(e.target.value)}
                  />
                </div>
              )}

              <div className="seo-toggle-row">
                <span className="seo-field__label">ads.txt 설정</span>
                <label className="seo-toggle">
                  <input
                    type="checkbox"
                    checked={adsTxtEnabled}
                    onChange={(e) => setAdsTxtEnabled(e.target.checked)}
                  />
                  <span className="seo-toggle__slider" />
                </label>
              </div>
              {adsTxtEnabled && (
                <div className="seo-field">
                  <p className="seo-field__hint">
                    웹사이트 소유자가 광고를 판매할 권리가 있다는 것을
                    명시하는 파일이에요. 승인된 광고 네트워크를 통해서만
                    광고를 노출하도록 설정해 보세요. Google 애드센스 등을
                    운영한다면 ads.txt를 설정해서 사이트 인증을
                    받아보세요.
                  </p>
                  <a href="#" className="seo-link-more">
                    자세히 알아보기 ›
                  </a>
                  <textarea
                    className="seo-code-editor"
                    rows={4}
                    placeholder="ads.txt 파일을 입력해 주세요"
                    value={adsTxt}
                    onChange={(e) => setAdsTxt(e.target.value)}
                  />
                </div>
              )}

              <div className="seo-toggle-row">
                <span className="seo-field__label">app-ads.txt 설정</span>
                <label className="seo-toggle">
                  <input
                    type="checkbox"
                    checked={appAdsTxtEnabled}
                    onChange={(e) =>
                      setAppAdsTxtEnabled(e.target.checked)
                    }
                  />
                  <span className="seo-toggle__slider" />
                </label>
              </div>
              {appAdsTxtEnabled && (
                <div className="seo-field">
                  <p className="seo-field__hint">
                    모바일 앱에서 광고를 판매할 권리가 있다는 것을
                    명시하는 파일이에요.
                  </p>
                  <textarea
                    className="seo-code-editor"
                    rows={4}
                    placeholder="app-ads.txt 파일을 입력해 주세요"
                    value={appAdsTxt}
                    onChange={(e) => setAppAdsTxt(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default SeoSettingsPage;
