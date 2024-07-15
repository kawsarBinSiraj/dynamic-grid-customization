<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isDragging = ref(false);
const splitterGap = ref(5);
const minGridRatio = ref(50);
let startX, initialX;

const draggable = ref(null);
const container = ref(null);
const grid = ref(null);

const onMouseMove = (e) => {
    if (!isDragging.value) return;

    const deltaX = e.clientX - startX;
    let newLeft = initialX + deltaX;
    const containerRect = container.value.getBoundingClientRect();
    const containerOffsetX = containerRect.left;

    // Restrict movement within the container
    const maxLeft = container.value.clientWidth - draggable.value.clientWidth;
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    const leftGridWidth = newLeft - splitterGap.value * 1.5;

    // prevent over dragging
    if (
        leftGridWidth <= minGridRatio.value ||
        leftGridWidth >= containerRect.width - minGridRatio.value
    ) {
        isDragging.value = false;
        return;
    }

    draggable.value.style.left = newLeft + "px";
    container.value.style.setProperty("--left-w", leftGridWidth + "px");
};

const onMouseUp = () => {
    isDragging.value = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
};

onMounted(() => {
    if (draggable.value) {
        draggable.value.addEventListener("mousedown", (e) => {
            isDragging.value = true;
            startX = e.clientX;
            initialX = draggable.value.offsetLeft;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    }
});

onUnmounted(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
});
</script>

<template>
    <div
        class="vertical-grid-container"
        style="--left-w: 1fr; --right-w: 1fr"
        :style="'--grid-gap:' + splitterGap + 'px'"
        ref="container"
    >
        <div
            ref="draggable"
            class="vertical-draggable"
            style="cursor: ew-resize"
        >
            &#x7c;
        </div>
        <div class="vertical-grid" ref="grid">
            <div class="vertical-grid-item">
                <div class="grid-content">
                    <p>
                        Nuxt is an open source framework that makes web
                        development intuitive and powerful. Create performant
                        and production-grade full-stack web apps and websites
                        with confidence.
                    </p>
                </div>
            </div>
            <div class="vertical-grid-item grid-splitter"></div>
            <div class="vertical-grid-item">
                <HorizontalGridDivisor />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.vertical-grid-container {
    --grid-box-h: 400px;
    height: var(--grid-box-h);
    position: relative;

    > .vertical-draggable {
        height: 100%;
        position: absolute;
        cursor: pointer;
        z-index: 100;
        left: 50%;
        transform: translateX(-50%);
        opacity: 1;
        display: grid;
        place-items: center;
        padding-left: 0.1rem;
    }

    > .vertical-grid {
        display: grid;
        grid-template-columns: var(--left-w) var(--grid-gap) var(--right-w);
        grid-template-rows: auto;
        height: 100%;
        grid-gap: var(--grid-gap);
        position: relative;

        > .vertical-grid-item {
            background-color: #fff;
            border: 0.1rem solid #ddd;
            position: relative;
            border-radius: 4px;

            &.grid-splitter {
                padding: 0;
            }

            &:has(.horizontal-grid-item) {
                border: 0 !important;
                background-color: transparent !important;
            }
        }
    }
}
</style>
