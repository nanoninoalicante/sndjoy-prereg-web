<template>
    <div class="w-full fixed bottom-0 z-50 left-0 px-0 py-2 flex justify-center items-center"
        :class="{ hidden: !isOnHomePage }">
        <div class="w-full md:w-2/3 lg:w-3/5 px-2 py-4 rounded-3xl bg-white">
            <div id="recaptcha-container"></div>
            <div
                class="relative mb-2 flex justify-center items-stretch space-x-2 text-gray-600 focus-within:text-gray-800">
                <div class="relative w-full">
                    <MazPhoneNumberInput list-position="top left" v-model="phoneNumber" show-code-on-list color="info"
                        @update="results = $event" :success="results?.isValid" />
                    <CircleLoader v-if="formInputLoading" width="20" height="20" fill="#ccc"
                        class="absolute left-0 top-1/2 -mt-2 ml-5"></CircleLoader>
                    <CheckCircleIcon v-if="formIsValid"
                        class="pointer-events-none absolute right-0 top-1/2 -mt-4 mr-5 h-8 w-8 text-primary-600">
                    </CheckCircleIcon>
                    <ExclamationCircleIcon v-if="!formIsValid"
                        class="pointer-events-none absolute right-0 top-1/2 -mt-4 mr-5 h-8 w-8 text-warning-500">
                    </ExclamationCircleIcon>
                </div>
                <div v-auto-animate class="buttons flex items-stretch">
                    <PrimaryButton class="shadow-xl px-3 py-2" :disabled="!formIsValid" @click="signIn">
                        <ArrowRightIcon class="w-6 h-6 fill-white"></ArrowRightIcon>
                    </PrimaryButton>
                </div>
            </div>

            <!-- <div v-auto-animate class="flex w-full flex-col space-y-1">
                <ErrorMessage v-for="error in v$.phone.$silentErrors" :key="error.$uid" :error="error"
                    class="shadow-xl" />
                <SuccessInputMessage v-if="!v$.phone.$invalid && v$.phone.$dirty"
                    :message="'That\'s a good lookin handle!'" class="shadow-xl"></SuccessInputMessage>
            </div> -->
        </div>
    </div>
</template>
<script setup>
/*
IMPORTS
 */
import { computed, onMounted, ref, watch, reactive } from "vue";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'

import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ArrowRightIcon,
} from "@heroicons/vue/solid";
import { usePreReg } from "~/composables/prereg";
import { vAutoAnimate } from "~/directives/directives";
import { initializeApp } from 'firebase/app'
import { signInWithPhoneNumber, getAuth, RecaptchaVerifier, signOut } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'

const app = initializeApp({
    apiKey: "AIzaSyCk6gp4cxuhDaOFVWMq58dIaDalwbJGOSQ",
    authDomain: "sndjoy-development.firebaseapp.com"
})
const auth = getAuth(app)
const { isAuthenticated, user } = useAuth(auth)

const phoneNumber = ref()
const results = ref()
const route = useRoute();
const isOnHomePage = computed(
    () => route.fullPath === "/pre-registration-tonto" || route.fullPath === "/pre-registration-tonto/"
);

const { preregData } = usePreReg();

const formInputLoading = ref(true);

const formIsValid = computed(() => {
    return results.value?.isValid || false;
});

/*
WATCH
 */

watch(phoneNumber,
    (newVal) => {
        console.log("formatting phone: ", results.value?.nationalNumber);
        console.log("formatting phone: ", results.value?.countryCallingCode);
        preregData.value.phone = results.value?.nationalNumber?.trim();
        preregData.value.countryCallingCode = results.value?.countryCallingCode?.trim();
    }
);

// METHODS

const preregWithPhone = () => {
    return navigateTo({
        path: "/pre-registration-tonto/step-2/",
    });
};

const confirmationResult = reactive({
    response: null
});
const verificationCode = ref(null);

const signIn = () => {
    console.log("signing in")
    if (!results.value?.e164) {
        console.log("missing phone number: ", results.value?.e164);
        return null;
    }
    return signInWithPhoneNumber(auth, results.value?.e164, window.recaptchaVerifier).then((confirmationResult) => {
        console.log("confirmationResult: ", confirmationResult);
        confirmationResult.response = confirmationResult;

        // ...
    }).catch((e) => {
        console.log("error sing in with popup: ", e.message);

    })
}

const submitVerificationCode = () => {
    return confirmationResult.confirm(verificationCode.value).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log("signed in: ", user);
        // ...
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
    });
}

/*
ON MOUNTED
 */

onMounted(async () => {
    // if (preregData.value?.phone) {
    //     phoneNumber.value = preregData.value?.phone;
    // }

    // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    //     'size': 'invisible',
    //     'callback': (response) => {
    //     }
    // }, auth);
});
</script>
<style>
.m-phone-number-input .m-input {
    height: 4rem !important;
}
</style>
