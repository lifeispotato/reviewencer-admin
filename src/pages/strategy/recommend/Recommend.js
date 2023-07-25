import React, { useEffect, useState } from "react";
import "../../../css/strategy/recommend/Recommend.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Recommend = () => {
  const navigate = useNavigate();

  const [activation, setActivation] = useState(false);
  const [authority, setAuthority] = useState(false);
  //팝업 제어
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container recommend-container">
          <h2>전략 추천 관리</h2>
          <div className="recommend-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 조합 수</span>
                <span className="b7 ">000</span>
              </div>
              <div className="table-search">
                <div className="table-search-bar">
                  <input
                    className="search-bar-input"
                    type="text"
                    placeholder="검색어를 입력하세요"
                  />
                  <img src="/img/search-glass.svg" />
                </div>
                <button className="table-del-btn">
                  <span className="b5">삭제</span>
                </button>
              </div>
            </div>
            <div className="recommend-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        // ----- 체크박스 이벤트 코드 -----//
                        // onChange={(e) => {
                        //   if (e.target.checked) {
                        //     const temp = faqList.map((value) => value.id);
                        //     setArr(temp);
                        //   } else {
                        //     setArr([]);
                        //   }
                        // }}
                      />
                    </th>
                    <th>업종</th>
                    <th>마케팅 목적</th>
                    <th>예산</th>
                    <th>추천 전략</th>
                    <th>상세보기</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        // // ----- 체크박스 이벤트 코드 -----//
                        // checked={arr.includes(item.id)}
                        // onChange={(e) => {
                        //   let copyData = [...arr];
                        //   if (e.target.checked) {
                        //     copyData.push(item.id);
                        //     setArr(copyData);
                        //   } else {
                        //     let arrTemp = copyData.filter(
                        //       (item02) => item02 !== item.id
                        //     );
                        //     setArr(arrTemp);
                        //   }
                        // }}
                      />
                    </td>
                    <td>전문직</td>
                    <td>브랜딩</td>
                    <td>201~300만원</td>
                    <td>브랜드 블로그, 상위노출, 최적화 계정, 자동완성</td>
                    <td className="table-btn-detail">
                      <button
                        onClick={() =>
                          navigate("/admin/strategy/recommend/detail")
                        }
                      >
                        <img src="/img/plus-btn-ico.svg" />
                        <span className="c1">보기</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pagenation-container">
              <img src="/img/chevron-left.svg" />
              <div className="pagenation-number">
                <span className="b3">1</span>
                <span className="b3">2</span>
                <span className="b3">3</span>
                <span className="b3">4</span>
              </div>
              <img src="/img/chevron-right.svg" />
            </div>
          </div>
        </div>
      </div>
      {/* {isOpen ? (
        <CheckPopup
          content={"필수입력 항목을 작성해 주세요."}
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Recommend;
