var getAllAs = document.querySelectorAll("a");
for (var i=0; i < getAllAs.length; i++){
  if (getAllAs[i].href.indexOf("?") >= 0){
    getAllAs[i].href += "&disable_global_elements=1";
  }else{
    getAllAs[i].href += "?disable_global_elements=1";
  }
}
