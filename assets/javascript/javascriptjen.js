// GIPHY API
//input text box
// var p = $('#search').val();
 var p = $("#actors").text();
$("#searchBtn").on("click", function(){
//  debugger;


// console.log(p);
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6kzr50l8dlgEaOOVqe1VMiOwUmuGt3p6&q=" 
      + p + "&limit=1&offset=0&lang=en";

// console.log(queryURL);
$.ajax({
      url: queryURL,
      method:"GET"
      })
.then(function(response){
      console.log( 'got a response: ', response);
          var results = response.data;
      //   for (var i = 0; i < results.length; i++) {
      //       var actorDiv = $("<img>");
      //   }
      console.log(results);
        //var image = results[0].images.fixed_height_still.url;
        //console.log(image);
        $("#actorGif").append(`<img src = "${results[0].images.downsized_still.url}" 
        data-still="${results[0].images.downsized_still.url}" 
        data-animate="${results[0].images.downsized.url} " data-state="still" class = "gif ">`);

               
        $("#actorGif").on("click",".gif", function(){
                  
            var state = $(this).attr("data-state");

            if(state == "still"){
                console.log("still");
                var animateImgAddress = $(this).attr("data-animate");
                    $(this).attr("src", animateImgAddress);
                    $(this).attr("data-state","animate");
                }
            else{
            console.log("animate")
            var animateImgAddress = $(this).attr("data-still");
                  $(this).attr("src", animateImgAddress);
                  $(this).attr("data-state","still")
            }

      
      }
      

            );
      });
});