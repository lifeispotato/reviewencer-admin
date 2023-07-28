import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ManagerApi from "../../api/manager/ManagerApi";
import { toast } from "react-toastify";

const ManagerDetail = () => {
  const navigate = useNavigate();

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
                onClick={() => navigate(`/admin/manager/edit/${idInfo}`)}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="admin-detail-wrap">
            <span className="b1 admin-detail-title">관리자 상세</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">이름</span>
                <span className="form-content b9">{info.name}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <span className="form-content b9">{info.email}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">관리자 유형</span>
                <span className="form-content b9">{info.managerAuthority}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetail;
