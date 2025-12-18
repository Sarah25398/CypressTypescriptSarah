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
    static generateData<T extends Record<string, any>>(
        config: configFactory<T>
    ): Factory<T> { 
        return {
            create: () => { 
                const defaults = config.default || {};
                const generators = config.generator ? config.generator : {}
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
   
   