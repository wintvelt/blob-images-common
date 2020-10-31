import { nanoid } from 'nanoid';

export const newPhotoId = () => 'P' + nanoid(15);
export const newGroupId = () => 'G' + nanoid(15);
export const newAlbumId = () => 'A' + nanoid(15);
export const newFeatureId = () => 'F' + nanoid(15);