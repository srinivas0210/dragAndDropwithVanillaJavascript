import React from "react";
import "./HomeHeader.css";

// external imports
import { configVariables } from "../../configVariables";

const HomeHeader: React.FunctionComponent = () => {
  return (
    <div className="home-header">
      <div className="home-header-innerdiv">
        <div className="header-left flex">
          <div className="header-left-item flex">{configVariables.homeHeader.home}</div>
          <div className="header-left-item flex">{configVariables.homeHeader.blog}</div>
          <div className="header-left-item flex">{configVariables.homeHeader.tour}</div>
        </div>
        <div className="header-title">{configVariables.homeHeader.title}</div>
        <div className="header-right flex">
          <div className="header-right-signUp">{configVariables.homeHeader.signUp}</div>
          <div className="header-right-login">{configVariables.homeHeader.login}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
