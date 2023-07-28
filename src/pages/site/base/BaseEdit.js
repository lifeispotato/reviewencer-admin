import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/site/base/BaseEdit.css";
import BaseApi from "../../../api/site/BaseApi";
import { toast } from "react-toastify";

const BaseEdit = () => {
  const navigate = useNavigate();

  //회사 정보 불러오기
  const [info, setInfo] = useState({});
  useEffect(() => {
    getBase();
  }, []);

  const getBase = async () => {
    try {
      const info = (await BaseApi.Get()).data.data;
      setInfo(info);
    } catch (error) {}
  };

  //정보 저장
  const saveInfo = async () => {
    if (!info.companyName) {
      toast("회사명을 입력해주세요");
      return;
    }
    if (!info.ceo) {
      toast("대표자를 입력해주세요");
      return;
    }
    if (!info.businessNumber) {
      toast("회사명을 입력해주세요");
      return;
    }
    if (!info.address) {
      toast("주소를 입력해주세요");
      return;
    }
    if (!info.titlePhoneNumber) {
      toast("전화번호를 입력해주세요");
      return;
    }
    if (!info.email) {
      toast("이메일을 입력해주세요");
      return;
    }
    let obj = {
      companyName: info.companyName,
      ceo: info.ceo,
      businessNumber: info.businessNumber,
      address: info.address,
      titlePhoneNumber: info.titlePhoneNumber,
      email: info.email,
    };
    try {
      await BaseApi.Put(obj);
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
            <div className="go-back-container" onClick={() => navigate(-1)}>
              <img src="/img/chevron-left.svg" />
              <span className="b3">뒤로가기</span>
            </div>
          </div>
          <div className="admin-detail-wrap base-edit-wrap">
            <div className="form-layout-container">
              <div className="form-layout">
                <span className="form-title b7">상호명</span>
                <input
                  type="text"
                  placeholder="상호명을 입력하세요."
                  value={info.companyName}
                  onChange={(e) =>
                    setInfo({ ...info, companyName: e.target.value })
                  }
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">대표자</span>
                <input
                  type="text"
                  placeholder="대표자명을 입력하세요."
                  value={info.ceo}
                  onChange={(e) => setInfo({ ...info, ceo: e.target.value })}
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">사업자등록번호</span>
                <input
                  type="number"
                  placeholder="사업자등록번호를 입력하세요."
                  value={info.businessNumber}
                  onChange={(e) =>
                    setInfo({ ...info, businessNumber: e.target.value })
                  }
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">주소</span>
                <input
                  className="base-address-input"
                  type="text"
                  placeholder="주소를 입력하세요."
                  value={info.address}
                  onChange={(e) =>
                    setInfo({ ...info, address: e.target.value })
                  }
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">전화번호</span>
                <input
                  type="tel"
                  placeholder="전화번호를 입력하세요."
                  value={info.titlePhoneNumber}
                  onChange={(e) =>
                    setInfo({ ...info, titlePhoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="form-layout">
                <span className="form-title b7">이메일</span>
                <input
                  type="email"
                  placeholder="이메일을 입력하세요."
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
              </div>
            </div>
            <div className="detail-save-btn">
              <button onClick={saveInfo}>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseEdit;
