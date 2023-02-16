describe('Register', () => {
    it('should try to register an existent user', () => {
        cy.visit('http://localhost:3000/register')

        cy.wait(3000)

        cy.get('#login').focus().type('Prince')
        cy.get('#password').type('Prince')
        cy.get('#repassword').type('Prince')

        cy.get('#submit').click()

        cy.get('#error').should('have.text', 'User already exist')
    })

    it('should register correctly', () => {
        const number = new Date().getTime()
        cy.visit('http://localhost:3000/register')

        cy.wait(3000)

        cy.get('#login').focus().type(`test${number}`)
        cy.get('#password').type(`test${number}`)
        cy.get('#repassword').type(`test${number}`)

        cy.get('#submit').click()

        cy.wait(3000)

        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('should move to login correctly', () => {
        cy.visit('http://localhost:3000/register')

        cy.wait(3000)

        cy.get('#register').click()

        cy.wait(3000)

        cy.url().should('eq', 'http://localhost:3000/login')
    })
})
