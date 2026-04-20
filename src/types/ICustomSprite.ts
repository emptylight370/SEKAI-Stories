export interface ICustomSprite {
    name: string;
    blob: Blob;
}

export interface ICustomSpriteGroup {
    group: string;
    sprites: ICustomSprite[];
}

export type ICustomSpriteGroups = ICustomSpriteGroup[] | null;
