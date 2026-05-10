import {
    DeceleratedTriangleParticle,
    Flash,
} from "../model/SekaiTransitionParticles";
import { ISekaiTransitionEntity } from "../types/ISekaiTransitionEntity";
import * as PIXI from "pixi.js";
import { destroySekaiTransitionEntity } from "./DestroySekaiTranstitionEntity";

const CONFIG = {
    TRIANGLE_COLORS: [0xff00ff, 0x00ffff, 0xffff00],
    TRIANGLE_SIZE_MIN: 100,
    TRIANGLE_SIZE_MAX: 200,
    TRIANGLE_VELOCITY_X_MIN: -5,
    TRIANGLE_VELOCITY_X_MAX: -15,
    TRIANGLE_VELOCITY_Y_MIN: -5,
    TRIANGLE_VELOCITY_Y_MAX: -15,
    TRIANGLE_ROTATION_SPEED_MIN: -0.14,
    TRIANGLE_ROTATION_SPEED_MAX: 0.14,
    TRIANGLE_LIFETIME_SECONDS_MIN: 3,
    TRIANGLE_LIFETIME_SECONDS_MAX: 8,
    TRIANGLE_DECELERATE_AFTER: 1,
    MAX_ACTIVE_TRIANGLES: 100,

    FLASH_FADE_IN: 1,
    FLASH_FADE_OUT: 3,
};

const spawnTriangles = (
    entity: Omit<ISekaiTransitionEntity, "particleFunction">,
    app: PIXI.Application,
) => {
    const container = entity.container;
    const activeTriangles = entity.activeTriangles;

    for (let i = 0; i < CONFIG.MAX_ACTIVE_TRIANGLES; i++) {
        const size =
            Math.random() *
                (CONFIG.TRIANGLE_SIZE_MAX - CONFIG.TRIANGLE_SIZE_MIN) +
            CONFIG.TRIANGLE_SIZE_MIN;
        const color =
            CONFIG.TRIANGLE_COLORS[
                Math.floor(Math.random() * CONFIG.TRIANGLE_COLORS.length)
            ];
        const isFilled = Math.random() > 0.5;

        const spawnSide = Math.random() > 0.5 ? "bottom" : "right";

        let spawnX: number;
        let spawnY: number;

        const width = app.screen.width;
        const height = app.screen.height;

        if (spawnSide === "bottom") {
            spawnX = (Math.random() * width) / 2 + width / 2;
            spawnY = height + Math.random() * 500 + 100;
        } else {
            spawnY = (Math.random() * height) / 2 + height / 2;
            spawnX = width + Math.random() * 500 + 100;
        }

        const vx =
            Math.random() *
                (CONFIG.TRIANGLE_VELOCITY_X_MAX -
                    CONFIG.TRIANGLE_VELOCITY_X_MIN) +
            CONFIG.TRIANGLE_VELOCITY_X_MIN;
        const vy =
            Math.random() *
                (CONFIG.TRIANGLE_VELOCITY_Y_MAX -
                    CONFIG.TRIANGLE_VELOCITY_Y_MIN) +
            CONFIG.TRIANGLE_VELOCITY_Y_MIN;
        const rotSpeed =
            Math.random() *
                (CONFIG.TRIANGLE_ROTATION_SPEED_MAX -
                    CONFIG.TRIANGLE_ROTATION_SPEED_MIN) +
            CONFIG.TRIANGLE_ROTATION_SPEED_MIN;
        const lifetime =
            Math.random() *
                (CONFIG.TRIANGLE_LIFETIME_SECONDS_MAX -
                    CONFIG.TRIANGLE_LIFETIME_SECONDS_MIN) +
            CONFIG.TRIANGLE_LIFETIME_SECONDS_MIN;

        const triangle = new DeceleratedTriangleParticle(
            spawnX,
            spawnY,
            color,
            size,
            isFilled,
            vx,
            vy,
            rotSpeed,
            lifetime,
            CONFIG.TRIANGLE_DECELERATE_AFTER,
        );

        container.addChild(triangle);
        activeTriangles.push(triangle);
    }
};

const particleFunction = (
    delta: number,
    entity: Omit<ISekaiTransitionEntity, "particleFunction">,
    app: PIXI.Application,
) => {
    if (entity.activeTriangles.length == 0) {
        spawnTriangles(entity, app);
        entity.flash.reset();
    }
    for (let i = entity.activeTriangles.length - 1; i >= 0; i--) {
        const triangle = entity.activeTriangles[i];
        const expired = triangle.update(delta, app);
        if (expired) {
            app.stage.removeChild(triangle);
            entity.activeTriangles.splice(i, 1);
            triangle.destroy();
        }
        entity.flash.update(app);
    }
};

export const toggleSekaiTransition = (
    mainContainer: PIXI.Container,
    app: PIXI.Application,
    show: boolean,
    entity: ISekaiTransitionEntity | undefined | null,
): ISekaiTransitionEntity | null => {
    if (show) {
        const container = new PIXI.Container();
        const activeTriangles: DeceleratedTriangleParticle[] = [];
        const flash = new Flash(CONFIG.FLASH_FADE_IN, CONFIG.FLASH_FADE_OUT);

        const entity: Omit<ISekaiTransitionEntity, "particleFunction"> = {
            activeTriangles,
            flash,
            container,
        };

        const newParticleFunction = (delta: number) => {
            particleFunction(delta, entity, app);
        };

        container.addChild(flash);
        mainContainer.addChild(container);
        app.ticker.add(newParticleFunction);

        return {
            ...entity,
            particleFunction: newParticleFunction,
        };
    } else {
        if (entity) {
            destroySekaiTransitionEntity(entity, app);
        }
    }
    return null;
};
