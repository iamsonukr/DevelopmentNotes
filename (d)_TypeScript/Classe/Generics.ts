function UserInfo<T>(name:T):T{
    return name
}

function  heroName<T>(heroName:T):T{
    return heroName
}

// return compl Array 
function  heroNameArray<T>(heroName:T[]):T[]{
    return heroName
}


const jom=heroNameArray(["Helo","helo"])

// const sonu=heroName("Sonu")
console.log(jom)

