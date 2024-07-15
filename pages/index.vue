
<template>
    <div id="home-page">
        <div class="container">
            <page-header />
            <vertical-grid-divisor />
            <p class="mb-0">
                &#169; Design & developed by
                <a target="_blank" href="https://kawsarbinsiraj.github.io/"
                    >kawsar bin siraj</a
                >
            </p>
        </div>
    </div>
</template>


<style lang="scss">
body {
    padding: 0;
    margin: 0;
    background-color: #f1f0f0;
    --container-w: 1000px;
    padding-top: 25px;
    padding-bottom: 25px;
}

.container {
    max-width: var(--container-w);
    width: 100%;
    margin: auto;
    padding: 0;
    position: relative;
}

.grid-content {
    font-size: 16px;
    width: 100%;
    overflow-x: hidden;
    color: #1003037f;
    padding: 20px;

    * {
        margin: 0;
    }
}
</style>