import { faker } from '@faker-js/faker'

describe('Create issue', () => {
  beforeEach(() => cy.api_deleteProjects())

  it('successfully', () => {
    const issue = {
      title: `issue-${faker.string.uuid()}`,
      description: faker.string.sample(3),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.string.sample(5)
      }
    }

    cy.api_createIssue(issue)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.equal(issue.title)
        expect(response.body.description).to.equal(issue.description)
      })
  })
})
