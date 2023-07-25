import React from "react";
import "../../../css/strategy/recommend/RecommendDetail.css";
import { useNavigate } from "react-router-dom";

const RecommendDetail = () => {
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
                onClick={() => navigate("/admin/strategy/recommend/edit")}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">추천전략</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">업종</span>
                <span className="form-content b9">전문직</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">마케팅 목적</span>
                <span className="form-content b9">브랜딩</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">마케팅 예산</span>
                <span className="form-content b9">브랜10~50만원딩</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">추천 전략</span>
                <div className="recommend-strategy-info">
                  <span className="form-content b8">상위노출</span>
                  <span className="form-content b8">상위노출</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendDetail;
