import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getEmployee } from "../services/EmlployeeService";


const EmployeeView = () => {

    const [employee, setEmployee] = useState({
        id:0,
        firstName:"",
        lastName:""
    });

    const {id} = useParams();

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setEmployee(response.data);
            }).catch(error=>{
                console.error(error);
            })
        }

    })







  return (
    

        <div className="container">
            <div className="row">
                <div className="col-mg-6 mt-2 shadow">
                    <h2 className="text-center m-4">Employee Details</h2>
                    <div className="card">
                        <div className="card-header">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Employee id:</b>{employee.id}</li>
                                <li className="list-group-item"><b>Employee FirstName:</b>{employee.firstName}</li>
                                <li className="list-group-item"><b>Employee LastName:</b>{employee.lastName}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                        <Link className="btn btn-info mx-2" to="/" >Back to Home</Link>
            </div>
        </div>





  )
}

export default EmployeeView