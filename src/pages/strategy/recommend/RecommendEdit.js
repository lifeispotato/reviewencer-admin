import React, { useEffect, useState } from "react";
import "../../../css/strategy/recommend/RecommendEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import RecommendApi from "../../../api/strategy/RecommendApi";
import { toast } from "react-toastify";
import MarketingApi from "../../../api/strategy/MarketingApi";

const RecommendEdit = () => {
  const navigate = useNavigate();

  //정보 가져오기
  const params = useParams();
  const [idInfo, setIdInfo] = useState(null);
  const [info, setInfo] = useState({});
  const [marketingList, setMarketingList] = useState([]);

  useEffect(() => {
    setIdInfo(params.id);
    getInfo(params.id);
  }, []);

  const getInfo = async (id) => {
    try {
      const info = (await RecommendApi.GetInfo(id)).data.data;
      const list = (await MarketingApi.GetList()).data.data;
      setInfo(info);
      setMarketingList(list.content);
      console.log(list.content);
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
          </div>
          <div className="admin-detail-wrap recommend-edit-wrap">
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
                <div className="recommend-strategy-input-wrap">
                  <div className="recommend-strategy-input">
                    <input
                      type="checkbox"
                      name="strategy"
                      id="seo"
                      value="SEO"
                    />
                    <label className="b8" htmlFor="seo">
                      상위노출
                    </label>
                  </div>
                  <div className="recommend-strategy-input">
                    <input
                      type="checkbox"
                      name="strategy"
                      id="brand"
                      value="BRAND"
                    />
                    <label className="b8" htmlFor="brand">
                      브랜드 블로그
                    </label>
                  </div>
                  <div className="recommend-strategy-input">
                    <input
                      type="checkbox"
                      name="strategy"
                      id="optimization"
                      value="OPTIMIZATION"
                    />
                    <label className="b8" htmlFor="optimization">
                      최적화 계정
                    </label>
                  </div>
                  <div className="recommend-strategy-input">
                    <input
                      type="checkbox"
                      name="strategy"
                      id="reporters"
                      value="REPORTERS"
                    />
                    <label className="b8" htmlFor="reporters">
                      기자단
                    </label>
                  </div>
                  <div className="recommend-strategy-input">
                    <input
                      type="checkbox"
                      name="strategy"
                      id="experience"
                      value="EXPERIENCE"
                    />
                    <label className="b8" htmlFor="experience">
                      체험단
                    </label>
                  </div>
                  <div className="recommend-strategy-input">
                    <input
                      type="checkbox"
                      name="strategy"
                      id="regram"
                      value="REGRAM"
                    />
                    <label className="b8" htmlFor="regram">
                      리그램
                    </label>
                  </div>
                  <div className="recommend-strategy-input">
                    <input
                      type="checkbox"
                      name="strategy"
                      id="mom"
                      value="MOM"
                    />
                    <label className="b8" htmlFor="mom">
                      맘카페 침투
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-save-btn">
              <button>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendEdit;
