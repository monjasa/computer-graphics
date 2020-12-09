class Point {

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getAbsoluteValue(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  subtract(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  multiply(point: Point): Point {
    return new Point(
      this.x * point.x - this.y * point.y,
      this.y * point.x + this.x * point.y
    );
  }

  divide(point: Point): Point {
    const denominator = point.x * point.x + point.y * point.y;
    return new Point(
      (this.x * point.x + this.y * point.y) / denominator,
      (this.y * point.x - this.x * point.y) / denominator
    );
  }
}

export default Point;