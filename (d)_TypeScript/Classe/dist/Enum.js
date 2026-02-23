var person;
(function (person) {
    person["student"] = "Sonu";
    person[person["class"] = 10] = "class";
})(person || (person = {}));
const name = person.student;
var fruits;
(function (fruits) {
    fruits["a"] = "apple";
    fruits["b"] = "banana";
    fruits["c"] = "chikoo";
})(fruits || (fruits = {}));
var Roles;
(function (Roles) {
    Roles[Roles["hero"] = 0] = "hero";
    Roles[Roles["villan"] = 1] = "villan";
    Roles[Roles["support"] = 2] = "support";
    Roles[Roles["cameraman"] = 3] = "cameraman";
})(Roles || (Roles = {}));
let fav = fruits.a;
const sonu = Roles.hero;
console.log(Roles[sonu]);
console.log(fav);
export {};
//# sourceMappingURL=Enum.js.map