import React from "react";
import { useNavigate } from "react-router-dom";

const ManagerDetail = () => {
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
            <div className="detail-btn-container">
              {/* <button className="detail-del-btn">삭제</button> */}
              <button
                className="detail-edit-btn b5"
                onClick={() => navigate("/admin/manager/edit")}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">관리자 상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">이름</span>
                <span className="form-content b9">홍길동</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <span className="form-content b9">admin@nsm.co.kr</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">관리자 유형</span>
                <span className="form-content b9">ADMIN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetail;
