import React from "react";
import './SignIn.css'
import { Navigate, Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {navigate} from "../Register/Register"
import {useState} from 'react'

// signin  component independent jasto ho yo signin  vaesi aru component sita lena dena dina pardena so xutai class banaim 
// to communicate between child and parent, child ma use huni function parent ma banauni methodko roopma, ani props ko roopma childma  pathauni , callback ko roopma, so  that actual call huda chai parentmai hos ani data paiyus

// yo auta card vitra hos, so tachyons card ko bairi border matra lini
function SignIn(props) {
    // copied from tachyons forms
    // we do receive a routechange props
    // constructor(props){
    //     super(props);  // parentko constructor run hunxa,esma attributesma this. jo hunxa but aile child ma run vairaxa so this. le child ko nai attribute banaidinxa, so that child can have these attributes too on its own
    //     this.state={
    //         signInEmail: '',
    //         signInPassword: ''
    //     }
    // }
    //functional component ma props func ko argument ko roopma authyo
    // class component ma it comes in constructor
    // sayed superma this.state={props: {props}} xa  hola 
    // so we can use this.props 

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const onEmailChange = (event)=>{
    //  this.setState({signInEmail: event.target.value})
    setEmail(event.target.value)
    }

    const onPasswordChange = (event)=>{
        //  this.setState({signInPassword: event.target.value}) 
        setPassword(event.target.value)
    }

    const onSubmit = () =>{
        // console.log(this.state)
        // 3000 portlai serverle listen garexa or server 3000 portma xa, so serverko /signin route ma post req pathaim with body containing email and password
        // serverko /signin route afno xuttai route ho, front end sita kei lena dena xaina yo route ko 
       
        fetch('https://smartbrain-api-0bz1.onrender.com/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            // we cant directly send js object to server, i must send a json so stringify
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((response)=>response.json())   //  pailo .then le return gareko value next .then ko arg ko roopma janxa
        .then((user)=>{  // if user exist, user object return garxa, if not, error msg with status code of 400
            if(user.id){ // does the user exist? Did we receive a user with a property of id?
                props.loadUser(user);
                props.routeChange('home');
                navigate("/home") 
            }
        })
    }

    const onRegister =  () => {
        // app.js pani hook banaepar, on routechange function mai navigate garna hunthyo ani farak farak thauma garna parthena
        props.routeChange('register')
        navigate('/register')
    }

    // return gareko chij render hunxa
        // const {routeChange} = this.props;
        return(
            <article className="br3 ba shadow-5 dark-gray  b--black-10 mt5 w-100 w-50-m w-25-l mw6 center" >   
            {/* mw means maxwidth, esari alli width badhyo form ko  */}
                    <main className="pa4 black-80">
                        {/* <form className="measure"> */}
                        <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
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
                             value="Login"/>
                        </div>
                        <div className="lh-copy mt3">
                            <a onClick={onRegister} href="" className="f5 link dim black db">Register</a>
                        </div>
                        {/* </form> */}
                        </div>
                </main>
          </article>)
    }
  




export default SignIn
