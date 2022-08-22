<template>
    <div
        class="w-full fixed bottom-0 z-50 left-0 px-0 py-2 flex justify-center items-center"
        :class="{ hidden: !isOnHomePage }"
    >
        <div class="w-full md:w-2/3 lg:w-3/5 px-2 py-4 rounded-3xl">
            <div
                class="relative mb-2 flex justify-center items-stretch space-x-2 text-gray-600 focus-within:text-gray-800"
            >
                <div class="relative w-full">
                    <input
                        class="w-full shadow-xl rounded-2xl border-4 border-primary-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                        :class="{
                            'border-warning-500 focus:ring-warning-500':
                                formIsInvalid,
                        }"
                        type="phone"
                        id="phone"
                        name="phoneInput"
                        ref="phoneInputRef"
                        autocorrect="off"
                        v-model="v$.phone.$model"
                        placeholder="555-555-1234"
                        v-on:keydown.enter="preregWithPhone"
                    />
                    <CircleLoader
                        v-if="formInputLoading"
                        width="20"
                        height="20"
                        fill="#ccc"
                        class="absolute left-0 top-1/2 -mt-2 ml-5"
                    ></CircleLoader>
                    <CheckCircleIcon
                        v-if="!formIsInvalid && v$.phone.$dirty"
                        class="pointer-events-none absolute right-0 top-1/2 -mt-4 mr-5 h-8 w-8 text-primary-600"
                    ></CheckCircleIcon>
                    <ExclamationCircleIcon
                        v-if="v$.phone.$invalid"
                        class="pointer-events-none absolute right-0 top-1/2 -mt-4 mr-5 h-8 w-8 text-warning-500"
                    ></ExclamationCircleIcon>
                </div>

                <div v-auto-animate class="buttons flex items-stretch">
                    <PrimaryButton
                        class="shadow-xl px-3"
                        :disabled="formIsInvalid || !v$.phone.$dirty"
                        @click="preregWithPhone"
                    >
                        <ArrowRightIcon
                            class="w-6 h-6 fill-white"
                        ></ArrowRightIcon>
                    </PrimaryButton>
                </div>
            </div>

            <div v-auto-animate class="flex w-full flex-col space-y-1">
                <ErrorMessage
                    v-for="error in v$.phone.$silentErrors"
                    :key="error.$uid"
                    :error="error"
                    class="shadow-xl"
                />
                <SuccessInputMessage
                    v-if="!v$.phone.$invalid && v$.phone.$dirty"
                    :message="'That\'s a good lookin handle!'"
                    class="shadow-xl"
                ></SuccessInputMessage>
            </div>
        </div>
    </div>
</template>
<script setup>
/*
IMPORTS
 */
import { computed, onMounted, ref, watch } from "vue";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ArrowRightIcon,
} from "@heroicons/vue/solid";
import { usePreReg } from "~/composables/prereg";
import { vAutoAnimate } from "~/directives/directives";
const route = useRoute();
const isOnHomePage = computed(
    () => route.fullPath === "/pre-registration-tonto" || route.fullPath === "/pre-registration-tonto/"
);

const { preregData } = usePreReg();

const phoneInputRef = ref(null);
const formInputLoading = ref(true);

// VALIDATION

const requiredNameLength = ref(2);
const requiredNameMaxLength = ref(25);
const rules = computed(() => ({
    phone: {
        $lazy: true,
        required,
        minLength: minLength(requiredNameLength.value),
        maxLength: maxLength(requiredNameMaxLength.value),
    },
}));
const v$ = useVuelidate(rules, preregData);

const formIsInvalid = computed(() => {
    return v$.value.phone.$invalid;
});

/*
WATCH
 */

watch(
    () => preregData.value.phone,
    (newVal) => {
        console.log("formatting phone: ", preregData.value.phone);
        preregData.value.phone = preregData.value.phone.replaceAll(
            /\s|[^0-9]/gi,
            ""
        );
        preregData.value.phone = preregData.value.phone.trim();
    }
);

// METHODS

const preregWithPhone = () => {
    if (v$.value.phone.$invalid) return null;
    return navigateTo({
        path: "/pre-registration-tonto/step-2/",
    });
};

/*
ON MOUNTED
 */

onMounted(async () => {
    console.log("prereg data: ", preregData.value.phone);
    // phoneInputRef.value.focus();
    if (preregData.value.phone && preregData.value.phone.length > 1) {
        await v$.value.phone.$validate();
    } else {
        formInputLoading.value = false;
    }
});
</script>
