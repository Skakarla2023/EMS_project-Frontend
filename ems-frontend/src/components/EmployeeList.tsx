import { useEffect, useState, type SetStateAction } from "react";
import { deleteEmployee, listEmployees } from "../services/EmlployeeService";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
   const navigate = useNavigate();
   const [employees, setEmployees] = useState<any[]>([]);

   useEffect(() => {
      getAllEmployees();
   }, []);

   function getAllEmployees() {
      listEmployees()
         .then((response: { data: SetStateAction<any[]>; }) => {
            setEmployees(response.data);
         })
         .catch((error: any) => {
            console.error(error);
         });
   }

   function addEmployee() {
      navigate('/add-employee');
   }

   function viewEmployee(id: any) {
      navigate(`/view-employee/${id}`);
   }

   function updateEmployee(id: any) {
      navigate(`/edit-employee/${id}`);
   }

   function removeEmployee(id: any) {
      deleteEmployee(id)
         .then(() => {
            console.log(`Deleted employee with id ${id}`);
            getAllEmployees(); // Refresh the list
         })
         .catch((error: any) => {
            console.error("Error deleting employee:", error);
         });
   }

   return (
      <div className='container'><br /><br />
         <h2 className="text-center">List Of Employees</h2>
         <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
         </div><br />
         <table className='table table-striped table-bordered'>
            <thead>
               <tr>
                  <th>Id:</th>
                  <th>First Name:</th>
                  <th>Last Name:</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {
                  employees.map(emp =>
                     <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>
                           <button className="btn btn-info" onClick={() => viewEmployee(emp.id)}>View</button>
                           <button className="btn btn-primary" onClick={() => updateEmployee(emp.id)} style={{ marginLeft: '10px' }}>Update</button>
                           <button className="btn btn-danger" onClick={() => removeEmployee(emp.id)} style={{ marginLeft: '10px' }}>Delete</button>
                        </td>
                     </tr>
                  )
               }
            </tbody>
         </table>
      </div>
   );
}

export default EmployeeList;
