import React, { useEffect, useState } from "react";
import "../../css/dashboard/Analyze.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../component/Modal";

const Analyze = () => {
  const navigate = useNavigate();

  const [activation, setActivation] = useState(false);
  const [authority, setAuthority] = useState(false);
  //모달 제어
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container analyze-container">
          <h2>방문자 IP 확인</h2>
          <div className="analyze-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 이용자 수</span>
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
                  <button className="table-excel-btn">
                    <img src="/img/excel-download.svg" />
                    <span className="b5">엑셀로 내보내기</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="analyze-table">
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
                    <th>페이지</th>
                    <th>OS</th>
                    <th>시간(로컬)</th>
                    <th>도시</th>
                    <th>IP 주소</th>
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
                    <td>/238</td>
                    <td>Android</td>
                    <td>
                      2022-May-30, 17:47:06,
                      <br />
                      GMT+0900
                    </td>
                    <td>Seoul</td>
                    <td>123.456.78.987</td>
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
      {isOpen ? (
        <Modal
          type={"del"}
          content={
            <span className="b2">
              삭제하셔도 구글 애널리틱스에서는
              <br />
              삭제되지 않지만 관리자페이지에서는
              <br />
              복구가 불가능합니다.
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

export default Analyze;
