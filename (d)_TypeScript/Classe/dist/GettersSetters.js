class UserInfo {
    name;
    email;
    constructor(name, email) {
        this.name = name;
        this.email = "emp" + email;
    }
    get userEmail() {
        return this.email;
    }
    set userEmail(email) {
        this.email = "emp" + email;
    }
}
const userOne = new UserInfo("Sahil", "sahil@gmail.com");
console.log(userOne);
console.log(userOne.userEmail);
export {};
//# sourceMappingURL=GettersSetters.js.map