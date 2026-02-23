export interface UserInfo {
    name: string;
    age: number;
    address: string;
    email: string;
}
export declare class Auth {
    login(name: string, password: string): "student login successfull" | undefined;
}
export declare class Student {
    name: string;
    age: number;
    std: number;
    prmotedToNext: boolean;
    constructor(name: string, age: number, std: number);
    promotedToNext(): void;
    buyBooks(): string;
}
//# sourceMappingURL=Types.d.ts.map