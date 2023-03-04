import React from "react";
import { useNavigate } from "react-router";
import "./Header.scss";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  let naviagate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const createKeyboardHandler = () => {
    naviagate("/create-keyboard");
  };

  const createSwitchHandler = () => {
    naviagate("/create-switch");
  };

  const titleHandler = () => {
    naviagate("/");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header-container">
      <div onClick={titleHandler} className="header-title">
        Keyboards and Stuff
      </div>

      <div className="header-buttonContainer">
        <Button onClick={handleClick}>Create</Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={createKeyboardHandler}>Add Keyboard</MenuItem>
          <MenuItem onClick={createSwitchHandler}>Add Switch</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
