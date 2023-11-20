document.addEventListener('DOMContentLoaded', () => {
    const gameField = document.getElementById('free-move-zone');
    const player = document.getElementById('player');

    let posX = 0, posY = 0;
    const speed = 5;
    const playerSize = 50; // Измените это значение, если измените размер игрока в CSS
    const fieldWidth = gameField.clientWidth;
    const fieldHeight = gameField.clientHeight;

    function movePlayer() {
        player.style.left = posX + 'px';
        player.style.top = posY + 'px';
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft': // влево
                posX = Math.max(0, posX - speed);
                break;
            case 'ArrowRight': // вправо
                posX = Math.min(fieldWidth - playerSize, posX + speed);
                break;
            case 'ArrowUp': // вверх
                posY = Math.max(0, posY - speed);
                break;
            case 'ArrowDown': // вниз
                posY = Math.min(fieldHeight - playerSize, posY + speed);
                break;
        }
        movePlayer();
    });
});