import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../css/login/Login.css";
import ManagerApi from "../../api/manager/ManagerApi";
import { toast } from "react-toastify";

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
                className={`${loginData.email && loginData.password
                  ? "login-btn-ac"
                  : "login-btn"
                  }`}
                disabled={loginData.email && loginData.password ? false : true}
                onClick={async () => {
                  try {
                    const requestDto = {
                      account: loginData.email,
                      password: loginData.password
                    }

                    const response = await ManagerApi.Login(requestDto)
                    sessionStorage.setItem('id', response.data.data.id)
                    sessionStorage.setItem('accessToken', response.data.data.accessToken)
                    navigate("/admin/dashboard/home")
                  } catch (error) {
                    console.log(error)
                    if(error.response.status === 404) {
                      toast(`${error.response.data.message}`)
                    }
                    if(error.response.status === 401) {
                      toast(`${error.response.data.message}`)
                    }
                  }
                }
                }
              >
                로그인
              </button>
              <button
                className="login-join-btn"
                onClick={() => {
                  navigate("/admin/join")
                }
                }
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
