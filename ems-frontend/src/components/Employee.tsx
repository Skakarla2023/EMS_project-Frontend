import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployee } from "../services/EmlployeeService";

const Employee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        id: "",
    });

    const navigator = useNavigate();
    const { empId } = useParams(); // Get ID from route if updating

    useEffect(() => {
        if (empId) {
            getEmployee(empId).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setId(response.data.id); // set from backend
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [empId]);

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = "";
        } else {
            errorsCopy.firstName = "First name is required";
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = "";
        } else {
            errorsCopy.lastName = "Last name is required";
            valid = false;
        }

        if (!empId && !id.trim()) {
            errorsCopy.id = "ID is required for new employee";
            valid = false;
        } else {
            errorsCopy.id = "";
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveEmployee(e: any) {
        e.preventDefault();

        if (validateForm()) {
            const employee = {
                id: empId ? id : (id || Date.now().toString()), // generate only if not updating
                firstName,
                lastName
            };

            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator("/employees");
            }).catch((error) => {
                console.error("Error saving employee", error);
            });
        }
    }

    function pageTitle() {
        return <h2 className="text-center">{empId ? "Update Employee" : "Add Employee"}</h2>;
    }

    return (
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Employee First Name"
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Employee Last Name"
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            {!empId && (
                                <div className="form-group mb-2">
                                    <label className="form-label">ID:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Employee ID"
                                        value={id}
                                        className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                    {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                                </div>
                            )}

                            <button className="btn btn-success" onClick={saveEmployee}>Submit</button>
                            <Link to="/" className="btn btn-danger mx-2">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
