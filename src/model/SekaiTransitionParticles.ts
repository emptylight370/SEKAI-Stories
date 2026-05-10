import * as PIXI from "pixi.js";

export class Flash extends PIXI.Graphics {
    currentLifetime: number;
    fadeInSeconds: number;
    fadeOutSeconds: number;
    totalDuration: number;
    constructor(fadeInSeconds: number, fadeOutSeconds: number) {
        super();
        this.pivot.set(0, 0);
        this.beginFill(0xffffff);
        this.drawPolygon([0, 0, 0, 1080, 1920, 1080, 1920, 0]);
        this.endFill();
        this.currentLifetime = 0;
        this.alpha = 0;
        this.fadeInSeconds = fadeInSeconds;
        this.fadeOutSeconds = fadeOutSeconds;
        this.totalDuration = fadeInSeconds + fadeOutSeconds;
    }
    update(app: PIXI.Application) {
        this.currentLifetime += app.ticker.deltaMS / 1000;

        if (this.currentLifetime < this.fadeInSeconds) {
            this.alpha = Math.max(this.currentLifetime / this.fadeInSeconds, 0);
        } else {
            this.alpha = Math.min(
                (this.totalDuration - this.currentLifetime) /
                    this.fadeOutSeconds,
                1,
            );
        }
    }

    reset() {
        this.currentLifetime = 0;
    }
}
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

        this.blendMode = PIXI.BLEND_MODES.LIGHTEN;
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

        if (this.currentLifetime > this.decelerationDuration) {
            const friction = 0.99;
            this.velocityX *= Math.pow(friction, deltaFrames);
            this.velocityY *= Math.pow(friction, deltaFrames);
        }
        return this.currentLifetime >= this.maxLifetime;
    }
}
