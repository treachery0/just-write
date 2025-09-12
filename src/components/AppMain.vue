<script setup lang="ts">
    import { computed } from "vue";
    import { useLocalStorage } from "@vueuse/core";
    import { useRepeatingAudio } from "@/composables/useRepeatingAudio.ts";
    import { LockIcon, LockOpenIcon } from "lucide-vue-next";
    import { Settings } from "@/models/Settings.ts";
    import Config from "@/components/Config.vue";
    import StatusGoal from "@/components/StatusGoal.vue";
    import InputTextarea from "@/components/InputTextarea.vue";

    const settings = defineModel<Settings>({
        required: true
    });

    const text = useLocalStorage<string>(
        'jw-text',
        ''
    );

    const header = useLocalStorage(
        'jw-header',
        {
            text: '',
            locked: false
        }
    );

    const inputAudio = useRepeatingAudio(computed(() => {
        return settings.value.typingSound;
    }));
</script>

<template>
    <main class="h-full relative overflow-y-auto bg-base-300" :data-theme="settings.theme">
        <div class="p-8 max-w-5xl mx-auto flex flex-col justify-center min-h-full mb-16">
            <div v-if="settings.showSandbox" class="relative">
                <input-textarea
                    v-model="header.text"
                    class="textarea-accent text-base-content/60 mb-8"
                    placeholder="Place anything extra here..."
                    :font="settings.font"
                    :disabled="header.locked"
                    :rows="1"
                />

                <button class="absolute p-3 top-0 right-0" @click="header.locked = !header.locked">
                    <lock-icon v-if="header.locked" class="size-4 text-error"/>
                    <lock-open-icon v-else class="size-4 text-base-content/60"/>
                </button>
            </div>

            <input-textarea
                v-model="text"
                class="textarea-primary"
                placeholder="Write here..."
                :font="settings.font"
                :rows="5"
                @input="inputAudio.play()"
            />
            <status-goal
                class="mt-2"
                :settings="settings"
                :text="text"
            />
        </div>
        <config
            v-model="settings"
            class="fixed right-4 bottom-4"
        />
    </main>
</template>