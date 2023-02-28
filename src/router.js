import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

const NotFound = () => import("./pages/NotFound.vue");

const CoachDetail = () => import("./pages/coaches/CoachDetail.vue");

import CoachList from "./pages/coaches/CoachesList.vue";
const CoachReg = () => import("./pages/coaches/CoachRegistration.vue");

const ContactCoach = () => import("./pages/requests/ContactCoach.vue");

// import RequestsReseived from "./pages/requests/RequestsReseived.vue";
const RequestsReseived = () => import("./pages/requests/RequestsReseived.vue");

const UserAuth = () => import("./pages/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        { path: "contact", component: ContactCoach }, // coaches/c1/contact
      ],
    },
    { path: "/register", component: CoachReg, meta: { needAuth: true } },
    {
      path: "/requests",
      component: RequestsReseived,
      meta: { needAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { needUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.needAuth && !store.getters.isAuth) {
    next("/auth");
  } else if (to.meta.needUnauth && store.getters.isAuth) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
