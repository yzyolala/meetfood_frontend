import { atom } from "jotai";
import { VideoPostItem } from "./type";

export const videoItemsListAtom = atom<VideoPostItem[]>([]);
