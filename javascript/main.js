// Step 1 Search

var UI = {};

// Clicking search icon
UI.searchClick = function(){
   document.querySelector(".js-submit").addEventListener("click",function(e){
    var input = document.querySelector(".js-search").value;

    SoundCloudAPI.getTrack(input);
  });
}


// Pressing Enter
UI.submitKey =function(){
  document.querySelector(".js-search").addEventListener("keypress",function(e){
    if(e.which === 13){
      var input = document.querySelector(".js-search").value;
      SoundCloudAPI.getTrack(input);
    }
   });
   }

   UI.searchClick();
   UI.submitKey();

//Step 2 Query SoundCloud API

var SoundCloudAPI ={};

SoundCloudAPI.init = function(){
  SC.initialize({
    client_id:'cd9be64eeb32d1741c17cb39e41d254d',

  });
}

SoundCloudAPI.init();


SoundCloudAPI.getTrack = function(inputValue) {
  // find all sounds of buskers licensed under 'creative commons share alike'

  SC.get('/tracks/', {
    q: inputValue
  }).then(function(tracks) {
    console.log(tracks);


    // Reset the search window
    var searchResult = document.querySelector('.js-search-results');
    searchResult.innerHTML = "";


    SoundCloudAPI.renderTrack(tracks);
  });
}




  // Step 3 Display the cards

// Render The cards
SoundCloudAPI.renderTrack = function(tracks){


    tracks.forEach( function (track) {
      console.log(track);


        // card
        var card = document.createElement("div");
        card.classList.add("card");
        document.querySelector(".cards").appendChild(card);

            // image
            var image = document.createElement("div");
            image.classList.add("image");
            card.appendChild(image);

                // img
                var image_img = document.createElement("img");
                image_img.classList.add("image_img");
                image_img.src = track.artwork_url || "https://picsum.photos/290";
                image.appendChild(image_img);

        // content
        var content = document.createElement("div");
        content.classList.add("content");
        card.appendChild(content);

            // header
            var header = document.createElement("div");
            header.classList.add("header");
            content.appendChild(header);
            header.innerHTML = '<a href="'+track.permalink_url+'" target="_blank">'+track.title+'</a>';

        // button
        var button = document.createElement("div");
        button.classList.add("ui","bottom","attached","button","js-button");
        card.appendChild(button);

            // icon
            var icon = document.createElement("i");
            icon.classList.add("add","icon");
            button.appendChild(icon);

            // Span text
            var buttonText = document.createElement("span");
            buttonText.innerHTML = "Add to playlist";
            button.appendChild(buttonText);

        button.addEventListener("click",function(){

          SoundCloudAPI.getEmbed(track.permalink_url);

        });

  });}






// Step 4 Add to playlist and play

SoundCloudAPI.getEmbed=function (url) {
  SC.oEmbed(url, {
    auto_play: true
  }).then(function(embed){
    console.log('oEmbed response: ', embed);

    // embeded iframe
    var sidebar = document.querySelector(".inner");
    var box = document.createElement("div")
    box.innerHTML = embed.html;
    sidebar.insertBefore(box , sidebar.firstChild);

    // Storaging playlist local storage
    localStorage.setItem("key", sidebar.innerHTML);

  });

}

 // diplaying the local storage playlist

 var sidebar=document.querySelector(".inner");
 sidebar.innerHTML=localStorage.getItem("key");



 // removing by clicking
 var remove=document.querySelector(".remove");
 remove.addEventListener("click", function(){
   alert("The Playlist will be removed !!!");
   var sidebar=document.querySelector(".inner");
   sidebar.innerHTML=localStorage.removeItem("key");
   });

 // Save playlist
 var save=document.querySelector(".save");
 save.addEventListener("click", function(){
     var x = prompt("Enter the Playlist name for SAVE:");
     var sidebar=document.querySelector(".inner");
     localStorage.setItem(x , sidebar.innerHTML);
     });


  // Load playlist
  var load=document.querySelector(".load");
  load.addEventListener("click", function(){
      var x = prompt("Enter the Playlist name for LOAD:");
      var sidebar=document.querySelector(".inner");
      sidebar.innerHTML=localStorage.getItem( x );
      });
