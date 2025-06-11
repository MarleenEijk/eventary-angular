describe('Storage', () => {
    it('should show items in storage', () => {
        cy.visit('/storage');
        cy.url().should('include', 'storage');
        cy.get('.itemWrapper').should('have.length.greaterThan', 0);
        cy.get('.itemWrapper').first().within(() => {
            cy.get('.item-name').should('not.be.empty');
            cy.get('.item-quantity').should('not.be.empty');
        });
    });

    it ('should not show item details when non existent item is clicked', () => {
        cy.visit('/storage');
        cy.get('.itemWrapper').eq(99).click();
        cy.get('.itemDetailsPopup').should('not.exist');
    });

    it('should show item details when clicked', () => {
        cy.visit('/storage');
        cy.get('.itemWrapper').first().click();
        cy.get('.item-name').should('not.be.empty');
        cy.get('.item-price').should('not.be.empty');
        cy.get('.item-quantity').should('not.be.empty');
    });

    it('should create a new item', () => {
        cy.visit('/storage');
        cy.get('.addItemButton').click();
        cy.get('input[formControlName="name"]').type('Test Item');
        cy.get('input[formControlName="price"]').type('10.00');
        cy.get('input[formControlName="quantity"]').type('5');
        cy.get('input[formControlName="imageUrl"]').type('https://example.com/image.jpg');
        cy.get('mat-select[formcontrolname="category"]').click();
        cy.get('mat-option').not('[aria-disabled="true"]').first().click();
        cy.get('button[type="submit"]').click();
        cy.get('.itemWrapper').should('contain', 'Test Item');
    });
});