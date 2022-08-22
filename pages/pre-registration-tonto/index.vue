<template>
    <ChooseHandleForm
        ><h1
            class="text-left text-5xl font-bold tracking-tighter leading-[1.2em] text-grey-700 mb-12"
        >
            Are you ready for the next big thing in Social?
        </h1>
        <h1
            class="text-left text-5xl font-normal tracking-tighter leading-[1.1em] text-grey-700 mb-12"
        >
            Secure your Tonto username below👇
        </h1></ChooseHandleForm
    >
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import { usePostStore } from "../../stores/posts";

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
definePageMeta({
    layout: "pre-reg-v3"
});
</script>
