import { stat } from "fs";
import { APIResponse } from "../API/base_commands_api";
import { StatusCode } from "../data/Enum/APIEnum";

interface BaseAPIResponse {
    sucess?: boolean,
    message: string
} 
interface BaseAPIErrorResponse {
    error: string,
    message: string
}
export function assertAPIStatusSuccess<T>(
    response: APIResponse<T>,
    statusCode : StatusCode= StatusCode.OK
) : void {
    expect(response.status).to.eq(statusCode);
}
export function assertAPISucessResponse<T extends BaseAPIResponse>(
    response: APIResponse<T>,
    statusCode : StatusCode= StatusCode.OK
): void {
    assertAPIStatusSuccess<T>(response, statusCode);
    if(response.body.sucess !== undefined) {
        expect(response.body.sucess).to.be.true;
    }
}
export function assertAPIErrorStatus<t>(
    response: APIResponse<t>,
    statusCode : StatusCode
): void {
    expect(response.status).to.eq(statusCode);
}
export function assertAPIErrorResponse<T extends BaseAPIErrorResponse>(
    response: APIResponse<T>,
    statusCode : StatusCode
): void {
    assertAPIErrorStatus<T>(response, statusCode);
    expect(response.body.error).to.exist;
}
export function assertAPIResponseContainsMessage<T>(
    response: APIResponse<T>,
    expectedMessage: string
): void {
    expect(response.body).to.have.property('message');
    expect((response.body as any).message).to.include(expectedMessage);
}

export function assertValue<T extends string | number>(
    value: T,
    format: 'uppercase' | 'lowercase' | 'currency' | 'percentage'
): string {
    if (typeof value === 'string') {
        return format === 'uppercase' ? value.toUpperCase() :
               format === 'lowercase' ? value.toLowerCase() :
               value;
    } else if (typeof value === 'number') {
        return format === 'currency' ? `$${value.toFixed(2)}` :
               format === 'percentage' ? `${(value * 100).toFixed(2)}%` :
               value.toString();
    }
    return null as any;
}

