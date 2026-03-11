<script setup>
import sidebar from './sidebar.vue'
import { useAdminStore } from '@/stores/user';

const adminStore = useAdminStore()
const user = adminStore.user
</script>

<template>
  <div class="nav-bars">
    <sidebar :user="user" />
  </div>
</template>

<style scoped>
</style>
