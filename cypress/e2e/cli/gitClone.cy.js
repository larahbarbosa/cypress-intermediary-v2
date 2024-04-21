import { faker } from '@faker-js/faker'

describe('git clone', () => {
  const project = {
    name: `project-${faker.string.uuid()}`,
    description: faker.word.sample(5)
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createProject(project)
  })

  it('successfully', () => {
    cy.cloneViaSSH(project)

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  })
})
