export interface CellData {
    product: string,
    qty: number,
}
export interface RowData {
    rowID: number,
    cells: CellData[]
}
export interface TableData {
    rows: RowData[]
    header: string[]
}
interface productData{
    remove: JQuery
    product: string
    
    qty: number
    
}
interface checkOutData {
    subTotal: number
    totalNet: number
}
export class TableHelper {
    private tableElement: string
    constructor(tableElement: string) {
        this.tableElement = tableElement
    }
    getTableElment(element: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.tableElement);
    }
    getTableHeader(element: string): Cypress.Chainable<string[]> {
        return cy.get(this.tableElement)
            .find(element)
            .then(($el) => {
                const headers = Array.from($el)
                    .map((el) => el.textContent?.trim())
                    .filter((text) => text !== null
                        && text !== undefined
                        && text.length > 0);
                return headers;
            })
    }
    getCellData(el: string): Cypress.Chainable<CellData[]> { 
    const element: string = `${this.tableElement} ${el}`;
    const cells: CellData[] = [];
    
    return cy.get(element).then(($rows) => {
        $rows.each((rowIndex, rowElement) => {
            const $row = Cypress.$(rowElement);
            const $allCells = $row.find('td');
            const product = $allCells.eq(1).text().trim();
            const qty = $allCells.eq(2).text().trim();
            
            cells.push({
                product: product,
                qty: Number(qty)
            });
        });
        return cells;
    });
    } 
    getCheckOutData(el: string): Cypress.Chainable<checkOutData> {
     const element: string = `${this.tableElement} ${el}`;
     return cy.get(element).then(($rows) => {
     let subTotal = 0;
     let totalNet = 0;
     
     $rows.each((index, row) => {
         const $row = Cypress.$(row);
         const rowText = $row.text().toLowerCase();
         
         if (rowText.includes('subtotal') || rowText.includes('cart subtotal')) {
             const amountText = $row.find('td').last().text().trim();
             subTotal = parseFloat(amountText.replace(/[^0-9.]/g, ""));
         }
         
         if (rowText.includes('total') && !rowText.includes('subtotal')) {
             const amountText = $row.find('td').last().text().trim();
             totalNet = parseFloat(amountText.replace(/[^0-9.]/g, ""));
         }
     });

     return {
      subTotal: isNaN(subTotal) ? 0 : Math.trunc(subTotal),
      totalNet: isNaN(totalNet) ? 0 : Math.trunc(totalNet),
    };
  });
}

    getDetailCellData(el: string): Cypress.Chainable<productData[]> { 
    const element: string = `${this.tableElement} ${el}`;
    const cells: productData[] = [];
    
    return cy.get(element).then(($rows) => {
        $rows.each((rowIndex, rowElement) => {
            const $row = Cypress.$(rowElement);
            const $allCells = $row.find('td');
            const remove = $allCells.eq(0).find('a.remove');
            const product = $allCells.eq(2).text().trim();
            const qty = $allCells.eq(4).find('div input').attr('value')?.trim();
            
            cells.push({
                remove: remove,
                product: product,
                qty: Number(qty)
            });
        });
        return cells;
    });
    }
    

}

    










