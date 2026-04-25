import {
    TriangleParticle,
    HologramLightEffect,
} from "../model/VirtualEffectModel";

export interface IActiveParticleTickerFunctionsInterface {
    activeTriangles: TriangleParticle[];
    particleFunction: ((delta: number) => void) | null;
    lastTriangleSpawnTime: number;
    hologram: HologramLightEffect;
}
