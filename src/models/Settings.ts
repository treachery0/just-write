import { SoundOptions } from "@/models/SoundOptions.ts";
import { FontOptions } from "@/models/FontOptions.ts";
import { GoalOptions } from "@/models/GoalOptions.ts";

export interface Settings {
    theme: string
    background: string | undefined
    showSandbox: boolean
    showStartScreen: boolean
    ambientSound: SoundOptions
    typingSound: SoundOptions
    font: FontOptions
    goal: GoalOptions
}