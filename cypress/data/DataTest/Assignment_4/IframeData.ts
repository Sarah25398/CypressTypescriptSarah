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
        'cypress/fixtures/file_pdf.pdf', // pdf
        'cypress/fixtures/file_test_1.jpeg', // image
        'cypress/fixtures/file_test_2.jpeg', // image
        'cypress/fixtures/file_test_3.jpg' // image 
    ],
    expectedSuccessMessage: "upload successfully"
}
export function isFileType(index: number): boolean {
    const file = getFile(index);
    return file?.endsWith('.pdf')
        || file?.endsWith('.jpeg')
        || file?.endsWith('.jpg')
        || file?.endsWith('.png');
}
export function getFile(index: number): string{
    return fileUploadData.filePaths?.[index];

}
