export interface userSet {
    userName: string,
    passWord:string 


}
export interface FileUploadData {
    fileUploadUrl: string,
    filePaths: string[],
    expectedSuccessMessage: string
}
export const userSetCorrect : userSet = {
    userName: "John Doe",
    passWord: "This Is Not A Password"
}
export const userSetIncorrect : userSet = {
    userName: "admin",
    passWord: "admin"
}
export const fileUploadData: FileUploadData = {
    fileUploadUrl: "http://testtrack.org/file-upload-demo",
    filePaths: [
        'cypress/fixtures/file1.txt',
        'cypress/fixtures/file2.txt',
        'cypress/fixtures/file3.txt',
        'cypress/fixtures/file4.txt'
    ],
    expectedSuccessMessage: "upload successfully"
}
