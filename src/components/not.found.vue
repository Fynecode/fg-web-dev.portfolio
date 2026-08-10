<script setup>
    const props = defineProps({
        msg: String
    })
</script>

<template>
    <div class="not-found-card">
        <div class="not-found-badge">404</div>
        <div class="not-found-content">
            <p class="not-found-title">Nothing to show here yet</p>
            <p class="not-found-message">{{ msg }}</p>
        </div>
    </div>
</template>

<style scoped>
    .not-found-card {
        width: 100%;
        min-height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 2rem 1.5rem;
        border: 1px solid var(--border);
        border-radius: 1rem;
        background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(242,247,255,0.95));
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        text-align: center;
    }

    .not-found-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 84px;
        height: 84px;
        border-radius: 999px;
        border: 2px dashed var(--secondary);
        color: var(--secondary);
        font-size: 1.75rem;
        font-weight: 700;
        font-family: var(--paragraph-font);
    }

    .not-found-content {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .not-found-title {
        color: var(--text1);
        font-size: 1.1rem;
        font-weight: 600;
        font-family: var(--paragraph-font);
    }

    .not-found-message {
        color: var(--text2);
        font-size: 0.95rem;
        line-height: 1.6;
        font-family: var(--paragraph-font);
    }
</style>