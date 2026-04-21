import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import InputWindow from "../../../UI/InputWindow";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import IModel from "../../../../types/IModel";
import {
    IRoleplaySpriteCharacter,
    IRoleplaySpriteCharacters,
} from "../../../../types/IRoleplaySprites";
import { SoftErrorContext } from "../../../../contexts/SoftErrorContext";
import localforage from "localforage";
import { useTranslation } from "react-i18next";
import { SceneContext } from "../../../../contexts/SceneContext";
import Window from "../../../UI/Window";
import { characterEasterEggs, invalidNames } from "../../../../data/Constants";

interface RoleplayCharacterProps {
    currentSelectedCharacter: string;
    setCurrentSelectedCharacter: Dispatch<SetStateAction<string>>;
    updateModelState: (updates: Partial<IModel>) => void;
    prepareSprite: (
        character: string,
        spriteName: string,
        overrideList?: IRoleplaySpriteCharacters,
    ) => void;
}

const RoleplayCharacter: React.FC<RoleplayCharacterProps> = ({
    currentSelectedCharacter,
    setCurrentSelectedCharacter,
    updateModelState,
    prepareSprite,
}) => {
    const { t } = useTranslation();

    const scene = useContext(SceneContext);
    const settings = useContext(SettingsContext);
    const error = useContext(SoftErrorContext);
    if (!scene || !settings || !error) throw new Error("Context not found");
    const { currentModel } = scene;
    const { roleplaySprites, setRoleplaySprites } = settings;
    const { setErrorInformation } = error;
    const [showNewCharacter, setShowNewCharacter] = useState(false);
    const [containsSpriteWarn, setContainsSpriteWarn] = useState(false);

    if (!roleplaySprites || !currentModel) return;

    const handleContainsSprite = (fn: () => void) => {
        const characterName = currentModel.character;
        const existingCharacter = roleplaySprites.find(
            (g) => g.name === characterName,
        );
        if (!existingCharacter) {
            setErrorInformation(t("error.nonexistent-character"));
            return;
        }
        if (existingCharacter.sprites.length > 0) {
            setContainsSpriteWarn(true);
            return;
        }
        fn();
    };

    const handleCreateCharacter = (name: string) => {
        if (name.trim() === "") {
            setErrorInformation(t("error.character-name-empty"));
            return;
        }
        if (invalidNames.includes(name)) {
            setErrorInformation(t("error.character-name-invalid"));
            return;
        }

        const existingCharacter = roleplaySprites.find(
            (g) => g.name.toLowerCase() === name.toLowerCase(),
        );

        if (existingCharacter) {
            setErrorInformation(t("error.character-name-exists"));
            return;
        }

        if (Object.keys(characterEasterEggs).includes(name.toLowerCase())) {
            setErrorInformation(characterEasterEggs[name.toLowerCase()]);
        }

        const newCharacter: IRoleplaySpriteCharacter = {
            name,
            sprites: [],
        };

        setRoleplaySprites((prev) => {
            const updatedCharacters: IRoleplaySpriteCharacters = prev
                ? [...prev]
                : [];

            updatedCharacters.push(newCharacter);
            setCurrentSelectedCharacter(name);
            updateModelState({ character: name });
            localforage.setItem("roleplaySprites", updatedCharacters);
            return updatedCharacters;
        });
    };

    const handleCharacterChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const characterName = event.target.value;
        setCurrentSelectedCharacter(characterName);
        const characterIndex = roleplaySprites.findIndex(
            (g) => g.name === characterName,
        );

        const firstSpriteName =
            roleplaySprites[characterIndex].sprites?.[0]?.name ?? "none";
        if (firstSpriteName != "none") {
            prepareSprite(characterName, firstSpriteName);
        } else {
            setErrorInformation(t("model.character.roleplay.no-sprite-warn"));
        }
        updateModelState({
            character: characterName,
            modelName: firstSpriteName,
        });
    };

    const handleDeleteCharacter = () => {
        const characterName = currentModel.character;
        const existingCharacter = roleplaySprites.find(
            (g) => g.name === characterName,
        );
        if (!existingCharacter) {
            setErrorInformation(t("error.nonexistent-character"));
            return;
        }
        const updatedCharacters = roleplaySprites.filter(
            (g) => g.name !== characterName,
        );
        setRoleplaySprites(updatedCharacters);
        localforage.setItem("roleplaySprites", updatedCharacters);
        setCurrentSelectedCharacter("none");
        updateModelState({ character: "none", modelName: "none" });
    };

    return (
        <>
            <select
                value={currentSelectedCharacter}
                onChange={handleCharacterChange}
            >
                <option value="none" disabled>
                    {t("model.character.select-character")}
                </option>
                {roleplaySprites?.map((spriteGroup) => (
                    <option key={spriteGroup.name} value={spriteGroup.name}>
                        {spriteGroup.name}
                    </option>
                ))}
            </select>
            <div className="layer-buttons">
                <button
                    className="btn-blue btn-circle"
                    onClick={() => setShowNewCharacter(true)}
                >
                    <i className="bi bi-plus-circle"></i>
                </button>
                <button
                    className="btn-white btn-circle"
                    onClick={() => {
                        handleContainsSprite(handleDeleteCharacter);
                    }}
                    disabled={currentSelectedCharacter === "none"}
                >
                    <i className="bi bi-x-circle"></i>
                </button>
            </div>
            {showNewCharacter && (
                <InputWindow
                    show={setShowNewCharacter}
                    description={t("model.character.roleplay.new-description")}
                    confirmFunction={(x: string) => {
                        handleCreateCharacter(x);
                    }}
                />
            )}
            {containsSpriteWarn && (
                <Window
                    show={setContainsSpriteWarn}
                    confirmFunction={handleDeleteCharacter}
                    confirmLabel={t("global.continue-ok")}
                    closeLabel={t("global.cancel")}
                    danger
                >
                    <div className="window__content">
                        <div className="window__divider">
                            <h2 className="text-center">
                                {t("model.character.roleplay.delete-warn")}
                            </h2>
                        </div>
                    </div>
                </Window>
            )}
        </>
    );
};

export default RoleplayCharacter;
