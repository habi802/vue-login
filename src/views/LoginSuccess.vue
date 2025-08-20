<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    console.log('제대로 불러옴');
    if (route.query.memberId) {
        window.opener.postMessage({
            type: 'LOGIN_SUCCESS',
            memberId: route.query.memberId
        }, 'http://localhost:5173');
        window.close();
    }
});
</script>

<template>

</template>

<style scoped>
template {
    background-color: white;
}
</style>