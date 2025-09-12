<script setup lang="ts">
    const unit = defineModel<string>('unit');
    const value = defineModel<number>('value');

    const {unitList, disabled} = defineProps<{
        unitList?: string[]
        disabled?: boolean
        step?: number
        min?: number
        max?: number
    }>();
</script>

<template>
    <span class="inline-flex border border-secondary rounded">
        <input
            style="appearance: textfield"
            type="number"
            :min
            :max
            :step
            class="input input-sm border-0 focus:outline-0 h-[30px] grow"
            :disabled
            v-model="value"
        />

        <select v-if="unitList && unitList.length" :disabled class="select select-sm w-auto text-end border-0 focus:outline-0 pe-8 h-[30px] bg-secondary/15 focus:bg-secondary focus:text-secondary-content rounded-none">
            <option v-for="item in unitList" :value="item">{{ item }}</option>
        </select>

        <span v-else-if="unit" class="px-6 py-1.5 text-end h-[30px] bg-secondary/15 select-none">
            {{ unit }}
        </span>
    </span>
</template>