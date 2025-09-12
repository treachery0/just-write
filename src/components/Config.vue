<script setup lang="ts">
    import sounds from "@/assets/sounds.json";
    import { SettingsIcon } from "lucide-vue-next";
    import { getDefaultSettings } from "@/functions/utils.ts";
    import { Settings } from "@/models/Settings.ts";
    import ConfigFont from "@/components/ConfigFont.vue";
    import ConfigTheme from "@/components/ConfigTheme.vue";
    import ConfigSound from "@/components/ConfigSound.vue";
    import InputCheckbox from "@/components/InputCheckbox.vue";
    import InputNumberUnit from "@/components/InputNumberUnit.vue";

    const settings = defineModel<Settings>({
        required: true
    });

    function backToSplash() {
        settings.value.showStartScreen = true;
    }

    function resetSettings() {
        settings.value = getDefaultSettings();
    }
</script>

<template>
    <div>
        <button onclick="configDialog.showModal()" class="btn btn-info btn-soft btn-circle">
            <settings-icon/>
        </button>

        <dialog id="configDialog" class="modal">
            <div class="modal-box grid gap-2">
                <!-- writing goal -->
                <fieldset class="fieldset flex gap-4">
                    <legend class="fieldset-legend">
                        Writing goal
                    </legend>

                    <input-number-unit
                        v-model:value="settings.goal.count"
                        v-model:unit="settings.goal.unit"
                        :min="1"
                        :step="1"
                        :unit-list="['words', 'characters']"
                        :disabled="!settings.goal.enabled"
                    />

                    <input-checkbox v-model="settings.goal.enabled">
                        Enabled
                    </input-checkbox>
                </fieldset>

                <config-theme
                    v-model="settings.theme"
                />

                <config-font
                    v-model="settings.font"
                />

                <config-sound
                    v-model="settings.typingSound"
                    :sounds="sounds.typing"
                />

                <fieldset class="fieldset flex gap-4">
                    <legend class="fieldset-legend">
                        Misc
                    </legend>

                    <input-checkbox v-model="settings.goal.showWordCount">
                        Word count
                    </input-checkbox>

                    <input-checkbox v-model="settings.showSandbox">
                        Sandbox
                    </input-checkbox>
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Actions</legend>
                    <div class="flex gap-2">
                        <button @click="backToSplash" class="btn btn-warning btn-outline btn-sm">
                            Back to splash screen
                        </button>
                        <button @click="resetSettings" class="btn btn-error btn-outline btn-sm">
                            Reset all settings
                        </button>
                    </div>
                </fieldset>

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