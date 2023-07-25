import React from "react";
import "../../../css/site/popup/PopupEdit.css";
import { useNavigate } from "react-router-dom";

const PopupEdit = () => {
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
          <div className="admin-detail-wrap popup-edit-wrap">
            <span className="b1 admin-detail-title">팝업수정</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">팝업명</span>
                <input
                  className="popup-edit-input"
                  type="text"
                  placeholder="팝업명을 입력하세요."
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">등록일자</span>
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
                  <span className="c1 file-size-limit">
                    *권장사이즈 536 * 536
                  </span>
                </div>
              </div>
            </div>
            <div className="detail-save-btn">
              <button>추가하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupEdit;
