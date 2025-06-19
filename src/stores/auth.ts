import { defineStore } from "pinia";
import { ref } from "vue";
import type { LoginResponse, RegisterResponse, User } from "@/types/auth";
import router from "@/router";

const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isAuthenticated = ref(false);

  // Tipos para TypeScript
  interface LoginPayload {
    email: string;
    password: string;
  }

  interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }

  // Acciones
  async function login(payload: LoginPayload) {
    try {
      // Aquí iría tu llamada API real
      const response = await mockLogin(payload);

      user.value = response.user;
      token.value = response.token;
      isAuthenticated.value = true;

      return true;
    } catch (error) {
      resetAuth();
      throw error;
    }
  }

  async function register(payload: RegisterPayload) {
    try {
      // Aquí iría tu llamada API real
      const response = await mockRegister(payload);
      return response;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    resetAuth();
    router.push({ name: "login" });
  }

  function resetAuth() {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
  }

  // Mock functions para ejemplo
  async function mockLogin(payload: LoginPayload): Promise<LoginResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            name: "Admin User",
            email: payload.email,
            roles: ["admin"],
          },
          token: "fake-jwt-token",
        });
      }, 500);
    });
  }

  async function mockRegister(
    payload: RegisterPayload
  ): Promise<RegisterResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Registration successful",
        });
      }, 500);
    });
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    resetAuth,
  };
});

export default useAuthStore;
