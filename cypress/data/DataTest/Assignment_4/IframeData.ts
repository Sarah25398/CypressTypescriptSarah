import { generateData } from "../../../utilities/GenerateDataUtils/DataUtils";
export interface userSet {
    userName: string,
    passWord:string 

}
export type fileType = 'pdf' | 'jpeg' | 'jpg' | 'png'
export const fileExtensionMap: Record<fileType, boolean> = {
    'pdf': true,
    'jpeg': true,
    'jpg': true,
    'png': true
}
export function getFileExtensions(filePath:string): fileType | null { 
    const extensions: fileType[] = ['pdf', 'jpeg', 'jpg', 'png'];
    for (const ext of extensions) {
        if (filePath.endsWith(`.${ext}`)) {
            return ext;
        }
    }
    return null;
}
export function isValidFileType(index: number): boolean {
    const file = getFile(index);
    const extension = getFileExtensions(file);
    if (extension && fileExtensionMap[extension]) {
        return true;
    }
    return false;
    
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
    userName: generateData('name', { prefix: 'User_' }),
    passWord: generateData('string', { prefix: 'Pass_' })
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
