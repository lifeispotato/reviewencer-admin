import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseApi from "../../../api/site/BaseApi";

const Base = () => {
  const navigate = useNavigate();

  //회사 정보 불러오기
  const [info, setInfo] = useState({});
  useEffect(() => {
    getBase();
  }, []);

  const getBase = async () => {
    try {
      const info = (await BaseApi.Get()).data.data;
      console.log(info);
      setInfo(info);
    } catch (error) {}
  };

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
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">상호명</span>
                <span className="form-content b9">{info.companyName}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">대표자</span>
                <span className="form-content b9">{info.ceo}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">사업자등록번호</span>
                <span className="form-content b9">{info.businessNumber}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">주소</span>
                <span className="form-content b9">{info.address}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">전화번호</span>
                <span className="form-content b9">{info.titlePhoneNumber}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <span className="form-content b9">{info.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base;
