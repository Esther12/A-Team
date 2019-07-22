$("#find-movie").on("click", function(event) {

     
    event.preventDefault();
    

    var movie = $("#search").val();


    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
          
      


    $.ajax({
      url: queryURL,
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

      $("#movie-input").val("");

  
    })

    
    
    /*$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#movie-view").text(JSON.stringify(response));
    });*/

  });