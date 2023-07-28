import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TermsApi from "../../../api/site/TermsApi";
import { toast } from "react-toastify";

const TermsDetail = () => {
  const navigate = useNavigate();

  //약관 정보 가져오기
  const params = useParams();
  const [idInfo, setIdInfo] = useState(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIdInfo(params.id);
    getInfo(params.id);
  }, []);

  const getInfo = async (id) => {
    try {
      const info = (await TermsApi.GetInfo(id)).data.data;
      const strippedData = info.content.replace(/<[^>]+>/g, "");
      setInfo({ info, content: strippedData });
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
                onClick={() => navigate(`/admin/site/terms/edit/${idInfo}`)}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">약관 상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">악관명</span>
                <span className="form-content b9">{info.title}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">악관내용</span>
                <span className="form-content b9">{info.content}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsDetail;
