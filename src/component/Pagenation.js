import React, { useEffect, useState } from "react";

const Pagenation = (props) => {
  return (
    <div className="admin-table-pagenation">
      <a
        onClick={() => {
          if (props.currentPage <= 1) {
            return;
          } else {
            props.setCurrentPage(props.currentPage - 1);
          }
        }}
      >
        <img src="\img\chevron-left.svg" />
      </a>
      <div className="table-num-list">
        {props.pageIndex
          .slice(props.startIndex, props.startIndex + 5)
          .map((item, index) => {
            return (
              <a
                key={index}
                className={`b4 ${
                  props.currentPage === item ? "pagenation-focus" : ""
                }`}
                onClick={() => {
                  props.setCurrentPage(item);
                }}
              >
                {item}
              </a>
            );
          })}
      </div>

      <a
        onClick={() => {
          if (props.currentPage >= props.pageIndex.length) {
            return;
          } else {
            props.setCurrentPage(props.currentPage + 1);
          }
        }}
      >
        <img src="\img\chevron-right.svg" />
      </a>
    </div>
  );
};

export default Pagenation;
