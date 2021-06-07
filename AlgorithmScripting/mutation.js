function mutation(arr) {
    let temp1 = arr[0].toLowerCase();
    let temp2 = arr[1].toLowerCase();
    for(let i=0; i<temp2.length; i++){
      let flag =0;
      for(let j=0; j<temp1.length; j++){
        if(temp2[i] == temp1[j]) {
          flag=1;
          console.log(temp2[i]);
          }
      }
      if(flag==0) return false;
    }
    return true;
  }
  
  console.log(mutation(["Nole", "Ole"]));