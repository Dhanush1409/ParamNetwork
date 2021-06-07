function truncateString(str, num) {
    let s ="";
    if(str.length>num){
      s = str.slice(0,num);
    }
    else return str;
    s +='...'
    return s;
  }
  
  truncateString("A-tisket a-tasket A green and yellow basket", 8);