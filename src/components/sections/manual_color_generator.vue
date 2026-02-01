<template>

<div class="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full mb-10">

    <div class="mb-6">

        <h2 class="text-lg font-bold text-text-light mb-2 px-4">Manual Selection:</h2>

        <p class="text-text-dark/70 text-sm px-4">Generate a custom color palette one color at time, add more colors to a previously modified palette (maximun of 5 total colors).</p>

    </div>

    <button class="flex flex-row content-between items-center bg-[conic-gradient(from_90deg_at_50%_-10%,theme(colors.accent-dark),theme(colors.accent-light),theme(colors.accent-dark))]
                hover:bg-[conic-gradient(from_90deg_at_50%_-10%,theme(colors.accent-light),theme(colors.accent-dark),theme(colors.accent-light))] text-background-dark font-bold py-2 p-4 mx-4
                rounded-xl"
        v-on:click="onclick_function()"    
    >
        
        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="45" width="60" height="10" rx="2" fill="currentColor" />
            <rect x="45" y="20" width="10" height="60" rx="2" fill="currentColor" />
        </svg> Add new color
    </button>

</div>

</template>

<script setup>

const props = defineProps({
    onclick_function: Function,
});

</script>