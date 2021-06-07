function findLongestWordLength(str) {
    let max =0;
    let count =0;
    for(let i=0; i<str.length; i++){
      count++;
      if(str[i]==' '|| i==str.length-1){
        if(count>max ){
          if(i!=str.length-1)
          max =count-1;
          else max = count;
        }
        count =0;
      }
    }
    console.log(max);
    return max;
  }
  
  findLongestWordLength("The quick brown fox jumped over the lazy dog");