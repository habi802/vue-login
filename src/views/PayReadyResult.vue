<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    console.log('페이 제대로 불러옴');
    let type = '';
    let message = '';
    let data = {};

    if (!route.query.result) {
        type = 'PAY_FAIL';
        message = '결제 중 에러가 발생했습니다.';
    } else {
        const result = route.query.result
        if (result === 'APPROVE') {
            type = 'PAY_APPROVE';
            message = '결제 승인됨';
            data = {
                orderId: route.query.order_id,
                pgToken: route.query.pg_token
            };
        } else if (result === 'FAIL') {
            type = 'PAY_FAIL';
            message = '결제 중 에러가 발생했습니다.';
        } else if (result === 'CANCEL') {
            type = 'PAY_CANCEL';
            message = '결제를 취소했습니다.';
        }
    }
    window.opener.postMessage({
        type: type,
        resultMessage: message,
        resultData: data
    }, 'http://localhost:5173');
    window.close();
});
</script>

<template>

</template>

<style scoped>
template {
    background-color: white;
}
</style>