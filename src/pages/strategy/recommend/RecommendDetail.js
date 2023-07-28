import React, { useEffect, useState } from "react";
import "../../../css/strategy/recommend/RecommendDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import RecommendApi from "../../../api/strategy/RecommendApi";
import { toast } from "react-toastify";

const RecommendDetail = () => {
  const navigate = useNavigate();

  //정보 가져오기
  const params = useParams();
  const [idInfo, setIdInfo] = useState(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIdInfo(params.id);
    getInfo(params.id);
  }, []);

  const getInfo = async (id) => {
    try {
      const info = (await RecommendApi.GetInfo(id)).data.data;
      setInfo(info);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

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
                className="detail-edit-btn b5"
                onClick={() =>
                  navigate(`/admin/strategy/recommend/edit/${idInfo}`)
                }
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">추천전략</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">업종</span>
                <span className="form-content b9">{info.sectorTitle}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">마케팅 목적</span>
                <span className="form-content b9">{info.purposeTitle}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">마케팅 예산</span>
                <span className="form-content b9">{info.budgetTitle}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">추천 전략</span>
                <div className="recommend-strategy-info">
                  {info.marketings?.map((item, i) => {
                    return (
                      <span className="form-content b8">{item.title}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendDetail;
