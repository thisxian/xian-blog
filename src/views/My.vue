<script setup lang="js">
const router = useRouter()

function back() {
    router.go(-1);
}
</script>

<template>
    <div class="">
        <p>my页</p>
        <button @click="back">返回</button>
    </div>
</template>

<style lang="less" scoped></style>