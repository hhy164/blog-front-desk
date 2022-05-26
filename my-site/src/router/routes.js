import "nprogress/nprogress.css";
import NotFound from "@/views/NotFound";
import { start, done, configure } from "nprogress";
configure({
    trickleSpeed: 20, //速度配置
})
window.start = start;
window.done = done;


export default [
    {
        name: "Home", path: "./",
        component: () => import( /* webpackChunkName:"home" */ "@/views/Home"),
        meta: {
            title: "首页"
        }
    },
    {
        name: "Blog", path: "./article",
        component: () => import( /* webpackChunkName:"blog" */ "@/views/Blog"),
        meta: {
            title: "文章"
        }
    },
    {
        name: "CategoryBlog", path: "./article/cate/:categoryId",
        component: () => import( /* webpackChunkName:"blog" */ "@/views/Blog"),
        meta: {
            title: "文章"
        }
    },
    {
        name: "BlogDetail", path: "./article/:id",
        component: () => import( /* webpackChunkName:"blogdetail" */ "@/views/Blog/Detail"),
        meta: {
            title: "文章详情"
        }
    },
    {
        name: "About", path: "./about",
        component: () => import( /* webpackChunkName:"about" */ "@/views/About"),
        meta: { title: "关于我" }
    },
    {
        name: "Message", path: "./message",
        component: () => import( /* webpackChunkName:"message" */ "@/views/Message"),
        meta: { title: "留言板" }
    },
    {
        name: "Project", path: "./project",
        component: () => import( /* webpackChunkName:"project" */ "@/views/Project"),
        meta: { title: "项目效果" }
    },
    {
        name: "NotFound",
        path: "*",
        component: NotFound
    }
]