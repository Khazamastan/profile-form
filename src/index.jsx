'use strict'

import React from 'react';
import { render } from 'react-dom';
import { PersonalInfo } from './views/personalInfo'
import { Address } from './views/address'
import { Education } from './views/education'
import { Experience } from './views/experience'
import Multistep from './views/steps'
import ReactDOM from 'react-dom';
import { steps } from './views'

import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
// const steps = 
//   [
//     {name: 'Personal Info', component: "PersonalInfo"},
//     {name: 'Address', component: "Address"},
//     {name: 'Education', component: "Education"},
//     {name: 'Experience', component: "Experience"}
//   ];


class Profile extends React.Component {
  render() {
    return (
        <div>
          <h2 className="bottom-border-0 mt-10">Edit Profile</h2>
          <PersonalInfo edit={true}/>
          <br/>
          <hr/>
          <Address edit={true}/>
          <br/>
          <hr/>
          <Education edit={true}/>
          <br/>
          <hr/>
          <Experience edit={true}/>
          <br/>
          <hr/>
        </div>
    )
  }
}

class ProfileForm extends React.Component {
  render() {
    return (
        <div>
          <h2 className="bottom-border mt-10">Profile</h2>
          <Multistep initialStep={1} steps={steps}/>
          {/*<Link to={"profile"}>View Profile</Link>*/}
        </div>
    )
  }
}

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route name={"ProfileForm"} path = "/" component = {ProfileForm}></Route>
      <Route name={"profile"} path = "/profile" component = {Profile}></Route>
   </Router>
  
), document.getElementById('app'));

// render(<ProfileForm/>, document.querySelector("#app"));
