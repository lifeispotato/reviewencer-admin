import React, { useEffect, useState } from "react";
import "../../../css/site/popup/Popup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../component/Modal";
import PopupApi from "../../../api/site/PopupApi";
import moment from "moment";
import Pagenation from "../../../component/Pagenation";

const Popup = () => {
  const navigate = useNavigate();

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(10); //가져오는 페이지 수
  const [pageIndex, setPageIndex] = useState([]); //총페이지/가져오는 페이지 수 올림
  const [startIndex, setStartIndex] = useState(0); //시작하는 pageIndex

  const [activation, setActivation] = useState(false);

  //팝업 제어 -> 삭제 눌렀을 때는 1, 승인하기 버튼 눌렀을 때는 2
  const [isOpen, setIsOpen] = useState(false);
  const [popupCancel, setPopupCancel] = useState(0);

  //매니저 정보 받아오기
  const [popupList, setPopupList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    getPopupList();
  }, [currentPage]);

  const getPopupList = async () => {
    try {
      const list = (
        await PopupApi.GetList({
          page: currentPage - 1,
          size: postsPerPage,
        })
      ).data.data;
      setPopupList(list.content);

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

  // 팝업 게시여부 제어
  const activationChange = async (id, state) => {
    let obj = {
      activation: state,
    };
    try {
      await PopupApi.PutActivation(id, obj);
      getPopupList();
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  //삭제
  const [arr, setArr] = useState([]);
  const [delArr, setDelArr] = useState([]);
  const delItem = async () => {
    let copy = [...delArr];
    arr.map((item) => {
      copy.push(item);
    });
    setDelArr(copy);
    try {
      setIsOpen(true);
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
            await PopupApi.Del(obj);
          });
          setPopupCancel(0);
        }
        setTimeout(function () {
          getPopupList();
        }, 100);
      } catch (error) {
        toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
      }
    };
    del();
  }, [popupCancel]);

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container popup-container">
          <h2>팝업 관리</h2>
          <div className="popup-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 문의 수</span>
                <span className="b7 ">{totalCount}</span>
              </div>
              <div className="table-search table-top-btn">
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
                        onChange={(e) => {
                          if (e.target.checked) {
                            const temp = popupList.map((value) => value.id);
                            setArr(temp);
                          } else {
                            setArr([]);
                          }
                        }}
                      />
                    </th>
                    <th>제목</th>
                    <th>등록일자</th>
                    <th>게시여부</th>
                    <th>상세보기</th>
                  </tr>
                </thead>
                <tbody>
                  {popupList &&
                    popupList.map((item, index) => {
                      let createDate = moment(item.createdAt).format(
                        "YYYY.MM.DD."
                      );
                      return (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              // // ----- 체크박스 이벤트 코드 -----//
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
                          <td>{item.title}</td>
                          <td>{createDate}</td>
                          <td>
                            <div className="table-filter">
                              <span
                                style={{
                                  color: `${
                                    item.activation ? "#262C31" : "#FF003D"
                                  }`,
                                }}
                              >
                                {item.activation ? "게시중" : "숨김"}
                              </span>
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
                                    게시중
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
                                    activationChange(item.id, false);
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
                                    숨김
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
                          <td className="table-btn-detail">
                            <button
                              onClick={() =>
                                navigate(`/admin/site/popup/detail/${item.id}`)
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
            <span className="b2">삭제된 항목은 복구가 불가능합니다.</span>
          }
          setIsOpen={setIsOpen}
          setPopupCancel={setPopupCancel}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Popup;
