var Gifs = [];
var offset = 10;
var Limit = 10;


function DisplayGif() {
    var ClickedTopic = $(this).attr("data-name");
    console.log(ClickedTopic);
    Limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ClickedTopic + "&api_key=dc6zaTOxFJmzC&limit=" + Limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".gifs-here").empty();
        //$(".gifs-here").addClass('card');

        for(let i=0;i<response.data.length;i++){
            var n = i.toString();

            $(".gifs-here").append($('<div>').addClass('card').addClass(n));
            $(`.${n}`).append($("<img>").attr({
                "src": response.data[i].images.fixed_height_still.url,
                "data-state": "still",
                "data-animate": response.data[i].images.fixed_height.url,
                "data-still": response.data[i].images.fixed_height_still.url,
                "class": "gif card-img-top"
            }));
            $(`.${n}`).append($('<div>').addClass('card-body').append(
                $('<p>').addClass('card-text text-center').text("Rating: "+response.data[i].rating.toUpperCase())))
        }
        $('.gif').on('click', function(){
            var imageData = $(this).attr('data-state');
            if (imageData === 'still') {
                var animate = $(this).attr('data-animate');
                $(this).attr({
                    'data-state': 'animate',
                    'src': animate
                })
            } else {
                var still = $(this).attr('data-still')
                $(this).attr({
                    'data-state': 'still',
                    'src': still
                })
            }
        })
    });
}


// $("#Add10").on('click', function(){
    
//     ClickedTopic = $(this).attr("data-name");
//     console.log(ClickedTopic);
//     Limit +=10;
//     //let dogs = $("#Add10").on("click").this
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ClickedTopic + "&api_key=dc6zaTOxFJmzC&limit=" + Limit;
    
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//         //$(".gifs-here").empty();
        
        
//         for(let i=(Limit-10);i<response.data.length;i++){
//             $(".gifs-here").append($("<img>").attr("src",response.data[i].images.fixed_height.url));
//         }
        
//     });

// });

function RenderButtons() {
    $(".topic-buttons-here").empty();
    $('input[type=text]').val("");
    for (let i = 0; i < Gifs.length; i++) {
        var CreatedButton = $("<button>").addClass("topic-button").addClass($("#Topic-Input").val().trim()).attr("data-name", Gifs[i]).text(Gifs[i]);
        $(".topic-buttons-here").append(CreatedButton);
    }
}

$("#add-Topic").on("click", function (event) {
    event.preventDefault();
    var Topic = $("#Topic-Input").val().trim();
    
    if (Topic!==""){
    Gifs.push(Topic);
    RenderButtons();
    }
});

$(document).on("click",".topic-button",DisplayGif);

