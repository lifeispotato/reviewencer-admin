import React, { useEffect, useState } from "react";
import "../../../css/strategy/recommend/Recommend.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecommendApi from "../../../api/strategy/RecommendApi";
import Pagenation from "../../../component/Pagenation";
import Modal from "../../../component/Modal";

const Recommend = () => {
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
  const [recommendList, setRecommendList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    getRecommendList();
  }, [currentPage]);

  const getRecommendList = async () => {
    try {
      const list = (
        await RecommendApi.GetList({
          page: currentPage - 1,
          size: postsPerPage,
        })
      ).data.data;
      setRecommendList(list.content);

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
      await RecommendApi.PutActivation(id, obj);
      getRecommendList();
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
            await RecommendApi.Del(obj);
          });
          setPopupCancel(0);
          setTimeout(function () {
            getRecommendList();
          }, 100);
        }
      } catch (error) {
        toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
      }
    };
    del();
  }, [popupCancel]);

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
                        onChange={(e) => {
                          if (e.target.checked) {
                            const temp = recommendList.map((value) => value.id);
                            setArr(temp);
                          } else {
                            setArr([]);
                          }
                        }}
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
                  {recommendList &&
                    recommendList.map((item, index) => {
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
                          <td>{item.sectorTitle}</td>
                          <td>{item.purposeTitle}</td>
                          <td>{item.budgetTitle}</td>
                          <td>
                            {item.marketings.map((item, i) => {
                              return `${item.title},`;
                            })}
                          </td>
                          <td className="table-btn-detail">
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/strategy/recommend/detail/${item.id}`
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

export default Recommend;
