import { faker } from '@faker-js/faker'

describe('Create Project', () => {
    beforeEach(() => {
        cy.login()
    })

    it('sucessfully', () => {
        const project = {
            name: `project-${faker.string.uuid()}`,
            description: faker.string.sample(5)
        }

        cy.gui_createProject(project)

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')
    })
})