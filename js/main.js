$(document).ready(() => {
    const billboardImg = new Image();

    billboardImg.onload = () => {
        $('#spinner').fadeOut(1000);
    }
    billboardImg.src = 'img/image.png';
    
    $('#billboard').mousemove(e => {
        const 
            intensity = 10,
            xFactor = intensity/$('#billboard').width(),
            yFactor = intensity/$('#billboard').height(),
            pageX = e.pageX - $('#billboard').width(),
            pageY = e.pageY - $('#billboard').height(),
            x = xFactor * pageX,
            y = yFactor * pageY;
        $('#billboard').css('background-position',`${x}px ${y}px`);
    });
});