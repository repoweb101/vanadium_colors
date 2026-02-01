<template>

<button class="relative flex flex-col items-center justify-center p-4 bg-[conic-gradient(from_90deg_at_50%_-10%,theme(colors.accent-dark),theme(colors.accent-light),theme(colors.accent-dark))]
                hover:bg-[conic-gradient(from_90deg_at_50%_-10%,theme(colors.accent-light),theme(colors.accent-dark),theme(colors.accent-light))] rounded-xl
                hover:shadow-md transition-all group hover:scale-105 text-background-dark"
    v-on:click="generate()"
>
    <span class="text-sm font-semibold">{{ label }}</span>

    <div class="absolute bottom-full mb-2 px-3 py-1.5 text-xs font-medium text-slate-50 bg-slate-950 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-opacity whitespace-nowrap z-10 pointer-events-none"
    >
        <p>{{ tooltip }}</p>

        <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>

    </div>

</button>

</template>

<script setup>
const props = defineProps({
    label: String,
    tooltip: String
});

const emit = defineEmits([
    'generatePalette',
]);

const generate = () => {
    emit('generatePalette', props.label);
};
</script>