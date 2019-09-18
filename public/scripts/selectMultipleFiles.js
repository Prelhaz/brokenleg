'use strict'

window.onload = function(){   
  //Check File API support
  if(window.File && window.FileList && window.FileReader)
  {
      $('#files').live("change", function(event) {
          var files = event.target.files; //FileList object
          var output = document.getElementById("result");
          for(var i = 0; i< files.length; i++)
          {
              var file = files[i];
              //Only pics
              // if(!file.type.match('image'))
              if(file.type.match('image.*')){
                  if(this.files[0].size < 2097152){    
                // continue;
                  var picReader = new FileReader();
                  picReader.addEventListener("load",function(event){
                      var picFile = event.target;
                      var div = document.createElement("div");
                      div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                              "title='preview image'/>";
                      output.insertBefore(div,null);            
                  });
                  //Read the image
                  $('#clear, #result').show();
                  picReader.readAsDataURL(file);
                  }else{
                      alert("Image Size is too big. Minimum size is 2MB.");
                      $(this).val("");
                  }
              }else{
              alert("You can only upload image file.");
              $(this).val("");
          }
          }                               
         
      });
  }
  else
  {
      console.log("Your browser does not support File API");
  }
}
