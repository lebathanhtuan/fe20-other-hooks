import React, { useState } from "react";

import PublishHeader from "./PublishHeader";
import Footer from "./Footer";
import PublishSidebar from "./PublishSidebar";

const PublishLayout = ({ children }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <div className="app">
      <PublishSidebar
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <PublishHeader setIsShowSidebar={setIsShowSidebar} />
      <div className="main-container">
        <div className="main-content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default PublishLayout;
