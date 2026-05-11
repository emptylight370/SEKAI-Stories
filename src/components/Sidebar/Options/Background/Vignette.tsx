import { IFilter } from "../../../../types/IFilter";

interface VignetteProps {
    filter: IFilter;
    setFilter: React.Dispatch<React.SetStateAction<IFilter | undefined>>;
}

const Vignette: React.FC<VignetteProps> = ({ filter, setFilter }) => {
    const handleVignette = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
            !filter?.container ||
            !filter.vignette?.show ||
            !filter.vignette?.adjustmentFilter
        )
            return;

        const contrast = Number(event.target.value);
        filter.vignette.adjustmentFilter.contrast = contrast;

        setFilter({
            ...filter,
            vignette: {
                ...filter.vignette,
                contrast: contrast,
            },
        });
    };

    return (
        <div className="option__content">
            <input
                type="range"
                name="contrast-value"
                id="contrast-value"
                min={-1}
                max={1}
                step={1}
                value={filter?.vignette?.contrast}
                onChange={handleVignette}
            />
        </div>
    );
};

export default Vignette;
