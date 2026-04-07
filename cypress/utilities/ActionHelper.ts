type transformData<T, R> = (value: T) => R
type validateData<T> = (value: T) => boolean 
type CypressActions =() => Cypress.Chainable<any>


export function compose<T>( 
    actions : CypressActions[] 
    
): Cypress.Chainable<void> { 
    return actions.reduce((chain, action) => chain.then(() => action()), cy.wrap(null))
} 
export function condionalAcion<T>(
    condition: () => Cypress.Chainable<boolean>,
    thenAction: CypressActions, 
    elseAction? : CypressActions
){ 
    return condition().then((result) => {
        result ? thenAction()
            : elseAction
            ? elseAction()
            : cy.wrap(null)
    }) 
} 
export function mapData<T, R>(
    elements: Cypress.Chainable<JQuery<HTMLElement>>,
    transform: transformData<T, R>
): Cypress.Chainable<R[]> {
    return elements.then((elements) => {
         const result : R[] = []
         elements.each((index, el) => {
             result.push(transform(el as T))
         })
         return result
     })

}
