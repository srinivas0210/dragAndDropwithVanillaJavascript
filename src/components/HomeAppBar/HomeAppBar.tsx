import React from "react";
import "./HomeAppBar.css";

// external imports
import { configVariables } from "../../configVariables";

const HomeAppBar: React.FunctionComponent = () => {
  return (
    <div className="home-appBar">
      <div className="home-appBar-innerdiv">
        {configVariables.homeAppBar.text}
      </div>
    </div>
  );
};

export default HomeAppBar;
