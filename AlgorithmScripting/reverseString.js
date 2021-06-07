function reverseString(str) {
    let temp ='';
    for(let i=str.length-1; i>=0; i--){
      temp+=str[i];
    }
    return temp;
  }
  
  reverseString("hello");