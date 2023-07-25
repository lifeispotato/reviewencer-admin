import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../css/login/Login.css";

const Login = () => {
  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  });

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-popup-container login-container">
          <div className="login-wrap">
            <h2>로그인</h2>
            <div className="login-input-container">
              <div className="login-input">
                <span className="b4">이메일</span>
                <input
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className="login-input">
                <span className="b4">비밀번호</span>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="login-btn-container">
              <button
                className={`${
                  loginData.email && loginData.password
                    ? "login-btn-ac"
                    : "login-btn"
                }`}
                disabled={loginData.email && loginData.password ? false : true}
              >
                로그인
              </button>
              <button
                className="login-join-btn"
                onClick={() => navigate("/admin/join")}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
