import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

import NotFound from "./pages/NotFound.vue";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachList from "./pages/coaches/CoachesList.vue";
import CoachReg from "./pages/coaches/CoachRegistration.vue";

import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReseived from "./pages/requests/RequestsReseived.vue";

import UserAuth from "./pages/auth/UserAuth.vue";

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
