import React, { useContext } from "react";
import { Checkbox } from "../../../UI/Checkbox";
import { SceneContext } from "../../../../contexts/SceneContext";
import { AdjustmentFilter } from "pixi-filters";
import { sickEffect } from "../../../../utils/SickEffect";
import { getBackground } from "../../../../utils/GetBackground";
import * as PIXI from "pixi.js";
import { useTranslation } from "react-i18next";
import POVFilter from "./POVFilter";
import Contrast from "./Contrast";

const Filter: React.FC = () => {
    const scene = useContext(SceneContext);
    const { t } = useTranslation();

    if (!scene) throw new Error("Context not found");

    const { app, filter, setFilter } = scene;

    const handleFlashback = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!filter?.container) return;

        const value = event.target.checked;

        if (value) {
            const adjustmentFilter = new AdjustmentFilter({
                saturation: 0.5,
                brightness: 0.9,
            });
            filter.container.filters = [adjustmentFilter];
        } else {
            filter.container.filters = [];
        }

        setFilter({
            ...filter,
            flashback: value,
        });
    };

    const handleMonochrome = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!filter?.container) return;

        const value = event.target.checked;
        let adjustmentFilter: AdjustmentFilter | undefined;

        if (value) {
            adjustmentFilter = new AdjustmentFilter({
                saturation: 0,
            });
            filter.container.filters = [adjustmentFilter];
        } else {
            filter.container.filters = [];
        }

        setFilter({
            ...filter,
            monochrome: {
                contrast: 1,
                show: value,
                adjustmentFilter: adjustmentFilter ?? undefined,
            },
        });
    };

    const handleSick = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!filter?.container) return;

        const value = event.target.checked;

        if (value) {
            const sickContainer = await sickEffect(app, filter.container);
            filter.container.addChildAt(sickContainer, 3);

            setFilter({
                ...filter,
                sick: {
                    container: sickContainer,
                    show: true,
                },
            });
        } else {
            if (!filter.sick) return;
            const sickContainer = filter.sick.container;
            sickContainer?.destroy();
            setFilter({
                ...filter,
                sick: {
                    container: null,
                    show: false,
                },
            });
        }
    };

    const handleDroop = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!filter?.container) return;

        const value = event.target.checked;

        if (value) {
            const droopLines = await getBackground("/img/droop.png");
            const droopContainer = new PIXI.Container();

            droopContainer.addChildAt(droopLines, 0);

            filter.container.addChildAt(droopContainer, 3);

            setFilter({
                ...filter,
                droop: {
                    container: droopContainer,
                    show: true,
                },
            });
        } else {
            filter.droop?.container?.destroy();
            setFilter({
                ...filter,
                droop: {
                    container: null,
                    show: false,
                },
            });
        }
    };
    const handlePOV = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!filter?.container) return;
        const value = event.target.checked;
        if (value) {
            setFilter({
                ...filter,
                pov: {
                    show: true,
                    x: 0,
                    y: 0,
                    zoom: 1,
                },
            });
        } else {
            filter.container.position.set(1920 / 2, 1080 / 2);
            filter.container.scale.set(1, 1);
            setFilter({
                ...filter,
                pov: {
                    show: false,
                    x: 0,
                    y: 0,
                    zoom: 1,
                },
            });
        }
    };

    return (
        <div>
            <Checkbox
                id="flashback"
                label={t("background.filters.flashback")}
                checked={filter?.flashback}
                onChange={handleFlashback}
            />
            <Checkbox
                id="monochrome"
                label={t("background.filters.monochrome")}
                checked={filter?.monochrome?.show}
                onChange={handleMonochrome}
            />
            {filter?.monochrome?.show && (
                <Contrast filter={filter} setFilter={setFilter} />
            )}
            <Checkbox
                id="sick"
                label={t("background.filters.sick")}
                checked={filter?.sick?.show}
                onChange={handleSick}
            />
            <Checkbox
                id="drooping-lines"
                label={t("background.filters.drooping-lines")}
                checked={filter?.droop?.show}
                onChange={handleDroop}
            />
            <Checkbox
                id="pov"
                label={t("background.filters.pov")}
                checked={filter?.pov?.show}
                onChange={handlePOV}
            />
            {filter?.pov?.show && (
                <POVFilter filter={filter} setFilter={setFilter} />
            )}
        </div>
    );
};

export default Filter;
