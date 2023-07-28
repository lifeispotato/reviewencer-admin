import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/site/terms/TermsEdit.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TermsApi from "../../../api/site/TermsApi";
import { toast } from "react-toastify";

const TermsEdit = () => {
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
      setInfo(info);
      setValue(info.content);
    } catch (error) {
      toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요");
    }
  };

  // 에디터 속 콘텐츠를 저장하는 state
  const [value, setValue] = useState("");
  const quillRef = useRef();
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      // try {
      //   const result = await CommonApi.Post(formData);
      //   const IMG_URL = result.data.data.fileUrl;
      //   const editor = quillRef.current.getEditor();
      //   const range = editor.getSelection();
      //   editor.insertEmbed(range.index, "image", IMG_URL);
      // } catch (error) {
      //   toast("서버에 문제가 생겼습니다. 잠시 후에 다시 시도해주세요", {
      //     icon: <img src="/img/toast-ico.svg" />,
      //   });
      // }
    });
  };
  //이미지 모듈
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          ["image"],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
  ];

  //약관 수정
  const editInfo = async () => {
    const obj = {
      title: info.title,
      content: value,
    };
    try {
      await TermsApi.Put(idInfo, obj);
      toast("정상적으로 수정 되었습니다.");
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
          <div className="admin-detail-wrap terms-edit-wrap">
            <span className="b1 admin-detail-title">약관수정</span>
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">악관명</span>
                <span className="form-content b9">{info.title}</span>
              </div>
              <div className="form-layout">
                <span className="form-title b7">악관내용</span>
                <div className="text-editor">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    content-type="html"
                    modules={modules}
                    formats={formats}
                    value={value}
                    onChange={setValue}
                  />
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

export default TermsEdit;
