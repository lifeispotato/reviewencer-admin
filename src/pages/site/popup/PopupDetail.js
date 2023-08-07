import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../component/Modal";
import PopupApi from "../../../api/site/PopupApi";
import { toast } from "react-toastify";

const PopupDetail = () => {
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
      const info = (await PopupApi.GetInfo(id)).data.data;
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
          await PopupApi.Del(obj);
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
                onClick={() => navigate(`/admin/site/popup/edit/${idInfo}`)}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">팝업상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">팝업명</span>
                <span className="form-content b9">{info.title}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">등록일자</span>
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

export default PopupDetail;
