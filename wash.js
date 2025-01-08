const knob = document.querySelector('.knob');
const waterColor = document.querySelector('.waterColor');
const audio = document.getElementById('myAudio');

let currentRotation = 0;

function handleWaterFlow(rotationDegree) {

    let flowRate = Math.min(Math.max(rotationDegree / 180, 0), 1);

    if (flowRate > 0) {
        waterColor.style.animationDuration = `${(1 - flowRate) * 20}s`;  
        waterColor.style.opacity = flowRate;  

        if (audio.paused) {
            audio.play();
        }12

    } else {
        waterColor.style.animationDuration = `0s`;

        waterColor.style.opacity = 0;
          audio.pause();

    }
}

knob.addEventListener('mousedown', (e) => {
    isDragging = true;
    const startX = e.clientX;
    const startY = e.clientY;

    const initialRotation = currentRotation;

    function onMouseMove(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        currentRotation = (initialRotation + angle) % 180;

        knob.style.transform = `rotate(${currentRotation}deg)`;

        handleWaterFlow(currentRotation);
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

knob.addEventListener('dragstart', (e) => {
    e.preventDefault();
});