import React, { Component } from 'react'
import "./Calender.css"

export default class calender extends Component {
    render() {
        return (
            <div className="container py-5">
               {/* Calendar */}
                <div className="calendar shadow bg-white p-5">
                    <div className="d-flex align-items-center"><i className="fa fa-calendar fa-3x mr-3" />
                        <h2 className="month font-weight-bold mb-0 text-uppercase">March 2020</h2>
                    </div>
                    <p className="font-italic text-muted mb-5">No events for this day.</p>
                    <ol className="day-names list-unstyled">
                        <li className="font-weight-bold text-uppercase">Sun</li>
                        <li className="font-weight-bold text-uppercase">Mon</li>
                        <li className="font-weight-bold text-uppercase">Tue</li>
                        <li className="font-weight-bold text-uppercase">Wed</li>
                        <li className="font-weight-bold text-uppercase">Thu</li>
                        <li className="font-weight-bold text-uppercase">Fri</li>
                        <li className="font-weight-bold text-uppercase">Sat</li>
                    </ol>
                    <ol className="days list-unstyled">
                        <li>
                            <div className="date rounded-circle bg-danger " style={{width:"23px"}}>&nbsp; 1</div>
                            <div className="event bg-success">Event with Long Name</div>
                        </li>
                        <li>
                            <div className="date">2</div>
                        </li>
                        <li>
                            <div className="date">3</div>
                        </li>
                        <li>
                            <div className="date">4</div>
                        </li>
                        <li>
                            <div className="date">5</div>
                        </li>
                        <li>
                            <div className="date">6</div>
                        </li>
                        <li>
                            <div className="date">7</div>
                        </li>
                        <li>
                            <div className="date">8</div>
                        </li>
                        <li>
                            <div className="date">9</div>
                        </li>
                        <li>
                            <div className="date">10</div>
                        </li>
                        <li>
                            <div className="date">11</div>
                        </li>
                        <li>
                            <div className="date">12</div>
                        </li>
                        <li>
                            <div className="date">13</div>
                            <div className="event all-day begin span-2 bg-warning">Event Name</div>
                        </li>
                        <li>
                            <div className="date">14</div>
                        </li>
                        <li>
                            <div className="date">15</div>
                            <div className="event all-day end bg-success">Event Name</div>
                        </li>
                        <li>
                            <div className="date">16</div>
                        </li>
                        <li>
                            <div className="date">17</div>
                        </li>
                        <li>
                            <div className="date">18</div>
                        </li>
                        <li>
                            <div className="date">19</div>
                        </li>
                        <li>
                            <div className="date">20</div>
                        </li>
                        <li>
                            <div className="date">21</div>
                            <div className="event bg-primary">Event Name</div>
                            <div className="event bg-success">Event Name</div>
                        </li>
                        <li>
                            <div className="date">22</div>
                            <div className="event bg-info">Event with Longer Name</div>
                        </li>
                        <li>
                            <div className="date">23</div>
                        </li>
                        <li>
                            <div className="date">24</div>
                        </li>
                        <li>
                            <div className="date">25</div>
                        </li>
                        <li>
                            <div className="date">26</div>
                        </li>
                        <li>
                            <div className="date">27</div>
                        </li>
                        <li>
                            <div className="date">28</div>
                        </li>
                        <li>
                            <div className="date">29</div>
                        </li>
                        <li>
                            <div className="date">30</div>
                        </li>
                        <li>
                            <div className="date">31</div>
                        </li>
                        <li className="outside">
                            <div className="date">1</div>
                        </li>
                        <li className="outside">
                            <div className="date">2</div>
                        </li>
                        <li className="outside">
                            <div className="date">3</div>
                        </li>
                        <li className="outside">
                            <div className="date">4</div>
                        </li>
                    </ol>
                </div>
            </div>

        )
    }
}
