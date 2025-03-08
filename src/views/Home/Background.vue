<script setup>
</script>

<template>
    <div class="gradient-flow"></div>
</template>

<style lang="less" scoped>
.background {
    width: 100%;
    height: 500px;
    position: fixed;
    z-index: 1;
    
}

.gradient-flow {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    /* 背景图大小 */
    background-size: 200% 200%; /* 背景图大小 */
    background-image: linear-gradient(135deg, #ffdede83, #fff9c773, #b9f7ff81, #d2b9ff6a);
    animation: flow 5s ease infinite;
    background-attachment: fixed;
}

@keyframes flow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>