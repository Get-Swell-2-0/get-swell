import React from 'react'
import PostCreator from './PostCreator'
import pic from '../assets/bookmark.png'

describe('<PostCreator />', () => {
  it('Check if file can be Uploaded', () => {
    let feedChange = cy.stub().as('feed')
    const props = {
      user: {
        _id: '64f7cc6070af1c6e0e841fb4'
      },
      setFeedChange: feedChange
    }
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PostCreator {...props} />)
    cy.get('#fileUpload').selectFile('client/assets/bookmark.png')
  })
  it('Check if file is posted to Backend', ()=> {
    let feedChange = cy.stub().as('feed')
    const props = {
      user: {
        _id: '64f7cc6070af1c6e0e841fb4'
      },
      setFeedChange: feedChange
    }
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PostCreator {...props} />)
    cy.get('#fileUpload').selectFile('client/assets/bookmark.png')
    cy.intercept('/api/posts/', '200').as('picture')
    cy.get('[data-cy=picSubmit]').click()
    cy.wait('@picture').its('request.body.image').should('have.length.at.least', 1)
  })
  it('Check if setFeedChange is called' ,() => {
    let feedChange = cy.stub().as('feed')
    const props = {
      user: {
        _id: '64f7cc6070af1c6e0e841fb4'
      },
      setFeedChange: feedChange
    }
    // bebop
    cy.mount(<PostCreator {...props}/>)
    cy.get('#fileUpload').selectFile('client/assets/bookmark.png')
    cy.intercept('/api/posts/', '200').as('picture')
    cy.get('[data-cy=picSubmit]').click()
    cy.get('@feed').should('have.been.called')
  })
  it('Check if error handling works' ,() => {
    let feedChange = cy.stub().as('feed')
    const props = {
      user: {
        _id: '64f7cc6070af1c6e0e841fb4'
      },
      setFeedChange: feedChange
    }
    // bebop
    cy.mount(<PostCreator {...props}/>)
    // cy.intercept('/api/posts/', '200').as('picture')
    cy.get('[data-cy=picSubmit]').click()
    cy.get('@feed').should('not.have.been.called')
})

})