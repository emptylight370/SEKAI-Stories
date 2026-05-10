import { DeceleratedTriangleParticle } from "../model/SekaiTransitionParticles";
import * as PIXI from "pixi.js";

export interface ISekaiTransitionEntity {
    container: PIXI.Container;
    activeTriangles: DeceleratedTriangleParticle[];
    particleFunction: ((delta: number) => void) | null;
}
