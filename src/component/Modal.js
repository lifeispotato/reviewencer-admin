import React, { useEffect, useState } from "react";
import "../css/component/Modal.css";

const Modal = (props) => {
  return (
    <div className="admin-popup-container">
      <div className="admin-content-container modal-container">
        <div className="modal">
          {props.type === "del" ? (
            <h2>삭제하시겠습니까?</h2>
          ) : (
            <h2>승인하시겠습니까?</h2>
          )}
          {props.content}
          <div className="popup-btn-container">
            <button
              className={`${
                props.type === "del" ? "modal-blue-btn" : "modal-btn"
              } b7`}
              onClick={() => {
                props.setIsOpen(false);
                props.setPopupCancel(1);
              }}
            >
              취소하기
            </button>
            {props.type === "del" ? (
              <button
                className="modal-btn b7"
                onClick={() => {
                  props.setIsOpen(false);
                  props.setPopupCancel(2);
                }}
              >
                삭제하기
              </button>
            ) : (
              <button
                className="modal-blue-btn b7"
                onClick={() => {
                  props.setApprove(true);
                  props.setIsOpen(false);
                }}
              >
                승인하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
