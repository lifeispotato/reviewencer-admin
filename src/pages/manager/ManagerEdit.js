import React, { useState } from "react";
import "../../css/manager/ManagerEdit.css";
import { useNavigate } from "react-router-dom";

const ManagerEdit = () => {
  const navigate = useNavigate();
  const [pwEdit, setPwEdit] = useState(false);

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
          <div className="admin-detail-wrap manager-edit-wrap">
            <span className="b1 admin-detail-title">관리자 상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">이름</span>
                <input type="text" placeholder="이름을 입력하세요." />
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <input type="email" placeholder="이메일을 입력하세요." />
              </div>
              <div className="form-layout">
                <span className="form-title b7">비밀번호</span>
                {pwEdit ? (
                  <input type="password" placeholder="비밀번호를 입력하세요." />
                ) : (
                  <button
                    className="b7 manager-pw-btn"
                    onClick={() => {
                      setPwEdit(true);
                    }}
                  >
                    비밀번호 수정하기
                  </button>
                )}
              </div>
              {pwEdit ? (
                <div className="form-layout">
                  <span className="form-title b7">비밀번호 확인</span>
                  <div className="form-input-wrap">
                    <input
                      type="password"
                      placeholder="비밀번호를 한번 더 입력하세요."
                    />
                    <span className="c1 check-caption">
                      비밀번호가 일치합니다
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="form-layout">
                <span className="form-title b7">관리자 유형</span>
                <span className="form-content b9">ADMIN</span>
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

export default ManagerEdit;
