<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Dashboard</h1>
        <p>Bienvenido {{ authStore.user?.name }}</p>

        <v-btn color="error" @click="authStore.logout" class="mt-4">
          Cerrar sesión
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useAuthStore from "@/stores/auth";

const authStore = useAuthStore();
</script>
