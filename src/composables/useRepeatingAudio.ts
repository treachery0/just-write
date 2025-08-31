import { onMounted, watch, Ref } from "vue";
import { SoundOptions } from "@/models/SoundOptions.ts";

export function useRepeatingAudio(options: Ref<SoundOptions | undefined>) {
    let context: AudioContext = new AudioContext();
    let buffer: AudioBuffer | undefined;

    onMounted(async () => {
        await load(options.value?.path);
    })

    watch(() => options.value?.path, async () => {
        await load(options.value?.path);
    });

    async function load(url: string | undefined) {
        if (!url) {
            buffer = undefined;
            return;
        }

        try {
            buffer = await fetch(url)
                .then(res => res.arrayBuffer())
                .then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));
        }
        catch(e) {
            buffer = undefined;
            console.error(`Audio source at "${url}" does not exist`);
        }
    }

    function play() {
        if(!buffer || !options.value || options.value.muted || options.value.volume < 1) {
            return;
        }

        const gain = context.createGain();
        gain.gain.value = options.value.volume / 100;
        gain.connect(context.destination);

        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(gain);

        source.start();
    }

    return {
        play
    };
}