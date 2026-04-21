import React, { useContext, useState } from "react";
import UploadImageButton from "../../../UI/UploadButton";
import { useTranslation } from "react-i18next";
import IModel from "../../../../types/IModel";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import { SoftErrorContext } from "../../../../contexts/SoftErrorContext";
import { SceneContext } from "../../../../contexts/SceneContext";
import {
    IRoleplaySprite,
    IRoleplaySpriteCharacters,
} from "../../../../types/IRoleplaySprites";
import localforage from "localforage";
import InputWindow from "../../../UI/InputWindow";
import { invalidNames } from "../../../../data/Constants";

interface RoleplaySpritesProps {
    updateModelState: (updates: Partial<IModel>) => void;
    prepareSprite: (
        character: string,
        spriteName: string,
        overrideList?: IRoleplaySpriteCharacters,
    ) => void;
}

const RoleplaySprites: React.FC<RoleplaySpritesProps> = ({
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
    const [showNewSprite, setShowNewSprite] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    if (!roleplaySprites || !currentModel) return;
    const handleCreateSprite = (newSpriteName: string, uploadedFile: File) => {
        console.log(newSpriteName, uploadedFile);
        if (newSpriteName.trim() === "") {
            setErrorInformation(t("error.sprite-name-empty"));
            return;
        }
        if (invalidNames.includes(newSpriteName)) {
            setErrorInformation(t("error.sprite-name-invalid"));
            return;
        }
        const characterName = currentModel.character;
        const existingCharacter = roleplaySprites.find(
            (g) => g.name === characterName,
        );
        const existingSprite = existingCharacter?.sprites.some(
            (s) => s.name === newSpriteName,
        );

        if (existingSprite) {
            setErrorInformation(t("error.sprite-name-exists"));
            return;
        }

        const newSprite: IRoleplaySprite = {
            name: newSpriteName,
            blob: uploadedFile!,
        };
        let updatedList: IRoleplaySpriteCharacters;

        if (!existingCharacter) {
            updatedList = [
                ...roleplaySprites,
                { name: characterName, sprites: [newSprite] },
            ];
        } else {
            updatedList = roleplaySprites.map((char) => {
                if (char.name === characterName) {
                    return { ...char, sprites: [...char.sprites, newSprite] };
                }
                return char;
            });
        }
        try {
            setRoleplaySprites(updatedList);
            localforage.setItem("roleplaySprites", updatedList);
            updateModelState({ modelName: newSpriteName });
            prepareSprite(characterName, newSpriteName, updatedList);
        } catch {
            setErrorInformation("Failed to save sprite locally.");
        }
    };

    const handleSpriteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = event.target.value;
        const characterName = currentModel.character;
        prepareSprite(characterName, value);
        updateModelState({ modelName: value });
    };

    const handleDeleteSprite = () => {
        const characterName = currentModel.character;
        const existingCharacter = roleplaySprites.find(
            (g) => g.name === characterName,
        );
        if (!existingCharacter) {
            setErrorInformation(t("error.nonexistent-character"));
            return;
        }
        const spriteIndex = existingCharacter.sprites.findIndex(
            (s) => s.name === currentModel.modelName,
        );
        if (spriteIndex === -1) {
            setErrorInformation(t("error.nonexistent-sprite"));
            return;
        }
        existingCharacter.sprites.splice(spriteIndex, 1);
        const updatedCharacters = roleplaySprites.map((char) => {
            if (char.name === characterName) {
                return existingCharacter;
            }
            return char;
        });

        localforage.setItem("roleplaySprites", updatedCharacters);
        setRoleplaySprites(updatedCharacters);
        updateModelState({ modelName: "none" });
    };

    return (
        <>
            <select
                value={currentModel.modelName}
                onChange={handleSpriteChange}
            >
                <option value="none" disabled>
                    {t("model.sprite.select-sprite")}
                </option>
                {currentModel.character != "none" &&
                    roleplaySprites[
                        roleplaySprites.findIndex(
                            (g) => g.name === currentModel.character,
                        )
                    ].sprites.map((sprite) => (
                        <option key={sprite.name} value={sprite.name}>
                            {sprite.name}
                        </option>
                    ))}
            </select>
            <div className="layer-buttons">
                <UploadImageButton
                    id="add-sprite"
                    text={<i className="bi bi-plus-circle"></i>}
                    disabled={currentModel.character == "none"}
                    uploadFunction={async (file: File) => {
                        setShowNewSprite(true);
                        setUploadedFile(file);
                    }}
                    type="round"
                />
                <button
                    className="btn-white btn-circle"
                    onClick={handleDeleteSprite}
                    disabled={currentModel.modelName === "none"}
                >
                    <i className="bi bi-x-circle"></i>
                </button>
            </div>
            {showNewSprite && (
                <InputWindow
                    show={setShowNewSprite}
                    description={t("model.sprite.add-sprite-description")}
                    body={
                        <img
                            src={URL.createObjectURL(uploadedFile!)}
                            className="width-100"
                        />
                    }
                    confirmFunction={(x: string) => {
                        handleCreateSprite(x, uploadedFile!);
                    }}
                    className="window__90_width"
                />
            )}
        </>
    );
};

export default RoleplaySprites;
