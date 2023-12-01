import React,{Component} from 'react';
import './App.css';
import Navigation  from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import ParticlesBg from 'particles-bg'
import FaceRecognizer from './components/FaceRecognizer/FaceRecognizer'
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  redirect
} from "react-router-dom";

//clarifai api lai backend ma lani, coz image detect garda clarifai ma jun request pathainxa, network ma herda teha request headers ko roopma authorization key vanera pat key dekhido raixa which may be risky in case of paid apis, so move it to backend
// clarifai api ma call or request pathauni in our backend code, tesko response ta hamlai yeha front end mai chainxa

// const SetupClarifai = (imageurl) => {
//   const PAT = '8af39a11380a44d29dee9a33b3f794eb'
//   const USER_ID = 'ram18'
//   const APP_ID = 'facedetect'
//   const MODEL_ID = 'face-detection'
//   const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'
//   const IMAGE_URL = imageurl
//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };
//   return requestOptions
// }


// harekchati userle signout garesi, feri arko userle signin garda pani prev userko img dekkhirathyyo
// coz  previous user ko state clear vathena, coz naya user  signin garda aru properties ta naya set vaye, but img url pailako user ko jo xa , naya le ta img url halnai paxaina ajai 
// so img dekhinxa prev userko, so signout garda bittikai state clear garera initial state ma set gardini, ani signin garda feri afai set hunivayo, ani tyo  problem ni hatyo
const initial_state = {
  input: "",
      imageurl: "",
      boxes: [],
      route: "signin",   // default suruma route will be signin page
      isSignedIn: false,
      // coz eska values xuttai functionma calculate garinxa ani, uta facerecog ma props ko roopma ni pathauna parxa
      userProfile: {         // current user load garna kam lagxa register or signin garesi 
        id: '',
        name: '',
        email: '',
        joined: '',
        entries: 0,
}}

class App extends Component{

  constructor(){
    super()
    sessionStorage.getItem('isSignedIn') 
    ? 
    this.state = JSON.parse(sessionStorage.getItem('user'))
    :
    this.state = initial_state;
  }

  // constructor ra render matra afai call hunxan, aru methods aafai call hunnan, hamle jo call garna parxa
  // it needs image url from user, so image url ko lagi vaeni yo app kai auta method hunaparyo
  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then((response)=>response.json())
  //   // mero server le pathako response ho, which is listening 3000 port, react is running on 3001 port , both are different computers
  //   .then((data)=>console.log(data)) 
  // }
  


  // relation between imagelinkform and facerecognition, ini components ma use huni functions  yehi define gar app.js ma methods ko roopma, send data child(form) to parent(app), then provide it to next child  as props, lifting up
  calculateFaceLocation = (response) => {
    // console.log(response)
    const image = document.getElementById("inputimage")
    const width = Number(image.width)   // getattribute  , . matra garera ni properties access hudaraixan kya
    const height = Number(image.height)
    // const boundingbox = response.outputs[0].data.regions[0].region_info.bounding_box; // khasma ta jati ota face teti ota regions hunxa, aile lai we are focusing on only one face
    let bounding_boxes  = []
    for(let item of response.outputs[0].data.regions){
      let dataa = item.region_info.bounding_box;
      let box = {
        // bounding box vitraka values are percentages , everything starts from top for heights and from left for widths
        // leftcol 22% -> 22% of totalwidth -> x pixels from the left ma xa, rightcol 40$ -> 40% of totalwidth -> y pixels from left , i.e width-y pixels from right ma xa
        // auta div banauni ho face ma, tyo div ma position absolute garayera left: x , gives a left margin of x wrt parent diniho
        leftCol: dataa.left_col * width ,
        topRow: dataa.top_row * height, 
        rightCol: width - (dataa.right_col * width),
        bottomRow: height - (dataa.bottom_row * height)
      }
      bounding_boxes.push(box)
    }
    // console.log("boundingbox is ",boundingbox)

    return bounding_boxes;
  }

  displayFaceBox = (boxes) =>{
    // console.log(box)
    this.setState({boxes: boxes})
    // due to async nature of setstate, esko tala aru nalekham , setstate ko lagi matra xuttai function banako ramro
  }

  // loadUser vanni method app.js ma banayesi hunxa, coz signin ma ni chainxa yo, register ma ni, baru yeha banauni, userload le userprofile state update hunxa current userko
  // responseko roopma user serverbata register ra signin ma pauxu maile, but userka properties ta aru components ma ni chainxan, so to communicate between signin and arko sibling component, loaduser vanni auta method/function yeha banauni, ani propsko roopma signin ma pathauni
  // child bata parent ma data pathauni jo yei garera ho(tyo method call chai yeii app.js parent ma hunivayo, so output paunivaim), parent bata childma pathauna chahi props ko roopma pathauni, 

  loadUser = (user) =>{
    this.setState({
      //  this will be current user logged in user profile
      userProfile: {
          id: user.id,
          name: user.name,
          email: user.email,
          joined: user.joined,
          entries: user.entries,
      }
    })
  }
  // uta signin or register button click huda bittikai yo trigger hunxa
  addSession = () => {
    sessionStorage.setItem('user',JSON.stringify(this.state))
    sessionStorage.setItem('isSignedIn', true)
  }

