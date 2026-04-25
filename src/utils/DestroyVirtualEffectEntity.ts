import * as PIXI from "pixi.js";
import { IActiveParticleTickerFunctionsInterface } from "../types/IVirtualEffect";

export const destroyVirtualEffectEntity = (
    entity: IActiveParticleTickerFunctionsInterface,
    app: PIXI.Application,
) => {
    if (entity?.particleFunction) {
        app.ticker.remove(entity.particleFunction);
        entity.particleFunction = null;
    }

    if (entity?.crtFunction) {
        app.ticker.remove(entity.crtFunction);
        entity.crtFunction = null;
    }

    if (entity?.hologramFunction) {
        app.ticker.remove(entity.hologramFunction);
        entity.hologramFunction = null;
    }

    if (entity?.activeTriangles) {
        while (entity?.activeTriangles.length > 0) {
            const triangle = entity?.activeTriangles.pop();
            if (triangle && triangle.parent) {
                triangle.parent.removeChild(triangle);
                triangle.destroy();
            }
        }
    }

    if (entity?.hologram) {
        const hologram = entity?.hologram;
        hologram.parent.removeChild(hologram);
        hologram.destroy();
    }
    console.log("Model VirtualEffectEntity destroyed");
};
