import React, { useEffect, useState } from "react";
import "../../../css/site/terms/Terms.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TermsApi from "../../../api/site/TermsApi";
import moment from "moment";
import Pagenation from "../../../component/Pagenation";

const Terms = () => {
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
  const [termsList, setTermsList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    getTermsList();
  }, [currentPage]);

  const getTermsList = async () => {
    try {
      const list = (
        await TermsApi.GetList({
          page: currentPage - 1,
          size: postsPerPage,
        })
      ).data.data;
      setTermsList(list.content);
      console.log(list);

      //페이지네이션 계산
      setTotalCount(list.totalElements);
      const count = Math.ceil(list.totalElements / list.length / 5);
      for (let i = 1; i <= count; i++) {
        if (currentPage / 5 <= i) {
          setStartIndex(5 * (i - 1));
          return;
        }
      }
    } catch (error) {
      console.log(error);
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
            await TermsApi.Del(obj);
          });
          setPopupCancel(0);
          setTimeout(function () {
            getTermsList();
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
                        onChange={(e) => {
                          if (e.target.checked) {
                            const temp = termsList.map((value) => value.id);
                            setArr(temp);
                          } else {
                            setArr([]);
                          }
                        }}
                      />
                    </th>
                    <th>약관종류</th>
                    <th>마지막 수정 일자</th>
                    <th>상세보기</th>
                  </tr>
                </thead>
                <tbody>
                  {termsList &&
                    termsList.map((item, index) => {
                      let updateDate = moment(item.updatedAt).format(
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
                          <td>{updateDate}</td>
                          <td className="table-btn-detail">
                            <button
                              onClick={() =>
                                navigate(`/admin/site/terms/detail/${item.id}`)
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
      {/* {isOpen ? (
        <CheckTerms
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
