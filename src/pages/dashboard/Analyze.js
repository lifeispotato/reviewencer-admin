import React, { useEffect, useState } from "react";
import "../../css/dashboard/Analyze.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../component/Modal";
import IpApi from "../../api/dashbord/IpApi";
import moment from "moment";
import Pagenation from "../../component/Pagenation";
import { saveAs } from "file-saver";

const Analyze = () => {
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

  //ip 정보 받아오기
  const [ipList, setIpList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    getIpList();
  }, [currentPage]);

  const getIpList = async () => {
    try {
      const list = (
        await IpApi.GetList({
          keyword: search,
          page: currentPage - 1,
          size: postsPerPage,
        })
      ).data.data;
      setIpList(list.content);

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
            await IpApi.Del(obj);
          });
          setPopupCancel(0);
        }
        setTimeout(function () {
          getIpList();
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
    getIpList();
  };

  //------------엑셀 생성
  const [excel, setExcel] = useState([]);
  const downloadExcel = async () => {
    const Excel = require("exceljs");
    const workbook = new Excel.Workbook();
    workbook.addWorksheet("Sheet One");
    const sheetOne = workbook.getWorksheet("Sheet One");

    sheetOne.columns = [
      { header: "OS", key: "os", width: 40 },
      { header: "시간(로컬)", key: "createdAt", width: 40 },
      { header: "도시", key: "city", width: 40 },
      { header: "IP 주소", key: "ip", width: 40 },
    ];

    excel.map((item, index) => {
      // 행 추가
      sheetOne.addRow(item);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "방문자 IP 확인.xlsx");
  };
  //------------액셀 부분 끝

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container analyze-container">
          <h2>방문자 IP 확인</h2>
          <div className="analyze-table-container">
            <div className="num-search">
              <div className="table-total-num">
                <span className="b7">전체 이용자 수</span>
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
                  <button className="table-excel-btn" onClick={downloadExcel}>
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
                        onChange={(e) => {
                          if (e.target.checked) {
                            let obj = [];
                            const temp = ipList.map((value) => value.id);
                            const excelTemp = ipList.map((item) => {
                              obj.push({
                                os: item.os,
                                city: item.city,
                                createdAt: item.createdAt,
                                ip: item.ip,
                              });
                            });
                            setArr(temp);
                            setExcel(obj);
                          } else {
                            setArr([]);
                            setExcel([]);
                          }
                        }}
                      />
                    </th>
                    <th>OS</th>
                    <th>시간(로컬)</th>
                    <th>도시</th>
                    <th>IP 주소</th>
                  </tr>
                </thead>
                <tbody>
                  {ipList &&
                    ipList.map((item, index) => {
                      let createDate = moment(item.createdAt).format(
                        "YYYY-MMMM-DD, hh:mm:ss,"
                      );
                      return (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              // // ----- 체크박스 이벤트 코드 -----//
                              checked={arr.includes(item.id)}
                              onChange={(e) => {
                                let obj = {
                                  os: item.os,
                                  city: item.city,
                                  createdAt: item.createdAt,
                                  ip: item.ip,
                                };
                                let copyData = [...arr];
                                let copyExcel = [...excel];
                                if (e.target.checked) {
                                  copyData.push(item.id);
                                  copyExcel.push(obj);
                                  setArr(copyData);
                                  setExcel(copyExcel);
                                } else {
                                  let arrTemp = copyData.filter(
                                    (item02) => item02 !== item.id
                                  );
                                  let excelTemp = copyExcel.filter(
                                    (item02) =>
                                      item02 !==
                                      copyExcel.find(
                                        (e) => e.account === item.account
                                      )
                                  );
                                  setArr(arrTemp);
                                  setExcel(excelTemp);
                                }
                              }}
                            />
                          </td>
                          <td>{item.os}</td>
                          <td>
                            {createDate}
                            <br />
                            GMT+0900
                          </td>
                          <td>{item.city}</td>
                          <td>{item.ip}</td>
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
              삭제하셔도 구글 애널리틱스에서는
              <br />
              삭제되지 않지만 관리자페이지에서는
              <br />
              복구가 불가능합니다.
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

export default Analyze;
