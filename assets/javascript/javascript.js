var movie;

var p;

var publicYears;

var actors; 

var titleOfMovie;

$("#searchBtn").on("click", function(event) {

 // Sheleeza's Part    
    event.preventDefault();
    movie = $("#search").val();

    getMovieAPI();

    



/*Yating's part */

    setTimeout(() => {
      getYoutubeAPI();
    }, 300);
      

 /*   Jenny's part   */
      $("#actorGif").html("");
      setTimeout(() =>{
        // var str = actors.split(",");
        // console.log(str);
        // for (var i=0; i < str.length; i++){
                 getGiphyAPI(titleOfMovie);
                
        // }
      },2000);
    
     
      
// console.log(p);
  });



  function getMovieAPI(){
    var queryMovieURL = "https://www.omdbapi.com/?t=" + escape(movie) + "&apikey=trilogy";

    $.ajax({
      url: queryMovieURL,
      method: "GET"
    }).then(function(response) {
      $("#title").html("Title: " + response.Title);
      titleOfMovie = response.Title;
    //  $("").html("Rating: " + response.Ratings[1].Value + " Rotten Tomatoes");
      $("#year").html("Released: " + response.Released);
      publicYears = response.Year;// this is the publish year
      console.log(publicYears);
      $("#directors").html("Plot: " +response.Plot);
      $("#poster").attr("src",response.Poster);
      $("#actors").html("Actors: " + response.Actors);
      actors = response.Actors; // all the actors in here!!!
      console.log(actors);
      $("#duration").html("Duration: " + response.Runtime);
      $("#genre").html("Genre: "  + response.Genre);
      $("#rating").html("Rating: " + response.imdbRating);
      $(".writer").html("Writer: "  + response.Writer);
      $("#director").html("Director: " + response.Director);

      console.log(response);

      $("#search").val("");
    });
  }

  function getGiphyAPI(img){
    
          var queryGifURL = "https://api.giphy.com/v1/gifs/search?api_key=6kzr50l8dlgEaOOVqe1VMiOwUmuGt3p6&q=" 
          + escape(img) + "&limit=3&offset=0&lang=en";

       console.log(queryGifURL);
      $.ajax({
          url: queryGifURL,
          method:"GET"
          })
      .then(function(response){
          console.log( 'got a response: ', response);
              var results = response.data;
            for (var i = 0; i < results.length; i++) {
              $("#actorGif").append(`<img src = "${results[i].images.downsized_still.url}" 
              >`);
              }
          //   }
          console.log(results);
            //var image = results[0].images.fixed_height_still.url;
            //console.log(image);
            
                  
            // $("#actorGif").on("click",".gif", function(){
            // var search = $(this).attr("id");
            // getGiphyAPI(search);
            // });

            // $("#searchBtn").on("click", function(event){
            //   event.preventDefault();

            //   var search = $("#search").val();
            //   $("#actorGif").append()
            // });

            $("#actorGif").append(`<img src = "${results[0].images.downsized_still.url}" >
            `);
                      
                // var state = $(this).attr("data-state");

                // if(state == "still"){
                //     console.log("still");
                //     var animateImgAddress = $(this).attr("data-animate");
                //         $(this).attr("src", animateImgAddress);
                //         $(this).attr("data-state","animate");
                //     }
                // else{
                // console.log("animate");
                // var animateImgAddress = $(this).attr("data-still");
                //       $(this).attr("src", animateImgAddress);
                //       $(this).attr("data-state","still");
                // };

          
          });
          
    
  }

  function getYoutubeAPI(){

    var searchResult = titleOfMovie +"+"+ publicYears;
    var queryYoutubeURL ="https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q="+escape (searchResult) +"+trailer&relevanceLanguage=en&type=video&videoDuration=short&key=";
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