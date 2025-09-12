import { Settings } from "@/models/Settings.ts";

export function getDefaultSettings(): Settings {
    return {
        theme: 'dark',
        background: undefined,
        showStartScreen: true,
        showSandbox: true,
        font: {
            size: 16
        },
        typingSound: {
            path: undefined,
            volume: 100,
            muted: false
        },
        ambientSound: {
            path: undefined,
            volume: 100,
            muted: false
        },
        goal: {
            enabled: true,
            showWordCount: true,
            count: 200,
            unit: 'words'
        }
    };
}