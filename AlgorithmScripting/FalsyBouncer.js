function bouncer(arr) {
    let newArray =[];
    for(let i=0; i<arr.length; i++){
      if(arr[i]){
        newArray.push(arr[i]);
      }
    }
    return newArray;
  }
  console.log(bouncer([null, NaN, 1, 2, undefined]));