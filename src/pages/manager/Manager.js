import React, { useEffect, useState } from "react";
import "../../css/manager/Manager.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../component/Modal";
import ManagerApi from "../../api/manager/ManagerApi.js";
import moment from "moment/moment";
import Pagenation from "../../component/Pagenation";

const Manager = () => {
  const navigate = useNavigate();

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(10); //가져오는 페이지 수
  const [pageIndex, setPageIndex] = useState([]); //총페이지/가져오는 페이지 수 올림
  const [startIndex, setStartIndex] = useState(0); //시작하는 pageIndex

  const [activation, setActivation] = useState(null);
  const [authority, setAuthority] = useState(null);
  const [approve, setApprove] = useState(false);

  //팝업 제어 -> 삭제 눌렀을 때는 1, 승인하기 버튼 눌렀을 때는 2
  const [isOpen, setIsOpen] = useState(false);
  const [popupCancel, setPopupCancel] = useState(0);

  //매니저 정보 받아오기
  const [managerList, setManagerList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    getManagerList();
  }, [currentPage]);

  const getManagerList = async () => {
    try {
      const list = (
        await ManagerApi.GetList({
          keyword: search,
          page: currentPage - 1,
          size: postsPerPage,
        })
      ).data.data;
      setManagerList(list.content);

      //페이지네이션 계산
      setTotalCount(list.totalElements);
      const count = Math.ceil(list.totalElements / list.content.length / 5);
      for (let i = 1; i <= count; i++) {
        if (currentPage / 5 <= i) {
          setStartIndex(5 * (i - 1));
          return;
        }
      }
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  //페이지네이션 숫자
  useEffect(() => {
    let page = Math.ceil(totalCount / postsPerPage);
    let arr = [];
    for (var i = 1; i <= page; i++) {
      arr.push(i);
    }
    setPageIndex(arr);
  }, [totalCount]);

  //관리자 활성화 제어
  const activationChange = async (id, state, authority) => {
    if (authority === "ROOT") {
      toast("ROOT 관리자는 삭제가 불가능합니다.");
      return;
    }
    let obj = {
      activation: state,
    };
    try {
      await ManagerApi.PutActivation(id, obj);
      getManagerList();
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  //관리자 승인
  const [approveId, setApproveId] = useState();
  const approveManager = (id) => {
    setApproveId(id);
    setIsOpen(2);
  };
  useEffect(() => {
    const approveHandler = async () => {
      try {
        if (approve) {
          await ManagerApi.PutApprove(approveId);
          setApprove(false);
          getManagerList();
        }
      } catch (error) {}
    };
    approveHandler();
  }, [approve]);

  //관리자 삭제
  const [arr, setArr] = useState([]);
  const [delArr, setDelArr] = useState([]);
  const delItem = async () => {
    try {
      let copy = [...delArr];
      let state = false;
      arr.map((item) => {
        if (
          managerList[managerList.findIndex((e) => e.id === item)]
            .managerAuthority === "ROOT"
        ) {
          state = true;
          // toast("ROOT 관리자는 삭제가 불가능합니다.");
          return;
        }
        copy.push(item);
      });
      if (state) {
        toast("ROOT 관리자는 삭제가 불가능합니다.");
        return;
      } else {
        setDelArr(copy);
        setIsOpen(true);
      }
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };
  useEffect(() => {
    const del = () => {
      try {
        if (popupCancel === 1) {
          return;
        }
        if (popupCancel === 2) {
          let obj = {};
          delArr.map(async (item) => {
            obj = {
              idList: item,
            };
            // await ManagerApi.Del(obj);
          });
          setPopupCancel(0);
        }
        setTimeout(function () {
          getManagerList();
        }, 100);
      } catch (error) {
        toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
      }
    };
    del();
  }, [popupCancel]);

  //검색어입력
  const [search, setSearch] = useState();
  const handleSearch = () => {
    getManagerList();
  };

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container manager-container">
          <h2>관리자 권한 관리</h2>
          <div className="manager-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 관리자 (미승인 포함) 수</span>
                <span className="b7 ">{totalCount}</span>
              </div>
              <div className="table-search">
                <div className="table-search-bar">
                  <input
                    className="search-bar-input"
                    type="text"
                    placeholder="검색어를 입력하세요"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <img src="/img/search-glass.svg" onClick={handleSearch} />
                </div>
                <button className="table-del-btn">
                  <span
                    className="b5"
                    onClick={() => {
                      if (arr.length === 0) {
                        return;
                      }
                      delItem();
                    }}
                  >
                    삭제
                  </span>
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
                        //----- 체크박스 이벤트 코드 -----//
                        onChange={(e) => {
                          if (e.target.checked) {
                            const temp = managerList.map((value) => value.id);
                            setArr(temp);
                          } else {
                            setArr([]);
                          }
                        }}
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
                  {managerList &&
                    managerList.map((item, index) => {
                      let createDate = moment(item.createdAt).format(
                        "YYYY.MM.DD."
                      );
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              // ----- 체크박스 이벤트 코드 -----//
                              checked={arr.includes(item.id)}
                              onChange={(e) => {
                                let copyData = [...arr];
                                if (e.target.checked) {
                                  copyData.push(item.id);
                                  setArr(copyData);
                                } else {
                                  let arrTemp = copyData.filter(
                                    (item02) => item02 !== item.id
                                  );
                                  setArr(arrTemp);
                                }
                              }}
                            />
                          </td>
                          <td>{item.email}</td>
                          <td>{item.name}</td>
                          <td>{item.approve ? item.managerAuthority : "—"}</td>
                          <td>{createDate}</td>
                          <td>
                            <div className="table-filter">
                              <span>{item.activation ? "활성" : "비활성"}</span>
                              <img
                                src="/img/table-chevron.svg"
                                onClick={() => {
                                  if (activation === index) {
                                    setActivation(false);
                                  } else {
                                    setActivation(index);
                                  }
                                }}
                              />
                            </div>
                            {activation === index ? (
                              <div className="table-submenu-container">
                                <div
                                  className="table-submenu"
                                  onClick={() => {
                                    activationChange(item.id, true);
                                    setActivation(false);
                                  }}
                                >
                                  <span
                                    className="b8"
                                    style={{
                                      color: `${
                                        item.activation ? "#262C31" : "#808991"
                                      }`,
                                    }}
                                  >
                                    활성
                                  </span>
                                  {item.activation ? (
                                    <img src="/img/table-ac-check.svg" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div
                                  className="table-submenu"
                                  onClick={() => {
                                    activationChange(
                                      item.id,
                                      false,
                                      item.managerAuthority
                                    );
                                    setActivation(false);
                                  }}
                                >
                                  <span
                                    className="b8"
                                    style={{
                                      color: `${
                                        !item.activation ? "#262C31" : "#808991"
                                      }`,
                                    }}
                                  >
                                    비활성
                                  </span>
                                  {!item.activation ? (
                                    <img src="/img/table-ac-check.svg" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="table-btn-del">
                            <div className="manager-access-wrap">
                              <span
                                className={`b7 ${
                                  item.approve ? "" : "manager-access-text"
                                }`}
                              >
                                {item.approve ? "승인" : "미승인"}
                              </span>
                              {item.approve ? (
                                ""
                              ) : (
                                <button
                                  className="manager-access-btn c1"
                                  onClick={() => approveManager(item.id)}
                                >
                                  승인하기
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="table-btn-detail">
                            <button
                              onClick={() =>
                                navigate(`/admin/manager/detail/${item.id}`)
                              }
                            >
                              <img src="/img/plus-btn-ico.svg" />
                              <span className="c1">보기</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Pagenation
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageIndex={pageIndex}
                startIndex={startIndex}
              />
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
          setPopupCancel={setPopupCancel}
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
          setApprove={setApprove}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Manager;
