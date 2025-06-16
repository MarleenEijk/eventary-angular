describe('Storage', () => {
    it('should show items in storage', () => {
        cy.visit('/storage');
        cy.url().should('include', 'storage');
        cy.get('.itemWrapper').should('have.length.greaterThan', 0);
        cy.get('.itemWrapper').first().find('.itemName').should('not.be.empty');
        cy.get('.itemWrapper').first().find('.itemStock').should('contain.text', 'Voorraad');
    });

    it('should show item details when clicked', () => {
        cy.visit('/storage');
        cy.get('.itemWrapper').first().click();
        cy.get('.itemDetailsPopup').should('exist');
        cy.get('.itemDetailsPopup').should('contain.text', 'Item details');
        cy.get('.itemDetailsPopup').should('contain.text', 'Naam:');
        cy.get('.itemDetailsPopup').should('contain.text', 'Prijs:');
        cy.get('.itemDetailsPopup').should('contain.text', 'Hoeveelheid:');
        cy.get('.itemDetailsPopup').find('img').should('exist');
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

    it('should update an item', () => {
        cy.visit('/storage');
        cy.contains('.itemWrapper', 'Test Item').click();
        cy.get('.editButton').click();
        cy.get('input[formControlName="name"]').clear().type('Updated Test Item');
        cy.get('input[formControlName="price"]').clear().type('15.00');
        cy.get('input[formControlName="quantity"]').clear().type('10');
        cy.get('input[formControlName="imageUrl"]').clear().type('https://example.com/updated-image.jpg');
        cy.get('mat-select[formcontrolname="category"]').click();
        cy.get('mat-option').not('[aria-disabled="true"]').first().click();
        cy.get('button[type="submit"]').click();
        cy.get('.itemWrapper').should('contain', 'Updated Test Item');
    });

    it('should delete an item', () => {
        cy.visit('/storage');
        cy.contains('.itemWrapper', 'Updated Test Item').click();
        cy.get('.deleteButton').click();
        cy.get('.itemWrapper').should('not.contain', 'Updated Test Item');
    });

    it('should not show item details when non-existent item is clicked', () => {
        cy.visit('/storage');
        cy.get('.itemWrapper').should('have.length.lessThan', 100);
        cy.get('.itemWrapper').eq(99).should('not.exist');
    });

    it('should show validation errors when creating item with empty fields', () => {
        cy.visit('/storage');
        cy.get('.addItemButton').click();
        cy.get('button[type="submit"]').click();
        cy.get('mat-error').should('exist');
        cy.get('mat-error').should('contain.text', 'verplicht');
    });

    it('should show validation error for negative price', () => {
        cy.visit('/storage');
        cy.get('.addItemButton').click();
        cy.get('input[formControlName="name"]').type('Bad Price');
        cy.get('input[formControlName="price"]').type('-5');
        cy.get('input[formControlName="quantity"]').type('1');
        cy.get('input[formControlName="imageUrl"]').type('https://example.com/image.jpg');
        cy.get('mat-select[formcontrolname="category"]').click();
        cy.get('mat-option').not('[aria-disabled="true"]').first().click();
        cy.get('button[type="submit"]').click();
        cy.get('mat-error').should('contain.text', 'Prijs mag niet minder zijn dan 0');
    });

    it('should show validation error for negative quantity', () => {
        cy.visit('/storage');
        cy.get('.addItemButton').click();
        cy.get('input[formControlName="name"]').type('Bad Quantity');
        cy.get('input[formControlName="price"]').type('5');
        cy.get('input[formControlName="quantity"]').type('-1');
        cy.get('input[formControlName="imageUrl"]').type('https://example.com/image.jpg');
        cy.get('mat-select[formcontrolname="category"]').click();
        cy.get('mat-option').not('[aria-disabled="true"]').first().click();
        cy.get('button[type="submit"]').click();
        cy.get('mat-error').should('contain.text', 'Mag niet minder dan 0 zijn');
    });

    it('should not update item if form is invalid', () => {
        cy.visit('/storage');
        cy.get('.itemWrapper').first().click();
        cy.get('.editButton').click();
        cy.get('input[formControlName="name"]').clear();
        cy.get('button[type="submit"]').click();
        cy.get('mat-error').should('contain.text', 'Naam is verplicht');
    });
});