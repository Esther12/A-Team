

$("#searchBtn").on("click", function(){
    debugger;
    var searchResult = $("#search").val();
    console.log(searchResult);
    var queryURL ="https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&q="+ searchResult +"+trailer&type=video&videoDefinition=high&key=";
    var apiKey = "AIzaSyAoUpHDyYUhHngLH318GbQdHVDHiNPLFXQ";
    $.ajax({
            url: queryURL + apiKey,
            method:"GET"
        }).then(function(respond){
                console.log(queryURL+apiKey);// the API link
                console.log(respond.items[0].id.videoId);//get the video ids
                var result = respond.items[0].id.videoId;//store the video 
                var videoSrc = "https://www.youtube.com/embed/"+result;
                console.log(videoSrc);
                $("#videoTrailer").attr("src", videoSrc);
        })
})
