import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Window from "../UI/Window";
import { useTranslation } from "react-i18next";
import { handleChangeLanguage, languageNames } from "../../utils/i18ninit";
import { SceneContext } from "../../contexts/SceneContext";
import Translators from "../UI/Translators";
import AdjustYPosition from "./AdjustYPosition";

interface TutorialProps {
    show: Dispatch<SetStateAction<boolean>>;
}

const Tutorial: React.FC<TutorialProps> = ({ show }) => {
    const scene = useContext(SceneContext);
    if (!scene) throw new Error("Context not found");

    const [page, setPage] = useState<number>(-2);
    const { t, i18n } = useTranslation();
    const lng = i18n.language;

    return (
        <>
            {page == -2 && (
                <Window
                    show={show}
                    confirmLabel={t("global.next")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                    className="window__90_width"
                    hideClose
                >
                    <div className="window__content">
                        <h1>{t("settings.language")}</h1>
                        <select
                            name="language"
                            id="language"
                            value={lng}
                            onChange={handleChangeLanguage}
                        >
                            {Object.entries(languageNames).map(
                                ([code, name]) => (
                                    <option key={code} value={code}>
                                        {name}
                                    </option>
                                ),
                            )}
                        </select>
                        <Translators lng={lng} />
                    </div>
                </Window>
            )}
            {page == -1 && (
                <AdjustYPosition
                    show={show}
                    inTutorial={true}
                    confirmFunction={() => setPage(page + 1)}
                />
            )}
            {page == 0 && (
                <Window
                    show={show}
                    confirmLabel={t("tutorial.welcome.confirm-first-time")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                >
                    <div className="window__content">
                        <h2 className="text-center">
                            {t("tutorial.welcome.header")}
                        </h2>
                        <div className="window__divider">
                            <h3 className="text-center text-bold">
                                {t("tutorial.welcome.intro-header")}
                            </h3>
                            <p className="text-center">
                                {t("tutorial.welcome.paragraph-1")}
                            </p>
                            <p className="text-center">
                                {t("tutorial.welcome.paragraph-2")}
                            </p>
                        </div>
                    </div>
                </Window>
            )}
            {page == 1 && (
                <Window
                    className="window__90_width"
                    show={show}
                    buttons={
                        <>
                            <button
                                className="btn-white btn-regular"
                                onClick={() => {
                                    window.open(
                                        "https://youtu.be/t5SjbYaCj4E",
                                        "_blank",
                                    );
                                }}
                            >
                                {t("tutorial.video.youtube")}
                            </button>
                        </>
                    }
                    confirmLabel={t("global.next")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                    hideClose
                >
                    <div className="window__content">
                        <h2 className="text-center">
                            {t("tutorial.video.header")}
                        </h2>
                        <div className="window__divider center padding-top-bottom-10">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/t5SjbYaCj4E"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </Window>
            )}
            {page == 2 && (
                <Window
                    show={show}
                    confirmLabel={t("global.next")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                    hideClose
                >
                    <div className="window__content">
                        <h2 className="text-center">
                            {t("tutorial.menu-navigation.header")}
                        </h2>
                        <div className="window__divider center padding-top-bottom-10">
                            <img
                                src="/img/menu1.png"
                                className="outline-blue-4"
                                alt=""
                            />
                        </div>
                    </div>
                </Window>
            )}
            {page == 3 && (
                <Window
                    show={show}
                    confirmLabel={t("global.next")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                    hideClose
                >
                    <div className="window__content">
                        <h2 className="text-center center">
                            <i className="sidebar__select bi bi-card-image "></i>{" "}
                            <span className="margin-left-10">
                                {t("tutorial.background-menu.header")}
                            </span>
                        </h2>
                        <div className="window__divider center padding-top-bottom-10">
                            <img
                                src="/img/menu2.png"
                                className="outline-blue-4"
                                alt=""
                            />
                        </div>
                        <div className="window__divider">
                            <h2>
                                {t(
                                    "tutorial.background-menu.select-upload.header",
                                )}
                            </h2>
                            <p>
                                {t(
                                    "tutorial.background-menu.select-upload.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu2-1.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                            <h3>
                                {t(
                                    "tutorial.background-menu.select-upload.split.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.background-menu.select-upload.split.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu2-2.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="window__divider">
                            <h2>
                                {t("tutorial.background-menu.lighting.header")}
                            </h2>
                            <p>
                                {t(
                                    "tutorial.background-menu.lighting.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu2-3.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="window__divider">
                            <h2>
                                {t("tutorial.background-menu.filters.header")}
                            </h2>
                            <p>
                                {t(
                                    "tutorial.background-menu.filters.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu2-4.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </Window>
            )}
            {page == 4 && (
                <Window
                    show={show}
                    confirmLabel={t("global.next")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                    hideClose
                >
                    <div className="window__content">
                        <h2 className="text-center center">
                            <i className="sidebar__select bi bi-chat "></i>{" "}
                            <span className="margin-left-10">
                                {t("tutorial.text-menu.header")}
                            </span>
                        </h2>
                        <div className="window__divider center padding-top-bottom-10">
                            <img
                                src="/img/menu3.png"
                                className="outline-blue-4"
                                alt=""
                            />
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.text-menu.name-tag.header")}</h2>
                            <p>{t("tutorial.text-menu.name-tag.paragraph")}</p>
                            <h3>
                                {t(
                                    "tutorial.text-menu.name-tag.easy-switch.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.text-menu.name-tag.easy-switch.paragraph",
                                )}
                            </p>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.text-menu.dialogue.header")}</h2>
                            <p>{t("tutorial.text-menu.dialogue.paragraph")}</p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu3-1.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.text-menu.scene-text.header")}</h2>
                            <p>
                                {t("tutorial.text-menu.scene-text.paragraph")}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu3-2.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="window__divider">
                            <h2>
                                {t("tutorial.text-menu.choices-text.header")}
                            </h2>
                            <p>
                                {t("tutorial.text-menu.choices-text.paragraph")}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu3-3.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </Window>
            )}
            {page == 5 && (
                <Window
                    show={show}
                    confirmLabel={t("global.next")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                    hideClose
                >
                    <div className="window__content">
                        <h2 className="text-center center">
                            <i className="sidebar__select bi bi-person-fill "></i>{" "}
                            <span className="margin-left-10">
                                {t("tutorial.model-menu.header")}
                            </span>
                        </h2>
                        <div className="window__divider center padding-top-bottom-10">
                            <img
                                src="/img/menu4.png"
                                className="outline-blue-4"
                                alt=""
                            />
                        </div>
                        <div className="window__divider">
                            <h2>
                                {t("tutorial.model-menu.selected-layer.header")}
                            </h2>
                            <p>
                                {t(
                                    "tutorial.model-menu.selected-layer.paragraph",
                                )}
                            </p>
                            <h3>
                                <i className="bi bi-plus-circle" />{" "}
                                {t(
                                    "tutorial.model-menu.selected-layer.add-model.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.model-menu.selected-layer.add-model.paragraph",
                                )}
                            </p>
                            <h3>
                                <i className="bi bi-eye" />{" "}
                                {t(
                                    "tutorial.model-menu.selected-layer.hide-layer.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.model-menu.selected-layer.hide-layer.paragraph",
                                )}
                            </p>
                            <h3>
                                <i className="bi bi-x-circle" />{" "}
                                {t(
                                    "tutorial.model-menu.selected-layer.remove-layer.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.model-menu.selected-layer.remove-layer.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu4-1.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.model-menu.transform.header")}</h2>
                            <p>
                                {t("tutorial.model-menu.transform.paragraph")}
                            </p>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.model-menu.character.header")}</h2>
                            <p>
                                {t("tutorial.model-menu.character.paragraph")}
                            </p>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.model-menu.costume.header")}</h2>
                            <p>{t("tutorial.model-menu.costume.paragraph")}</p>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.model-menu.emotion.header")}</h2>
                            <h3>
                                {t("tutorial.model-menu.emotion.pose.header")}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.model-menu.emotion.pose.paragraph",
                                )}
                            </p>
                            <h3>
                                {t(
                                    "tutorial.model-menu.emotion.expression.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.model-menu.emotion.expression.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu4-2.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.model-menu.mouth.header")}</h2>
                            <p>{t("tutorial.model-menu.mouth.paragraph")}</p>
                        </div>
                        <div className="window__divider">
                            <h2>{t("tutorial.model-menu.live-2d.header")}</h2>
                            <p>{t("tutorial.model-menu.live-2d.paragraph")}</p>
                            <h3>
                                {t(
                                    "tutorial.model-menu.live-2d.import-export.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.model-menu.live-2d.import-export.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu4-3.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                            <h3>
                                {t(
                                    "tutorial.model-menu.live-2d.emotion-copy.header",
                                )}
                            </h3>
                            <p>
                                {t(
                                    "tutorial.model-menu.live-2d.emotion-copy.paragraph",
                                )}
                            </p>
                            <div className="window__divider center">
                                <img
                                    src="/img/menu4-4.png"
                                    className="outline-blue-4 center"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </Window>
            )}
            {page == 6 && (
                <Window
                    show={show}
                    confirmLabel={t("global.next")}
                    confirmFunction={() => setPage(page + 1)}
                    skipCloseInConfirm
                    hideClose
                >
                    <div className="window__content">
                        <h2 className="text-center">
                            {t("tutorial.save.header")}
                        </h2>
                        <div className="window__divider center padding-top-bottom-10">
                            <img
                                src="/img/menu5.png"
                                className="outline-blue-4"
                                alt=""
                            />
                        </div>
                        <div className="window__divider">
                            <h2>
                                <i className="bi bi-braces" />{" "}
                                {t("import-export.header")}
                            </h2>
                            <p>{t("tutorial.save.scene-paragraph")}</p>
                        </div>
                    </div>
                </Window>
            )}
            {page == 7 && (
                <Window show={show}>
                    <div className="window__content">
                        <h2 className="text-center">
                            {t("tutorial.ending.header")}
                        </h2>
                        <div className="window__divider center flex-vertical">
                            <p className="text-center">
                                {t("tutorial.ending.paragraph")}
                            </p>
                            <img
                                className="center"
                                src="/img/iine.png"
                                alt=""
                            />
                        </div>
                    </div>
                </Window>
            )}
        </>
    );
};

export default Tutorial;
