import React from "react";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";


// yo auta card vitra hos, so tachyons card ko bairi border matra lini
const Register = ({routeChange,loadUser}) => {
    // copied from tachyons forms
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const onNameChange = (event)=>{
        setName(event.target.value)
        }

    const onEmailChange = (event)=>{
    setEmail(event.target.value)
    }

    const onPasswordChange = (event)=>{
        setPassword(event.target.value)
    }

    const onSubmit = () =>{
        // console.log(this.state)
        // 3000 portlai serverle listen garexa or server 3000 portma xa, so serverko /signin route ma post req pathaim with body containing email and password
        // serverko /signin route afno xuttai route ho, front end sita kei lena dena xaina yo route ko 
       
    fetch('https://smartbrain-api-0bz1.onrender.com/register',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        // we cant directly send js object to server, i must send a json so stringify
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then((response)=>response.json())   //  pailo .then le return gareko value next .then ko arg ko roopma janxa
    .then((user)=>{
        if(user.id){  // if(user) matra nagar, coz natra ta emptyly register garda user variable ma incorrectformsubmission store hunxa, it still returns true, user.id returns true only if id exists as property
            loadUser(user)  // call chai app.js mai hunxa, way to send dataa from child to parent 
            routeChange('home');  // isSignedIn true hunxa, ani balla navigate to home
            navigate("/home")
        }
    })
}

    return(
    <article className="br3 ba mt5 shadow-5 dark-gray  b--black-10  w-100 w-50-m w-25-l mw6 center" style={{display:"flex", alignItems: "center", justifyContent: "center"}}>    
    {/* mw means maxwidth, esari alli width badhyo form ko  */}
            <main className="pa4 black-80">
                {/* <form className="measure">   */}
                <div className="measure"> 
                {/* form ko satta div use gar, coz paxi hamle <form> use nagarera , formdata ko roopma haina json ko roopma ajax ko madat le send garniho input data haru , esle warning dexa form related so hataim  */}
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f5" htmlFor="username">Username</label>
                    <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username"/>
                    </div>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                    <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                    <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                </fieldset>
                <div className="">
                    {/* <input onClick={routeChange('home')}   yehi jo call hunthyo, but we want callback */}
                    {/* <input onClick={()=>routeChange('home')} */}
                    <input onClick={onSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                    type="submit"
                     value="Register"/>
                </div>
                </div>
                {/* </form> */}
        </main>
  </article>)
}


export default Register