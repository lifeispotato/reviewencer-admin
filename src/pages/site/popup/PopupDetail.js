import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../component/Modal";

const PopupDetail = () => {
  const navigate = useNavigate();

  //팝업제어
  const [isOpen, setIsOpen] = useState(false);

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
              <button className="table-del-btn">
                <span className="b5">삭제</span>
              </button>
              <button
                className="detail-edit-btn b5"
                onClick={() => navigate("/admin/site/popup/edit")}
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
                <span className="form-content b9">제목</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">등록일자</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    <div className="form-file-detail"></div>
                    <div className="form-file-name">
                      <img src="/img/file-download.svg" />
                      <span className="b5">파일.jpg</span>
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
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PopupDetail;
