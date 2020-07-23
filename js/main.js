$(document).ready(() => {
    $('#billboard').mousemove(e => {
        const 
            intensity = 10,
            xFactor = intensity/$('#billboard').width(),
            yFactor = intensity/$('#billboard').height(),
            pageX = e.pageX - $('#billboard').width(),
            pageY = e.pageY - $('#billboard').height(),
            x = xFactor * pageX - 10,
            y = yFactor * pageY - 10;
        $('#billboard').css('background-position',`${x}px ${y}px`);
    });
});