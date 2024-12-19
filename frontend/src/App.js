import './App.css';
import React, { useState,useRef, useEffect } from "react";

function App() {
  const today = new Date().toISOString().split('T')[0];


  const [employees,setEmployees]=useState(null);



  useEffect(()=>{
    const fetchEmployees=async()=>{
      try{
      const response=await fetch("https://backend-test-cct9.onrender.com/employees");
      const responseData=await response.json();
      console.log(responseData);
      setEmployees(responseData);
      }
      catch(err){
        console.log(err);
        alert("Server offline");
      }
    }
    fetchEmployees();
  }
  ,[]);

  const formref=useRef(null);

  const validatephone=(e)=>{
    const phone=e.target.value;
    if(phone.length>10){
      alert("Phone number should be 10 digits");
      e.target.value=phone.slice(0,10);
    }
    return
  }

  const formSumbitHandler = async(event) => {
    event.preventDefault();
    const data={
      name:formref.current[0].value+" "+formref.current[1].value,
      email:formref.current[2].value,
      phone_number:formref.current[3].value,
      employee_id:formref.current[4].value,
      department:formref.current[5].value,
      doj:formref.current[6].value,
      role:formref.current[7].value
    }
    const response=await fetch("https://backend-test-cct9.onrender.com/employees/post/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });
    const responseData=await response.json();
    console.log(responseData.statusCode==200);
    if(responseData.statusCode!==200){
      console.log("here")
      alert(responseData.message);
      return}
    console.log(responseData);
    console.log("Form Submitted");
    alert("Form Submitted");
    window.location.reload();
  }




  return (
<div className="App">
  <div className="form-container">
    <h1 className="title">OneAdmin</h1>
    <form
      className="form"
      onSubmit={formSumbitHandler}
      ref={formref}
    >
      <label className="form-label">First Name</label>
      <input
        className="form-input"
        type="text"
        placeholder="First Name"
      />
      <label className="form-label">Last Name</label>
      <input
        className="form-input"
        type="text"
        placeholder="Last Name"
      />
      <label className="form-label">Email</label>
      <input
        className="form-input"
        type="email"
        placeholder="Email"
        required
      />
      <label className="form-label">Phone Number</label>
      <input
        className="form-input"
        type="number"
        placeholder="Phone Number"
        onChange={validatephone}
        required
      />
      <label className="form-label">Employee Id</label>
      <input 
      type="text"
      className="form-input"
      placeholder='Enter Employee Id'
      required/>
      <label className="form-label">Department</label>
      <select
        className="form-select"
        name="department"
      >
        <option value="HR">HR</option>
        <option value="Engineering">Development</option>
        <option value="Marketing">Testing</option>
      </select>
      <label className="form-label">DOJ</label>
      <input
        className="form-input"
        type="date"
        placeholder="DOJ"
        max={today}
        value={today}
      />
      <label className="form-label">Role</label>
      <input
        className="form-input"
        type="text"
        placeholder="Role"
      />
      <div className="form-buttons">
        <button
          className="form-button submit-button"
          type="submit"
        >
          Submit
        </button>
        <button
          className="form-button reset-button"
          type="reset"
        >
          Reset
        </button>
      </div>
    </form>
  </div>

  {employees && (
    <div className="employees-container">
      <h3 className="employees-title">Employees</h3>
      <table className="employees-table">
        <thead className="table-head">
          <tr>
          <th className="table-header">Employee Id</th>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Phone Number</th>
            <th className="table-header">Department</th>
            <th className="table-header">DOJ</th>
            <th className="table-header">Role</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {employees.map((employee, index) => (
            <tr
              className="table-row"
              key={index}
            >
              <td className="table-cell">{employee.employee_id}</td>
              <td className="table-cell">{employee.name}</td>
              <td className="table-cell">{employee.email}</td>
              <td className="table-cell">{employee.phone_number}</td>
              <td className="table-cell">{employee.department}</td>
              <td className="table-cell">{employee.doj}</td>
              <td className="table-cell">{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
}

export default App;
