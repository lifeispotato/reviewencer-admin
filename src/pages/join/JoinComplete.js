import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../css/join/Join.css";
import "../../css/join/JoinComplete.css";

const JoinComplete = () => {
  let navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-popup-container join-container">
          <div className="join-complete-wrap">
            <h2>가입완료</h2>
            <span className="join-com-caption b2">
              관리자 승인 후 로그인이 가능합니다.
            </span>
            <div className="join-btn-container">
              <button
                className="join-btn join-com-btn"
                onClick={() => navigate("/admin/login")}
              >
                로그인 페이지로
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinComplete;
