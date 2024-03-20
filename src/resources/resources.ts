import { ImageFiltering, ImageSource } from "excalibur";
import { filePath } from "./file-path";
import { map001Resource } from "./map-001";

export const Images: { [key: string]: ImageSource } = {
  SpriteSheetActors: new ImageSource(filePath.spritesheet.actors.png, false, ImageFiltering.Pixel),
};

export const Maps = {
  map001Resource,
};
