import { findPost, type BlogPost, type BlogSection } from './posts';

// Each body is a separate chunk; listing summaries never imports these files.
const articleLoaders: Record<string, () => Promise<{ default: BlogSection[] }>> = {
    'pseudo-electric-brandy-journey': () => import('./articles/pseudo-electric-brandy-journey'),
    'welcome-to-the-ai-age': () => import('./articles/welcome-to-the-ai-age'),
    'anime-that-stayed-with-me': () => import('./articles/anime-that-stayed-with-me'),
    'hello-wired-world': () => import('./articles/hello-wired-world'),
};

export async function loadPost(slug: string): Promise<BlogPost | undefined> {
    const entry = findPost(slug);
    const load = articleLoaders[slug];
    if (!entry || !load) return undefined;
    const { default: sections } = await load();
    return { ...entry, sections };
}
