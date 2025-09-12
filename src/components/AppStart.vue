<script setup lang="ts">
    const visible = defineModel<boolean>({
        required: true
    });

    function close() {
        window.close();
    }

    function ok() {
        visible.value = false;
    }
</script>

<template>
    <div class="h-full relative overflow-y-auto flex flex-col justify-center items-center">
        <h1 class="px-4 py-1 select-none text-8xl font-marker text-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-pink-400">
            Just Write!
        </h1>
        <h2 class="text-center text-sm italic opacity-70">
            Inspired by
            <a href="https://thatclowngoddess.itch.io/stimuwrite" target="_blank" class="link">StimuWrite</a>
        </h2>
        <div class="flex flex-col gap-12 py-16 px-8 md:w-[720px] md:flex-row items-center">
            <div class="text-xl font-medium">
                Stop outlining, stop researching, stop scrolling social media for inspiration. Your first draft will suck anyways. So gather around your 3 brain cells around and tell the voices to shut the fuck up. Just write.
            </div>
            <div class="flex flex-col gap-4 w-full">
                <button @click="close" class="btn btn-error btn-outline text-nowrap">
                    Nah, I'm going back to procrastinate
                </button>
                <button @click="ok" class="btn btn-success py-8 text-nowrap">
                    Guess I'll type some shit
                </button>
            </div>
        </div>
    </div>
</template>