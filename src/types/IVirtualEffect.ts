import * as PIXI from "pixi.js";
import { getBackground } from "../utils/GetBackground";

export class TriangleParticle extends PIXI.Graphics {
    initialAlpha: number;
    maxLifetime: number;
    fadeInDuration: number;
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
        fadeInDuration: number,
    ) {
        super();
        this.x = x;
        this.y = y;
        this.initialAlpha = 1;
        this.alpha = 0;
        this.maxLifetime = lifetime;
        this.fadeInDuration = fadeInDuration;
        this.currentLifetime = 0;

        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = rotationSpeed;

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

        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.blendMode = PIXI.BLEND_MODES.ADD;
        this.pivot.set(0, 0);
    }

    update(deltaFrames: number, app: PIXI.Application) {
        this.x += this.velocityX * deltaFrames;
        this.y += this.velocityY * deltaFrames;

        this.rotation += this.rotationSpeed * deltaFrames;

        this.currentLifetime += app.ticker.deltaMS / 1000;

        if (this.currentLifetime < this.fadeInDuration) {
            this.alpha =
                this.initialAlpha *
                (this.currentLifetime / this.fadeInDuration);
        } else {
            const fadeOutTime = this.maxLifetime - this.fadeInDuration;
            const elapsedFadeOutTime =
                this.currentLifetime - this.fadeInDuration;
            this.alpha =
                this.initialAlpha * (1 - elapsedFadeOutTime / fadeOutTime);
        }

        return this.currentLifetime >= this.maxLifetime;
    }
}

export class HologramLightEffect extends PIXI.Container {
    light: PIXI.Graphics;
    elapsed: number = 0;
    color: number;

    constructor(width: number, height: number, color: number = 0xffffff) {
        super();

        this.width = width;
        this.height = height;
        this.color = color;

        this.light = new PIXI.Graphics();
        this.light.alpha = 0.7;
        this.addChild(this.light);
        HologramLightEffect.addTexture(this.light, width, height);
    }

    private static async addTexture(
        light: PIXI.Graphics,
        width: number,
        height: number,
    ): Promise<void> {
        const sprite = await getBackground("/img/hologram_texture.png", false);
        light.clear();
        light.beginTextureFill({
            texture: sprite.texture,
            matrix: new PIXI.Matrix().scale(
                width / sprite.texture.width,
                height / sprite.texture.height,
            ),
        });
        light.moveTo(width / 3, height);
        light.lineTo(0, 0);
        light.lineTo(width, 0);
        light.lineTo((2 * width) / 3, height);
        light.closePath();
        light.endFill();
        light.pivot.set(width / 2, height / 2);
        light.position.set(width / 2, height / 2);
    }

    update(delta: number) {
        this.elapsed += delta;
        this.light.alpha = 0.9 + 0.1 * Math.sin(this.elapsed * 0.1);
        this.light.scale.x = 1 + 0.01 * Math.sin(this.elapsed * 0.1);
        // this.light.scale.y = 1 + 0.03 * Math.cos(this.elapsed * 0.17);
    }
}

export interface IActiveParticleTickerFunctionsInterface {
    activeTriangles: TriangleParticle[];
    particleFunction: ((delta: number) => void) | null;
    lastTriangleSpawnTime: number;
    hologram: HologramLightEffect;
}
