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
            <h2>Notice</h2>
            <p>Few updates have been made:</p>
            <ul>
                <li>
                    Imitate classic dialogue box to look more like the original (thanks to RetroSEKAI for booting the old UI game back up!)
                </li>
                <li>
                    Allow user to set the starting dialogue box type on Settings
                </li>
                <li>Replaced the font size lock with reset</li>
                <li>Added snapping on font size slider </li>
                <li>Open the character options after adding a Live2D model</li>
                <li>Fixed line height issue when changing font size</li>
            </ul>

            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
