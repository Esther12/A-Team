var movie;

var p;

var publicYears;

var actors; 

var titleOfMovie;

var firebaseConfig = {
  apiKey: "AIzaSyB4o9RSM4MuAdY7LklNwhWoeux1mYFbQ0k",
  authDomain: "a-team-2032f.firebaseapp.com",
  databaseURL: "https://a-team-2032f.firebaseio.com",
  projectId: "a-team-2032f",
  storageBucket: "",
  messagingSenderId: "205258806058",
  appId: "1:205258806058:web:8a852d12dfb4b8eb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#searchBtn").on("click", function(event) {

  console.log("btn clicked");
 // Sheleeza's Part    
    event.preventDefault();
    movie = $("#search").val();

    getMovieAPI();
// console.log(p);
  });



  function getMovieAPI(){
    var queryMovieURL = "https://www.omdbapi.com/?t=" + escape(movie) + "&apikey=trilogy";
    console.log('omdb');

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

      
      /*   Jenny's part   */
      $("#actorGif").empty();
      getGiphyAPI(titleOfMovie);
     $("#search").empty();
     
      /*Yating's part */
      getYoutubeAPI();
      // $("#messages").val("");
      // $("#name").val("");
      commentShow();
       
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
              data-still="${results[i].images.downsized_still.url}" 
                    data-animate="${results[i].images.downsized.url} " data-state="still" class = "gif ">`);
              }
          //   }
          console.log(results);
            //var image = results[0].images.fixed_height_still.url;
            //console.log(image);
  });
}

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

  function getYoutubeAPI(){

    var searchResult = titleOfMovie +"+"+ publicYears;
    var queryYoutubeURL ="https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q="+escape (searchResult) +"+trailer&relevanceLanguage=en&type=video&videoDuration=short&key=";
    var apiKey = "AIzaSyA6JVzEaTSEgPcgCKyIaIwQW8S-RuEbw3s";
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
  // Your web app's Firebase configuration
 


  var title = "";
  var userName = "";
  var userComments = "";

    // Capture Button Click
    $("#submitComment").on("click", function(event) {
<<<<<<< HEAD
    
=======
      
>>>>>>> 76f157b65361ee825cb625e84fefbb794fa6cc9a
      //debugger;
      console.log("1111");
      event.preventDefault();

      // Grabbed values from text boxes
      title = titleOfMovie;
      userName = $("#name").val();
      userComments = $("#message").val();
      console.log(title);
      // Code for handling the push
      database.ref("comments").push({
        title: title,
        name: userName,
        comment: userComments,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      commentShow();
    });
      
    function commentShow(){
     
      firebase.database().ref("comments").orderByChild("title").equalTo(titleOfMovie).on("child_added", function(movie) {
        console.log(movie.val());
        var commentDetial = movie.val();
        $("#messages").prepend(`
              <div class = "omment">
              <h4>${commentDetial.title}</h4>
              <p>User :   ${commentDetial.name}</p>
              <p>${commentDetial.comment}</p>
              </div>
          `);
       });
       $("#messages").val("");
<<<<<<< HEAD
      $("#name").val("");
=======
       $("#name").val("");
>>>>>>> 76f157b65361ee825cb625e84fefbb794fa6cc9a
    }
      