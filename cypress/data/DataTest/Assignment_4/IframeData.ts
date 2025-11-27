export interface userSet {
    userName: string,
    passWord:string 

}
export const userSetCorrect : userSet = {
    userName: "John Doe",
    passWord: "This Is Not A Password"
}
export const userSetIncorrect : userSet = {
    userName: "admin",
    passWord: "admin"
}