export interface IRoleplaySprite {
    name: string;
    blob: Blob;
}

export interface IRoleplaySpriteCharacter {
    name: string;
    sprites: IRoleplaySprite[];
}

export type IRoleplaySpriteCharacters = IRoleplaySpriteCharacter[] | null;
