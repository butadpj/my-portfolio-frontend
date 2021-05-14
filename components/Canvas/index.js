import { useRef, useEffect, useState } from "react";
import CanvasHooks from "../../hooks/CanvasHooks";

const Canvas = (props) => {
  const [screenSize, setScreenSize] = useState({ w: 0, h: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const { randomIntFromRange } = CanvasHooks();
  const screenResize = () => {
    setScreenSize({ w: window.innerWidth, h: window.innerHeight });
  };

  const mousePosUpdate = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  class Circle {
    constructor(x, y, dx, dy, radius, gravity) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.gravity = gravity;
      this.minRadius = radius;
      this.maxRadius = radius + 40;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "transparent";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    // gravityMove(canvas, ctx) {
    //   if (this.y + (this.radius + 8) + this.dy > canvas.height) {
    //     this.dy = -this.dy * 0.8;
    //   } else {
    //     this.dy += this.gravity;
    //   }

    //   if (
    //     this.x + (this.radius + 8) > canvas.width ||
    //     this.x - (this.radius + 8) <= 0
    //   ) {
    //     this.dx = -this.dx;
    //   } else {
    //     this.dx += randomIntFromRange(0.0001, 0.00015);
    //   }
    //   this.x += this.dx;
    //   this.y += this.dy;
    // }

    moveAround(ctx, canvas) {
      this.draw(ctx);
      if (
        this.x + this.radius >= window.innerWidth ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }

      if (
        this.y + this.radius >= window.innerHeight ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }

      //Interactivity
      if (
        canvas.width / 2.2 - this.x < 100 &&
        canvas.width / 2.2 - this.x > -100 &&
        canvas.height / 2.2 - this.y < 100 &&
        canvas.height / 2.2 - this.y > -100
      ) {
        if (this.radius < this.maxRadius) {
          this.radius += 5;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.x += this.dx;
      this.y += this.dy;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    // setContextState(context);

    let animationFrameId;
    let totalCircles = window.innerWidth / 40;
    canvas.width = window.outerWidth;
    canvas.height = window.innerHeight;
    let circleArray = [];

    for (let i = 0; i <= totalCircles; i++) {
      let radius = randomIntFromRange(10, 50);
      let x = randomIntFromRange(radius, canvas.width - (radius + 8));
      let y = randomIntFromRange(radius, canvas.height - (radius + 8));
      let dx = randomIntFromRange(-2, 2);
      let dy = randomIntFromRange(-2, 2);
      let gravity = 0.5;

      circleArray.push(new Circle(x, y, dx, dy, radius, gravity));
    }

    // Our draw come here
    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      context.clearRect(0, 0, canvas.width, canvas.height);
      circleArray.forEach((circle) => {
        circle.moveAround(context, canvas);
      });
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [screenSize]);

  useEffect(() => {
    window.addEventListener("resize", screenResize);
    window.addEventListener("mousemove", (e) => mousePosUpdate(e));

    return () => {
      window.removeEventListener("resize", screenResize);
      window.removeEventListener("mousemove", (e) => mousePosUpdate(e));
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
