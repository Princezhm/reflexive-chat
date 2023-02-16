describe('Login', () => {
    it('should try to login with error', () => {
        cy.visit('http://localhost:3000/login')

        cy.wait(3000)

        cy.get('#login').focus().type('fake')
        cy.get('#password').type('user')

        cy.get('#submit').click()

        cy.get('#error').should('have.text', 'User not found')
    })

    it('should login correctly', () => {
        cy.visit('http://localhost:3000/login')

        cy.wait(3000)

        cy.get('#login').focus().type('Prince')
        cy.get('#password').type('Prince')

        cy.get('#submit').click()

        cy.wait(3000)

        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('should move to register correctly', () => {
        cy.visit('http://localhost:3000/login')

        cy.wait(3000)

        cy.get('#register').click()

        cy.wait(3000)

        cy.url().should('eq', 'http://localhost:3000/register')
    })
})
