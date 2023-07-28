import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../component/Modal";
import MarketingApi from "../../../api/strategy/MarketingApi";
import { toast } from "react-toastify";

const MarketingDetail = () => {
  const navigate = useNavigate();

  //팝업 제어 -> 삭제 눌렀을 때는 1, 승인하기 버튼 눌렀을 때는 2
  const [isOpen, setIsOpen] = useState(false);
  const [popupCancel, setPopupCancel] = useState(0);

  //정보 가져오기
  const params = useParams();
  const [idInfo, setIdInfo] = useState(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIdInfo(params.id);
    getInfo(params.id);
  }, []);

  const getInfo = async (id) => {
    try {
      const info = (await MarketingApi.GetInfo(id)).data.data;
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
          await MarketingApi.Del(obj);
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
              <button className="table-del-btn" onClick={delItem}>
                <span className="b5">삭제</span>
              </button>
              <button
                className="detail-edit-btn b5"
                onClick={() =>
                  navigate(`/admin/strategy/marketing/edit/${idInfo}`)
                }
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">전략 설명</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">전략 이름</span>
                <span className="form-content b9">{info.title}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">전략 설명</span>
                <span className="form-content b9">{info.content}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">썸네일 이미지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    <div className="form-file-detail">
                      <img src={info.introUrl} />
                    </div>
                    <div className="form-file-name">
                      <img src="/img/file-download.svg" />
                      <span className="b5">{info.introOriginFileName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout">
                <span className="form-title b7">상세페이지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    <div className="form-file-detail">
                      <img src={info.imageUrl} />
                    </div>
                    <div className="form-file-name">
                      <img src="/img/file-download.svg" />
                      <span className="b5">{info.imageOriginFileName}</span>
                    </div>
                  </div>
                </div>
              </div>
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

export default MarketingDetail;
