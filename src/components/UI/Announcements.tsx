import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { announcementKey } from "../../data/Constants";

const Announcements: React.FC = () => {
    const context = useContext(SettingsContext);

    if (!context) return;

    const { setShowAnnouncements } = context;

    const handleAnnouncements = () => {
        setShowAnnouncements(false);
        const cookie = localStorage.getItem(announcementKey);
        if (!cookie) {
            localStorage.setItem(announcementKey, "0");
            return;
        }
        localStorage.setItem(announcementKey, `${Number(cookie) + 1}`);
    };

    return (
        <div id="announcements" onClick={handleAnnouncements}>
            <h2>SEKAI Stories's First Anniversary!</h2>
            <p>
                SEKAI Stories has reached its first anniversary! To celebrate, I
                have added an event for everyone to participate!
            </p>
            <br />
            <h3>The SEKAI Stories One-shot</h3>
            <p>
                "One story. One image. One dialogue box. One-frame. One-shot."
            </p>
            <p>
                Create your own one-shot story and get a chance to have it as a
                default scene!
            </p>
            <p>For submissions and guidelines, click the button below.</p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                        "https://forms.gle/CZANtFB3SkazSNik7",
                        "_blank",
                    );
                }}
                className="btn-blue btn-regular"
            >
                Event Guidelines
            </button>
            <p>The event guidelines can also be found in the Settings menu!</p>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
