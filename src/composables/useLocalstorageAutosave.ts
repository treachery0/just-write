import { ref, Ref } from "vue";
import { useLocalstorageRef } from "@/composables/useLocalstorageRef.ts";
import { useAutosave } from "@/composables/useAutosave.ts";

export function useLocalstorageAutosave<T>(key: string, getDefaultValue: () => T, frequency: Ref<number> | undefined = undefined) {
    frequency ??= ref(0);

    const {reference, saveValue, discardValue} = useLocalstorageRef(key, getDefaultValue);
    const {state, save} = useAutosave(reference, frequency, saveValue);

    return {
        reference,
        state,
        save,
        discard: discardValue
    };
}