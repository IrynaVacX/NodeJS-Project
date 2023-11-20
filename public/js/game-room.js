document.addEventListener('DOMContentLoaded', () => {
    // const gameField = document.getElementById('free-move-zone');
    const player = document.getElementById('player');
    let posX = 440, posY = 400;
    player.style.top = posY + 'px';
    player.style.left = posX + 'px';
    
    const speed = 3;
    const playerSize = 55;
    const fieldWidth = 1495;
    const fieldHeight = 920;
    let lastDirection = null;

    function setPlayerImage(direction) {
        const baseSrc = "assets/cats_stay/";
        const directionSrc = {
            'left': "left.png",
            'right': "right.png",
            'up': "up.png",
            'down': "down.png",
        };
        player.src = baseSrc + directionSrc[direction];
    }
        
    let isMoving = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };
    
    function moveSquare() {
        if (isMoving.ArrowUp) {
            posY = Math.max(0, posY - speed);
            player.style.top = posY + 'px';
            if (lastDirection !== 'up') {
                lastDirection = 'up';
                player.src = "assets/cat/up.gif";
            }
        }
        if (isMoving.ArrowDown) {
            posY = Math.min(fieldHeight - playerSize, posY + speed);
            player.style.top = posY + 'px';
            if (lastDirection !== 'down') {
                lastDirection = 'down';
                player.src = "assets/cat/down.gif";
            }
        }
        if (isMoving.ArrowLeft) {
            posX = Math.max(0, posX - speed);
            player.style.left = posX + 'px';

            if (lastDirection !== 'left') {
                lastDirection = 'left';
                player.src = "assets/cat/left.gif";
            }
        }
        if (isMoving.ArrowRight) {
            posX = Math.min(fieldWidth - playerSize, posX + speed);
            player.style.left = posX + 'px';
            
            if (lastDirection !== 'right') {
                lastDirection = 'right';
                player.src = "assets/cat/right.gif";
            }
        }
        if (!isMoving.ArrowUp && !isMoving.ArrowDown && !isMoving.ArrowLeft && !isMoving.ArrowRight) {
            setPlayerImage(lastDirection || 'idle');
        }
        requestAnimationFrame(moveSquare);
    }
    
      document.addEventListener('keydown', (event) => {
        isMoving[event.key] = true;
      });
    
      document.addEventListener('keyup', (event) => {
        isMoving[event.key] = false;
      });
    
    moveSquare();
});

function addRandomElement() {
    const field = document.getElementById('free-move-zone');
    const element = document.createElement('div');
    element.className = 'element';

    // Случайная позиция в пределах поля
    const x = Math.random() * (920 - 50);
    const y = Math.random() * (1495 - 50);

    element.style.left = x + 'px';
    element.style.top = y + 'px';

    field.appendChild(element);
}

// Автоматически добавлять элемент каждые 1000 миллисекунд (1 секунда)
setInterval(addRandomElement, 1000);