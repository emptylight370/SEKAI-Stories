import { ISekaiTransitionEntity } from "../types/ISekaiTransitionEntity";
import * as PIXI from "pixi.js";

export const destroySekaiTransitionEntity = (
    entity: ISekaiTransitionEntity,
    app: PIXI.Application,
) => {
    if (entity?.activeTriangles) {
        while (entity?.activeTriangles.length > 0) {
            const triangle = entity?.activeTriangles.pop();
            if (triangle && triangle.parent) {
                triangle.parent.removeChild(triangle);
                triangle.destroy();
            }
        }
    }
    if (entity?.flash) {
        entity.flash.destroy();
    }
    if (entity?.particleFunction) {
        app.ticker.remove(entity.particleFunction);
        entity.particleFunction = null;
    }
};
