import React from 'react'
import Post from './Post'
import octopus from '../assets/octopus-tentacles.png';
import testImg from '../assets/testImg.js';


describe('<Post />', () => {
  it('Check if default img exists', () => {
    // see: https://on.cypress.io/mounting-react
    const props = {
      setFeedChange: cy.stub(),
      postInfo: {
        _id: '64f8965bf14e91b864955ab5',
        userID: '64f7cc6070af1c6e0e841fb4',
        preference: 'Motivation',
        description: 'asd',
        hypes: 0,
        vibes: Array,
      },
    };
    cy.mount(<Post {...props}/>)
    cy.get('img').should('have.attr' ,'src', octopus )
  })
  it('Check if passed in img is rendered',() => {
    const props = {
      setFeedChange: cy.stub(),
      postInfo: {
        _id: '64f8965bf14e91b864955ab5',
        userID: '64f7cc6070af1c6e0e841fb4',
        preference: 'Motivation',
        description: 'asd',
        image: testImg,
        hypes: 0,
        vibes: Array,
      },
    };
    cy.mount(<Post {...props}/>)
    cy.get('img').should('have.attr', 'src', props.postInfo.image)
  })
  it("Check if Delete Post works", ()=> {
    let feedChange = cy.stub()
    const props = {
      setFeedChange: feedChange,
      postInfo: {
        _id: '64f8965bf14e91b864955ab5',
        userID: '64f7cc6070af1c6e0e841fb4',
        preference: 'Motivation',
        description: 'asd',
        image: testImg,
        hypes: 0,
        vibes: Array,
      },
    };
    cy.mount(<Post {...props}/>)
    //Making sure the request to backend route /api/posts is made and request is given.
    //
    cy.intercept('DELETE', '/api/posts/*', 'hi').as('deleteButton');
    cy.get('button').click()
    cy.wait('@deleteButton').its('response.body').should('equal', 'hi')
  })
  it('is state chaned with updateFeed Func' ,() => {
    let obj = {
      myFunc: ()=> {
        console.log('yooooo')
      }
    }
    let feedChange = cy.stub(obj, 'myFunc').as('feed')
    //  let feedChange = cy.stub()
    const props = {
      setFeedChange: feedChange,
      postInfo: {
        _id: '64f8965bf14e91b864955ab5',
        userID: '64f7cc6070af1c6e0e841fb4',
        preference: 'Motivation',
        description: 'asd',
        image: testImg,
        hypes: 0,
        vibes: Array,
      },
    };
    cy.mount(<Post {...props}/>)
    //the intercept is essentially the server here.
    //have to intercept cuz no server
    cy.intercept('DELETE', '/api/posts/*', '').as('deleteButton');
    cy.get('button').click()
   cy.get('@feed').should('have.been.called')
  //  expect('feed').to.be.calledOnce
  
  })
})