export function generateEmail() {
    return Math.random().toString(36).substring(2, 9) + '@gmail.com';
}
