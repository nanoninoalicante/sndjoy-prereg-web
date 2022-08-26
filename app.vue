<template>
    <div id="container" ref="el">
        <MetaTags />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<script setup>
import MetaTags from "./components/MetaTags";
definePageMeta({
    transition: {
        name: "page",
    },
});
</script>

<style>
body {
    background-color: #ffffff;
}
.bcustom {
    border: 1px solid red;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.list-enter-active,
.list-leave-active {
    transition: all 0.8s ease-in;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
/* "page" is hardcoded in nuxt3 page transitions atm */
.page-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.page-enter-active,
.page-leave-active {
    transition: all 0.3s;
}
.page-enter,
.page-leave-to {
    opacity: 0;
}
.layout-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.2s;
}
.layout-enter,
.layout-leave-to {
    opacity: 0;
}
</style>
