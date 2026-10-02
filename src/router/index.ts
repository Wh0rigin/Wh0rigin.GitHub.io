import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { findPost } from '../content/posts';


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: { title: 'Blog · 连线手记' },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('../views/BlogPostView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // Wait for the incoming route's short reveal before locating its anchor.
      return new Promise((resolve) => {
        window.setTimeout(() => resolve({ el: to.hash, top: 90, behavior: 'smooth' }), 350);
      });
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const post = to.name === 'blog-post' ? findPost(String(to.params.slug)) : undefined;
  const title = to.name === 'blog-post' ? post?.title ?? '手记未找到' : to.meta.title;
  document.title = title ? `${title} | The Wired World` : "Wh0rigin's World | 连线世界";
});

export default router;
