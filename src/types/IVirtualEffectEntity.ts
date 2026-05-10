import {
    TriangleParticle,
    HologramLightEffect,
} from "../model/VirtualEffectParticles";

export interface IVirtualEffectEntity {
    activeTriangles: TriangleParticle[];
    hologramFunction: (() => void) | null;
    particleFunction: ((delta: number) => void) | null;
    crtFunction: (() => void) | null;
    lastTriangleSpawnTime: number;
    hologram: HologramLightEffect;
}
