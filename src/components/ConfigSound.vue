<script setup lang="ts">
    import { computed } from "vue";
    import {Volume1, Volume2, VolumeX, VolumeOff} from "lucide-vue-next";
    import { SoundOptions } from "@/models/SoundOptions.ts";
    import { SoundGroup } from "@/models/SoundGroup.ts";
    import InputRange from "@/components/InputRange.vue";

    const {sounds} = defineProps<{
        sounds: SoundGroup
    }>();

    const currentSound = defineModel<SoundOptions>({
        required: true
    });

    function mute() {
        currentSound.value.muted = !currentSound.value.muted;
    }

    const volumeIcon = computed(() => {
       if (currentSound.value.muted) {
           return VolumeOff;
       }

       if (currentSound.value.volume < 1) {
           return VolumeX;
       }

       return currentSound.value.volume > 50 ? Volume2 : Volume1;
    });

    const volumeDisabled = computed(() => {
        return currentSound.value.path === undefined || currentSound.value.muted;
    });
</script>

<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Typing sound</legend>

        <div class="flex items-center">
            <select v-model="currentSound.path" class="select select-secondary me-4">
                <option :value="undefined">Off</option>
                <option v-for="sound in sounds.files" :value="sounds.baseDirectory + sound.path">{{ sound.name }}</option>
            </select>

            <button @click="mute" :disabled="currentSound.path === undefined" :class="{'text-error': currentSound.muted}" class="me-2 btn btn-circle btn-sm btn-soft">
                <component :is="volumeIcon" :size="18"/>
            </button>

            <input-range
                min="0"
                max="100"
                unit="%"
                :disabled="volumeDisabled"
                v-model="currentSound.volume"
            />
        </div>
    </fieldset>
</template>