<template>

<footer class="flex flex-col md:flex-row gap-y-6 min-w-[320px] max-w-[1700px] w-full items-between justify-between bg-linear-to-b from-background-dark to-background-light
                inset-shadow-sm inset-shadow-shadow-light px-12 pt-6 pb-24">

    <div class="flex flex-row items-center justify-items-center">

        <img src="../../assets/favicon.svg" alt="image of Vanadium Colors logo" width="80" height="80">

        <div class="flex flex-col items-start gap-2">

            <p class="text-xs sm:text-sm text-text-light">WCAG 2.1 Compliant Palette Engine</p>

            <p class="text-xs sm:text-sm text-text-light">©{{ new Date().getFullYear() }} By Repowebteam. All rights reserved.</p>

        </div>

    </div>

    <div class="flex flex-row items-center justify-start md:justify-between gap-6 min-w-[300px]">

        <p class="text-xs sm:text-sm text-text-light">Check out our GitHub repo here! &#8658; </p>

        <a href="#"><img src="../../assets/github_logo_dark_mode.svg" alt="image of Vanadium Colors logo" width="40" height="40"></a>

    </div>

</footer>

</template>