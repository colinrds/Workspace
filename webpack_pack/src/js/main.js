import '../css/main.scss'

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

var point = new Point(3,18);
console.log(point);