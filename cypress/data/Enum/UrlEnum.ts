export enum URL {
    add_to_cart_url = "https://rahulshettyacademy.com/seleniumPractise/#/", // assignment 2
    tech_panda_url = "https://live.techpanda.org/index.php/mobile.html", // assigment 3
    iframe_url = 'https://iframetester.com/',
    my_account_url = 'https://practice.automationtesting.in/'
}
export const isUrl = (url: string): boolean => {
    return Object.values(URL).includes(url as URL);
}
export const isURLValid = (url: string): boolean => {
    return url in URL;
}
export const getURL = (url: string): URL => {
    return URL[url as keyof typeof URL];
}
export const validateURL = (url: string): URL => {
    if (!isURLValid(url)) {
        throw new Error(`Url is not in enum list: ${url}`);
    }
    return getURL(url);
}
