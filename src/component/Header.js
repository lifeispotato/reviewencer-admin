import React, { useEffect, useState } from "react";
import "../css/component/Header.css";
import { useNavigate } from "react-router-dom";
import ManagerApi from "../api/manager/ManagerApi";
import { toast } from "react-toastify";

const Header = () => {
  let navigate = useNavigate();

  //관리자 정보 불러오기
  const [info, setInfo] = useState(null);
  useEffect(() => {
    getManager();
  }, []);

  const getManager = async () => {
    try {
      const info = (await ManagerApi.GetInfo(sessionStorage.getItem("id"))).data
        .data.name;
      setInfo(info);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  return (
    <div className="admin-header">
      <div className="admin-header-item">
        <img src="/img/header/profile-empty.svg"></img>
        <span className="b4">{info}</span>
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
