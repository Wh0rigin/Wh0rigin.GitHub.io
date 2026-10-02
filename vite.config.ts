import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { posts } from './src/content/posts'

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]!))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), {
    name: 'blog-pages-entries',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const entry = bundle['index.html']
      if (!entry || entry.type !== 'asset') return
      const html = String(entry.source).replace('href="./favicon/', 'href="/favicon/')
      const pages = [
        { path: 'blog', title: 'Blog · 连线手记', description: '代码、音乐与日常。Wh0rigin 的连线手记。' },
        ...posts.map(post => ({ path: `blog/${post.slug}`, title: post.title, description: post.summary })),
      ]
      for (const page of pages) {
        this.emitFile({
          type: 'asset',
          fileName: `${page.path}/index.html`,
          source: html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)} | The Wired World</title>\n<meta name="description" content="${escapeHtml(page.description)}" />`),
        })
      }
    },
  }],
  base:'/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
