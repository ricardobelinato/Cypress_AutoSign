const { CONFIG } = require('../../e2e/Teste.cy');

describe('Escolha de PS', module.exports = () => {
  it('passes', () => {
    cy.visit(CONFIG().url)

    cy.get('mat-select#mat-select-0').click()
    cy.get('mat-option').eq(CONFIG().ps).click()

    cy.get('button.mat-raised-button.mat-button-base.mat-primary').should('be.visible').click()

    cy.get('app-client-loader div').should('exist');
    cy.get('app-client-loader div').should('not.exist');
  })
})