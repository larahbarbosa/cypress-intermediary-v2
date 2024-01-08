import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
  const issue = {
    title: `issue-${faker.string.uuid()}`,
    description: faker.string.sample(3),
    project: {
      name: `project-${faker.string.uuid()}`,
      description: faker.string.sample(5)
    }
  }

  beforeEach(() => {
    cy.login()
    cy.gui_createProject(issue.project)
  })

  it('successfully', () => {
    cy.gui_createIssue(issue)

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})
