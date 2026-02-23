
enum person{
    student="Sonu",
    class=10
}
const name=person.student

enum fruits{
    a="apple",
    b="banana",
    c="chikoo"
}

enum Roles{
    hero,
    villan,
    support,
    cameraman
}

let fav:fruits=fruits.a

const sonu:Roles=Roles.hero
console.log(Roles[sonu])
console.log(fav)
