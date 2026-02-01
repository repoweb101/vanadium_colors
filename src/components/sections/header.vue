<template>

<section class="flex flex-col gap-y-6 max-w-[1700px] w-full items-center">

    <nav class="w-full text-text-dark bg-linear-to-b from-background-light to-background-dark shadow-md shadow-black">

        <div class="w-full h-full flex flex-row flex-wrap items-center justify-between">

            <a href="/" class="flex flex-row items-center px-2 py-4 space-x-2 rtl:space-x-reverse hover:bg-shadow-dark/50">

                <img src="../../assets/favicon.svg" class="h-8" alt="Vanadium color app Logo" />

                <span class="self-center text-2xl font-semibold">Vanadium Colors</span>

            </a>

            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 mx-4 w-10 h-10 justify-center text-base rounded-lg shadow-sm shadow-sahdow-dark/40
                md:hidden hover:bg-background-light focus:outline-none focus:ring-2 focus:ring-shadow-dark" aria-controls="navbar-default" aria-expanded="false"
            >

                <span class="text-2xl font-bold">&#9776;</span>
                            
            </button>

            <ul class="hidden md:flex md:flex-row md:justify-end font-medium rounded-lg md:border-none md:space-x-4 md:mx-4">

                <template  v-for="element in elements">

                    <li class="md:flex md:justify-center md:items-center min-w-[150px] hover:bg-shadow-dark">

                        <a class="p-2 text-text-light" aria-current="page"
                            v-bind:href="element.url"
                            v-bind:aria-current="element.selected === true ? 'page' : ''"
                            v-on:click="selectNavbarElement(index)"
                            v-text="element.label"
                        ></a>

                    </li>

                </template>

            </ul>

        </div>

    </nav>

    <div class="flex flex-col w-full items-center px-4 pt-6">

        <h1 class="text-2xl sm:text-3xl md:text-5xl font-bold text-text-light mb-2">Vanadium Colors</h1>

        <p class="text-text-dark text-sm">Discover your color palette instantly. Check all our options bellow <span class="text-3xl font-bold text-text-light mb-2">&#11085;</span></p>

    </div>

</section>

</template>

<script setup>
import { ref } from 'vue';

const elements = ref([
    {
        label: 'Home',
        selected: true,
        url: '/',
    },
    {
        label: 'Color contrast checker',
        selected: false,
        url: '#vanadiumapp',
    },
]);

function selectNavbarElement(index) {
    for (let i = 0; i < this.elements.length; i++) {
        if (i === index) {
            this.elements[i].selected = ! this.elements[i].selected;
        } else {
            this.elements[i].selected = false;
        }
    }
}
</script>