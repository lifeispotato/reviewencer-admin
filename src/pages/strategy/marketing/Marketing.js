import React, { useEffect, useState } from "react";
import "../../../css/strategy/marketing/Marketing.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../component/Modal";
import MarketingApi from "../../../api/strategy/MarketingApi";
import Pagenation from "../../../component/Pagenation";

const Marketing = () => {
  const navigate = useNavigate();

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(10); //가져오는 페이지 수
  const [pageIndex, setPageIndex] = useState([]); //총페이지/가져오는 페이지 수 올림
  const [startIndex, setStartIndex] = useState(0); //시작하는 pageIndex

  //팝업 제어 -> 삭제 눌렀을 때는 1, 승인하기 버튼 눌렀을 때는 2
  const [isOpen, setIsOpen] = useState(false);
  const [popupCancel, setPopupCancel] = useState(0);

  //매니저 정보 받아오기
  const [marketingList, setMarketingList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    getMarketingList();
  }, [currentPage]);

  const getMarketingList = async () => {
    try {
      const list = (
        await MarketingApi.GetList({
          keyword: search,
          page: currentPage - 1,
          size: postsPerPage,
        })
      ).data.data;
      setMarketingList(list.content);

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

  //마케팅 전략 삭제
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
            await MarketingApi.Del(obj);
          });
          setPopupCancel(0);
        }
        setTimeout(function () {
          getMarketingList();
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
    getMarketingList();
  };

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container marketing-container">
          <h2>마케팅 전략 관리</h2>
          <div className="marketing-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 전략 수</span>
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
                <div className="table-search table-top-btn">
                  <button className="table-del-btn" onClick={delItem}>
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
                        onChange={(e) => {
                          if (e.target.checked) {
                            const temp = marketingList.map((value) => value.id);
                            setArr(temp);
                          } else {
                            setArr([]);
                          }
                        }}
                      />
                    </th>
                    <th>전략 이름</th>
                    <th>전략 설명</th>
                    <th>상세보기</th>
                  </tr>
                </thead>
                <tbody>
                  {marketingList &&
                    marketingList.map((item, index) => {
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
                          <td>{item.content}</td>
                          <td className="table-btn-detail">
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/strategy/marketing/detail/${item.id}`
                                )
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
            <span className="b2">
              웹에 출력되고 있는 전략을 삭제할 경우
              <br />더 이상 웹에 출력되지 않습니다.
            </span>
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

export default Marketing;
