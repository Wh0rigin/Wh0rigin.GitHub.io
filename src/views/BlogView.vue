<script setup lang="ts">
import { posts, formatPostDate } from '../content/posts';
import BlogArtwork from '../components/blog/BlogArtwork.vue';
import '../styles/blog.css';

const entries = [...posts].sort((a, b) => b.date.localeCompare(a.date));
</script>

<template>
    <main class="blog-page blog-index" id="top">
        <div class="blog-shell">
            <header class="journal-heading">
                <div>
                    <p class="journal-kicker"><span></span> THE WIRED WORLD / JOURNAL</p>
                    <h1 class="journal-title" lang="en">BLOG<span class="journal-title-shadow" aria-hidden="true">BLOG</span><sup>01—</sup></h1>
                    <p class="journal-tagline">想法，<span>继续连线。</span></p>
                </div>
                <div class="journal-intro">
                    <span class="journal-stamp">FIELD NOTES</span>
                    <p>代码里的尝试，耳机里的音乐，<br>还有生活中值得留下的片段。</p>
                    <span class="journal-coordinate">WH0RIGIN / PERSONAL ARCHIVE</span>
                </div>
            </header>

            <section aria-labelledby="entries-title" class="journal-entries">
                <div class="entries-heading">
                    <h2 id="entries-title">连线手记 <span>/ LATEST ENTRIES</span></h2>
                    <span class="entries-count">{{ String(entries.length).padStart(2, '0') }} 篇记录</span>
                </div>
                <ol class="entry-list">
                    <li v-for="post in entries" :key="post.slug">
                        <router-link :to="`/blog/${post.slug}`" class="entry-link" :aria-label="`阅读 ${post.title}`">
                            <div class="entry-art"><BlogArtwork :issue="post.issue" /></div>
                            <div class="entry-copy">
                                <div class="entry-meta"><span>{{ post.category }}</span><span v-if="post.demo" class="demo-label">DEMO / 第一篇</span><span class="entry-issue">NO. {{ post.issue }}</span></div>
                                <h3>{{ post.title }}</h3>
                                <p class="entry-summary">{{ post.summary }}</p>
                                <ul class="entry-tags" aria-label="文章标签"><li v-for="tag in post.tags" :key="tag"># {{ tag }}</li></ul>
                                <div class="entry-bottom"><span><time :datetime="post.date">{{ formatPostDate(post.date) }}</time><i>·</i>约 {{ post.readMinutes }} 分钟</span><span class="entry-read">阅读手记 <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></span></div>
                            </div>
                        </router-link>
                    </li>
                </ol>
            </section>
            <div class="journal-end"><span class="journal-end-mark" aria-hidden="true">↳</span><p>故事才刚刚开始。<small>MORE CONNECTIONS TO COME.</small></p><router-link to="/">回到连线世界 <span aria-hidden="true">↗</span></router-link></div>
        </div>
    </main>
</template>
