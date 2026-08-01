import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const HostRoute = ({children}) => {

 const {user}=useContext(AuthContext);


 if(!user){
   return <Navigate to="/login"/>;
 }


 if(user.role !== "host"){
   return <Navigate to="/"/>;
 }


 return children;

};


export default HostRoute; 