var movie;

var p;

$("#searchBtn").on("click", function(event) {

 // Sheleeza's Part    
    event.preventDefault();
    movie = $("#search").val();

    getMovieAPI();

    
/*   Jenny's part   */

      p = $("#actors").text();

      getGiphyAPI();
// console.log(p);


/*Yating's part */

          var year = $("#year").val();

          getYoutubeAPI();

  });



  function getMovieAPI(){
    var queryMovieURL = "https://www.omdbapi.com/?t=" + escape(movie) + "&apikey=trilogy";

    $.ajax({
      url: queryMovieURL,
      method: "GET"
    }).then(function(response) {
      $("#title").html("Title: " + response.Title);
    //  $("").html("Rating: " + response.Ratings[1].Value + " Rotten Tomatoes");
      $("#year").html("Released: " + response.Released);
      $("#directors").html("Plot: " +response.Plot);
      $("#poster").attr("src",response.Poster);
      $("#actors").html("Actors: " + response.Actors);
      $("#duration").html("Duration: " + response.Runtime);
      $("#genre").html("Genre: "  + response.Genre);
      $("#rating").html("Rating: " + response.imdbRating);
      $(".writer").html("Writer: "  + response.Writer);
      $("#director").html("Director: " + response.Director);

      console.log(response);

      $("#search").val("");
    });
  }

  function getGiphyAPI(){
          var queryGifURL = "https://api.giphy.com/v1/gifs/search?api_key=6kzr50l8dlgEaOOVqe1VMiOwUmuGt3p6&q=" 
          + p + "&limit=1&offset=0&lang=en";

      // console.log(queryURL);
      $.ajax({
          url: queryGifURL,
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
                console.log("animate");
                var animateImgAddress = $(this).attr("data-still");
                      $(this).attr("src", animateImgAddress);
                      $(this).attr("data-state","still");
                };

          
          });
          
          });
  }

  function getYoutubeAPI(){

    var searchResult = $("#search").val();
    var queryYoutubeURL ="https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&q="+ escape(searchResult)+"+%20trailer&type=video&videoDefinition=high&key=";
    var apiKey = "AIzaSyAoUpHDyYUhHngLH318GbQdHVDHiNPLFXQ";
    $.ajax({
            url: queryYoutubeURL + apiKey,
            method:"GET"
        }).then(function(respond){
                console.log(queryYoutubeURL+apiKey);// the API link
                console.log(respond.items[0].id.videoId);//get the video ids
                var result = respond.items[0].id.videoId;//store the video 
                var videoSrc = "https://www.youtube.com/embed/"+result;
                console.log(videoSrc);
                $("#videoTrailer").attr("src", videoSrc);
        });
  }