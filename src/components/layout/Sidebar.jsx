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
      <div className="sidebar-logo">
      <Link to="/view-Profile">
      <img src={Logo} style={{ width: "200px", paddingBottom:"7px"}} alt="logo" />
      </Link>
      <span>Manage Your ProfLife</span>
      </div>
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
