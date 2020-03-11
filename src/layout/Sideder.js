import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import icon_sw from '../const/image/icon-sw.png'
import '../component/bg.css'
class Sideder extends Component {
    render() {
        return (
            <div >
 {/* Main Sidebar Container */}
 <aside className="main-sidebar sidebar-dark-primary elevation-4" >
    {/* Brand Logo */}
    <NavLink exact to="/" className="brand-link ">
      <img src={icon_sw} alt="SW Logo"  className="brand-image img-circle  elevation-3 " style={{opacity: '.8' }} />
      <span className="brand-text font-weight-light"><img src={icon_sw1} alt="SW Logo"  className="brand-image elevation-3 "style={{opacity: '.8' }} /></span>
      <br></br>
    </NavLink>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
          <div className="height nav-item " >
            <NavLink exact to="/"activeClassName="active" className="nav-link  " >
              <i className="nav-icon fas fa-tachometer-alt" />
              <p >
                Dashboard
                
              </p>
            </NavLink >
          </div>
          <li className="nav-header">Device</li>
          
              <div className="height nav-item">
                <NavLink exact to="/InputFrom" activeClassName="active" className="nav-link ">
                  <i className="nav-icon fas fa-warehouse" />
                  <p>Register device</p>
                </NavLink>
              </div>
              <div className="height nav-item">
                <NavLink exact to="/FromTypeItem" activeClassName="active" className="nav-link ">
                  <i className="nav-icon fas fa-edit" />
                  <p>ประเภทอุปกรณ์</p>
                </NavLink>
              </div>
          
              <div className="height nav-item">
                <NavLink exact to="/FromLocation" activeClassName="active" className="nav-link ">
                <i class="fas fa-building"></i>
                           <p>สถานที่ติดติดตั้งอุปกรณ์</p>
                </NavLink>
              </div>
          
           
          
              <li className=" nav-header">รายการอุปกรณ์</li>
                
              
              <div className="height nav-item">
                <NavLink exact to="/ShowAirport" activeClassName="active" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>สถานที่</p>
                </NavLink>
              </div>
              <div className="height nav-item">
                <NavLink exact to="/ggg" activeClassName="active" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>ประเภท</p>
                </NavLink>
              </div>
              <div className="height nav-item">
                <NavLink exact to="/gg" activeClassName="active" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>ยี่ห้อ</p>
                </NavLink>
              </div>
      
          <li className=" nav-header">EXAMPLES</li>
          <div className="height nav-item">
          <NavLink exact to="/Calender" className="nav-link" activeClassName="active">
              <i className="nav-icon far fa-calendar-alt" />
              <p>
                Calendar
                <span className="badge badge-info right">2</span>
              </p>
            </NavLink>
          </li>
          <li className="nav-header">LABELS</li>
          <li className="nav-item">
            <NavLink exact to="/Important" className="nav-link">
              <i className="nav-icon far fa-circle text-danger" />
              <p className="text">Important</p>
            </NavLink>
          </li>
         
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
 
</div>

        )
    }
}
export default withRouter(Sideder)