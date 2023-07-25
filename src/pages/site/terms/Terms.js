import React, { useEffect, useState } from "react";
import "../../../css/site/terms/Terms.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Terms = () => {
  const navigate = useNavigate();

  const [activation, setActivation] = useState(false);
  const [authority, setAuthority] = useState(false);
  //팝업 제어
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container terms-container">
          <h2>약관 관리</h2>
          <div className="terms-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 약관 수</span>
                <span className="b7 ">000</span>
              </div>
            </div>
            <div className="terms-table">
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
                    <th>약관종류</th>
                    <th>마지막 수정 일자</th>
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
                    <td>이용약관</td>
                    <td>2023.01.01.</td>
                    <td className="table-btn-detail">
                      <button
                        onClick={() => navigate("/admin/site/terms/detail")}
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

export default Terms;
