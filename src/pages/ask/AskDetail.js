import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal";

const AskDetail = () => {
  const navigate = useNavigate();

  //팝업 제어
  const [isOpen, setIsOpen] = useState(false);

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
                className="table-del-btn b5"
                onClick={() => navigate("/admin/manager/edit")}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">문의상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">담당자명</span>
                <span className="form-content b9">홍길동</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">전화번호</span>
                <span className="form-content b9">전화번호</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">홈페이지 주소</span>
                <a className="form-content b9">
                  <u>홈페이지 주소.co.kr</u>
                </a>
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <span className="form-content b9">admin@nsm.co.kr</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">희망 프로젝트</span>
                <span className="form-content b9">브랜딩</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <Modal
          type={"del"}
          content={
            <span className="b2">삭제된 항목은 복구가 불가능합니다.</span>
          }
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AskDetail;
