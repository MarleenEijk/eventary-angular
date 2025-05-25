describe('Storage', () => {
    it('should show items in storage', () => {
        cy.visit('/storage');
        cy.url().should('include', 'storage');
        cy.get('.itemWrapper').should('have.length.greaterThan', 0);
        cy.get('.itemWrapper').first().within(() => {
            cy.get('.item-name').should('not.be.empty');
            cy.get('.item-quantity').should('not.be.empty');
            cy.get('.item-imageurl').should('be.visible');
        });
    });

    it('should show item details when clicked', () => {
        cy.visit('/storage');
        cy.get('.itemWrapper').first().click();
        cy.get('.item-name').should('not.be.empty');
        cy.get('.item-price').should('not.be.empty');
        cy.get('.item-quantity').should('not.be.empty');
        cy.get('.item-imageurl').should('be.visible');
    });
});
