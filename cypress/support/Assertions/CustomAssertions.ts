export function assertEqual<T>(expected: T, actual: T, message: string): void {
    expect(actual).to.equal(expected, message);
}
export function assertStringIncludes(actual: string, expected: string, message: string): void {
    expect(actual).to.include(expected, message);
}
export function assertNotEqual<T>(actual: T, expected: T, message: string): void {
    expect(actual).not.equal(expected, message);
}
export function assertDeepEqual<T>(actual: T, expected: T, message: string): void {
    expect(actual).to.deep.equal(expected, message);
}
export function assertInArray<T>(actual: T[], expected: T, message: string): void {
    expect(actual).to.include(expected, message);
}
export function assertNotInArray<T>(actual: T[], expected: T, message: string): void {
    expect(actual).not.to.include(expected, message);
}
export function assertNumber(actual: number, expected: number, message: string): boolean {
    const isCompare = (actual >= expected) ? true : false;
    return isCompare;
}
export function assertMatch(actual: string, expected: RegExp, message: string): void {
    expect(actual).to.match(expected, message);
}
