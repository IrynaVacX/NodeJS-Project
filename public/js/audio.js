// AUDIO OF BUTTONS //
const buttonClickAudio = new Audio('assets/Audios/button-mouse_down.mp3');
buttonClickAudio.loop = false;
buttonClickAudio.volume = 0.1;

const buttonHoverAudio = new Audio('assets/Audios/button-mouse_over.mp3');
buttonHoverAudio.loop = false;
buttonHoverAudio.volume = 0.07;

//

document.addEventListener("DOMContentLoaded", () => {

    const buttons_arr = document.querySelectorAll('button');
    buttons_arr.forEach((button_element) => {
        button_element.addEventListener('mousedown', () => {
            if(!buttonClickAudio.ended) { buttonClickAudio.ended = true; }
            buttonClickAudio.play();
        });
        button_element.addEventListener('mouseover', () => {
            if(!buttonHoverAudio.ended) { buttonHoverAudio.ended = true; }
            buttonHoverAudio.play();
        });
    });

});
