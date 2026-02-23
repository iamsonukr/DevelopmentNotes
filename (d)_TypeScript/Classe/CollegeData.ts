
interface CollegeDataType{
    name:string;
    displayTeachersName():void;
    getStudentList():string[];
}

class CollegeData implements CollegeDataType {
    name:string;
    constructor(name:string){
        this.name=name
    }  

    getStudentList() {
        return ["a"]
    }

    displayTeachersName(): void {
        
    }
}