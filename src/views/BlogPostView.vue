<script setup lang="ts">
import { computed } from 'vue';
import { formatPostDate, type BlogPost } from '../content/posts';
import BlogArtwork from '../components/blog/BlogArtwork.vue';
import WiredAction from '../components/ui/WiredAction.vue';
import WiredBadge from '../components/ui/WiredBadge.vue';
import '../styles/blog.css';

const props = defineProps<{ post?: BlogPost }>();
const post = computed(() => props.post);
</script>

<template>
    <main class="blog-page blog-article" id="top">
        <div v-if="post" class="blog-shell wired-container" id="article-top">
            <router-link to="/blog" class="journal-back"><span aria-hidden="true">←</span> 全部手记</router-link>
            <header class="article-heading">
                <div class="article-heading-copy">
                    <p class="journal-kicker wired-kicker"><span class="wired-kicker-mark" aria-hidden="true"></span> JOURNAL / NO. {{ post.issue }}</p>
                    <div class="article-labels"><span>{{ post.category }}</span><WiredBadge v-if="post.demo" variant="soft" flat class="demo-label">DEMO / 第一篇</WiredBadge></div>
                    <h1>{{ post.title }}</h1>
                    <p class="article-subtitle">{{ post.subtitle }}</p>
                    <div class="article-meta"><span class="author-mark" aria-hidden="true">W.</span><span>Wh0rigin</span><time :datetime="post.date">{{ formatPostDate(post.date) }}</time><span>约 {{ post.readMinutes }} 分钟</span></div>
                </div>
                <div class="article-art wired-panel"><BlogArtwork :issue="post.issue" v-bind="post.artwork" /></div>
            </header>

            <div class="article-layout">
                <aside class="article-aside" aria-label="文章目录">
                    <nav class="article-toc" aria-labelledby="toc-title"><h2 id="toc-title">ON THIS PAGE <span>/ 目录</span></h2><ol><li v-for="(section, index) in post.sections" :key="section.id"><a :href="`#${section.id}`"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ section.title.replace(/^\d+\s*\/\s*/, '') }}</a></li></ol><a class="toc-back" href="#article-top">回到文章顶部 ↑</a></nav>
                </aside>
                <article class="article-paper wired-panel wired-prose" :aria-label="post.title">
                    <p class="article-opening">THE WIRED WORLD <span>/ ENTRY {{ post.issue }}</span></p>
                    <section v-for="section in post.sections" :key="section.id" :id="section.id" class="article-section">
                        <h2>{{ section.title }}</h2>
                        <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
                        <blockquote v-if="section.quote"><p>{{ section.quote }}</p></blockquote>
                        <ul v-if="section.items" class="article-bullets"><li v-for="item in section.items" :key="item">{{ item }}</li></ul>
                        <div v-if="section.links?.length" class="article-links">
                            <WiredAction v-for="link in section.links" :key="link.href" :href="link.href" arrow="up-right" class="article-resource-link" target="_blank" rel="noopener noreferrer" :aria-label="`${link.label}（新标签页打开）`">{{ link.label }}</WiredAction>
                        </div>
                    </section>
                    <div class="article-signoff"><span aria-hidden="true">END.</span><p>感谢你接入连线世界。<small>SEE YOU IN THE NEXT ENTRY.</small></p></div>
                    <ul class="entry-tags article-tags wired-tags" aria-label="文章标签"><li v-for="tag in post.tags" :key="tag"># {{ tag }}</li></ul>
                </article>
            </div>
            <div class="article-navigation"><WiredAction to="/blog" arrow="left" class="blog-action">返回博客列表</WiredAction><router-link to="/">回到主页 ↗</router-link></div>
        </div>
        <div v-else class="blog-shell wired-container article-missing"><p class="journal-kicker wired-kicker">SIGNAL NOT FOUND / 404</p><h1>这篇手记还未连线。</h1><p>文章可能已移走，或这个地址还没有对应的内容。</p><WiredAction to="/blog" class="blog-action">返回博客列表</WiredAction></div>
    </main>
</template>
