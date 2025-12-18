import { APIMethodEnum, StatusCode } from '../../data/Enum/APIEnum'


export function getObjectValue<T, K extends keyof T>(
    obj: T,
    key:K
): T[K] { 
    return obj[key]
}
// apply get multiple value 
export function getMultipleValue<T,K extends keyof T>(
    obj: T,
    keys: K[]
): T[K][] {
    return keys.map(key => obj[key])
}
export class BaseService {
    private url = Cypress.env('baseUrl'); 
    ENPOIT_TAGS: string = '/tags' 
    getUrl(url: string): string {
        return `${this.url}${url}`
    }
    getQueryName(name: string): string {
        const time = Date.now(); 
        return `${name}${time}`
    }
    wait(
        url: string,
        queryName: string,
        time: number,
        callBack: Function

    ): void{
        cy.log(url)
        if (time) {
            cy.intercept(url).as(queryName)
            cy.wait(`@${queryName}`, { timeout: time })
            callBack()
        }
        else {
            cy.intercept(url).as(queryName)
            callBack()
        }        
    }
    


}

