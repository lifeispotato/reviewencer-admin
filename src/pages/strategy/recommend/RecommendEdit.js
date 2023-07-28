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

  const [marketingArr, setMarketingArr] = useState([]);

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

      //마케팅 종류 배열 저장
      let copy = [];
      info.marketings.map((item, index) => {
        copy.push(item.id);
      });
      setMarketingArr(copy);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  const editInfo = async () => {
    const obj = {
      budget: info.budget,
      marketingIds: marketingArr,
      purpose: info.purpose,
      sector: info.sector,
    };
    try {
      await RecommendApi.Put(idInfo, obj);
      toast("정상적으로 수정 되었습니다.");
      navigate(-1);
    } catch (error) {}
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
                  {marketingList?.map((item, index) => {
                    return (
                      <div className="recommend-strategy-input" key={index}>
                        <input
                          type="checkbox"
                          name="strategy"
                          id={item.id}
                          value="SEO"
                          checked={
                            marketingArr.findIndex((e) => e === item.id) === -1
                              ? false
                              : true
                          }
                          onChange={() => {
                            let copy = [...marketingArr];
                            if (marketingArr.includes(item.id)) {
                              copy.splice(
                                marketingArr.findIndex((e) => e === item.id),
                                1
                              );
                            } else {
                              copy.push(item.id);
                            }
                            setMarketingArr(copy);
                          }}
                        />
                        <label className="b8" htmlFor={item.id}>
                          {item.title}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="detail-save-btn">
              <button onClick={editInfo}>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendEdit;
