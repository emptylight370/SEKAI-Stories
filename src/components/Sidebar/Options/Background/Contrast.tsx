import { useTranslation } from "react-i18next";
import { IFilter } from "../../../../types/IFilter";

interface ContrastProps {
    filter: IFilter;
    setFilter: React.Dispatch<React.SetStateAction<IFilter | undefined>>;
}

const Contrast: React.FC<ContrastProps> = ({ filter, setFilter }) => {
    const { t } = useTranslation();
    const handleContrast = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
            !filter?.container ||
            !filter.monochrome?.show ||
            !filter.monochrome?.adjustmentFilter
        )
            return;

        const contrast = Number(event.target.value);

        filter.monochrome.adjustmentFilter.contrast = contrast;
        setFilter({
            ...filter,
            monochrome: {
                ...filter.monochrome,
                contrast: contrast,
            },
        });
    };

    return (
        <div className="option__content">
            <div className="transform-icons">
                <h3>{t("background.filters.monochrome-settings.contrast")}</h3>
            </div>
            <input
                type="range"
                name="contrast-value"
                id="contrast-value"
                min={0.5}
                max={3}
                step={0.1}
                value={filter?.monochrome?.contrast}
                onChange={handleContrast}
            />
        </div>
    );
};

export default Contrast;
