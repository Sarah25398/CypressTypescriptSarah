
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
const generateNew = dataFactory.generateData<User>(
    {
        default: {
            category :'User',
        },
        generator:() => {
            return {
                id: Math.floor(Math.random() * 1000),
                name: `User_${Math.random().toString(36).substring(2, 9)}`,
                age: Math.floor(Math.random() * 100),
                address: `Address_${Math.random().toString(36).substring(2, 9)}`,
                }
        }
    }
); 
export function getUserData<K extends keyof User>(
    key : K
): User[K] {
    return generateNew.create()[key];
}


export interface User {
    id: number,
    name: string,
    age: number,
    address: string,
    category: string
}

   
   