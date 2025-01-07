const regulators = document.querySelectorAll('.knob');

regulators.forEach((regulator) => {
    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;

    const burnerIndex = regulator.dataset.burner - 1;
    const flame = document.querySelectorAll('.waterColor')[burnerIndex];

    function updateFlame(angle) {
        if (angle >= 0 && angle < 45) {
            waterColor.style.display = 'none';
        } else if (angle >= 45 && angle < 90) {
            waterColor.style.display = 'block';
            waterColor.style.height = '65px';
            waterColor.style.width = '48px';
        } else if (angle >= 90 && angle < 180) {
            waterColor.style.display = 'block';
            waterColor.style.height = '70px';
            waterColor.style.width = '60px';
        } else if (angle >= 360) {
            waterColor.style.display = 'block';
            waterColor.style.height = '77px';
            waterColor.style.width = '77px';
        }
    }

    regulator.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = regulator.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        startAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = regulator.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            currentAngle = (angle - startAngle + 360) % 360;
            currentAngle = Math.min(Math.max(currentAngle, 0), 180);
            regulator.style.transform = rotate(`${currentAngle}deg`);
            updateFlame(currentAngle);
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            if (currentAngle >= 135) {
                setTimeout(() => {
                    regulator.style.transform = 'rotate(0deg)';
                    updateFlame(0);
                }, 1000);
            }
        }
    });
});