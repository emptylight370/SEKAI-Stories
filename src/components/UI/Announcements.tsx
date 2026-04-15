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
                <li>Updated Thai localization</li>
                <li>Added new models from the latest JP April Fools update</li>
                <li>Added a video tutorial for the application</li>
                <li>Added Monochrome Filter</li>
            </ul>

            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
