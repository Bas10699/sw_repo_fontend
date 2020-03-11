import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'


// import Nevbars from './component/nevbars'
import InputFrom from './component/inputFrom'
import Dashbord from './component/dashboard'
import Header from './layout/Header';
import Sideder from './layout/Sideder';

import Calender from './component/calender/Calender'
import FromLocation from './component/FromLocation'
import FromTypeItem from './component/FromTypeItem';
import EditDataItem from './component/EditDataItem';
import ShowAirport from './component/ShowAirport';
import ShowItemType from './component/ShowItemType';
import ShowItemBrand from './component/ShowItemBrand';



export default class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Router exact path="/">
          <Header />
          <Sideder />
          <div className="content-wrapper">

            {/* <div className="content-header"> */}
            {/* <div className="container-fluid"></div> */}
            <Route exact path='/' component={Dashbord} />
            <Route exact path='/InputFrom' component={InputFrom} />
            <Route exact path='/Calender' component={Calender} />
            <Route exact path='/FromTypeItem' component={FromTypeItem} />
            <Route exact path='/FromLocation' component={FromLocation} />
            <Route exact path='/editdata/:id' component={EditDataItem} />
            <Route exact path='/ShowAirport' component={ShowAirport} />
            <Route exact path='/ShowItemType' component={ShowItemType} />
            <Route exact path='/ShowItemBrand' component={ShowItemBrand} />

            {/* </div> */}
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