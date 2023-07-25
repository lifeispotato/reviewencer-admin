import React, { useEffect, useState } from "react";
import "../../../css/site/popup/Popup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../component/Modal";

const Popup = () => {
  const navigate = useNavigate();

  const [activation, setActivation] = useState(false);
  const [authority, setAuthority] = useState(false);
  //팝업 제어
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container popup-container">
          <h2>팝업 관리</h2>
          <div className="popup-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 문의 수</span>
                <span className="b7 ">000</span>
              </div>
              <div className="table-search table-top-btn">
                <button className="table-del-btn">
                  <span className="b5">삭제</span>
                </button>
                <button className="table-add-btn">
                  <span
                    className="b5"
                    onClick={() => navigate("/admin/site/popup/add")}
                  >
                    추가하기
                  </span>
                </button>
              </div>
            </div>
            <div className="popup-table">
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
                    <th>제목</th>
                    <th>등록일자</th>
                    <th>게시여부</th>
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
                    <td>제목제목제목제목제목제목제목제목</td>
                    <td>2023.01.01.</td>
                    <td>
                      <div className="table-filter">
                        <span>게시중</span>
                        <img
                          src="/img/table-chevron.svg"
                          onClick={() =>
                            setActivation((activation) => !activation)
                          }
                        />
                      </div>
                      {activation ? (
                        <div className="table-submenu-container">
                          <div className="table-submenu">
                            <span>게시중</span>
                          </div>
                          <div className="table-submenu">
                            <span>숨김</span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="table-btn-detail">
                      <button
                        onClick={() => navigate("/admin/site/popup/detail")}
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
      {isOpen ? (
        <Modal
          type={"del"}
          content={
            <span className="b2">삭제된 항목은 복구가 불가능합니다.</span>
          }
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Popup;
