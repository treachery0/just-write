<script setup lang="ts">
    import sounds from "@/assets/sounds.json";
    import { SettingsIcon } from "lucide-vue-next";
    import { Settings } from "@/models/Settings.ts";
    import ConfigFont from "@/components/ConfigFont.vue";
    import ConfigTheme from "@/components/ConfigTheme.vue";
    import ConfigSound from "@/components/ConfigSound.vue";
    import InputToggle from "@/components/InputToggle.vue";

    const settings = defineModel<Settings>({
        required: true
    });
</script>

<template>
    <div>
        <button onclick="configDialog.showModal()" class="btn btn-secondary btn-soft btn-circle">
            <settings-icon/>
        </button>

        <dialog id="configDialog" class="modal">
            <div class="modal-box flex flex-col gap-4">
                <config-theme v-model="settings.theme"/>

                <config-font v-model="settings.font"/>

                <config-sound v-model="settings.typingSound" :sounds="sounds.typing"/>

                <input-toggle v-model="settings.showWordCount">
                    Show word and character count
                </input-toggle>

                <input-toggle v-model="settings.showSaveStatus">
                    Show save status
                </input-toggle>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Writing goal</legend>
                    <div class="grid gap-2 grid-cols-2">
                        <input-toggle v-model="settings.goal.enabled">Enabled</input-toggle>
                        <input-toggle v-model="settings.goal.showPercent">Show in percentage</input-toggle>

                        <input
                            style="appearance: textfield"
                            type="number"
                            min="1"
                            step="1"
                            class="input input-secondary input-sm text-end"
                            v-model="settings.goal.count"
                        />

                        <select v-model="settings.goal.unit" class="select select-secondary select-sm">
                            <option value="words">Words</option>
                            <option value="characters">Characters</option>
                        </select>
                    </div>
                </fieldset>

                <div class="mt-8">
                    <button @click="settings.showSplash = true" class="btn btn-warning btn-outline btn-sm">
                        Back to splash screen
                    </button>
                </div>

                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
            </div>

            <form method="dialog" class="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>
    </div>
</template>