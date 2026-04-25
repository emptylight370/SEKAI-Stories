import {
    TriangleParticle,
    HologramLightEffect,
} from "../model/VirtualEffectModel";

export interface IActiveParticleTickerFunctionsInterface {
    activeTriangles: TriangleParticle[];
    hologramFunction: (() => void) | null;
    particleFunction: ((delta: number) => void) | null;
    crtFunction: (() => void) | null;
    lastTriangleSpawnTime: number;
    hologram: HologramLightEffect;
}
