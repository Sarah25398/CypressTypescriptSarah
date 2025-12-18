type DataType = 'date' | 'time' | 'datetime' | 'timestamp'; 


export function generateDateTime<T extends DataType>(type: T
    , Options?:
        { format?: string; offsetDays?: number }
): T extends 'date' ? string :
   T extends 'time' ? string :
   T extends 'datetime' ? string :
   T extends 'timestamp'? number: string | number {
    const currentDate = new Date();
    if (Options?.offsetDays) {
        currentDate.setDate(currentDate.getDate() + Options.offsetDays);
    }

    switch(type) {
        case 'date': {
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}` as any;
    }
    case 'time': {
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}` as any;
    }
    case 'datetime': {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` as any;
    }
    case 'timestamp': {
        return Math.floor(currentDate.getTime() / 1000) as any;}
    default: {
        return '' as any;}
    }
   }

// export function generateDateTime<T extends DataType>(type: T
//     , Options?:
//         { format?: string; offsetDays?: number }
// ) : T extends 'date' ? string :
//     T extends 'time' ? string :
//     T extends 'datetime' ? string :
//     T extends 'timestamp' ? number
//     : string | number {
//     const currentDate = new Date();
//     if (Options?.offsetDays) {
//         currentDate.setDate(currentDate.getDate() + Options.offsetDays);
//     }

//     switch(type) {
//     case 'date': {
//         const year = currentDate.getFullYear();
//         const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//         const day = String(currentDate.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}` as any;
//     }
//     case 'time': {
//         const hours = String(currentDate.getHours()).padStart(2, '0');
//         const minutes = String(currentDate.getMinutes()).padStart(2, '0');
//         const seconds = String(currentDate.getSeconds()).padStart(2, '0');
//         return `${hours}:${minutes}:${seconds}` as any;
//     }
//     case 'datetime': {
//         const year = currentDate.getFullYear();
//         const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//         const day = String(currentDate.getDate()).padStart(2, '0');
//         const hours = String(currentDate.getHours()).padStart(2, '0');
//         const minutes = String(currentDate.getMinutes()).padStart(2, '0');
//         const seconds = String(currentDate.getSeconds()).padStart(2, '0');
//         return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` as any;
//     }
//     case 'timestamp': {
//         return Math.floor(currentDate.getTime() / 1000) as any;
//     }
//     default: {
//         return '' as any;
//     }
//     }
// }