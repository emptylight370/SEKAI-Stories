import {
    DeceleratedTriangleParticle,
    Flash,
} from "../model/SekaiTransitionParticles";
import * as PIXI from "pixi.js";

export interface ISekaiTransitionEntity {
    container: PIXI.Container;
    activeTriangles: DeceleratedTriangleParticle[];
    flash: Flash;
    particleFunction: ((delta: number) => void) | null;
}
