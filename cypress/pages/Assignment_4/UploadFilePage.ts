import { BaseCommands } from "../../support/Command/BaseCommands";
import { uploadFileLocator } from "../../locators/Assignment_4/UploadFileLocator";
import { fileUploadData } from "../../data/DataTest/Assignment_4/IframeData";
import { IframeHelper } from "../../support/IframeHelper"; 
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { getFile } from '../../data/DataTest/Assignment_4/IframeData';
import { iframeLocator } from "../../locators/Assignment_4/IframeLocator";

export class uploadFileIframe {
    baseCommands: BaseCommands;
    extendBaseCommands: ExtendBaseCommands

    constructor() {
        this.baseCommands = new BaseCommands();
        this.extendBaseCommands = new ExtendBaseCommands();
    }
    verifyMessageUploadFile(fileNumber: number) {
        return IframeHelper.getIframeContentDocument(iframeLocator.iframeWindowLocator)
            .within(() => {
                cy.get(uploadFileLocator.fileUploadMessage, { timeout: 20000 })
                    .should('exist')
                    .should('be.visible')
                    .then(($el) => {
                        const messageText = $el.text();
                        expect(messageText).to.contain("Files Queued for Transmission");
                    });
                
                cy.get(uploadFileLocator.fileUploadMessage)
                    .parent()
                    .invoke('text')
                    .should('contain', `${fileNumber} file(s) prepared for secure data link.`);
            });
    }
    uploadFilePDF() {
        IframeHelper.uploadFileIframe(
            iframeLocator.iframeWindowLocator,
            uploadFileLocator.documentFileLocator,
            getFile(0)
        );
        cy.wait(3000);
        this.verifyMessageUploadFile(1);
    }
    uploadFileImage() {
        IframeHelper.uploadFileIframe(
            iframeLocator.iframeWindowLocator,
            uploadFileLocator.imagefileLocator,
            getFile(2)
        );
        cy.wait(3000);
        this.verifyMessageUploadFile(1);
        
    }
    uploadMultipleFile() {
        IframeHelper.uploadFileIframe(
            iframeLocator.iframeWindowLocator,
            uploadFileLocator.multipleFileLocator,
            fileUploadData.filePaths
        );
        cy.wait(3000);
        this.verifyMessageUploadFile(fileUploadData.filePaths.length);
        this.initiateUploadFile();
        cy.wait(3000);
        this.getInitiateMessage(fileUploadData.filePaths.length);
    }
    uploadFileSingleFile() {
        IframeHelper.uploadFileIframe(
            iframeLocator.iframeWindowLocator,
            uploadFileLocator.singleFileLocator,
            getFile(1)
        );
        cy.wait(3000);
        
        this.verifyMessageUploadFile(1);
    }
    initiateUploadFile() {
        return IframeHelper.getIframeContentDocument(iframeLocator.iframeWindowLocator)
            .within(() => {
                cy.get('button').contains('INITIATE SECURE UPLOAD', { timeout: 10000 })
                    .should('be.visible')
                    .click();
            });
    }
    getInitiateMessage(fileNumber: number) {
        return IframeHelper.getIframeContentDocument(iframeLocator.iframeWindowLocator)
            .within(() => {
                cy.get(uploadFileLocator.fileUploadMessage, { timeout: 20000 })
                    .should('exist')
                    .should('be.visible')
                    .should('contain.text', "Transmission Complete");
                
                cy.get(uploadFileLocator.fileUploadMessage)
                    .parent()
                    .invoke('text')
                    .should('contain', `${fileNumber} file(s) successfully uploaded to orbital relay station.`);
            });
    }
    // uploadOnlySingleFile() {
    //     const files: string[] = [getFile(1), getFile(0), getFile(2)];
    //     const locators: string[] = [
    //         uploadFileLocator.documentFileLocator,
    //         uploadFileLocator.singleFileLocator,
    //         uploadFileLocator.imagefileLocator
    //     ];
        
    //     cy.wrap(null).then(() => {
    //         IframeHelper.uploadFileIframe(
    //             iframeLocator.iframeWindowLocator,
    //             locators[0],
    //             files[0]
    //         );
    //         cy.wait(3000);
    //         this.verifyMessageUploadFile(1);
    //         this.initiateUploadFile();
    //         cy.wait(2000);
    //         this.getInitiateMessage(1);
    //     })
    //     .then(() => {
    //         IframeHelper.uploadFileIframe(
    //             iframeLocator.iframeWindowLocator,
    //             locators[1],
    //             files[1]
    //         );
    //         cy.wait(3000);
    //         this.verifyMessageUploadFile(1);
    //         this.initiateUploadFile();
    //         cy.wait(2000);
    //         this.getInitiateMessage(1);
    //     })
    //     .then(() => {
    //         IframeHelper.uploadFileIframe(
    //             iframeLocator.iframeWindowLocator,
    //             locators[2],
    //             files[2]
    //         );
    //         cy.wait(3000);
    //         this.verifyMessageUploadFile(1);
    //         this.initiateUploadFile();
    //         cy.wait(2000);
    //         this.getInitiateMessage(1);
    //     });
    // }
    uploadOnlySingleFile() {
        const files: string[] = [getFile(1), getFile(0), getFile(2)];
        const locators: string[] = [
            uploadFileLocator.documentFileLocator,
            uploadFileLocator.singleFileLocator,
            uploadFileLocator.imagefileLocator
        ];
        locators.forEach((locator, index) => {
            IframeHelper.uploadFileIframe(
                iframeLocator.iframeWindowLocator,
                locator,
                files[index]
            );
            cy.wait(3000);
            this.verifyMessageUploadFile(1);
            this.initiateUploadFile();
            cy.wait(2000);
            this.getInitiateMessage(1);
        })
        
    }
}

