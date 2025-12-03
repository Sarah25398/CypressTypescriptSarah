import { APIMethodEnum, StatusCode } from "../../data/Enum/APIEnum";
export interface APIrequestConfig {
    url: string
    method: APIMethodEnum,
    header: Record<string, string>,
    auth? :{ type: 'bearer' | 'apiKey', token: string},
    body?: any,
    statusCode?: StatusCode
}
export interface APIResponse <T>{
    status: StatusCode,
    body: T,
    data: any
}
export class baseApi {
    private baseUrl: string;
    private defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json"
    }
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    private getHeader(customHeaders?: Record<string, string>, auth?: any) : Record<string, string> {
        {
            const headers = { ...this.defaultHeaders, ...customHeaders };
            if(auth.type === 'bearer' || auth.type === 'apiKey') {
                headers['Authorization'] = `Bearer ${auth.token}`;
            }
            return headers;
         
        }
    }
    request<T>(config: APIrequestConfig) {
        const headers = this.getHeader(config.header, config.auth);
        return cy.request({
            method: config.method,
            url: `${this.baseUrl}${config.url}`,
            headers : headers,
            body: config.body,
            failOnStatusCode: false
        }).then((response) => {
            return {
                status: response.status,
                body: response.body,
                data: response.body
            } as APIResponse<T>;
        });
    }
    getAPI<T>(url: string , config: APIrequestConfig) : Cypress.Chainable<APIResponse<T>> {
        return this.request<T>({
            ...config,
            url: url,
            method: APIMethodEnum.GET
        });
    }
    postAPI<T>(url : string,config: APIrequestConfig): Cypress.Chainable<APIResponse<T>> {
        return this.request<T>({
            ...config,
            url: url,
            method: APIMethodEnum.POST
        })
        
    }



}



