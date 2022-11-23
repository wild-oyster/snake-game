const snakeboard = document.getElementById("gameCanvas");
const snakeboardContext = snakeboard?.getContext("2d");

let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
  { x: 140, y: 200 },
  { x: 120, y: 200 },
];

let dx = 20;
let dy = 0;
let changing_direction = false;
let food_x;
let food_y;

const drawSnakePart = ({ x, y }, index) => {
  if (index === 0) {
    snakeboardContext.fillStyle = "blue";
    snakeboardContext.strokeStyle = "white";
    snakeboardContext.fillRect(x, y, 20, 20);
    snakeboardContext.strokeRect(x, y, 20, 20);
    return;
  }

  if (index === snake.length) {
    snakeboardContext.fillStyle = "blue";
    snakeboardContext.strokeStyle = "white";
    snakeboardContext.fillRect(x, y, 20, 20);
    snakeboardContext.strokeRect(x, y, 20, 20);
    return;
  }
  snakeboardContext.fillStyle = "green";
  snakeboardContext.strokeStyle = "white";
  snakeboardContext.fillRect(x, y, 20, 20);
  snakeboardContext.strokeRect(x, y, 20, 20);
};

const drawSnake = () => {
  if (snakeboardContext) {
    snake.forEach(drawSnakePart);
  }
};

const clearBoard = () => {
  snakeboardContext.fillStyle = "black";
  snakeboardContext.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboardContext.strokeRect(0, 0, snakeboard.width, snakeboard.height);
};

const moveSnake = () => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const hasEatenfood = snake[0].x === food_x && snake[0].y === food_y;
  if (hasEatenfood) {
    genFood();
  } else {
    snake.pop();
  }
};

function main() {
  if (gameEnd()) return;

  changing_direction = false;
  setTimeout(() => {
    clearBoard();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

const changeDirection = (event) => {
  if (changing_direction) return;
  changing_direction = true;

  const up = dy === -20;
  const down = dy === 20;
  const left = dx === -20;
  const right = dx === 20;

  if (event.key === "ArrowUp" && !down) {
    dx = 0;
    dy = -20;
  }

  if (event.key === "ArrowLeft" && !right) {
    dx = -20;
    dy = 0;
  }

  if (event.key === "ArrowRight" && !left) {
    dx = 20;
    dy = 0;
  }

  if (event.key === "ArrowDown" && !up) {
    dx = 0;
    dy = 20;
  }
};

const gameEnd = () => {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 20;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 20;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
};

const randomFood = (min, max) =>
  Math.round((Math.random() * (max - min) + min) / 20) * 20;

function drawFood() {
  snakeboardContext.fillStyle = "lightgreen";
  snakeboardContext.strokestyle = "darkgreen";
  snakeboardContext.fillRect(food_x, food_y, 20, 20);
  snakeboardContext.strokeRect(food_x, food_y, 20, 20);
}

const genFood = () => {
  food_x = randomFood(0, snakeboard.width - 10);

  food_y = randomFood(0, snakeboard.height - 10);

  snake.forEach((part) => {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) genFood();
  });
};

document.addEventListener("keydown", changeDirection);

main();

genFood();
