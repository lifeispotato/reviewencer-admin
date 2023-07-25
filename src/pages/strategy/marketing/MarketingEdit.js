import React from "react";
import "../../../css/strategy/marketing/MarketingEdit.css";
import { useNavigate } from "react-router-dom";

const MarketingEdit = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container admin-detail-container">
          <div className="detail-top-container">
            <div className="go-back-container">
              <img src="/img/chevron-left.svg" onClick={() => navigate(-1)} />
              <span className="b3">뒤로가기</span>
            </div>
          </div>
          <div className="admin-detail-wrap marketing-edit-wrap">
            <span className="b1 admin-detail-title">전략 설명</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">전략 이름</span>
                <input type="text" placeholder="전략 이름을 입력하세요." />
              </div>
              <div className="form-layout">
                <span className="form-title b7">전략 설명</span>
                <textarea placeholder="설명을 입력해주세요." />
              </div>
              <div className="form-layout">
                <span className="form-title b7">썸네일 이미지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    <div className="uploaded-file">
                      <div className="form-file-detail"></div>
                      <img
                        className="file-del-btn"
                        src="/img/file-del-btn.svg"
                      />
                    </div>
                    <div className="file-upload-input">
                      <input id="popup" type="file"></input>
                      <label htmlFor="popup">
                        <img src="/img/img-upload.svg" />
                        <span className="b7">이미지 등록</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout">
                <span className="form-title b7">상세페이지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    <div className="uploaded-file">
                      <div className="form-file-detail"></div>
                      <img
                        className="file-del-btn"
                        src="/img/file-del-btn.svg"
                      />
                    </div>
                    <div className="file-upload-input">
                      <input id="popup" type="file"></input>
                      <label htmlFor="popup">
                        <img src="/img/img-upload.svg" />
                        <span className="b7">이미지 등록</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-save-btn">
              <button>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingEdit;
