<script setup lang="ts">
    const value = defineModel<number>();

    const {unit} = defineProps<{
        unit?: string
    }>();

    defineOptions({
        inheritAttrs: false
    });
</script>

<template>
    <span class="inline-flex gap-1 items-center">
        <input
            type="range"
            class="range range-xs range-secondary peer"
            v-model="value"
            v-bind="$attrs"
        />

        <span class="w-16 font-bold peer-disabled:opacity-30 select-none">
            {{ value }}{{ unit }}
        </span>
    </span>
</template>