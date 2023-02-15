import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/NotFound.vue";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachList from "./pages/coaches/CoachesList.vue";
import CoachReg from "./pages/coaches/CoachRegistration.vue";

import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReseived from "./pages/requests/RequestsReseived.vue";

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
    { path: "/register", component: CoachReg },
    { path: "/requests", component: RequestsReseived },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
