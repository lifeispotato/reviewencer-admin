import React, { useEffect, useState } from "react";
import "../../../css/strategy/marketing/Marketing.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../component/Modal";

const Marketing = () => {
  const navigate = useNavigate();

  const [activation, setActivation] = useState(false);
  const [authority, setAuthority] = useState(false);
  //팝업 제어
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container marketing-container">
          <h2>마케팅 전략 관리</h2>
          <div className="marketing-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 전략 수</span>
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
                <div className="table-search table-top-btn">
                  <button className="table-del-btn">
                    <span className="b5">삭제</span>
                  </button>
                  <button
                    className="table-add-btn"
                    onClick={() => navigate("/admin/strategy/marketing/add")}
                  >
                    <span className="b5">추가하기</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="marketing-table">
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
                    <th>전략 이름</th>
                    <th>전략 설명</th>
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
                    <td>상위노출</td>
                    <td>
                      여기에 전략 설명란이 들어갑니다. 여기에 전략 설명란이
                      들어갑니다. 여기에 전략 설명란이 들어갑니다.{" "}
                    </td>
                    <td className="table-btn-detail">
                      <button
                        onClick={() =>
                          navigate("/admin/strategy/marketing/detail")
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
                <span className="b4 page-ac">1</span>
                <span className="b4">2</span>
                <span className="b4">3</span>
                <span className="b4">4</span>
              </div>
              <img src="/img/chevron-right.svg" />
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <Modal
          type={"del"}
          content={
            <span className="b2">
              웹에 출력되고 있는 전략을 삭제할 경우
              <br />더 이상 웹에 출력되지 않습니다.
            </span>
          }
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Marketing;
