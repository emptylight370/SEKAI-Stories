import * as PIXI from "pixi.js";
export class DeceleratedTriangleParticle extends PIXI.Graphics {
    maxLifetime: number;
    decelerationDuration: number;
    currentLifetime: number;
    rotationSpeed: number;
    velocityX: number;
    velocityY: number;
    constructor(
        x: number,
        y: number,
        color: number,
        size: number,
        isFilled: boolean,
        velocityX: number,
        velocityY: number,
        rotationSpeed: number,
        lifetime: number,
        decelerationDuration: number,
    ) {
        super();
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.maxLifetime = lifetime;
        this.currentLifetime = 0;

        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = rotationSpeed;

        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.decelerationDuration = decelerationDuration;

        this.blendMode = PIXI.BLEND_MODES.ADD;
        this.pivot.set(0, 0);

        if (isFilled) {
            this.beginFill(color);
            this.drawPolygon([
                -size / 2,
                size / 2,
                size / 2,
                size / 2,
                0,
                -size / 2,
            ]);
            this.endFill();
        } else {
            this.lineStyle(10, color);
            this.drawPolygon([
                -size / 2,
                size / 2,
                size / 2,
                size / 2,
                0,
                -size / 2,
            ]);
        }
    }

    update(deltaFrames: number, app: PIXI.Application) {
        this.x += this.velocityX * deltaFrames;
        this.y += this.velocityY * deltaFrames;

        this.rotation += this.rotationSpeed * deltaFrames;

        this.currentLifetime += app.ticker.deltaMS / 1000;

        this.alpha = 1 - this.currentLifetime / this.maxLifetime;

        // const decelerationTime = this.maxLifetime - this.decelerationDuration;
        if (this.currentLifetime > this.decelerationDuration) {
            const friction = 0.99;
            this.velocityX *= Math.pow(friction, deltaFrames);
            this.velocityY *= Math.pow(friction, deltaFrames);
        }
        return this.currentLifetime >= this.maxLifetime;
    }
}
