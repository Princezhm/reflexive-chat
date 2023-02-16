const login = () => {
    cy.visit('http://localhost:3000/login')

    cy.wait(3000)

    cy.get('#login').focus().type('Prince')
    cy.get('#password').type('Prince')

    cy.get('#submit').click()

    cy.wait(3000)

    cy.url().should('eq', 'http://localhost:3000/')
}

describe('Chat', () => {
    it('should logout', () => {
        login()

        cy.get('#logout').click()

        cy.wait(3000)

        cy.url().should('eq', 'http://localhost:3000/login')
    })

    it('should show Smart IA by default', () => {
        login()

        cy.get('#ai-selector').should('have.text', 'Smart AI')
    })

    it('should change to dummy AI on Click', () => {
        login()

        cy.get('#ai-selector').click()

        cy.get('#ai-selector').should('have.text', 'Dummy AI')
    })

    it('should show list of users by default', () => {
        login()

        cy.get('#users').children().should('have.length.greaterThan', 2)
    })

    it('should start a chat with another user', () => {
        login()

        cy.get('#users').children().last().click()

        cy.get('#chat-input').type('test message')

        cy.get('#chat-send').click()
    })

    it('should delete chat', () => {
        login()

        cy.get('#users').children().last().click()

        cy.get('#chat-input').type('test message')

        cy.get('#chat-send').click()

        cy.get('#sidebar .selected #delete-chat').click()

        cy.get('#users').children().should('have.length.greaterThan', 2)
    })

    it('should chat with dummy AI', () => {
        login()

        cy.get('#users').children().first().click()

        cy.get('#chat-input').type('hello!!!')

        cy.get('#chat-send').click()

        cy.wait(3000)

        cy.get('#chat-input').type('1')

        cy.get('#chat-send').click()

        cy.wait(3000)

        cy.get('#chat-input').type('2')

        cy.get('#chat-send').click()

        cy.wait(3000)

        cy.get('#chat-input').type('3')

        cy.get('#chat-send').click()
    })
})
