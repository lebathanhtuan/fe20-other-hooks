import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import PrivateHeader from "./PrivateHeader";
import PrivateSidebar from "./PrivateSidebar";

import { ROUTERS } from "../constants/routers";

import { UserContext } from "../App";

const PrivateLayout = ({ children }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const { userInfo } = useContext(UserContext);

  if (!userInfo || userInfo.role !== "admin") {
    return <Navigate to={ROUTERS.USER.HOME} />;
  }

  return (
    <div className="app">
      <PrivateHeader
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <div className="main-container">
        <div
          className={
            isShowSidebar ? "main-content main-show-sidebar" : "main-content"
          }
        >
          {children}
        </div>
        <PrivateSidebar
          isShowSidebar={isShowSidebar}
          setIsShowSidebar={setIsShowSidebar}
        />
      </div>
    </div>
  );
};

export default PrivateLayout;
