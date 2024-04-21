import { faker } from '@faker-js/faker'

const options = { env: {snapshot: true} }

describe('Set milestone on issue', options, () => {
    const issue = {
        title: `issue-${faker.string.uuid()}`, 
        description: faker.word.sample(3),
        project: {
            name: `project-${faker.string.uuid()}`,
            description: faker.word.sample(5)
        }
    }

    const milestone = {
        title: `milestone-${faker.word.sample()}`
    }   

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('successfully', () => {
        cy.gui_setMilestoneOnIssue(milestone)

        cy.get('.block.milestone')
        .should('contain', milestone.title)
    })
})