import useAuthStore from "@/stores/auth";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

// Define los tipos para las meta propiedades
declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;
    requiresAuth?: boolean;
    requiredRoles?: string[];
    layout?: string;
  }
}

// Vistas
const LoginView = () => import("@/views/LoginView.vue");
const RegisterView = () => import("@/views/RegisterView.vue");
const HomeView = () => import("@/views/HomeView.vue");
const UsersView = () => import("@/views/UsersView.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { public: true, layout: "AuthLayout" },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { public: true, layout: "AuthLayout" },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    meta: { requiresAuth: true, requiredRoles: ["admin"] },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard de navegación global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "login", query: { redirect: to.fullPath } });
  }

  // Verificar si el usuario tiene los roles necesarios
  if (to.meta.requiredRoles) {
    const userRoles = authStore.user?.roles || [];
    const hasRequiredRole = to.meta.requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return next({ name: "dashboard" }); // O una página de "no autorizado"
    }
  }

  // Redirigir usuarios autenticados lejos de páginas públicas
  if (to.meta.public && authStore.isAuthenticated) {
    return next(from.fullPath || "/dashboard");
  }

  next();
});

export default router;
