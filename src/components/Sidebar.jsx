import React from "react";
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
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title sidebar">
        <div className="sidebar-brand">
          <BsFillAlarmFill className="icon_header" />
          Student Extra-curricular Activities
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
            <BsPersonPlus className="icon" /> Personal Details
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/add-EducationalDetails">
            <BsBook className="icon" /> Educational Details
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/add-CurricularDetails">
            <BsFillAwardFill className="icon" /> Curricular & Co-curricular
            Details
          </Link>
        </li>
        <li className="sidebar-list-item">
          {/* Link to navigate to the Add Achievement page */}

          <Link to="/add-AchievementDetails">
            <BsTrophy className="icon" /> Achievements and Certifications
          </Link>
          {/* <Link to="/">
             <BsPersonPlus className="icon" /> Activities */}

          {/* </Link> */}
        </li>
        <li className="sidebar-list-item">
          <Link to="/add-ProjectDetails">
            <BsFileEarmarkText className="icon" /> Project Details
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
