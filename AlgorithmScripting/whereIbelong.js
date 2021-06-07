function getIndexToIns(arr, num) {
    for(let i=0; i<arr.length; i++){
      for(let j=0; j<arr.length; j++){
        if(arr[i]<arr[j]){
          let temp =arr[i];
          arr[i]= arr[j];
          arr[j] = temp;
        }
      }
    }
    console.log(arr);
    for(let i=0; i<arr.length; i++){
      if(num<=arr[i]){
        return i;
      }
    }
    return arr.length;
  }
  
  getIndexToIns([3, 10, 5], 3);