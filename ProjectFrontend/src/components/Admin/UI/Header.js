import React, { useState, useContext } from "react";
import {
  MenuItem,
  Menu,
  Segment,
  Input,
  MenuMenu,
  Image,
} from "semantic-ui-react";
import Logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { courseContext } from "../../../App";
import "./Header.css";
import LogoutModal from "../../Modal/LogoutModal";

const Header = () => {
  const context = useContext(courseContext);
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const data = useLocation();
  const Name = data.state ? data.state.Name : "User";

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogout = () => {
    navigate("/adminLogout");
  };

  return (
    <Segment inverted color="black">
      <Menu inverted secondary>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
        <Image src={Logo} size="tiny" />
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <MenuItem
  inverted
  color="white"
  active={activeItem === "home"}
  onClick={handleItemClick}
  style={{ backgroundColor: activeItem === "home" ? "white" : "transparent" }}
>
  <span style={{ color: activeItem === "home" ? "black" : "white", textTransform: "uppercase" }}>
    Home
  </span>
</MenuItem>
        <MenuMenu position="right">
          <MenuItem>
            <Input
              icon="search"
              placeholder="Search..."
              onChange={(e) => context.onChangeSearch(e.target.value)}
            />
          </MenuItem>
        </MenuMenu>
        <MenuItem>
          <LogoutModal buttonName="Logout" handleLogout={handleLogout}>
            <h3>Do you want to logout?</h3>
          </LogoutModal>
        </MenuItem>
        <MenuItem inverted color="grey" active={activeItem === "User"} onClick={handleItemClick}>
          <span style={{ color: "white", textTransform: "uppercase" }}>
            {Name}
          </span>
        </MenuItem>
      </Menu>
    </Segment>
  );
};
export default Header;


