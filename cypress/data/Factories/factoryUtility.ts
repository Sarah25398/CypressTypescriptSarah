
import { getObjectValue }  from '../../config/API/base-service'

type configFactory<T> = {
    default?: Partial<T>;
    generator?: () => Partial<T>
}
interface Factory<T> {
    create(): T;
    createMany(count: number): T[]
    createWith(overrides? : Partial<T>): T

}
export class FactoryData { 
    generateData<T extends Record<string, any>>(
        config: configFactory<T>
    ): Factory<T> { 
        return {
            create: () => { 
                const defaults = config.default || {};
                const generators = config.generator ? config.generator() : {}
                return {...defaults, ...generators} as T
            },
             createMany: (count: number) => {
                return Array.from({ length: count }, () => {
                    const defaults = config.default || {};
                    const generated = config.generator ? config.generator() : {};
                    return { ...defaults, ...generated } as T;
                });  
            },
             createWith: (overrides?: Partial<T>) => {
                const defaults = config.default || {};
                const generated = config.generator ? config.generator() : {};
                return { ...defaults, ...generated, ...overrides } as T;
            }
        }
        
    }

}
export const dataFactory = new FactoryData(); 
let cachedUserData: User | null = null;
const generateNew = dataFactory.generateData<User>(
    {
        default: {
            
        },
        generator:() => {
            return {
                email : `${Math.random().toString(36).substring(2, 10)}@gmail.com`,
                password : (Math.random().toString(36).slice(2) + 
                    Math.random().toString(36).slice(2)).substring(0, 20)
                }
        }
    }
); 
export interface Billing{
    userName: string;
    lastName: string;
    company: string;
    phone: number;
    adress_1: string;
    city: string;
    zip: string;
}
const generateBilling = dataFactory.generateData<Billing>(
    {
        default: {
            
        },
        generator:() => {
            return {
                userName : `${Math.random().toString(36).substring(2, 10)}`,
                lastName : `${Math.random().toString(36).substring(2, 10)}`,
                company : `${Math.random().toString(36).substring(2, 10)}`,
                phone : Math.floor(Math.random() * 1000000000),
                adress_1 : `${Math.random().toString(36).substring(2, 10)}`,
                city : `${Math.random().toString(36).substring(2, 10)}`,
                zip : Math.random().toString(36).slice(2)
                }
        }
    }
)
export function getBillingKey<K extends keyof Billing>(key: K): Billing[K] {
    return (generateBilling.create() as Billing)[key];
    
}
export function initializeUserData(): User {
    if (!cachedUserData) {
        cachedUserData = generateNew.create();
        cy.wrap(cachedUserData).as('userData');
    }
    return cachedUserData;
}

export function getUserData<K extends keyof User>(
    key : K
): User[K] {
    if (!cachedUserData) {
        initializeUserData();
    }
    return cachedUserData![key];
}

export function getCachedUserData(): User {
    if (!cachedUserData) {
        initializeUserData();
    }
    return cachedUserData!;
}

export function resetUserDataCache(): void {
    cachedUserData = null;
    cy.wrap(null).as('userData');
}

export interface User {
    email: string;
    password: string;
        
}
type passStatus = 'weak' | 'medium' | 'strong'; 
const passRules : Record<passStatus, (password: string) => boolean> = {
    weak: (password: string) => password.length < 8,
    medium: (password: string) => password.length >= 8 && password.length < 16,
    strong: (password: string) => password.length >= 16
}
export function verifyPassword(password: string, status: passStatus): boolean {
    return passRules[status](password);
}

   
   

