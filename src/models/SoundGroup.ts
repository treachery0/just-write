import { SoundFile } from "@/models/SoundFile.ts";

export interface SoundGroup {
    baseDirectory: string
    files: SoundFile[]
}