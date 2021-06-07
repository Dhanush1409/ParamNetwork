function frankenSplice(arr1, arr2, n) {
    let newArray =[]
    for(let i=0; i<n; i++){
      newArray.push(arr2[i]);
      }
    newArray.push(...arr1);
    for(let i=arr2.length-n; i<arr2.length; i++){
      newArray.push(arr2[i]);
      }
    console.log(newArray);
    return newArray;
  }
  
  frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2);