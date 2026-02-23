let userData20:number | string |boolean=20;

userData20=true

if(typeof(userData20)==="string"){
    console.log("It is string")
}else if(typeof(userData20)==="boolean"){
    console.log("It is boolean")
}else{
    console.log("It is number")
}

class ProductOne{

}

class ProductTwo{

}

let margo=new ProductOne()

if(margo instanceof ProductOne){
    console.log("Moye moye")
}

