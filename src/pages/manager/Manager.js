import React, { useEffect, useState } from "react";
import "../../css/manager/Manager.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../component/Modal";

const Manager = () => {
  const navigate = useNavigate();

  const [activation, setActivation] = useState(false);
  const [authority, setAuthority] = useState(false);
  //팝업 제어
  //삭제 눌렀을 때는 1, 승인하기 버튼 눌렀을 때는 2
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container manager-container">
          <h2>관리자 권한 관리</h2>
          <div className="manager-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 관리자 (미승인 포함) 수</span>
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
            <div className="manager-table">
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
                    <th>이메일</th>
                    <th>이름</th>
                    <th>관리자 유형</th>
                    <th>신청일/승인일</th>
                    <th>활성화</th>
                    <th>승인상태</th>
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
                    <td>이메일@이메일.com</td>
                    <td>홍길동</td>
                    <td>—</td>
                    <td>2023.01.01.</td>
                    <td>
                      <div className="table-filter">
                        <span>비활성</span>
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
                            <span className="b8">활성화</span>
                          </div>
                          <div className="table-submenu">
                            <span className="b8">비활성</span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="table-btn-del">
                      <div className="manager-access-wrap">
                        <span>미승인</span>
                        <button className="manager-access-btn c1">
                          승인하기
                        </button>
                      </div>
                    </td>
                    <td className="table-btn-detail">
                      <button onClick={() => navigate("/admin/manager/detail")}>
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
            <span className="b2">삭제된 관리자는 복구가 불가능합니다.</span>
          }
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
      {isOpen === 2 ? (
        <Modal
          type={"access"}
          content={
            <span className="b2">ADMIN 관리자로 승인될 예정입니다.</span>
          }
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Manager;
