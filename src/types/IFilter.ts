import { AdjustmentFilter } from "pixi-filters";
import * as PIXI from "pixi.js";

export interface IFilter {
    container: PIXI.Container;
    flashback?: boolean;
    sick?: { container?: PIXI.Container | null; show?: boolean };
    droop?: { container?: PIXI.Container | null; show?: boolean };
    monochrome?: {
        contrast: number;
        show: boolean;
        adjustmentFilter?: AdjustmentFilter;
    };
    pov?: {
        show?: boolean;
        zoom: number;
        x: number;
        y: number;
    };
}
