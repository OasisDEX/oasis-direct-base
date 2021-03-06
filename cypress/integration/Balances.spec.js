/// <reference types="Cypress" />

import { cypressVisitWithWeb3, tid } from "../utils";

context('Balances', () => {
  beforeEach(() => cypressVisitWithWeb3())

  it('should match ether balance', () => {
    cy.contains(tid("wallets-connection-status"), "Connected")
    cy.contains(tid("wallets-name"), "other");

    cy.get(tid("wallets-continue")).contains("Continue").click();

    cy.get(tid("set-trade-from", tid("token-amount-value"))).contains(/8,999.... ETH/) // avoid asserting exact value here since it may easily change in future
    cy.get(tid("set-trade-to", tid("token-amount-value"))).contains("170 DAI")
  })
})