  removeSession = () => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('isSignedIn')
  }

  onRouteChange = (route) => {
    // app.js laini hooks banako vae, sidhai yeha navigate garna hunthyo, farak farak thauma navigate garirakhna parthena, navigate(route)
    this.setState({route: route})
    // state change huda bittikai rerender hunxa
    if(route==="home"){
     this.setState({isSignedIn: true});
      // refresh garda sab states feri empty, or initial state ma set hunxan, so signin pagema redirect vainxa
    this.addSession()

    }
    else if(route==="signout"){
       this.setState(initial_state)
       this.removeSession()
    }
    else{
      this.setState({isSignedIn: false})
    }
  }      

  
  onInputChange = (event) => {
  // click garda ko input value chainxa hamlai codema 
    this.setState({input: event.target.value})
  }

  onButtonClick = async () => {
  await this.setState({imageurl: this.state.input}) 
// or 
// const url = document.getElementById("inputbox").value , we want minimum dom manipulation , so ........ 
// await this.setState({imageurl: url})
  console.log("link is 1", this.state.imageurl)  // await garesi balla yo print hunivo
  this.fetch_response();
  }

  fetch_response = () => {
    // fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",SetupClarifai(this.state.imageurl))  // yeha this.state.input garethyo andreile coz setstate async vaeka karan ber lagxa vanera
    fetch("https://smartbrain-api-0bz1.onrender.com/imageurl",{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())   // mathillo .then() le return gareko chij goes to next .then() as argument
    .then(result => {
      if(result.outputs[0].data.regions[0]){
        fetch("https://smartbrain-api-0bz1.onrender.com/image",{  // to increase entries by 1
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          // we cant directly send js object to server, i must send a json so stringify
          body: JSON.stringify({
            id: this.state.userProfile.id
          })
      })
      // clarifai le j response pathauxa , tyo sidhai yeta transfer / send handiye vayo
      .then((response)=>response.json())
      .then((count)=>{
        this.setState(Object.assign(this.state.userProfile, {entries: count}))   // kailekai const new_obj = Object.assign({}, obj1);  esto ni garinxa
        // this.setState({userProfile: {}}) sab tetro lamo feri lekhna parxa jhheu 
        // this.setState({userprofile: {...this.state.userProfile, entries: count}});   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax overriding properties ma gaera her
        })
      .catch(console.log)

      this.displayFaceBox(this.calculateFaceLocation(result))}})
    .catch(error => console.log('error', error));
      }
      
      
    

  
  render(){
    const {isSignedIn, imageurl, boxes, route, userProfile} = this.state;
    // return(
    //   <div className='App' > 
    //     <Navigation routeChange={this.onRouteChange} isSignedIn={isSignedIn}/>
    //     <ParticlesBg type='cobweb' num={100} bg={true} color="#FFFFFF" className="particles"/>
    //     {(this.state.route === "home")
    //     ?
    //     <div>     
    //     <Logo />
    //     <Rank />
    //     <ImageLinkForm   onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
    //     <FaceRecognizer  imageurl={imageurl} box={box}/>  
    //     {/* yei box anusar css add garni facema uta  */}
    //     </div>  

    //     :(
    //       (route === "signin")
    //       ?
          
    //       <SignIn routeChange={this.onRouteChange}/>
          
    //       // khasma routechange function lai argument chainxa, but esari pass garda bina arg nai pass gareni hunxa, arg utai signin component vitra gaesi balla dini
    //       :
        
    //       <Register routeChange={this.onRouteChange} />

    //     )
    //     }

    //     </div>
        

    // )
    return(
    <div className='App' > 
    <ParticlesBg type='cobweb' num={100} bg={true} color="#FFFFFF" className="particles"/>
    <Router>
    {/* useNavigate use garnalai a component must lie inside router in app.js */}
    <Navigation routeChange={this.onRouteChange}  isSignedIn={isSignedIn}/>
    <Routes>
      <Route exact path='/signin' element = {<SignIn loadUser={this.loadUser} routeChange={this.onRouteChange}/>} />
      <Route exact path='/' element={<Navigate to="/signin" />}/>
  
  
      <Route exact path='/home' element=
      {
        //  true ? <SignIn routeChange={this.onRouteChange} /> : <Navigate to="/login" />
        isSignedIn 
        ?
        (<div>     
         <Logo />
         <Rank name={userProfile.name} entries={userProfile.entries} />
         <ImageLinkForm   onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
         <FaceRecognizer  imageurl={imageurl} boxes={boxes}/>  
         {/* yei box anusar css add garni facema uta  */}
       </div>)
       :
       (<Navigate to="/signin" />)
          }/>


    <Route exact path='/register' element={<Register loadUser={this.loadUser} routeChange={this.onRouteChange}/>}/>
    </Routes>
    </Router>
    </div>
    )
  }
}

export default App;
