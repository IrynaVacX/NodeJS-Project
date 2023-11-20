document.addEventListener('DOMContentLoaded', () => {
    const gameField = document.getElementById('free-move-zone');
    const player = document.getElementById('player');

    let posX = 0, posY = 0;
    const speed = 5;
    const playerSize = 50; // Измените это значение, если измените размер игрока в CSS
    const fieldWidth = gameField.clientWidth;
    const fieldHeight = gameField.clientHeight;
    let lastDirection = null;
    let movementTimer; // Таймер для отслеживания движения

    function setPlayerImage(direction) {
        const baseSrc = "assets/cats_stay/";
        const directionSrc = {
            'left': "left.png", // Предполагается, что это гифка из второй колонки
            'right': "right.png",
            'up': "up.png",
            'down': "down.png",
            
        };
        player.src = baseSrc + directionSrc[direction];
    }

    function movePlayer() {
        player.style.left = posX + 'px';
        player.style.top = posY + 'px';
        clearTimeout(movementTimer);
        movementTimer = setTimeout(() => {
            setPlayerImage(lastDirection || 'idle'); // Установка изображения покоя если направление неизвестно
            isAnimationPlaying = false;
        }, 500); // Время в мс, после которого игрок переходит в состояние покоя
    }
    let isAnimationPlaying = false;
    document.addEventListener('keydown', (e) => {
        
        clearTimeout(movementTimer); // Остановка таймера при любом нажатии клавиши
        switch (e.key) {
            case 'ArrowLeft': // влево
                posX = Math.max(0, posX - speed);
                lastDirection = 'left';
                if (!isAnimationPlaying) {
                    isAnimationPlaying = true;
                    player.style.display = 'block'; // Показать GIF
                    player.src = ''; // Сбросить источник GIF, чтобы перезапустить анимацию
                    player.src = "assets/cat/left.gif"; // Предполагается, что это гифка движения влево
                }            
                break;
            case 'ArrowRight': // вправо
                posX = Math.min(fieldWidth - playerSize, posX + speed);
                lastDirection = 'right';
                if (!isAnimationPlaying) {
                    isAnimationPlaying = true;
                player.style.display = 'block'; // Показать GIF
                player.src = ''; // Сбросить источник GIF, чтобы перезапустить анимаци
                player.src = "assets/cat/right.gif";
                }
                break;
            case 'ArrowUp': // вверх
                posY = Math.max(0, posY - speed);
                lastDirection = 'up';
                if (!isAnimationPlaying) {
                    isAnimationPlaying = true;
                player.style.display = 'block'; // Показать GIF
                player.src = ''; // Сбросить источник GIF, чтобы перезапустить анимаци
                player.src = "assets/cat/up.gif";
                }
                break;
            case 'ArrowDown': // вниз
                posY = Math.min(fieldHeight - playerSize, posY + speed);
                lastDirection = 'down';
                if (!isAnimationPlaying) {
                    isAnimationPlaying = true;
                player.style.display = 'block'; // Показать GIF
                player.src = ''; // Сбросить источник GIF, чтобы перезапустить анимаци
                player.src = "assets/cat/down.gif";
                }
                break;
        }
        movePlayer();
    });
});
