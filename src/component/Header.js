import React, { useEffect, useState } from "react";
import "../css/component/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <div className="admin-header">
      <div className="admin-header-item">
        <img src="/img/header/profile-empty.svg"></img>
        <span className="b4">이메일</span>
        <button
          className="b7"
          onClick={() => {
            navigate("/admin/login");
            sessionStorage.clear();
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Header;
