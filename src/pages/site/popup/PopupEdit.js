import React, { useEffect, useState } from "react";
import "../../../css/site/popup/PopupEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import PopupApi from "../../../api/site/PopupApi";
import { toast } from "react-toastify";

const PopupEdit = () => {
  const navigate = useNavigate();

  //팝업 정보 가져오기
  const params = useParams();
  const [idInfo, setIdInfo] = useState(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIdInfo(params.id);
    getInfo(params.id);
  }, []);

  const getInfo = async (id) => {
    try {
      const info = (await PopupApi.GetInfo(id)).data.data;
      setInfo(info);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  //이미지등록
  const fileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setInfo({
        ...info,
        image: file,
        imageUrl: e.target.result,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  //이미지삭제
  const delFile = () => {
    setInfo({
      ...info,
      image: null,
      imageUrl: "",
      imageDeleteFlag: true,
    });
  };

  //팝업 수정
  const editInfo = async () => {
    if (!info.title) {
      toast("팝업명을 입력해주세요.");
      return;
    }
    if (!info.imageUrl) {
      toast("이미지를 입력해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", info.title);
      if (info.image) {
        formData.append("image", info.image);
      }
      await PopupApi.Put(idInfo, formData);
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
          <div className="admin-detail-wrap popup-edit-wrap">
            <span className="b1 admin-detail-title">팝업수정</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">팝업명</span>
                <input
                  className="popup-edit-input"
                  type="text"
                  placeholder="팝업명을 입력하세요."
                  value={info.title}
                  onChange={(e) => setInfo({ ...info, title: e.target.value })}
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">등록일자</span>
                <div className="form-file-container">
                  <div className="form-file-wrap">
                    {info?.imageUrl ? (
                      <div className="uploaded-file">
                        <div className="form-file-detail">
                          <img src={info.imageUrl} />
                        </div>
                        <img
                          className="file-del-btn"
                          src="/img/file-del-btn.svg"
                          onClick={delFile}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="file-upload-input">
                      <input
                        id="popup"
                        type="file"
                        onChange={(e) => {
                          fileUpload(e);
                        }}
                      />
                      <label htmlFor="popup">
                        <img src="/img/img-upload.svg" />
                        <span className="b7">이미지 등록</span>
                      </label>
                    </div>
                  </div>
                  <span className="c1 file-size-limit">
                    *권장사이즈 536 * 536
                  </span>
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

export default PopupEdit;
