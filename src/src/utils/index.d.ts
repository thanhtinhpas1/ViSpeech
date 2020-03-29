export declare const Utils: {
    hashPassword: (password: any) => any;
    getUuid: () => any;
    comparePassword: (plainTextPassword: any, hashedPassword: any) => any;
    removePropertyFromObject: (obj: any, property: any) => any;
    removePropertiesFromObject: (obj: any, properties: any) => any;
    removeObjPropertiesFromObjArr: (arr: any, properties: any) => any[];
    extractToken: (request: any) => any;
    calculateDuration(fileSize: any): number;
};
