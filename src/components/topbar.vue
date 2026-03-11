<script setup>
import { User } from 'lucide-vue-next';
</script>

<template>
    <div class="topbar fixed top-0 left-0 flex flex-row justify-end items-center w-screen min-h-5 px-2 pt-2 z-40">
        <div class="route">
            <ul>
                <li class="user-menu">
                    <User />
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .route{
        justify-self: end;
    }

    ul{
        list-style: none;
    }

    .user-menu {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: white;
        font-size: 10px;
    }

    svg{
        color: var(--secondary);
        transition: all 0.3s ;
    }

    svg:hover{
        color: white;
    }

    a{
        text-decoration: none;
        color: white;
    }

    #logout{
        color: rgb(250, 25, 25);
    }

    svg#logout:hover{
        color: red;
    }

</style>
