import React from "react";
import { useNavigate , BrowserRouter as Router} from "react-router-dom";
// it is a simple component with no state, so we will write as functional component
// state -> component which changes or which may change on time due to  user clicks or anything

function Navigation ({routeChange,isSignedIn}) {
    

    const navigate = useNavigate();
   // useNavigate use garna a component must lie inside router in app.js
    const onRegister =  () => {
        // app.js pani hook banaepar, on routechange function mai navigate garna hunthyo ani farak farak thauma garna parthena
        routeChange('register')
        navigate('/register')
    }
    // const navigate = useNavigate();
    const onLogin =  () => {
        // app.js pani hook banaepar, on routechange function mai navigate garna hunthyo ani farak farak thauma garna parthena
        routeChange('signin')
        navigate('/signin')
    }

    const onSignOut = () => {
        // app.js hooks vako vae duiduichati routechange ra navigate garna parthena, uta onroutechange vitrai navigate() vanera rakhdinthey
        routeChange('signout')
        navigate('/signin')
    }
    
    if(isSignedIn){
    return(
        <nav style={{display:"flex", justifyContent:"flex-end"}}>
            <p onClick={onSignOut} className="f3 link dim black underline pa3 pr4 pointer">Sign Out</p>
        </nav>
    )}
    else{
        return(
        <nav style={{display:"flex", justifyContent:"flex-end"}}>
        {/* <p onClick={()=>routeChange('signin')} className="f3 link dim black underline pa3 pr3 pointer">LogIn</p> */}
        <p onClick={onLogin} className="f3 link dim black underline pa3 pr3 pointer">LogIn</p> 
        <p onClick={onRegister} className="f3 link dim black underline pa3 pr4 pointer">Register</p>
         </nav>)
    }
}

export default Navigation