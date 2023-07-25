import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../css/join/Join.css";

const Join = () => {
  let navigate = useNavigate();

  //정규식
  let regEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let reg =
    /^(?!((?:[A-Z]+)|(?:[a-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/;

  //회원가입 에러 판별
  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [pwCheckError, setPwCheckError] = useState(false);

  //데이터 저장
  const [joinData, setJoinData] = useState({
    name: null,
    email: null,
    password: null,
    passwordCheck: null,
  });

  return (
    <div className="admin-container">
      <div className="admin-wrap">
        <div className="admin-popup-container join-container">
          <div className="join-wrap">
            <h2>회원가입</h2>
            <div className="join-input-container">
              <div className="join-input">
                <span className="b4">이름</span>
                <input
                  type="text"
                  placeholder="이름을 입력해 주세요."
                  onChange={(e) => {
                    setJoinData({
                      ...joinData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="join-input">
                <span className="b4">이메일</span>
                <input
                  className={`${emailError ? "error-input" : ""}`}
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  onChange={(e) => {
                    if (!regEmail.test(e.target.value)) {
                      setEmailError(true);
                    } else {
                      setEmailError(false);
                    }
                    setJoinData({
                      ...joinData,
                      email: e.target.value,
                    });
                  }}
                />
                {emailError ? (
                  <span className={`input-caption c1 error-caption`}>
                    올바르지 않은 이메일 양식입니다
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="join-input">
                <span className="b4">비밀번호</span>
                <input
                  className={`${pwError ? "error-input" : ""}`}
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  onChange={(e) => {
                    if (!reg.test(e.target.value)) {
                      setPwError(true);
                    } else {
                      setPwError(false);
                    }
                    setJoinData({
                      ...joinData,
                      password: e.target.value,
                    });
                  }}
                />
                <span
                  className={`input-caption c1 ${
                    pwError ? "error-caption" : ""
                  }`}
                >
                  영문/숫자/특수문자 중 2가지 이상, 8자~16자
                </span>
              </div>
              <div className="join-input">
                <span className="b4">비밀번호 확인</span>
                <input
                  className={`${pwCheckError ? "error-input" : ""}`}
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  onChange={(e) => {
                    if (e.target.value !== joinData.password) {
                      setPwCheckError(true);
                    } else {
                      setPwCheckError(false);
                    }
                    setJoinData({
                      ...joinData,
                      passwordCheck: e.target.value,
                    });
                  }}
                />
                {pwCheckError ? (
                  <span className={`input-caption c1 error-caption`}>
                    비밀번호가 일치하지 않습니다
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={`join-btn-container`}>
              <button
                className={`join-btn ${
                  joinData.name &&
                  joinData.email &&
                  joinData.password &&
                  joinData.passwordCheck &&
                  !emailError &&
                  !pwError &&
                  !pwCheckError
                    ? "join-btn-ac"
                    : ""
                }`}
                disabled={
                  joinData.name &&
                  joinData.email &&
                  joinData.password &&
                  joinData.passwordCheck &&
                  !emailError &&
                  !pwError &&
                  !pwCheckError
                    ? false
                    : true
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

export default Join;
