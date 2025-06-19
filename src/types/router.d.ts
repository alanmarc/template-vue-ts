import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;
    requiresAuth?: boolean;
    requiredRoles?: string[];
    layout?: string;
  }
}
