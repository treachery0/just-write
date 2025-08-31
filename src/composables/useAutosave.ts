import { Ref, ComputedRef, onMounted, onUnmounted, readonly, ref, watch } from "vue";

export function useAutosave<T, TReturn = any>(reference: Ref<T> | ComputedRef<T>, frequency: Ref<number>, callback: (value: T) => TReturn | Promise<TReturn>): Autosave<TReturn> {
    const state: Ref<SaveState> = ref<SaveState>(SaveState.resolved);
    let intervalId: number | undefined;

    onMounted(() => {
        restartInterval();
    })

    onUnmounted(() => {
        clearInterval(intervalId);
    });

    watch(reference, async (): Promise<void> => {
        state.value = SaveState.waiting;

        if(frequency.value === 0) {
            await save();
        }
    }, {deep: true});

    watch(frequency, async (): Promise<void> => {
        restartInterval();

        if(frequency.value === 0) {
            await save();
        }
    });

    function restartInterval(): void {
        clearInterval(intervalId);

        if(frequency.value > 0) {
            intervalId = setInterval(save, frequency.value);
        }
    }

    async function save(): Promise<TReturn | undefined> {
        if(state.value !== SaveState.waiting) {
            return undefined;
        }

        state.value = SaveState.pending;

        const result: TReturn = await callback(reference.value);

        state.value = SaveState.resolved;

        return result;
    }

    return {
        state: readonly(state),
        save
    };
}

export enum SaveState {
    pending = 0,
    resolved = 1,
    waiting = 2
}

export interface Autosave<TReturn> {
    state: Readonly<Ref<SaveState>>
    save: () => Promise<TReturn | undefined>
}