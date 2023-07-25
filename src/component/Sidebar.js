import React, { useEffect, useState } from "react";
import "../css/component/Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState(null);
  const [sidebar, setSidebar] = useState(1);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="admin-sidebar">
      <div className="sidebar-contents">
        <div className="sidebar-profile-container">
          <img src="/img/sidebar/profile-empty.svg" />
          <span className="b1 sidebar-email">관리자 이메일</span>
        </div>
        <div className="sidebar-list-container">
          <div
            className="sidebar-list"
            onClick={() => {
              if (sidebar === 1) {
                setSidebar(null);
              } else {
                setSidebar(1);
              }
            }}
          >
            <span
              className={`b1 sidebar-menu ${
                path?.includes("dashboard") ? "sidebar-active" : ""
              }`}
            >
              대시보드
            </span>
            {sidebar === 1 || path?.includes("dashboard") ? (
              <img src="/img/sidebar/sidebar-ac-ico.svg" />
            ) : (
              <img src="/img/sidebar/sidebar-plus.svg" />
            )}
          </div>
          {sidebar === 1 || path?.includes("dashboard") ? (
            <div className="sidebar-submenu-container">
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("dashboard/home")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/dashboard/home")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("dashboard/home") ? "text-ac" : ""
                    }`}
                  >
                    기본 방문자 통계
                  </span>
                </div>
              </div>
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("dashboard/analyze")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/dashboard/analyze")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("dashboard/analyze") ? "text-ac" : ""
                    }`}
                  >
                    고급 방문자 분석
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="sidebar-list"
            onClick={() => {
              if (sidebar === 2) {
                setSidebar(null);
              } else {
                setSidebar(2);
              }
            }}
          >
            <span
              className={`b1 sidebar-menu ${
                path?.includes("strategy") ? "sidebar-active" : ""
              }`}
            >
              전략 관리
            </span>
            {sidebar === 2 || path?.includes("strategy") ? (
              <img src="/img/sidebar/sidebar-ac-ico.svg" />
            ) : (
              <img src="/img/sidebar/sidebar-plus.svg" />
            )}
          </div>
          {sidebar === 2 || path?.includes("strategy") ? (
            <div className="sidebar-submenu-container">
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("strategy/marketing")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/strategy/marketing")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("strategy/marketing") ? "text-ac" : ""
                    }`}
                  >
                    마케팅 전략 관리
                  </span>
                </div>
              </div>
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("strategy/recommend")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/strategy/recommend")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("strategy/recommend") ? "text-ac" : ""
                    }`}
                  >
                    전략 추천 관리
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="sidebar-list"
            onClick={() => {
              if (sidebar === 3) {
                setSidebar(null);
              } else {
                setSidebar(3);
              }
            }}
          >
            <span
              className={`b1 sidebar-menu ${
                path?.includes("ask") ? "sidebar-active" : ""
              }`}
              onClick={() => navigate("/admin/ask")}
            >
              문의 관리
            </span>
            {/* {sidebar === 3 || path?.includes("content") ? (
              <img src="/img/sidebar/sidebar-ac-ico.svg" />
            ) : (
              <img src="/img/sidebar/sidebar-plus.svg" />
            )} */}
          </div>
          {/* {sidebar === 3 || path?.includes("content") ? (
            <div className="sidebar-submenu-container">
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("content/program")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/content/program")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("content/program") ? "text-ac" : ""
                    }`}
                  >
                    채용 프로그램
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )} */}
          <div
            className="sidebar-list"
            onClick={() => {
              if (sidebar === 4) {
                setSidebar(null);
              } else {
                setSidebar(4);
              }
            }}
          >
            <span
              className={`b1 sidebar-menu ${
                path?.includes("site") ? "sidebar-active" : ""
              }`}
            >
              사이트 관리
            </span>
            {sidebar === 4 || path?.includes("site") ? (
              <img src="/img/sidebar/sidebar-ac-ico.svg" />
            ) : (
              <img src="/img/sidebar/sidebar-plus.svg" />
            )}
          </div>
          {sidebar === 4 || path?.includes("site") ? (
            <div className="sidebar-submenu-container">
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("site/popup")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/site/popup")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("site/popup") ? "text-ac" : ""
                    }`}
                  >
                    팝업 관리
                  </span>
                </div>
              </div>
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("site/terms")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/site/terms")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("site/terms") ? "text-ac" : ""
                    }`}
                  >
                    약관 관리
                  </span>
                </div>
              </div>
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("site/base") ? "sidebar-submenu-info-ac" : ""
                  }`}
                  onClick={() => navigate("admin/site/base")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("site/base") ? "text-ac" : ""
                    }`}
                  >
                    기본 관리
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="sidebar-list"
            onClick={() => {
              if (sidebar === 5) {
                setSidebar(null);
              } else {
                setSidebar(5);
              }
            }}
          >
            <span
              className={`b1 sidebar-menu ${
                path?.includes("manager") ? "sidebar-active" : ""
              }`}
              onClick={() => navigate("/admin/manager")}
            >
              관리자 회원 관리
            </span>
            {/* {sidebar === 5 || path?.includes("setting") ? (
              <img src="/img/sidebar/sidebar-ac-ico.svg" />
            ) : (
              <img src="/img/sidebar/sidebar-plus.svg" />
            )} */}
          </div>
          {/* {sidebar === 5 || path?.includes("setting") ? (
            <div className="sidebar-submenu-container">
              <div className="sidebar-submenu">
                <div
                  className={`sidebar-submenu-info ${
                    path?.includes("setting/basic")
                      ? "sidebar-submenu-info-ac"
                      : ""
                  }`}
                  onClick={() => navigate("admin/setting/basic")}
                >
                  <span
                    className={`b5 ${
                      path?.includes("setting/basic") ? "text-ac" : ""
                    }`}
                  >
                    기본정보 관리
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
