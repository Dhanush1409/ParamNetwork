function chunkArrayInGroups(arr, size) {
    let newArray = [];
    /*let j=0,temp=size;
    for(let i=0; i<arr.length; i+=size){
      let row =[];
      for(; j<temp; j++){
        if(j<arr.length) 
        row.push(arr[j]);
      }
      temp+=size;
      newArray.push(row)
    }
    console.log(newArray);
    return newArray;*/
    while (arr.length>0){
      newArray.push(arr.splice(0,size));
    }
    console.log(newArray)
    return newArray;
  }
  
  chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3);