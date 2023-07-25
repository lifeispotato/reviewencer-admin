import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../css/dashboard/Main.css";

const Main = () => {
  let navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-wrap main-wrap">
        {/* 메인 동그라미 두개 */}
        <div className="main-ellipse-1"></div>
        <img className="main-ellipse-2" src="/img/main/main-ellipse-2.png" />
        <div className="admin-content-container main-container">
          <h5>Welcome!</h5>
          <div className="main-greetings">
            <h1>안녕하세요. 관리자님 :)</h1>
            <div className="main-user-count-container">
              <div className="all-user-count-container">
                <span className="b3">전체 이용자 수</span>
                <span className="b3">000명</span>
              </div>
              <div className="main-registration-secession">
                <span className="b3">회원(가입/탈퇴)</span>
                <span className="b3">000/000</span>
              </div>
            </div>
          </div>
          <div className="main-visitant-graph-container">
            <span className="b3">방문자 통계</span>
            <div className="main-graph-container">
              <div className="graph-chevron-left">
                <img className="cursorPointer" src="\img\chevron-left.svg" />
              </div>
              <div className="main-visitant-graph">
                <div className="graph-axis-wrap">
                  <div>
                    <span>15</span>
                    <div className="graph-axis-line"></div>
                  </div>
                  <div>
                    <span>10</span>
                    <div className="graph-axis-line"></div>
                  </div>
                  <div>
                    <span>5</span>
                    <div className="graph-axis-line"></div>
                  </div>
                  <div>
                    <span>0</span>
                    <div className="graph-axis-line"></div>
                  </div>
                </div>
                <div className="graph-bar-wrap">
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                  <div className="graph-bar-value">
                    <span>10</span>
                    <div>
                      <div className="graph-bar"></div>
                    </div>
                    <span>mm/dd</span>
                  </div>
                </div>
              </div>
              <div className="graph-chevron-right">
                <img className="cursorPointer" src="\img\chevron-right.svg" />
              </div>
            </div>
          </div>
          <div className="main-quick-menu">
            <span className="b3">퀵메뉴</span>
            <div className="main-quick-menu-list">
              <div
                className="main-quick-menu-container"
                onClick={() => navigate("/admin/dashboard/analyze")}
              >
                <span className="b7">대시보드</span>
                <div>
                  <span>고급 방문자 분석</span>
                  <img src="/img/main/quick-menu-arrow.svg" />
                </div>
              </div>
              <div
                className="main-quick-menu-container"
                onClick={() => navigate("/admin/strategy/marketing")}
              >
                <span className="b7">전략 관리</span>
                <div>
                  <span>마케팅 전략 관리</span>
                  <img src="/img/main/quick-menu-arrow.svg" />
                </div>
              </div>
              <div
                className="main-quick-menu-container"
                onClick={() => {
                  navigate("/admin/strategy/recommend");
                }}
              >
                <span>전략 관리</span>
                <div>
                  <span>추천 전략 관리</span>
                  <img src="/img/main/quick-menu-arrow.svg" />
                </div>
              </div>
              <div
                className="main-quick-menu-container"
                onClick={() => {
                  navigate("/admin/ask");
                }}
              >
                <span>문의 관리</span>
                <div>
                  <span>문의 관리</span>
                  <img src="/img/main/quick-menu-arrow.svg" />
                </div>
              </div>
              <div
                className="main-quick-menu-container"
                onClick={() => navigate("/admin/site/popup")}
              >
                <span>사이트 관리</span>
                <div>
                  <span>팝업 관리</span>
                  <img src="/img/main/quick-menu-arrow.svg" />
                </div>
              </div>
              <div
                className="main-quick-menu-container"
                onClick={() => navigate("/admin/site/terms")}
              >
                <span>사이트 관리</span>
                <div>
                  <span>약관 관리</span>
                  <img src="/img/main/quick-menu-arrow.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
