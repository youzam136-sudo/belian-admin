import { useState } from "react";
import "../styles/membersettings.css";

function MemberSettingsPage() {
  const [activeTab, setActiveTab] = useState<"signup" | "group">("signup");
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [termsOption, setTermsOption] = useState<"step" | "inline" | "none">("step");
  const [socialTerms, setSocialTerms] = useState(true);
  const [checkAllTerms, setCheckAllTerms] = useState(true);
  const [generalMemberEnabled, setGeneralMemberEnabled] = useState(true);
  const [businessMemberEnabled, setBusinessMemberEnabled] = useState(false);
  const [gradeEnabled, setGradeEnabled] = useState(false);

  return (
    <div className="dashboard-page">
      <section className="dashboard-section member-settings">
        <h2 className="member-settings__title">고객 설정</h2>

        <div className="member-settings__tabs">
          <button
            className={`member-settings__tab ${
              activeTab === "signup" ? "member-settings__tab--active" : ""
            }`}
            onClick={() => setActiveTab("signup")}
          >
            가입 설정
          </button>
          <button
            className={`member-settings__tab ${
              activeTab === "group" ? "member-settings__tab--active" : ""
            }`}
            onClick={() => setActiveTab("group")}
          >
            그룹 및 등급 설정
          </button>
        </div>

        {activeTab === "signup" && (
          <div className="member-settings__content">
            <div className="member-settings__card">
              <h3 className="member-settings__card-title">가입 설정</h3>

              <div className="member-settings__row">
                <span className="member-settings__label">가입설정</span>
                <div className="member-settings__field">
                  <label className="member-settings__checkbox">
                    <input
                      type="checkbox"
                      checked={loginEnabled}
                      onChange={(e) => setLoginEnabled(e.target.checked)}
                    />
                    로그인/가입 사용
                  </label>
                  <p className="member-settings__hint">
                    로그인 및 회원 가입 버튼을 표시합니다.
                    <br />
                    이를 해제하더라도 기존에 가입된 회원은 특정한 경로(예: 회원
                    권한이 필요한 메뉴에서 로그인)로 로그인이 가능합니다.
                  </p>
                </div>
              </div>

              <div className="member-settings__row">
                <span className="member-settings__label">약관동의</span>
                <div className="member-settings__field">
                  <label className="member-settings__radio">
                    <input
                      type="radio"
                      name="terms"
                      checked={termsOption === "step"}
                      onChange={() => setTermsOption("step")}
                    />
                    가입시 약관 동의 단계 거치기 (권장)
                  </label>
                  <label className="member-settings__radio">
                    <input
                      type="radio"
                      name="terms"
                      checked={termsOption === "inline"}
                      onChange={() => setTermsOption("inline")}
                    />
                    약관 동의 단계 대신 회원정보 입력 하단에 약관동의 문구 표시
                  </label>
                  <label className="member-settings__radio">
                    <input
                      type="radio"
                      name="terms"
                      checked={termsOption === "none"}
                      onChange={() => setTermsOption("none")}
                    />
                    약관 동의를 사용하지 않음
                  </label>
                </div>
              </div>

              <div className="member-settings__row">
                <span className="member-settings__label">기타 약관동의</span>
                <div className="member-settings__field">
                  <label className="member-settings__checkbox">
                    <input
                      type="checkbox"
                      checked={socialTerms}
                      onChange={(e) => setSocialTerms(e.target.checked)}
                    />
                    소셜 로그인시에도 신규 회원인 경우 약관 동의 받기
                  </label>
                  <label className="member-settings__checkbox">
                    <input
                      type="checkbox"
                      checked={checkAllTerms}
                      onChange={(e) => setCheckAllTerms(e.target.checked)}
                    />
                    전체 약관 동의 클릭 시 선택 항목까지 동의 체크하기
                  </label>
                </div>
              </div>

              <div className="member-settings__row">
                <span className="member-settings__label">소셜 로그인</span>
                <div className="member-settings__field">
                  <button className="member-settings__btn">설정하기</button>
                </div>
              </div>

              <div className="member-settings__row">
                <span className="member-settings__label">가입안내</span>
                <div className="member-settings__field">
                  <textarea
                    className="member-settings__textarea"
                    placeholder="예: 아래 항목을 빠짐없이 입력해 주세요."
                    rows={3}
                  />
                  <p className="member-settings__hint">
                    회원가입시 정보입력 단계 상단에 표시될 내용입니다. (여러줄
                    입력 가능)
                    <br />
                    이용약관, 개인정보취급 방침 등의 변경은 약관 설정을
                    방문하세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="member-settings__card">
              <h3 className="member-settings__card-title">공통항목</h3>
              <table className="member-settings__table">
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>로그인 계정</th>
                    <th>사용</th>
                    <th>필수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>이메일 주소</td>
                    <td>
                      <input type="radio" name="loginType" defaultChecked />
                    </td>
                    <td>
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td>
                      <input type="checkbox" defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <td>아이디</td>
                    <td>
                      <input type="radio" name="loginType" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      비밀번호
                      <button className="member-settings__btn member-settings__btn--small">
                        정책 수정
                      </button>
                    </td>
                    <td>-</td>
                    <td>
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td>
                      <input type="checkbox" defaultChecked />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="member-settings__card">
              <h3 className="member-settings__card-title">가입 폼 관리</h3>

              <div className="member-settings__member-type">
                <div className="member-settings__member-type-header">
                  <label className="member-settings__checkbox">
                    <input
                      type="checkbox"
                      checked={generalMemberEnabled}
                      onChange={(e) =>
                        setGeneralMemberEnabled(e.target.checked)
                      }
                    />
                    일반 회원
                  </label>
                  <button className="member-settings__btn member-settings__btn--small">
                    설정
                  </button>
                </div>
                <table className="member-settings__table">
                  <thead>
                    <tr>
                      <th>항목</th>
                      <th>사용</th>
                      <th>필수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        이름
                        <button className="member-settings__btn member-settings__btn--small">
                          수정
                        </button>
                      </td>
                      <td>
                        <input type="checkbox" defaultChecked />
                      </td>
                      <td>
                        <input type="checkbox" defaultChecked />
                      </td>
                    </tr>
                    <tr>
                      <td>성별</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>홈페이지</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        연락처
                        <button className="member-settings__btn member-settings__btn--small">
                          수정
                        </button>
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>주소</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>생년월일</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                    <tr>
                      <td>추천인</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="member-settings__link-btn">
                  + 사용자 정의 항목 추가
                </button>
              </div>

              <div className="member-settings__member-type">
                <div className="member-settings__member-type-header">
                  <label className="member-settings__checkbox">
                    <input
                      type="checkbox"
                      checked={businessMemberEnabled}
                      onChange={(e) =>
                        setBusinessMemberEnabled(e.target.checked)
                      }
                    />
                    사업자 회원
                  </label>
                  <button className="member-settings__btn member-settings__btn--small">
                    설정
                  </button>
                </div>
              </div>

              <button className="member-settings__link-btn member-settings__link-btn--add">
                + 새 유형 추가
              </button>
            </div>

            <div className="member-settings__save-bar">
              <button className="member-settings__btn member-settings__btn--primary">
                저장
              </button>
            </div>
          </div>
        )}

        {activeTab === "group" && (
          <div className="member-settings__content">
            <div className="member-settings__card">
              <h3 className="member-settings__card-title">기본 그룹 설정</h3>
              <div className="member-settings__row">
                <span className="member-settings__label">일반 회원</span>
                <select className="member-settings__select">
                  <option>그룹없음</option>
                </select>
              </div>
            </div>

            <div className="member-settings__card">
              <h3 className="member-settings__card-title">회원 그룹 설정</h3>
              <table className="member-settings__table">
                <thead>
                  <tr>
                    <th>그룹 유형</th>
                    <th>그룹명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="member-settings__badge">회원</span>
                    </td>
                    <td>그룹없음</td>
                  </tr>
                </tbody>
              </table>
              <button className="member-settings__link-btn">
                + 새 그룹 추가
              </button>
            </div>

            <div className="member-settings__card">
              <h3 className="member-settings__card-title">쇼핑 등급 설정</h3>
              <div className="member-settings__notice">
                <p>
                  고객의 회원가입 유도 및 재구매율을 향상시키기 위해 쇼핑
                  등급을 사용할 수 있습니다. 회원의 구매 금액에 따라 할인이나
                  적립금 추가 지급과 같은 혜택을 차등 제공할 수 있습니다.
                </p>
                <button className="member-settings__link-btn">
                  자세히 알아보기
                </button>
              </div>

              <div className="member-settings__row">
                <span className="member-settings__label">사용여부</span>
                <label className="member-settings__checkbox">
                  <input
                    type="checkbox"
                    checked={gradeEnabled}
                    onChange={(e) => setGradeEnabled(e.target.checked)}
                  />
                  사용
                </label>
              </div>

              <table className="member-settings__table">
                <thead>
                  <tr>
                    <th>등급유형</th>
                    <th>등급명</th>
                    <th>등급기준</th>
                    <th>할인</th>
                    <th>최대 할인</th>
                    <th>적립금 추가 적립</th>
                    <th>최대 적립</th>
                    <th>배송비 면제</th>
                  </tr>
                </thead>
                <tbody>
                  {!gradeEnabled && (
                    <tr>
                      <td colSpan={8} className="member-settings__empty">
                        쇼핑 등급 설정을 사용하고 있지 않습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default MemberSettingsPage;
