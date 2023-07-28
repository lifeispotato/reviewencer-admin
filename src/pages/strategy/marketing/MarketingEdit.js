import React, { useEffect, useState } from "react";
import "../../../css/strategy/marketing/MarketingEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import MarketingApi from "../../../api/strategy/MarketingApi";
import { toast } from "react-toastify";

const MarketingEdit = () => {
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
      const info = (await MarketingApi.GetInfo(id)).data.data;
      setInfo(info);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  //이미지등록
  const fileUpload = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setInfo({
        ...info,
        [type]: file,
        [type + "Url"]: e.target.result,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  //이미지삭제
  const delFile = (type) => {
    setInfo({
      ...info,
      [type]: null,
      [type + "Url"]: "",
    });
  };

  //수정
  const editInfo = async () => {
    if (!info.title) {
      toast("전략명을 입력해주세요.");
      return;
    }
    if (!info.content) {
      toast("전략 설명을 입력해주세요.");
      return;
    }
    if (!info.introUrl) {
      toast("썸네일 이미지를 입력해주세요.");
      return;
    }
    if (!info.imageUrl) {
      toast("상세페이지 이미지를 입력해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", info.title);
      formData.append("content", info.content);
      if (info.image) {
        formData.append("image", info.image);
      }
      if (info.intro) {
        formData.append("intro", info.intro);
      }
      await MarketingApi.Put(idInfo, formData);
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
            <div className="go-back-container">
              <img src="/img/chevron-left.svg" onClick={() => navigate(-1)} />
              <span className="b3">뒤로가기</span>
            </div>
          </div>
          <div className="admin-detail-wrap marketing-edit-wrap">
            <span className="b1 admin-detail-title">전략 설명</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">전략 이름</span>
                <input
                  type="text"
                  placeholder="전략 이름을 입력하세요."
                  value={info.title}
                  onChange={(e) => setInfo({ ...info, title: e.target.value })}
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">전략 설명</span>
                <textarea
                  placeholder="설명을 입력해주세요."
                  value={info.content}
                  onChange={(e) =>
                    setInfo({ ...info, content: e.target.value })
                  }
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">썸네일 이미지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    {info.introUrl ? (
                      <div className="uploaded-file">
                        <div className="form-file-detail">
                          <img src={info.introUrl} />
                        </div>
                        <img
                          className="file-del-btn"
                          src="/img/file-del-btn.svg"
                          onClick={() => delFile("intro")}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="file-upload-input">
                      <input
                        id="popup"
                        type="file"
                        onChange={(e) => fileUpload(e, "intro")}
                      ></input>
                      <label htmlFor="popup">
                        <img src="/img/img-upload.svg" />
                        <span className="b7">이미지 등록</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout">
                <span className="form-title b7">상세페이지</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    {info.imageUrl ? (
                      <div className="uploaded-file">
                        <div className="form-file-detail">
                          <img src={info.imageUrl} />
                        </div>
                        <img
                          className="file-del-btn"
                          src="/img/file-del-btn.svg"
                          onClick={() => delFile("image")}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="file-upload-input">
                      <input
                        id="image"
                        type="file"
                        onChange={(e) => fileUpload(e, "image")}
                      ></input>
                      <label htmlFor="image">
                        <img src="/img/img-upload.svg" />
                        <span className="b7">이미지 등록</span>
                      </label>
                    </div>
                  </div>
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

export default MarketingEdit;
