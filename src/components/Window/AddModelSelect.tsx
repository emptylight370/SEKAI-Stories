import React, { SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import Window from "../UI/Window";
import UploadImageButton from "../UI/UploadButton";

interface AddModelSelectProps {
    addModel: (from: string) => void;
    setShow: React.Dispatch<SetStateAction<boolean>>;
    uploadFunction: (f: File) => void;
}

const AddModelSelect: React.FC<AddModelSelectProps> = ({
    addModel,
    setShow,
    uploadFunction,
}) => {
    const { t } = useTranslation();

    return (
        <Window show={setShow}>
            <div className="window__content">
                <h1>{t("model.selected-layer.add-model.header")}</h1>
                <p>{t("model.selected-layer.add-model.description")}</p>
                <button
                    className="btn-blue btn-regular btn-extend-width"
                    onClick={() => {
                        addModel("sekai");
                        setShow(false);
                    }}
                >
                    sekai.best
                    <p className="add-model-description">
                        {t("model.selected-layer.add-model.sekai-description")}
                    </p>
                </button>
                <button
                    className="btn-blue btn-regular btn-extend-width"
                    onClick={() => {
                        addModel("static");
                        setShow(false);
                    }}
                >
                    SEKAI Stories
                    <p className="add-model-description">
                        {t("model.selected-layer.add-model.static-description")}
                    </p>
                </button>
                <button
                    className="btn-white btn-regular btn-extend-width"
                    onClick={() => {
                        addModel("roleplay");
                        setShow(false);
                    }}
                >
                    {t("model.selected-layer.add-model.roleplay-sprites")}
                    <p className="add-model-description">
                        {t(
                            "model.selected-layer.add-model.roleplay-sprites-description",
                        )}
                    </p>
                </button>
                <UploadImageButton
                    id="background-upload"
                    uploadFunction={uploadFunction}
                    text={
                        <>
                            {t("model.selected-layer.add-model.upload-image")}
                            <p className="add-model-description">
                                {t(
                                    "model.selected-layer.add-model.upload-image-description",
                                )}
                            </p>
                        </>
                    }
                />
            </div>
        </Window>
    );
};

export default AddModelSelect;
