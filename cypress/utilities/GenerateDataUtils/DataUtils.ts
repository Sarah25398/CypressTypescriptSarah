type DataType = 'string' | 'email' | 'phone' | 'number' | 'address' | 'name'; 

export function generateData<T extends DataType>(type: T
    , Options?:
        { length?: number; prefix?: string }
) : T extends 'string' ? string :
    T extends 'email' ? string :
    T extends 'phone' ? string :
    T extends 'number' ? number :
    T extends 'address' ? string :
    T extends 'name' ? string 
    : string {
    const randomString = Math.random().toString(36).substring(2, Options?.length ? Options.length + 2 : 10);
    
    switch(type) {
    case 'string': {
        const prefix = Options?.prefix || '';
        return `${prefix}${randomString}` as any;
    }
    case 'email': {
        const prefix = Options?.prefix || 'user';
        return `${prefix}${randomString}@gmail.com` as any;
    }
    case 'phone': {
        const prefix = Options?.prefix || '0';
        return `${prefix}${randomString}` as any;
    }
    case 'number': {
        return Math.floor(Math.random() * (Options?.length || 100)) as any;
    }
    case 'address': {
        const prefix = Options?.prefix || 'Address';
        return `${prefix} ${randomString}` as any;
    }
    case 'name': {
        const prefix = Options?.prefix || 'Name';
        return `${prefix}${randomString}` as any;
    }
    default: {
        return randomString as any;
    }
    }
}