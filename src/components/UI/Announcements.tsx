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
                    Imitate classic dialogue box to look more like the original
                    (thanks to RetroSEKAI for booting the old UI game back up!)
                </li>
                <li>
                    Allow user to set the starting dialogue box type on Settings
                </li>
            </ul>
            <p>
                You can check the announcement here about the recent April Fools
                event and about getting Just Mizuki's sprite files. Your feedback is
                also appreciated!
            </p>
            <div className="flex flex-horizontal flex-wrap gap-10">
                <button
                    className="btn-regular btn-blue"
                    onClick={(e) => {
                        e.stopPropagation();

                        window.open(
                            "https://ko-fi.com/post/Just-Mizuki-W7W21X7LMQ",
                            "_blank",
                        );
                    }}
                >
                    Ko-fi Announcement
                </button>
                <button
                    className="btn-regular btn-blue"
                    onClick={(e) => {
                        e.stopPropagation();

                        window.open(
                            "https://forms.gle/BC4Pmv5HLZThrTaY8",
                            "_blank",
                        );
                    }}
                >
                    Feedback Form
                </button>
            </div>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
