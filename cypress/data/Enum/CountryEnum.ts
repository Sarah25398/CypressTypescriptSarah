export enum Country {
    INDIA = 'India',
    USA = 'United States',
    CANADA = 'Canada',
    AUSTRALIA = 'Australia',
    MEXICO = 'Mexico'
}
export const isCountry = (country: string): boolean => {
    return Object.values(Country).includes(country as Country);
}
export const getCountry = (country: string): Country => {
    return Country[country as keyof typeof Country];
}
export const isCountryValid = (country: string): boolean => {
    return country in Country;
}
export const isValidateCountry = (country: string): Country => {
    if (isCountryValid(country)) {
        return getCountry(country);
    }
    else {
        throw new Error("Invalid country");
    }
}