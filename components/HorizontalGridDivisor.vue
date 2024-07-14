<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isDragging = ref(false);
const splitterGap = ref(5);
const minGridRatio = ref(50);
let startY, initialY;

const draggable = ref(null);
const container = ref(null);
const grid = ref(null);

const onMouseMove = (e) => {
    if (!isDragging.value) return;

    const deltaY = e.clientY - startY;
    let newTop = initialY + deltaY;
    const containerRect = container.value.getBoundingClientRect();
    const containerOffsetY = containerRect.top;

    // Restrict movement within the container
    const maxTop = container.value.clientHeight - draggable.value.clientHeight;
    newTop = Math.max(0, Math.min(newTop, maxTop));
    const topGridHeight = newTop - splitterGap.value * 1.5;

    // prevent over dragging
    if (
        topGridHeight <= minGridRatio.value ||
        topGridHeight >= containerRect.height - minGridRatio.value
    ) {
        isDragging.value = false;
        return;
    }

    draggable.value.style.top = newTop + "px";
    grid.value.style.setProperty("--top-h", topGridHeight + "px");
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
            startY = e.clientY;
            initialY = draggable.value.offsetTop;
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
    <div class="horizontal-grid-container" ref="container">
        <div
            ref="draggable"
            class="horizontal-draggable"
            style="cursor: ns-resize"
        >
            &#8213;
        </div>
        <div
            class="horizontal-grid"
            ref="grid"
            style="--top-h: 1fr; --bottom-h: 1fr"
            :style="'--grid-gap:' + splitterGap + 'px'"
        >
            <div class="horizontal-grid-item">
                <div class="grid-content">
                    <p>
                        Nuxt is an open source framework that makes web
                        development intuitive and powerful. Create performant
                        and production-grade full-stack web apps and websites
                        with confidence. We love Vue Single-File Components as
                        much as you do. Simple, intuitive and powerful, Nuxt
                        lets you write Vue components in a way that makes sense.
                        Every repetitive task is automated, so you can focus on
                        writing your full-stack Vue application with confidence.
                    </p>
                </div>
            </div>
            <div class="horizontal-grid-item grid-splitter"></div>
            <div class="horizontal-grid-item"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.horizontal-grid-container {
    height: 100%;
    position: relative;

    > .horizontal-draggable {
        width: 100%;
        position: absolute;
        cursor: pointer;
        z-index: 100;
        top: 50%;
        transform: translateY(-50%);
        opacity: 1;
        display: grid;
        place-items: center;
        padding-bottom: 0.15rem;
    }

    > .horizontal-grid {
        display: grid;
        grid-template-rows: var(--top-h) var(--grid-gap) var(--bottom-h);
        height: 100%;
        grid-gap: var(--grid-gap);
        position: relative;

        > .horizontal-grid-item {
            background-color: #ffffff;
            border: 0.1rem solid #ddd;
            position: relative;
            border-radius: 4px;
            height: 100%;

            .grid-content {
                height: 184px;
            }

            &.grid-splitter {
                padding: 0;
            }
        }
    }
}
</style>
