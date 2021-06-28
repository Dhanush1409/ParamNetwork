let obj={
    "Name":"Param",
    "KRP":{
        "K1":{
            "KPI":{
                "k1.1":{
                    "title":"Hiring 3 interns form the camps",
                    "result":["yes","No"]
                },
                "K1.2":{
                    "title":"Hiring 2 experinced guys",
                    "result":["yes","no"]
                },
                "K1.3":{
                    "title":"Hiring a network expert",
                    "result":["yes","no"]
                }
            }
        },
        "K2":{
            "KPI":{
                "K2.1":{
                    "title":"Provinding increment to 2 person",
                    "result":["yes","no"]
                },
                "K2.2":{
                    "title":"Providing increment to 1 person",
                    "result":["yes","no"]
                }
            }
        }
    }
}

console.log(JSON.stringify(obj));
/*function printValues(obj){
    for(var key in obj){
        if(typeof obj[key]==="object"){
            console.log(key);
            printValues(obj[key]);
            
        }
        else{
            var obj1 = JSON.parse(key.obj1);
            console.log()
        }
    }
}
printValues(obj)*/