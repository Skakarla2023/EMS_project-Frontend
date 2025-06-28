import { BrowserRouter, Route,  Routes } from "react-router-dom"
import "./App.css"
import EmployeeList from "./components/EmployeeList"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Employee from "./components/Employee"
import EmployeeView from "./components/EmployeeView"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/*  {http://localhost:3000}*/}
          < Route path='/' element={<EmployeeList />}></Route>
          {/* {http://localhost:3000/employees}*/}
          <Route path='/employees' element={<EmployeeList />}></Route>
          {/* {http://localhost:3000/add-employee}*/}
          <Route path='/add-employee' element={<Employee />}></Route>
          {/* {http://localhost:3000/view-employee}*/}
          <Route path='/view-employee/:id' element={<EmployeeView />}></Route>
          <Route path="/edit-employee/:empId" element={<Employee />} />
          <Route path="/add-employee" element={<Employee />} />

           <Route path='/edit-employee/:id' element={<Employee />}></Route></Routes>


        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App



