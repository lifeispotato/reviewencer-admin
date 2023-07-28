import React, { useEffect, useState } from "react";
import "../../css/manager/ManagerEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import ManagerApi from "../../api/manager/ManagerApi";
import { toast } from "react-toastify";

const ManagerEdit = () => {
  //정규식
  let regEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let reg =
    /^(?!((?:[A-Z]+)|(?:[a-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/;

  const navigate = useNavigate();
  const [pwEdit, setPwEdit] = useState(false);
  const [pwErr, setPwErr] = useState(false);

  //매니저 정보 가져오기
  const params = useParams();
  const [idInfo, setIdInfo] = useState(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIdInfo(params.id);
    getInfo(params.id);
  }, []);

  const getInfo = async (id) => {
    try {
      const info = (await ManagerApi.GetInfo(id)).data.data;
      console.log(info);
      setInfo({
        name: info.name,
        email: info.email,
        password: null,
        passwordCheck: null,
        managerAuthority: info.managerAuthority,
        passwordChangeFlag: false,
      });
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  //정보 저장
  const saveInfo = async () => {
    if (!info.name) {
      toast("관리자 이름을 입력해주세요");
      return;
    }
    if (!regEmail.test(info.email)) {
      toast("이메일이 옳바른 형식이 아닙니다.");
      return;
    }
    if (info.password && !reg.test(info.password)) {
      toast(
        "비밀번호는 영문/숫자/특수문자 중 2가지 이상 포함, 8자 ~ 16자로 입력해주세요"
      );
      return;
    }
    let obj = {
      email: info.email,
      name: info.name,
      password: info.password,
      passwordChangeFlag: info.passwordChangeFlag,
    };
    try {
      await ManagerApi.EditInfo(idInfo, obj);
      toast("정상적으로 수정 되었습니다.");
      navigate(-1);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

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
                <input
                  type="text"
                  placeholder="이름을 입력하세요."
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <input
                  type="email"
                  placeholder="이메일을 입력하세요."
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">비밀번호</span>
                {pwEdit ? (
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={(e) =>
                      setInfo({ ...info, password: e.target.value })
                    }
                  />
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
                      onChange={(e) => {
                        if (e.target.value !== info.password) {
                          setPwErr(true);
                        } else {
                          setPwErr(false);
                        }
                        setInfo({
                          ...info,
                          passwordCheck: e.target.value,
                          passwordChangeFlag: true,
                        });
                      }}
                    />
                    {pwErr && info.passwordCheck ? (
                      <span className="c1 error-caption">
                        비밀번호가 일치하지 않습니다
                      </span>
                    ) : !pwErr && info.passwordCheck ? (
                      <span className="c1 check-caption">
                        비밀번호가 일치합니다.
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="form-layout">
                <span className="form-title b7">관리자 유형</span>
                <span className="form-content b9">{info.managerAuthority}</span>
              </div>
            </div>
            <div className="detail-save-btn">
              <button onClick={saveInfo}>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerEdit;
