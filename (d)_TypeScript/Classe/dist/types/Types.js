export class Auth {
    login(name, password) {
        if (name && password) {
            return "student login successfull";
        }
    }
}
export class Student {
    name;
    age;
    std;
    prmotedToNext;
    constructor(name, age, std) {
        this.name = name,
            this.age = age,
            this.std = std,
            this.prmotedToNext = false;
    }
    promotedToNext() {
        this.prmotedToNext = true;
    }
    buyBooks() {
        return `${this.name} is going to buy books`;
    }
}
//# sourceMappingURL=Types.js.map