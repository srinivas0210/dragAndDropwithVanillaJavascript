import React, { useState } from "react";
import "./HomeUserProfile.css";

// material imports
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

// external imports
import { configVariables } from "../../configVariables";

interface HomeUserProfileProps {
  searchValue: string;
  handleSearchChange(searchString: string): void;
}

const HomeUserProfile: React.FunctionComponent<HomeUserProfileProps> = (
  props
) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="home-userProfile">
      <div className="home-userProfile-innerdiv">
        <div className="home-userProfile-left flex">
          {configVariables.homeUserProfile.title}
        </div>
        <div className="home-userProfile-search">
          <TextField
            id="standard-search"
            label="Search Tag"
            type="search"
            value={props.searchValue}
            onChange={(e) => props.handleSearchChange(e.target.value)}
          />
        </div>
        <div
          className="home-userProfile-right flex"
          onClick={() => setOpen(!open)}
        >
          <MoreHorizIcon />
          {configVariables.homeUserProfile.menuText}
        </div>

        <div className={`sidenav ${open ? "sidenav-open" : "sidenav-close"}`}>
          <div className="sidenav-innerDiv" onClick={() => setOpen(!open)}>
            <CloseIcon className="sidenav-closeIcon" />

            <div className="sidenav-text">
              {configVariables.homeUserProfile.comingSoomText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUserProfile;
