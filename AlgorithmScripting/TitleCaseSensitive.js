function titleCase(str) {
    let s="";
    for(let i=0; i<str.length; i++){
      if(i==0||str[i-1]===" "){
        if(str[i]!==/[a-z]/){
          s+=str[i].toUpperCase()
        }
      }
      else{
        s+=str[i].toLowerCase();
      }
    }
    console.log(s);
    return s;
  }
  titleCase("sHoRt AnD sToUt");