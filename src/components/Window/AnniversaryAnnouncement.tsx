import { useContext } from "react";
import Window from "../UI/Window";
import { SettingsContext } from "../../contexts/SettingsContext";

const AnniversaryAnnouncement: React.FC = () => {
    const settings = useContext(SettingsContext);
    if (!settings) throw new Error("Context not found");
    const { setAnniversary } = settings;

    return (
        <Window
            show={setAnniversary}
            confirmFunction={() => {
                localStorage.setItem("anniversary", "false");
            }}
            hideClose
            className="window__90_width"
        >
            <div className="window__content">
                <div className="window__divider center padding-top-bottom-10">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/RdBXPmhPX1g"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </Window>
    );
};

export default AnniversaryAnnouncement;
