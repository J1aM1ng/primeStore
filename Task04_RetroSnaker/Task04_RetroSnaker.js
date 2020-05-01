// 获取所需元素
var score = document.querySelector('.score');
var oS = document.querySelector('.start');
var map = document.querySelector('#map');
var outerMap = document.querySelector('#outer-map');
// 得到90个格子
for (var i = 0; i < 1800; i++) {
    var div = document.createElement('div');
    outerMap.appendChild(div);
}
// 游戏不能运行，蛇不能动
var snakeFlag = false;
var gameFlag = false;
// 定时器
var timeId = null;
// 移动速度
var spedTime = 250;
// 得分情况
var defen = 0;
// 颜色:黑色
function bg() {
    oc = "black";
    return oc;
};
// 食物“加成”
(function() {
    // 存食物元素的数组
    var elements = [];
    // 食物的构造函数
    function Food(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || 'linear-gradient(black)';
    };
    // 食物的样式
    Food.prototype.init = function(map, snake) {
        remove();
        var div = document.createElement('div');
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.position = 'absolute';
        bg();
        div.style.background = "black";
        this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
        // 确定食物不能在蛇身上
        for (var h = snake.body.length - 1; h >= 0; h--) {
            if (snake.body[h].x == this.x / this.width && snake.body[h].y == this.y / this.height) {
                this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
                this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
                h = snake.body.length - 1;
            }
        };
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        // 将食物元素添加到div中
        map.appendChild(div);
        // 存入数组
        elements.push(div);
    };
    // 蛇每吃掉一个食物,数组元素少一个
    function remove() {
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
            i--;
        }
    };
    // 将食物暴露给window
    window.Food = Food;
})();
// 蛇的函数
(function() {
    // 存小蛇身体的数组
    var elements = [];
    // 小蛇的构造函数
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            { x: 3, y: 2, color: 'black' },
            { x: 2, y: 2, color: 'black' },
            { x: 1, y: 2, color: 'black' }
        ];
        this.direction = direction || 'right';
    };
    // 小蛇的样式
    Snake.prototype.init = function(map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var div = document.createElement('div');
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.background = this.body[i].color;
            div.style.left = this.body[i].x * this.width + 'px';
            div.style.top = this.body[i].y * this.height + 'px';
            div.style.position = 'absolute';
            map.appendChild(div);
            elements.push(div);
        }
    };
    // 蛇尾
    var snakeLast = null;
    // 小蛇的移动函数
    Snake.prototype.move = function(map, food) {
        snakeLast = {
            x: this.body[this.body.length - 1].x,
            y: this.body[this.body.length - 1].y,
            color: this.body[this.body.length - 1].color
        };
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        };
        switch (this.direction) {
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'right':
                this.body[0].x += 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        };
        for (var h = 1; h < this.body.length; h++) {
            if (this.body[0].x == this.body[h].x && this.body[0].y == this.body[h].y) {
                clearInterval(timeId);
                gameFlag = false;
                snakeFlag = false;
                setTimeout(function() {
                    alert('自己吃自己，tui!');
                    oS.style.cursor = 'not-allowed';
                    oS.classList.add('gray');
                }, 50);
                for (var i = 0; i < this.body.length - 1; i++) {
                    this.body[i].x = this.body[i + 1].x;
                    this.body[i].y = this.body[i + 1].y;
                };
                this.body.push(snakeLast);
                this.init(map);
            }
        };
        if (this.body[0].x == food.x / this.width && this.body[0].y == food.y / this.height) {
            bg();
            snakeLast.color = oc;
            this.body.push(snakeLast);
            food.init(map, this);
            defen++;
            score.innerHTML = defen;
        };
    };
    // 小蛇身体的移动函数
    function remove() {
        for (var h = elements.length - 1; h >= 0; h--) {
            var ele = elements[h];
            ele.parentNode.removeChild(ele);
            elements.splice(h, 1);
        }
    }
    // 暴露小蛇
    window.Snake = Snake;
})();
// 游戏控制函数
(function() {
    // 得到食物，小蛇和地图
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    };
    // 游戏初始化
    Game.prototype.init = function() {
        this.snake.init(this.map);
        this.food.init(this.map, this.snake);
        this.bindKey();
    };
    // 游戏的运行
    Game.prototype.runSnake = function() {
        if (gameFlag) {
            clearInterval(timeId);
            timeId = setInterval(function() {
                this.snake.move(this.map, this.food);
                if (this.snake.body[0].x < 0 || this.snake.body[0].y < 0 || this.snake.body[0].x >= this.map.offsetWidth / this.snake.width || this.snake.body[0].y >= this.map.offsetHeight / this.snake.height) {
                    clearInterval(timeId);
                    gameFlag = false;
                    snakeFlag = false;
                    setTimeout(function() {
                        alert('手速8大行，撞墙了小老弟');
                        oS.style.cursor = 'not-allowed';
                        oS.classList.add('gray');
                    }, 50);
                    return;
                };
                this.snake.init(this.map);
            }.bind(this), spedTime);
        }
    };
    // 按键的控制
    Game.prototype.bindKey = function() {
        document.addEventListener('keydown', function(e) {
            if (snakeFlag) {
                if (this.snake.direction == 'left' && e.keyCode == 39) return;
                else if (this.snake.direction == 'right' && e.keyCode == 37) return;
                else if (this.snake.direction == 'top' && e.keyCode == 40) return;
                else if (this.snake.direction == 'bottom' && e.keyCode == 38) return;
                else {
                    switch (e.keyCode) {
                        case 37:
                            this.snake.direction = 'left';
                            break;
                        case 38:
                            this.snake.direction = 'top';
                            break;
                        case 39:
                            this.snake.direction = 'right';
                            break;
                        case 40:
                            this.snake.direction = 'bottom';
                            break;
                    }
                }
            }
        }.bind(this), false);
    };
    window.Game = Game;
})();
// 小蛇运行
var gm = new Game(map);
gm.init();
// 开始
oS.onclick = function() {
    gameFlag = true;
    snakeFlag = true;
    gm.runSnake();
};
// 暂停
document.querySelector('.stop').onclick = function() {
    gameFlag = false;
    snakeFlag = false;
    clearInterval(timeId);
};
// 重新开始
document.querySelector('.restart').onclick = function() {
    oS.classList.remove('gray');
    oS.style.cursor = 'pointer';
    spedTime = 200;
    gameFlag = true;
    snakeFlag = true;
    clearInterval(timeId);
    gm = new Game(map);
    gm.init();
    defen = 0;
    score.innerHTML = defen;
    gm.runSnake();
};
// 加速
document.querySelector('.speed').onclick = function() {
    spedTime -= 25;
    spedTime = 25 >= spedTime ? 25 : spedTime;
    document.querySelector('.sp').innerHTML = 500 - spedTime;
    gm.runSnake();
};
// 减速
document.querySelector('.slow').onclick = function() {
    spedTime += 25;
    spedTime = 400 <= spedTime ? 400 : spedTime;
    document.querySelector('.sp').innerHTML = 500 - spedTime;
    gm.runSnake();
};