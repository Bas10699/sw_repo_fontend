import React, { Component } from 'react'
import { get, post } from '../service/service'
import swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'

export default class FromTypeItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_data: []
        }
    }

    componentDidMount(){
        const script = document.createElement("script")
        script.src = 'js/content.js'
        script.async = true
    
        document.body.appendChild(script)
      }

    componentWillMount() {
        this.get_type_item()
    }
    get_type_item = async () => {
        try {
            await get("typeName/get_typeName").then((result) => {
                if (result.success) {
                    this.setState({
                        get_data: result.result
                    })
                }
                else {
                    swal("", "", "error")
                }
            })
        }
        catch (error) {
            alert("get_type_item: " + error)
        }
    }
    render() {
        const {get_data} =this.state
        return (
            <div className="container">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <div className="row">
                            <div className="col">
                                <h6 className="m-0 font-weight-bold text-primary">ตารางแสดงประเภทของอุปกรณ์ทั้งหมด</h6>
                            </div>
                            {/* <button className="btn btn-primary">เพิ่ม</button> */}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="example1" width="100%">

                                <thead>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>ชื่อประเภท</th>
                                        <th>จำนวนทั้งหมด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {get_data.map((element, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{element.item_type}</td>
                                                <td>{element.count_item}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
