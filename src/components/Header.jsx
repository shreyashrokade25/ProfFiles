import React from 'react'
import { BsActivity , BsPersonPlus}
from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <div className='header-data'>

          <Link to="/" className="button-link">
            <BsActivity className="icon" /> Personal Details
          </Link>
          <span className="spacer"></span>
          <Link to="/" className="button-link">

            <BsActivity className="icon" /> Educational Details
          </Link>
          
          <Link to="/" className="button-link spacer">
            <BsActivity className="icon" /> Curricular & Co-curricular Details
          </Link>

          <Link to="/add-achievements" className="button-link">
            <BsPersonPlus className="icon" /> Achievements and Certificatios

          <Link to="/project" className="button-link spacer">
            <BsActivity className="icon" /> Project Details

          </Link>
      </div>
  
    </header>
  )
}

export default Header
