import React, { useState, useEffect } from 'react';
import Feed from './Feed'
import data from '../assets/testingData'

describe('<Feed />', () => {
  it('renders with preferences', () => {
    const setFeedChange = cy.stub().as('setter')
    const props = {
      prefs:{
        Motivation: true,
        Milestones: false,
        Mindfulness: false
      },                                       
      setFeedChange: setFeedChange,
    }
    const mockObj = [{
      _id: '64f95667276e771a0417721c',
      userID: {
        _id: '64f7cc6070af1c6e0e841fb4',
        userName: 'Bryan',
        password: 'choe',
        email: 'bryan@choe.com',
        preferences: {
            Motivation: true,
            Milestones: false,
            Mindfulness: false 
        },
        zipCode: '92821',
        __v: 0,
      },
      preference: 'Motivation',
      image: null,
      description: 'DB Test',
      hypes: 0,
      vibes: [],
      __v: 0,
    }]

    // see: https://on.cypress.io/mounting-react
    cy.intercept('http://localhost:3000/api/posts', mockObj)
    console.log(data)
    cy.mount(<Feed {...props} />)
    // cy.get('@setter').should('have.been.called')
    
  }),

  it('setter func being called', () => {
    const setFeedChange = cy.stub().as('setter')
    const props = {
      prefs:{
        Motivation: true,
        Milestones: false,
        Mindfulness: false
      },                                       
      setFeedChange: setFeedChange,
    }
    const mockObj = [{
      _id: '64f95667276e771a0417721c',
      userID: {
        _id: '64f7cc6070af1c6e0e841fb4',
        userName: 'Bryan',
        password: 'choe',
        email: 'bryan@choe.com',
        preferences: {
            Motivation: true,
            Milestones: false,
            Mindfulness: false 
        },
        zipCode: '92821',
        __v: 0,
      },
      preference: 'Motivation',
      image: null,
      description: 'DB Test',
      hypes: 0,
      vibes: [],
      __v: 0,
    }]

    // see: https://on.cypress.io/mounting-react
     cy.intercept('http://localhost:3000/api/posts', data)
    cy.mount(<Feed {...props} />)
    cy.get('@setter').should('have.been.called')
    
  })
  

})