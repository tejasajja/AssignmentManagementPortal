
import { useEffect, useState } from 'react';
import './App.css';
import { useLocalState } from './utils/usingLocalStorage';
import { Routes, Route } from 'react-router-dom';
import ReviewerDashboard from "./ReviewerDashboard"
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AssignmentView from './AssignementView';
import { jwtDecode } from 'jwt-decode';
import ReviewerAssignmentView from './ReviewerAssignmentView';

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRole] = useState(getRoleFromJWT());


function getRoleFromJWT(){
  if (jwt){
    const decodedJwt = jwtDecode(jwt);
    return decodedJwt.authorities;
  }
  return [];


}
  return (
    <Routes>
      <Route path="/dashboard" element={roles.find((role)=>role === "ROLE_REVIEWER") ? (<PrivateRoute><ReviewerDashboard/></PrivateRoute>):(<PrivateRoute><Dashboard /></PrivateRoute>)} />
      <Route  path="/assignment/:id" element={roles.find((role)=>role === "ROLE_REVIEWER") ?(<PrivateRoute><ReviewerAssignmentView/></PrivateRoute>):(<PrivateRoute><AssignmentView/></PrivateRoute>)}/>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
