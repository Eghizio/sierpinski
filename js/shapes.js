import { rngColor, drawCircle, drawLine } from "./rendering.js";

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(color = rngColor(), radius = 1) {
    drawCircle(this, radius, color);
  }
}

export class Line {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  midpoint() {
    const {
      a: { x: x1, y: y1 },
      b: { x: x2, y: y2 },
    } = this;

    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;

    return new Point(x, y);
  }
}

export class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  draw(color = rngColor()) {
    drawLine(this.a, this.b, color);
    drawLine(this.a, this.c, color);
    drawLine(this.b, this.c, color);
  }

  area() {
    const {
      a: { x: x1, y: y1 },
      b: { x: x2, y: y2 },
      c: { x: x3, y: y3 },
    } = this;

    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
  }

  isWithin(p) {
    const pbc = new Triangle(p, this.b, this.c);
    const apc = new Triangle(this.a, p, this.c);
    const abp = new Triangle(this.a, this.b, p);

    const a1 = pbc.area();
    const a2 = apc.area();
    const a3 = abp.area();

    const a = this.area();
    const pa = a1 + a2 + a3;

    return a === pa;
  }
}
