import { verify } from "crypto";

export const addressBookPageLocator = {
    addressMenu: 'a[href*="address"]',

    firstName: '#firstname',
    middleName: '#middlename',
    lastName: '#lastname',
    company: '#company',
    phone: '[name="telephone"]',
    fax: '#fax',
    street_1: '#street_1',
    street_2: '#street_2',
    city: '#city',
    state: '#region_id',
    zip: '#zip',
    country: '#country',
    saveButton: 'button[title="Save Address"]',
    verifyMessage: '.success-msg',


}
