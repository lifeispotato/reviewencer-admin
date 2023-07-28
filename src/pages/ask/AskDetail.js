import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../component/Modal";
import AskApi from "../../api/ask/AskApi";
import { toast } from "react-toastify";

const AskDetail = () => {
  const navigate = useNavigate();

  //팝업 제어 -> 삭제 눌렀을 때는 1, 승인하기 버튼 눌렀을 때는 2
  const [isOpen, setIsOpen] = useState(false);
  const [popupCancel, setPopupCancel] = useState(0);

  //팝업 정보 가져오기
  const params = useParams();
  const [idInfo, setIdInfo] = useState(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIdInfo(params.id);
    getInfo(params.id);
  }, []);

  const getInfo = async (id) => {
    try {
      const info = (await AskApi.GetInfo(id)).data.data;
      setInfo(info);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  //삭제
  const delItem = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };
  useEffect(() => {
    const del = async () => {
      try {
        if (popupCancel === 1) {
          return;
        }
        if (popupCancel === 2) {
          let obj = {};
          obj = {
            idList: idInfo,
          };
          await AskApi.Del(obj);
          setPopupCancel(0);
          navigate(-1);
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
        <div className="admin-content-container admin-detail-container">
          <div className="detail-top-container">
            <div className="go-back-container">
              <img src="/img/chevron-left.svg" onClick={() => navigate(-1)} />
              <span className="b3">뒤로가기</span>
            </div>
            <div className="detail-btn-container">
              {/* <button className="detail-del-btn">삭제</button> */}
              <button className="table-del-btn b5" onClick={delItem}>
                삭제
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">문의상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">담당자명</span>
                <span className="form-content b9">{info.managerName}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">전화번호</span>
                <span className="form-content b9">{info.phoneNumber}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">홈페이지 주소</span>
                <a className="form-content b9">
                  <u>{info.link}</u>
                </a>
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <span className="form-content b9">{info.email}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">희망 프로젝트</span>
                <span className="form-content b9">{info.hopeProject}</span>
              </div>
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

export default AskDetail;
