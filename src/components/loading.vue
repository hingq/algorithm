<template>
    <div class="loading"></div>
</template>

<style>
.loading {
    width: var(--radius);
    height: var(--radius);
    border: 2px solid #ccc;
    border-top-color: transparent;
    border-radius: 100%;
    display: none;
    animation: circle infinite 0.75s linear;
}


@keyframes circle {
    /*  转转转动画 */
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

