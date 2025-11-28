import { uploadFileIframe } from '../../pages/Assignment_4/UploadFilePage'
import { IframePage } from '../../pages/Assignment_4/IframePage'


describe("Iframe Test", () => {
    let iframePage: IframePage;
    let UploadFileIframe: uploadFileIframe; 

    beforeEach(() => {
        UploadFileIframe = new uploadFileIframe(); 
        iframePage = new IframePage();
        iframePage.navigateToIframePage();
    });

    it("Verify Iframe trial", () => {
        iframePage.renderIframe("https://testtrack.org/file-upload-demo");
        UploadFileIframe.uploadFileSingleFile();
        UploadFileIframe.uploadFilePDF()
        UploadFileIframe.uploadFileImage()
        UploadFileIframe.uploadMultipleFile()

    });
    it.only("Verify Iframe real test ", () => {
        iframePage.renderIframe("https://testtrack.org/file-upload-demo");
        UploadFileIframe.uploadOnlySingleFile();
        UploadFileIframe.uploadMultipleFile()

        
    })
});