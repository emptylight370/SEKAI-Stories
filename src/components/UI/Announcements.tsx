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
            {/* <h2>Notice</h2> */}
            <h3>
                The SEKAI Stories One-Shot 2026 winning scenes are now added to
                the default scene!
            </h3>
            <p>You can see them all here in this announcement!</p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                        "https://ko-fi.com/post/SEKAI-Stories-One-Shot-Winning-Scenes-C3J81ZLIIN",
                        "_blank",
                    );
                }}
                className="btn-regular btn-blue"
            >
                Ko-fi Announcement
            </button>
            <p>Oh, and also, new update!</p>
            <ul>
                <li>
                    Introducing Roleplay Sprites! Upload your own custom
                    roleplay sprites. These will be saved locally on your
                    browser for hassle-free experience!
                </li>
                <li>
                    Added SEKAI Transition! You can find them under Filters!
                </li>
                <li>Added Vignette filter</li>
                <li>Added Opacity slider on Transform</li>
            </ul>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                        "https://ko-fi.com/post/SEKAI-Stories-New-Update-C7R11ZLMW7",
                        "_blank",
                    );
                }}
                className="btn-regular btn-blue"
            >
                Update Announcement
            </button>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
