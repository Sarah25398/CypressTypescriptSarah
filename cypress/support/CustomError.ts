export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

export class ElemntNotFound extends Error {
    element: string
    constructor(element: string) {
        super(`Element with selector ${element} not found`);
        this.name = "ElemntNotFound";
        this.element = element
    }
}
export class ValidationError extends CustomError {
    field: string
    expectedValue: string
    actualValue: string
    constructor(field: string, expectedValue: string, actualValue: string) {
        super(`Field ${field} expected ${expectedValue} but got ${actualValue}`);
        this.name = "ValidationError";
        this.field = field
        this.expectedValue = expectedValue
        this.actualValue = actualValue
    }
}
export class CustomTimeOutError extends CustomError {
    timeout: number
    action: string
    constructor(timeout: number, action: string) {
        super(`Timeout of ${timeout}ms for ${action} exceeded`);
        this.name = "CustomTimeOutError";
        this.timeout = timeout
        this.action = action
    }

}
