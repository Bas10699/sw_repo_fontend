import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Nevbars from './component/nevbars'
import InputFrom from './component/inputFrom'
import Dashbord from './component/dashboard'
import Header from './layout/Header';
import Sideder from './layout/Sideder';

import Calender from './component/Calender'



export default class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Router exact path="/">
          <Header />
          <Sideder />
          <div class="content-wrapper">

            <div class="content-header">
              <div class="container-fluid"></div>
              <Route exact path='/' component={Dashbord} />
              <Route exact path='/InputFrom' component={InputFrom} />
              <Route exact path='/Calender' component={Calender} />
        
            </div>
          </div>
          {/* Control Sidebar */}
          <aside className="control-sidebar control-sidebar-dark">
            {/* Control sidebar content goes here */}
          </aside>
          {/* /.control-sidebar */}
        </Router>
      </div >

    )
  }
}