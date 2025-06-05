import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    //If the user does not have a JWT token
    const user = localStorage.getItem('loginToken');
    //Redirect them to protected
    return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes;