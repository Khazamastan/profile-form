import React, { Component, PropTypes } from 'react'
import { PersonalInfo } from './personalInfo'
import { Address } from './address'
import { Education } from './education'
import { Experience } from './experience'

const steps = 
    [
      {name: 'Personal Info', component: <PersonalInfo/>},
      {name: 'Address', component: <Address/>},
      {name: 'Education', component: <Education/>},
      {name: 'Experience', component: <Experience/>}
    ]

export { steps }