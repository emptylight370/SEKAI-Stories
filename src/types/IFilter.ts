import { AdjustmentFilter } from "pixi-filters";
import * as PIXI from "pixi.js";
import { ISekaiTransitionEntity } from "./ISekaiTransitionEntity";

export interface IFilter {
    container: PIXI.Container;
    flashback?: boolean;
    sick?: { container?: PIXI.Container | null; show?: boolean };
    vignette?: { container?: PIXI.Container | null; show?: boolean };
    droop?: { container?: PIXI.Container | null; show?: boolean };
    monochrome?: {
        contrast: number;
        show: boolean;
        adjustmentFilter?: AdjustmentFilter;
    };
    sekaiTransition?: {
        show: boolean;
        entity: ISekaiTransitionEntity | null;
    };
    pov?: {
        show?: boolean;
        zoom: number;
        x: number;
        y: number;
    };
}
