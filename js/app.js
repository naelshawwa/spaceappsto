define([
    "GameView"],
    function(GameView){
        var start = function(){
            console.log("Starting game");

            //initialize stuff
            _.templateSettings = {
                interpolate : /\{\{(.+?)\}\}/g,
                evaluate: /\<\@(.+?)\@\>/g
            };

            $.ajaxSetup({ cache: false });


            var game = new GameView({
                el: "#view-game"
            });

        };

        return {
            start: start
        }
    }
);