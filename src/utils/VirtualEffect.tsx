import { AdjustmentFilter, CRTFilter } from "pixi-filters";
import {
    InternalModel,
    Live2DModel,
} from "@sekai-world/pixi-live2d-display-mulmotion";
import * as PIXI from "pixi.js";
import { IActiveParticleTickerFunctionsInterface } from "../types/IVirtualEffect";
import {
    HologramLightEffect,
    TriangleParticle,
} from "../model/VirtualEffectModel";
import { destroyVirtualEffectEntity } from "./DestroyVirtualEffectEntity";

const CONFIG = {
    TRIANGLE_COLORS: [0xff00ff, 0x00ffff, 0xffff00],
    TRIANGLE_SIZE_MIN: 100,
    TRIANGLE_SIZE_MAX: 200,
    TRIANGLE_VELOCITY_X_MAX: 0.5,
    TRIANGLE_VELOCITY_Y_MIN: -0.5,
    TRIANGLE_VELOCITY_Y_MAX: 0.5,
    TRIANGLE_LIFETIME_SECONDS_MIN: 5,
    TRIANGLE_LIFETIME_SECONDS_MAX: 10,
    TRIANGLE_FADE_IN_SECONDS: 0.5,
    TRIANGLE_SPAWN_INTERVAL_MS: 250,
    TRIANGLE_ROTATION_SPEED_MIN: 0.01,
    TRIANGLE_ROTATION_SPEED_MAX: 0.03,
    TRIANGLE_SPAWN_AREA_X_FACTOR: 0.8,
    TRIANGLE_SPAWN_AREA_Y_FACTOR: 0.5,

    MAX_ACTIVE_TRIANGLES: 15,
};

const spawnHologram = (character: Live2DModel<InternalModel>) => {
    const bounds = character.getLocalBounds();

    const hologram = new HologramLightEffect(bounds.width, bounds.height);
    character.addChild(hologram);

    const animateHologram = () => {
        hologram.update(0.1);
        requestAnimationFrame(animateHologram);
    };

    animateHologram();

    return hologram;
};

const spawnTriangle = (
    character: Live2DModel<InternalModel>,
    activeTriangles: TriangleParticle[],
) => {
    if (activeTriangles.length >= CONFIG.MAX_ACTIVE_TRIANGLES) {
        return;
    }

    const bounds = character.getLocalBounds();

    const centerX = bounds.width / 2;
    const scatterRangeX = bounds.width * CONFIG.TRIANGLE_SPAWN_AREA_X_FACTOR;
    const spawnX = centerX + (Math.random() - 0.5) * scatterRangeX;

    const centerY = (bounds.y + bounds.height) / 2;
    const scatterRangeY = bounds.height * CONFIG.TRIANGLE_SPAWN_AREA_Y_FACTOR;
    const spawnY = centerY + (Math.random() - 0.5) * scatterRangeY;

    const color =
        CONFIG.TRIANGLE_COLORS[
            Math.floor(Math.random() * CONFIG.TRIANGLE_COLORS.length)
        ];
    const size =
        Math.random() * (CONFIG.TRIANGLE_SIZE_MAX - CONFIG.TRIANGLE_SIZE_MIN) +
        CONFIG.TRIANGLE_SIZE_MIN;
    const isFilled = Math.random() > 0.5;

    const velocityX =
        (Math.random() - 0.5) * 2 * CONFIG.TRIANGLE_VELOCITY_X_MAX;

    const velocityY =
        Math.random() *
            (CONFIG.TRIANGLE_VELOCITY_Y_MAX - CONFIG.TRIANGLE_VELOCITY_Y_MIN) +
        CONFIG.TRIANGLE_VELOCITY_Y_MIN;

    const rotationSpeed =
        (Math.random() *
            (CONFIG.TRIANGLE_ROTATION_SPEED_MAX -
                CONFIG.TRIANGLE_ROTATION_SPEED_MIN) +
            CONFIG.TRIANGLE_ROTATION_SPEED_MIN) *
        (Math.random() > 0.5 ? 1 : -1);

    const lifetime =
        Math.random() *
            (CONFIG.TRIANGLE_LIFETIME_SECONDS_MAX -
                CONFIG.TRIANGLE_LIFETIME_SECONDS_MIN) +
        CONFIG.TRIANGLE_LIFETIME_SECONDS_MIN;

    const triangle = new TriangleParticle(
        spawnX,
        spawnY,
        color,
        size,
        isFilled,
        velocityX,
        velocityY,
        rotationSpeed,
        lifetime,
        CONFIG.TRIANGLE_FADE_IN_SECONDS,
    );
    character.addChild(triangle);
    activeTriangles.push(triangle);
};

const particleFunction = (
    delta: number,
    app: PIXI.Application,
    model: Live2DModel<InternalModel>,
    entity: Omit<IActiveParticleTickerFunctionsInterface, "particleFunction">,
) => {
    const now = performance.now();
    if (entity?.lastTriangleSpawnTime) {
        const lastTriangleSpawnTime = entity?.lastTriangleSpawnTime;
        if (now - lastTriangleSpawnTime > CONFIG.TRIANGLE_SPAWN_INTERVAL_MS) {
            spawnTriangle(model, entity.activeTriangles);
            entity.lastTriangleSpawnTime = now;
        }
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

export const virtualEffectParticles = (
    model: Live2DModel<InternalModel>,
    app: PIXI.Application,
    show: boolean,
    virtualEffectEntity: IActiveParticleTickerFunctionsInterface | null,
): IActiveParticleTickerFunctionsInterface | null => {
    if (show) {
        const activeTriangles: TriangleParticle[] = [];
        const hologram = spawnHologram(model);
        const lastTriangleSpawnTime = 1;

        const entity: Omit<
            IActiveParticleTickerFunctionsInterface,
            "particleFunction"
        > = {
            activeTriangles,
            hologram,
            lastTriangleSpawnTime,
        };
        const newParticleFunction = (delta: number) => {
            particleFunction(delta, app, model, entity);
        };

        app.ticker.add(newParticleFunction);

        return {
            ...entity,
            particleFunction: newParticleFunction,
        };
    } else {
        if (virtualEffectEntity)
            destroyVirtualEffectEntity(virtualEffectEntity, app);
    }
    return null;
};

export const virtualEffectCRT = () => {
    const crtFilter = new CRTFilter({
        time: 2,
        lineWidth: 10,
        lineContrast: 0.1,
        vignetting: 0,
    });
    const animateCRT = () => {
        crtFilter.time += 0.2;
        crtFilter.lineWidth = 7 + 5 * Math.sin(crtFilter.time * 0.01);
        crtFilter.seed = Math.random();
        requestAnimationFrame(animateCRT);
    };

    const adjustmentFilter = new AdjustmentFilter({
        alpha: 0.8,
        brightness: 1.2,
        blue: 1,
        green: 1,
        red: 0.7,
    });

    animateCRT();

    return [crtFilter, adjustmentFilter];
};
