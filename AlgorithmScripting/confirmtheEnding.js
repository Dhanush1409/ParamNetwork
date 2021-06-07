function confirmEnding(str, target) {
    let flag =0;
    let end= str.length-1;
    for(let i=target.length-1,j=0; i>=0; i--,j++){
      //console.log(str[end-j])
      if(str[end-j]!=target[i]){
        flag =1;break;
      }
    }
    console.log(flag);
    if(flag==0) return true;
    return false;
  }
  
  confirmEnding("sesame", "same");