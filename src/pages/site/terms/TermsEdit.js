import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/site/terms/TermsEdit.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TermsEdit = () => {
  const navigate = useNavigate();

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
                <span className="form-content b9">이용약관</span>
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
              <button>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsEdit;
