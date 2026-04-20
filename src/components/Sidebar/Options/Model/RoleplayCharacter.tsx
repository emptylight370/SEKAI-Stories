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

interface RoleplayCharacterProps {
    currentSelectedCharacter: string;
    setCurrentSelectedCharacter: Dispatch<SetStateAction<string>>;
    updateModelState: (updates: Partial<IModel>) => void;
}

const RoleplayCharacter: React.FC<RoleplayCharacterProps> = ({
    currentSelectedCharacter,
    setCurrentSelectedCharacter,
    updateModelState,
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

    if (!roleplaySprites || !currentModel) return;

    const handleCreateCharacter = (name: string) => {
        if (name.trim() === "") {
            setErrorInformation("The character name cannot be empty.");
            return;
        }
        const existingCharacter = roleplaySprites.find((g) => g.name === name);
        if (existingCharacter) {
            setErrorInformation("This character already exists.");
            return;
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
            localforage.setItem("test__custom_sprites", updatedCharacters);
            return updatedCharacters;
        });
    };

    return (
        <>
            <select
                value={currentSelectedCharacter}
                onChange={(e) => {
                    const value = e.target.value;
                    setCurrentSelectedCharacter(value);
                    updateModelState({ character: value });
                }}
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
            <button
                className="btn-blue btn-regular btn-extend-width"
                onClick={() => setShowNewCharacter(true)}
            >
                {t("model.character.roleplay.new")}
            </button>
            {showNewCharacter && (
                <InputWindow
                    show={setShowNewCharacter}
                    description={t("model.character.roleplay.new-description")}
                    confirmFunction={(x: string) => {
                        handleCreateCharacter(x);
                    }}
                />
            )}
        </>
    );
};

export default RoleplayCharacter;
