import React, { useState } from "react";
import "../../../css/site/popup/PopupAdd.css";
import { useNavigate } from "react-router-dom";
import PopupApi from "../../../api/site/PopupApi";
import { toast } from "react-toastify";

const PopupAdd = () => {
  const navigate = useNavigate();

  //팝업추가 정보저장
  const [info, setInfo] = useState({
    image: null,
    title: null,
  });

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
      // imageDeleteFlag: true,
    });
  };

  const addInfo = async () => {
    if (!info.title) {
      toast("팝업명을 입력해주세요.");
      return;
    }
    if (!info.image) {
      toast("이미지를 입력해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", info.title);
      if (info.image) {
        formData.append("image", info.image);
      }
      const res = (await PopupApi.Post(formData)).data.data;
      navigate(`/admin/site/popup/detail/${res}`);
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
          <div className="admin-detail-wrap popup-add-wrap">
            <span className="b1 admin-detail-title">팝업 추가하기</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">팝업명</span>
                <input
                  className="popup-add-input"
                  type="text"
                  placeholder="팝업명을 입력하세요."
                  onChange={(e) => setInfo({ ...info, title: e.target.value })}
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">이미지</span>
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
                      ></input>
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
              <button onClick={addInfo}>추가하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAdd;
