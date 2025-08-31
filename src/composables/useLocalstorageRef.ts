import { ref, Ref } from 'vue';

export function useLocalstorageRef<T>(key: string, getDefaultValue: () => T) {
    const reference: Ref<T> = initialize();

    function save(value: T): void {
        if(value === undefined) {
            localStorage.removeItem(key);
            return;
        }

        try {
            const serializedValue: string = JSON.stringify(value);

            localStorage.setItem(key, serializedValue);
        }
        catch(error) {
            console.warn(`Failed to save "${key}" to localstorage.`, error);
        }
    }

    function load(): T {
        try {
            const serializedValue: string | null = localStorage.getItem(key);

            if (serializedValue === null) {
                const defaultValue: T = getDefaultValue();

                save(defaultValue);

                return defaultValue;
            }

            return JSON.parse(serializedValue);
        }
        catch(error) {
            console.warn(`Failed to load key "${key}" from localstorage, using default value.`, error);
            return getDefaultValue();
        }
    }

    function initialize(): Ref<T> {
        let value: T = load();

        return ref(value) as Ref<T>;
    }

    function saveValue(): void {
        save(reference.value);
    }

    function discardValue(): void {
        reference.value = load();
    }

    return {
        reference,
        saveValue,
        discardValue
    };
}