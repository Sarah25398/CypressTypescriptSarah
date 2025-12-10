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

    









}
