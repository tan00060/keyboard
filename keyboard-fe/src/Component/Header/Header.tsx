import React from "react";
import { useNavigate } from "react-router";
import "./Header.scss";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  let naviagate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

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

  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleViewClose = () => {
    setAnchorEl2(null);
  };

  const viewSwitchesHandler = () => {
    naviagate("/switches");
  };

  const viewKeyboardHandler = () => {
    naviagate("/");
  };

  return (
    <div className="header-container">
      <div onClick={titleHandler} className="header-title">
        <h1>Keyboards and Stuff</h1>
      </div>

      <div className="header-buttonContainer">
        <Button onClick={handleViewClick}>View Items</Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleViewClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={viewKeyboardHandler}>View Keyboards</MenuItem>
          <MenuItem onClick={viewSwitchesHandler}>View Switches</MenuItem>
        </Menu>

        <Button onClick={handleClick}>Add Item</Button>
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
