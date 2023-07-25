import React from "react";
import { useNavigate } from "react-router-dom";

const Base = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-content-container admin-detail-container">
          <div className="detail-top-container">
            <h2>기본 관리</h2>
            <div className="detail-btn-container">
              {/* <button className="detail-del-btn">삭제</button> */}
              <button
                className="detail-edit-btn b5"
                onClick={() => navigate("/admin/site/base/edit")}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">관리자 상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">상호명</span>
                <span className="form-content b9">엔에스엠(NSM)</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">대표자</span>
                <span className="form-content b9">민경재</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">사업자등록번호</span>
                <span className="form-content b9">417-16-97188</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">주소</span>
                <span className="form-content b9">
                  서울시 영등포구 경인로 775, 제2층 1동 215호 (문래동3가,
                  에이스하이테크시티)
                </span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">전화번호</span>
                <span className="form-content b9">02-1111-1111</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <span className="form-content b9">abcd@nsm.co.kr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base;
