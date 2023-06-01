
var active = false;
var i = -2;
var y = $( window ).height();
if($( window ).width()<= 768){
    var y2 = y*0.56;
    var y3 = y*0.44*0.5;
}
else{
    var y2 = y*0.75;
    var y3 = y*0.25*0.5;
}

var pocatek = (-1)*(y2*2-y3);
var pocet = $(".section").length - 4;
var konec = (-1)*(y2*(pocet+1)-y3);
var u = y2;
var aktivni = 1;


$( window ).on( "resize", function() {
    y = $( window ).height();
    if($( window ).width()<= 768){
        y2 = y*0.56;
        y3 = y*0.44*0.5;
    }
    else{
        y2 = y*0.75;
        y3 = y*0.25*0.5;
    }
    pocatek = (-1)*(y2*2-y3);
    konec = (-1)*(y2*(pocet+1)-y3);
    u = y2;
    //$("#fullpage").css("transform","translate3d(0px, "+ ((-1)*(y2*(aktivni+1)-y3)) +"px, 0px)");
    $("#fullpage").css("-webkit-transform","translate3d(0px, "+ ((-1)*(y2*(aktivni+1)-y3)) +"px, 0px)");
    setTimeout(function() {
        $("#fullpage").css("transition", "all 300ms ease 0s");
    }, 300);
} );

$( document ).ready(function() {

    $(".sec1").addClass("inFrame");
    if(window.location.hash) {
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        var found = false;
        $( ".section" ).each(function( ) {
            if(hash === $( this ).data('id')) {
                aktivni = $( this ).data('index');
                //$("#fullpage").css("transform","translate3d(0px, "+ ((-1)*(y2*(aktivni+1)-y3)) +"px, 0px)");
                $("#fullpage").css("-webkit-transform","translate3d(0px, "+ ((-1)*(y2*(aktivni+1)-y3)) +"px, 0px)");
                i = (aktivni+1)*(-1);
                $(".section").removeClass("inFrame");
                $(".sec"+aktivni).addClass("inFrame");
                found = true;
            }
        });
        if(!found){
            //$("#fullpage").css("transform","translate3d(0px, "+ pocatek +"px, 0px)");
            $("#fullpage").css("-webkit-transform","translate3d(0px, "+ pocatek +"px, 0px)");
        }
    }
    else{
        //$("#fullpage").css("transform","translate3d(0px, "+ pocatek +"px, 0px)");
        $("#fullpage").css("-webkit-transform","translate3d(0px, "+ pocatek +"px, 0px)");
    }


    setTimeout(function() {
        $("#fullpage").css("transition", "all 300ms ease 0s");
    }, 300);

    $( ".inFrame img" ).on( "click", function() {


    } )

    setActive(i);
});

function up() {
    i++;
    //$("#fullpage").css("transform","translate3d(0px, "+ (u*i + y3) +"px, 0px)");
    $("#fullpage").css("-webkit-transform","translate3d(0px, "+ (u*i + y3) +"px, 0px)");
    if(i===-1){
        setTimeout(function() {
            $("#fullpage").addClass("no-transition");
            //$("#fullpage").css("transform","translate3d(0px, "+ (konec) +"px, 0px)");
            $("#fullpage").css("-webkit-transform","translate3d(0px, "+ (konec) +"px, 0px)");
        }, 300);
        i = (pocet*(-1)-1);
    }
    setActive(i);
}

function down() {
    i--;
    //$("#fullpage").css("transform","translate3d(0px, "+ (u*i + y3) +"px, 0px)");
    $("#fullpage").css("-webkit-transform","translate3d(0px, "+ (u*i + y3) +"px, 0px)");
    if(i === (-1*pocet)-2){
        setTimeout(function() {
            $("#fullpage").addClass("no-transition");
            //$("#fullpage").css("transform","translate3d(0px, "+ (pocatek) +"px, 0px)");
            $("#fullpage").css("-webkit-transform","translate3d(0px, "+ (pocatek) +"px, 0px)");
        }, 300);
        i=-2;
    }
    setActive(i);
}

function setActive(i){

    $(".section").removeClass("hid");
    $(".section").removeClass("active");
    $(".topmenu").removeClass("active");
    $(".info").removeClass("active");



    var visibleText = $(".sec" + ((i+1)*(-1))).data("visible-text");
    var hiddenText =  $(".sec" + ((i+1)*(-1))).data("hidden-text");

    var actual = $(".sec" + ((i+1)*(-1))).data("actual");
    var pages =  $(".sec" + ((i+1)*(-1))).data("pages");





    $(".section").removeClass("inFrame");
    $(".sec" + ((i+1)*(-1))).addClass("inFrame");
    aktivni = (i+1)*(-1);
    $(".info .text").addClass("hid");
    setTimeout(function() {
        $(".info .text .visible").html(visibleText);
        $(".info .text .hidden").html(hiddenText);

        $(".info .pages .actual").text(actual);
        $(".info .pages .pages").text(pages);
        $(".info .text").removeClass("hid");
    }, 300);

}

var isWorking = 0;

var indicator = new WheelIndicator({
    callback: function(e){
        $("#fullpage").removeClass("no-transition");
        if(e.direction === "down"){
            if(isWorking==0)
            {
                isWorking=1;
                down();
                setTimeout(function(){isWorking=0},300);
            }
        }
        else{
            if(isWorking==0)
            {
                isWorking=1;
                up();
                setTimeout(function(){isWorking=0},300);
            }
        }
    },
    preventMouse: true
});

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
           nextImage();
        } else {
            console.log("left");
        }
    } else {
        $("#fullpage").removeClass("no-transition");
        if ( yDiff > 0 ) {
            if(isWorking==0)
            {
                isWorking=1;
                down();
                setTimeout(function(){isWorking=0},300);
            }
        } else {
            if(isWorking==0)
            {
                isWorking=1;
                up();
                setTimeout(function(){isWorking=0},300);
            }
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

;

$( ".close" ).on( "click", function() {
    $(".section").removeClass("hid");
    $(".section").removeClass("active");
    $(".close").removeClass("active");
    $(".topmenu").removeClass("active");
    $(".info").removeClass("active");
} );

$('body').on('click', '.inFrame img', function() {
   nextImage($(this));
});

function nextImage($this){
    $this.removeClass("active");
    $(".section").addClass("hid");
    $this.parent().removeClass("hid").addClass("active");
    $(".topmenu").addClass("active");
    $(".info").addClass("active");

    var actualPage = $this.parent().attr("data-actual");
    var pages = $this.parent().data("pages");


    $(".sec"+aktivni).find("[data-index='"+(actualPage-1)+"']").removeClass("active");
    actualPage++;

    if(actualPage > pages){
        actualPage = 1;
    }

    $(".sec"+aktivni).find("[data-index='"+(actualPage-1)+"']").addClass("active");
    $(".info .actual").text(actualPage);
    $(".sec"+aktivni).attr('data-actual', actualPage);
}
