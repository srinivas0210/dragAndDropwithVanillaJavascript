import React, { useState } from "react";
import "./HomePopover.css";

// material imports
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

// external imports
import { configVariables } from "../../configVariables";

const HomePopover: React.FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="home-popover">
      <div className="home-popover-innerDiv">
        <div className="home-popover-left">Bridge</div>
        <div className="home-popover-right flex" onClick={() => setOpen(!open)}>
          <MoreHorizIcon />
          {configVariables.homePopover.menuText}
        </div>
        {open && (
          <div className="sidenav">
            <div className="sidenav-innerDiv" onClick={() => setOpen(!open)}>
              <CloseIcon className="sidenav-closeIcon" />
              <div className="sidenav-text">
                {configVariables.homeUserProfile.comingSoomText}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePopover;
