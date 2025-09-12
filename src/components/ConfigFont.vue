<script setup lang="ts">
    import fonts from "@/assets/fonts.json";
    import { ChevronUpIcon, ChevronDownIcon } from "lucide-vue-next";
    import { FontOptions } from "@/models/FontOptions.ts";
    import InputRange from "@/components/InputRange.vue";

    const currentFont = defineModel<FontOptions>({
        required: true
    });

    function decreaseSize() {
        if(!currentFont.value) {
            return;
        }

        if(currentFont.value.size > fonts.minimumSize) {
            currentFont.value.size--;
        }
    }

    function increaseSize() {
        if(!currentFont.value) {
            return;
        }

        if(currentFont.value.size < fonts.maximumSize) {
            currentFont.value.size++;
        }
    }
</script>

<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Font</legend>
        <div class="flex items-center">
            <select v-model="currentFont.name" class="select select-secondary select-sm me-4">
                <option :value="undefined">Default</option>
                <option v-for="font in fonts.availableFonts" :value="font">{{ font.split('.')[0] }}</option>
            </select>

            <div class="size-8 rounded-full aspect-square me-2 grid grid-rows-2 overflow-clip btn-soft btn btn-xs">
                <button class="flex justify-center" @click="increaseSize">
                    <chevron-up-icon :size="16"/>
                </button>
                <button class="flex justify-center" @click="decreaseSize">
                    <chevron-down-icon :size="16"/>
                </button>
            </div>

            <input-range
                :min="fonts.minimumSize"
                :max="fonts.maximumSize"
                unit="px"
                v-model="currentFont.size"
            />
        </div>
    </fieldset>
</template>