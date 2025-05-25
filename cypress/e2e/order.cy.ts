describe('Order', () => {
    it('should show orders in order', () => {
        cy.visit('/orders');
        cy.url().should('include', 'orders');
        cy.get('.order-container').should('have.length.greaterThan', 0);
        cy.get('.order-container').first().within(() => {
            cy.get('.order-id').should('not.be.empty');
            cy.get('.order-startdate').should('not.be.empty');
            cy.get('.order-enddate').should('not.be.empty');
            cy.get('.order-name').should('not.be.empty');
            cy.get('.order-address').should('not.be.empty');
            cy.get('.order-phone').should('not.be.empty');
            cy.get('.order-status').should('not.be.empty');
        });
    });

});