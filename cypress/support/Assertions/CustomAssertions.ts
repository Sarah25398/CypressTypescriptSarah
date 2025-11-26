export function assertEqual<T>(actualValue : T, expectedValue: T, message: string) : void  { 
    expect(actualValue).to.equal(expectedValue, message);
    
} 
export function assertNotEqual<T>(actualValue : T, expectedValue: T, message: string) : void  { 
    expect(actualValue).not.to.equal(expectedValue, message);
    
}
