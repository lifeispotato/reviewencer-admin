import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../component/Modal";

const MarketingDetail = () => {
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
              <button className="table-del-btn">
                <span className="b5">삭제</span>
              </button>
              <button
                className="detail-edit-btn b5"
                onClick={() => navigate("/admin/strategy/marketing/edit")}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">전략 설명</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">전략 이름</span>
                <span className="form-content b9">상위노출</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">전략 설명</span>
                <span className="form-content b9">
                  전략 설명이 들어갑니다.전략 설명이 들어갑니다.전략 설명이
                  들어갑니다.전략 설명이 들어갑니다.
                </span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">썸네일 이미지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    <div className="form-file-detail"></div>
                    <div className="form-file-name">
                      <img src="/img/file-download.svg" />
                      <span className="b5">파일.jpg</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout">
                <span className="form-title b7">상세페이지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    <div className="form-file-detail"></div>
                    <div className="form-file-name">
                      <img src="/img/file-download.svg" />
                      <span className="b5">파일.jpg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <Modal
          type={"del"}
          content={
            <span className="b2">
              웹에 출력되고 있는 전략을 삭제할 경우
              <br />더 이상 웹에 출력되지 않습니다.
            </span>
          }
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MarketingDetail;
