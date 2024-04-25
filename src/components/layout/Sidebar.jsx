import React from "react";
import Logo from "../../assets/ProfFiles Logo.png"
import { Link } from "react-router-dom";
import {
  BsPersonPlus,
  BsFillAlarmFill,
  BsGrid1X2Fill,
  BsBook,
  BsFillAwardFill,
  BsAwardFill,
  BsFileEarmarkText,
  BsTrophy
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, toggleSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <Link to="/view-Profile">
      <div className="sidebar-logo">
      <img src={Logo} style={{ width: "200px" }} alt="logo" />
      </div>
      </Link>
      <div className="sidebar-title sidebar">
        <div className="sidebar-brand">
          < BsFillAlarmFill className="icon_header" />
          Student Activities
        </div>
        <span className="icon close_icon" onClick={toggleSidebar}></span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/view-Profile">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/add-PersonalDetails">
            <BsBook className="icon" /> Edit Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
