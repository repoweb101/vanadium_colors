<template>

<div
    v-bind:class="[
        'relative group w-full max-w-[300px] h-[300px] mx-auto h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ' + 
        'overflow-hidden',
        is_dragging ? 'border-shadow-light bg-shadow-light/10 scale-[1.02]' : 'border-background-light bg-background-dark hover:border-shadow-light hover:bg-shadow-dark'
    ]"
    v-on:dragover="onDragOver($event)"
    v-on:dragleave="onDragLeave($event)"
    v-on:drop="onDrop($event)"
>
    <input type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        v-on:change="onInputChange($event)"
    />

    <div class="flex flex-col items-center space-y-4 pointer-events-none p-6 text-center">

        <div 
            v-bind:class="['p-4 rounded-full bg-background-light transition-transform duration-300', is_dragging ? 'scale-110 bg-shadow-dark/20' : '']"
        >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-text-dark">

                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18
                    3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0
                    .375.375 0 0 1 .75 0Z"
                />

            </svg>

        </div>

        <div class="space-y-1">

            <p class="text-lg font-medium text-text-dark">
                Drop your image here
            </p>

            <p class="text-sm text-text-light">
                or click to browse from your device
            </p>

        </div>

    </div>

</div>

</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits([
    'image_selected',
]);

const is_dragging = ref(false);

const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        emit('image_selected', url);
        /*const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target?.result) {
                emit('image_selected', e.target.result);
            }
        };

        reader.readAsDataURL(file);*/
    }
};

const onDragOver = (e) => {
    e.preventDefault();
    is_dragging.value = true;
};

const onDragLeave = (e) => {
    e.preventDefault();
    is_dragging.value = false;
};

const onDrop = (e) => {
    e.preventDefault();
    is_dragging.value = false;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
    }
};

const onInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
    }
};
</script>