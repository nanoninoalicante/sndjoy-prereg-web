<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import FloatingPreRegister from "~/components/FloatingPreRegister";
import PrimarySection from "~/components/PrimarySection";
import PageSection from "~/components/PageSection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import { useLayoutContent } from "~/composables/layoutContent";
import { useFloatingInput } from "~/composables/floatingInput";
const route = useRoute();
const { showFloatingForm } = useFloatingInput();
const { filteredWalkthroughScreens } = useLayoutContent();
const scrollToTop = () => {
    console.log("scroll to top: ");
    page.scroll({ top: 0, left: 0, behavior: "smooth" });
};
watch(route, () => {
    console.log("route change");
    scrollToTop();
});
</script>
<template>
    <PrimaryPageHolder id="primaryPageHolder">
        <FloatingPrimaryLogoHolder></FloatingPrimaryLogoHolder>
        <FloatingPreRegister
            v-if="showFloatingForm"
            class="fixed md:hidden"
        ></FloatingPreRegister>

        <PageSection
            class="flex md:fixed md:right-0 md:top-0 lg:px-20 justify-center items-center"
        >
            <slot></slot>
        </PageSection>
        <PrimarySection
            v-for="(screen, index) in filteredWalkthroughScreens"
            :key="index"
        >
            <FullPageWalkThrough>{{ screen.text }}</FullPageWalkThrough>
            <template v-slot:bgimage>
                <img
                    class="absolute hidden md:block pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :src="'/' + screen.image"
                    alt=""
                />
                <img
                    class="absolute block md:hidden pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :src="'/' + screen.mobileImage"
                    alt=""
                />
            </template>
        </PrimarySection>
        <PrimarySection ref="lastSection" class="block md:hidden">
            <FullPageWalkThrough class="text-gray-700 text-[3rem]"
                >PRE<br />REGISTER NOW</FullPageWalkThrough
            >
        </PrimarySection>
    </PrimaryPageHolder>
</template>
