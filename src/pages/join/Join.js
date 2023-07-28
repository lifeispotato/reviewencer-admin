import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import "../../css/join/Join.css";
import { nullCheck } from "../../utils/check";
import { regExpression } from "../../utils/reg-expression";
import ManagerApi from "../../api/manager/ManagerApi";
import { toast } from "react-toastify";

const Join = () => {
  let navigate = useNavigate();

  //데이터 저장
  const [joinData, setJoinData] = useState({
    name: null,
    email: null,
    password: null,
    passwordCheck: null,
  });

  //회원가입 에러 판별
  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [pwCheckError, setPwCheckError] = useState(false);

  const activeFlag = useMemo(() => {
    if (
      !nullCheck(joinData.name) && !nullCheck(joinData.email) && !nullCheck(joinData.password) && !nullCheck(joinData.passwordCheck)
      && !emailError && !pwError && !pwCheckError) {
      return true;
    } else {
      return false;
    }
  }, [joinData.name, joinData.email, joinData.password, joinData.passwordCheck, emailError, pwError, pwCheckError]);

  useEffect(() => {
    if (regExpression.email.test(joinData.email) || nullCheck(joinData.email)) {
      setEmailError(false)
    } else if (!nullCheck(joinData.email) && !regExpression.email.test(joinData.email)) {
      setEmailError(true)
    }
  }, [joinData.email]);

  useEffect(() => {
    if (regExpression.password.test(joinData.password) || nullCheck(joinData.password)) {
      setPwError(false)
    } else if (!nullCheck(joinData.password) && !regExpression.password.test(joinData.password)) {
      setPwError(true)
    }
  }, [joinData.password]);

  useEffect(() => {
    if (joinData.password === joinData.passwordCheck || nullCheck(joinData.password) || nullCheck(joinData.passwordCheck)) {
      setPwCheckError(false)
    } else if (!nullCheck(joinData.password) && !nullCheck(joinData.passwordCheck) && joinData.password !== joinData.passwordCheck) {
      setPwCheckError(true)
    }
  }, [joinData.password, joinData.passwordCheck]);

  const nextStep = async () => {
    try {
      if (!activeFlag) {
        return;
      }

      const requestDto = {
        email: joinData.email,
        name: joinData.name,
        password: joinData.password,
      }

      await ManagerApi.Join(requestDto)      
      navigate('/admin/join/complete')    
    } catch (error) {
      console.log(error);
      if(error.response.status === 409) {
        toast(`이미 등록된 이메일 입니다.`)
      }
    }
  };



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
                    setJoinData({
                      ...joinData,
                      password: e.target.value,
                    });
                  }}
                />
                <span
                  className={`input-caption c1 ${pwError ? "error-caption" : ""
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
                className={`join-btn ${activeFlag ? "join-btn-ac" : ""}`}
                onClick={nextStep}
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
