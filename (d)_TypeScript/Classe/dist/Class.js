class Students {
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
class BtechStudents extends Students {
}
const sonu = new Students("sonu", 10, 10);
sonu.buyBooks();
console.log(sonu.buyBooks());
console.log(sonu);
// Access Modifiers
// Public
// Private
// Protected
// ----------- Inheritence -----------
class Student {
    login(name, password) {
        if (name && password) {
            return "student login successfull";
        }
    }
    result(marks) {
        if (marks > 33) {
            return "Passed";
        }
        else {
            return "Filed";
        }
    }
}
class Teacher extends Student {
    subjects(subject) {
        return `He Teaches ${subject}`;
    }
}
let Suresh = new Teacher();
console.log(Suresh.login("jojoj", "jojo"));
export {};
// 
//# sourceMappingURL=Class.js.map