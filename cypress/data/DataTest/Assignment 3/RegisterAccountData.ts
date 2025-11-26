


import { generateEmail } from "../../../utilities/Data_Generate_Random";

export interface RegisterAccountData {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    password: string;
}
export interface AddressBookData {
    firstName: string;
    middleName: string;
    lastName: string;
    company: string;
    phone: number;
    fax: string;
    street_1: string;
    street_2: string;
    city: string;
    zip: string;
    state: string,
    country: string
}
export const addressBookData: AddressBookData = {
    firstName: "ahmed",
    middleName: "abd elhamed",
    lastName: "mohamed",
    company: "company",
    phone: 123456,
    fax: "123456",
    street_1: "street 1",
    street_2: "street 2",
    city: "city",
    zip: "123456",
    state: "Alabama",
    country: ""
}
export const registerAccountData: RegisterAccountData = {
    firstName: "ahmed",
    lastName: "abd elhamed",
    middleName: "mohamed",
    email: generateEmail(),
    password: "123456"
}
