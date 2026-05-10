import { DeceleratedTriangleParticle } from "../model/SekaiTransitionParticles";
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
    TRIANGLE_ROTATION_SPEED_MIN: -0.2,
    TRIANGLE_ROTATION_SPEED_MAX: 0.2,
    TRIANGLE_SPAWN_AREA_X_FACTOR: 0.8,
    TRIANGLE_SPAWN_AREA_Y_FACTOR: 0.8,
    TRIANGLE_LIFETIME_SECONDS_MIN: 3,
    TRIANGLE_LIFETIME_SECONDS_MAX: 8,
    TRIANGLE_DECELERATE_AFTER: 2,

    MAX_ACTIVE_TRIANGLES: 100,
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

        // 4. Create and Add
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
        // Flash screen function
    }
    for (let i = entity.activeTriangles.length - 1; i >= 0; i--) {
        const triangle = entity.activeTriangles[i];
        const expired = triangle.update(delta, app);
        if (expired) {
            app.stage.removeChild(triangle);
            entity.activeTriangles.splice(i, 1);
            triangle.destroy();
        }
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

        const entity: Omit<ISekaiTransitionEntity, "particleFunction"> = {
            activeTriangles,
            container,
        };

        const newParticleFunction = (delta: number) => {
            particleFunction(delta, entity, app);
        };

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
