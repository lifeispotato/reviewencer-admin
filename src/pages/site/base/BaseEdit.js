import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/site/base/BaseEdit.css";

const BaseEdit = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container admin-detail-container">
          <div className="detail-top-container">
            <div className="go-back-container" onClick={() => navigate(-1)}>
              <img src="/img/chevron-left.svg" />
              <span className="b3">뒤로가기</span>
            </div>
          </div>
          <div className="admin-detail-wrap base-edit-wrap">
            <span className="b1 admin-detail-title">기본 관리</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">상호명</span>
                <input type="text" placeholder="상호명을 입력하세요." />
              </div>
              <div className="form-layout">
                <span className="form-title b7">대표자</span>
                <input type="text" placeholder="대표자명을 입력하세요." />
              </div>
              <div className="form-layout">
                <span className="form-title b7">사업자등록번호</span>
                <input
                  type="number"
                  placeholder="사업자등록번호를 입력하세요."
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">주소</span>
                <input
                  className="base-address-input"
                  type="text"
                  placeholder="주소를 입력하세요."
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">전화번호</span>
                <input type="tel" placeholder="전화번호를 입력하세요." />
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <input type="email" placeholder="이메일을 입력하세요." />
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

export default BaseEdit;
