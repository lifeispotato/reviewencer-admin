import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../css/dashboard/Main.css";
import CountApi from "../../api/dashbord/CountApi";
import { toast } from "react-toastify";
import moment from "moment";

const Main = () => {
  let navigate = useNavigate();

  //사용자수
  const [Count, setCount] = useState({
    totalCount: null,
    joinCount: null,
    leaveCount: null,
  });
  //방문자수, 날짜 정보
  const [visit, setVisit] = useState([]);
  const [graphMax, setGraphMax] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    getCount();
  }, [currentPage]);
  const getCount = async () => {
    try {
      // const info = (await CountApi.Get()).data.data;
      // setCount(info);
      const visitor = (
        await CountApi.GetVisitor({ size: 10, page: currentPage })
      ).data.data;
      console.log(visitor);
      setVisit(visitor.content);
      setTotalPages(visitor.totalPages);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  const [visitLine, setVisitLine] = useState([]);
  useEffect(() => {
    let num = 0;
    let line = [];
    visit.map((item) => {
      if (num >= item.count) {
        return;
      } else {
        num = item.count;
      }
    });
    setGraphMax(num);
    let per = num / 3;
    for (let i = 0; i < 3; i++) {
      line.push(Math.round(num - per * i));
    }
    setVisitLine(line);
  }, [visit]);

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
                <img
                  src="\img\chevron-left.svg"
                  onClick={() => {
                    if (currentPage >= totalPages) {
                      return;
                    }
                    setCurrentPage(currentPage + 1);
                  }}
                />
              </div>
              <div className="main-visitant-graph">
                <div className="graph-axis-wrap">
                  {visitLine?.map((item, index) => {
                    return (
                      <div>
                        <span>{item}</span>
                        <div className="graph-axis-line"></div>
                      </div>
                    );
                  })}
                  <div>
                    <span>0</span>
                    <div className="graph-axis-line"></div>
                  </div>
                </div>
                <div className="graph-bar-wrap">
                  {visit?.map((item, index) => {
                    let today = moment(item.today).format("MM/DD");
                    return (
                      <div className="graph-bar-value">
                        <div className="graph-line-container">
                          <span className="graph-value-count">
                            {item.count}
                          </span>
                          <div
                            className="graph-bar"
                            style={{
                              height: `calc(183px - 183px*${
                                1 - item.count / graphMax
                              })`,
                              backgroundColor: `${
                                item.numberOfElements % 2 === 0
                                  ? "#36a6e5"
                                  : "#0080ff"
                              }`,
                            }}
                          ></div>
                          {/* <div ></div> */}
                        </div>
                        <span className="graph-value-date">{today}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="graph-chevron-right">
                <img
                  className="cursorPointer"
                  src="\img\chevron-right.svg"
                  onClick={() => {
                    if (currentPage <= 0) {
                      return;
                    }
                    setCurrentPage(currentPage - 1);
                  }}
                />
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
