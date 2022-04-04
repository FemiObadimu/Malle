import React from "react";
import { Oval } from "@agney/react-loading";

const Loading = () => {
  return (
    <div>
      <div className="loading">
        <Oval className="puff" width="30" />
      </div>
    </div>
  );
};

export default Loading;
