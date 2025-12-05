export interface CellData {
    rowID: number,
    columnID: number,
    value: string,
    element?: Cypress.Chainable<JQuery<HTMLElement>>
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
    getRow(el: string, i: number): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.tableElement)
            .find('tbody tr')
            .eq(i)
            .find(el)

    }

    getCellData(i: number, j: number): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getRow("td", i).eq(j)
    }
    getRowData(i: number) {
        return this.getRow("td", i).then(($el) => {
            const cells: CellData[] = [];
            $el.each((index, el) => {
                const cell: CellData = {
                    rowID: i,
                    columnID: index,
                    value: el.textContent?.trim() || '',
                    element: cy.wrap(el)
                };

                cells.push(cell);
            });
            return cells
        })

    }








}
