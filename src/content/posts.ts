export interface BlogLink {
    label: string;
    href: string;
}

export interface BlogSection {
    id: string;
    title: string;
    paragraphs: string[];
    quote?: string;
    items?: string[];
    links?: BlogLink[];
}

export interface BlogEntry {
    slug: string;
    issue: string;
    title: string;
    subtitle: string;
    date: string;
    readMinutes: number;
    category: string;
    tags: string[];
    summary: string;
    demo?: boolean;
    artwork?: {
        headline: string;
        highlight: string;
        caption: string;
    };
}

export interface BlogPost extends BlogEntry {
    sections: BlogSection[];
}

export const posts: BlogEntry[] = [
    {
        slug: 'anime-that-stayed-with-me',
        issue: '002',
        title: '从四叠半开始：影响我的动画',
        subtitle: '良机就在眼前，兴趣也在故事之间慢慢生长。',
        date: '2026-10-02',
        readMinutes: 3,
        category: '动画随笔',
        tags: ['动画', '四叠半神话大系', '个人记录'],
        summary: '最喜欢的《四叠半神话大系》，对 AI 兴趣的起点，还有通向日本文学的《虫师》。从几部影响过我的动画说起，也留下我的 BGM.tv 追番记录入口。',
        artwork: {
            headline: 'ANIME,',
            highlight: 'NOTES.',
            caption: 'STORIES THAT STAY WITH ME.',
        },
    },
    {
        slug: 'hello-wired-world',
        issue: '001',
        title: '你好，连线世界。',
        subtitle: '从一张个人主页开始，把代码、音乐和生活里的好奇心连在一起。',
        date: '2026-10-02',
        readMinutes: 4,
        category: '建站手记',
        tags: ['网站设计', '个人记录'],
        summary: '为什么是「连线世界」？从蓝色的水面、红黑的拼贴，到页脚里藏着的小电视，第一篇手记带你认识这个还在生长的个人网站。',
        demo: true,
    },
];

export function findPost(slug: string) {
    return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
    return date.replace(/-/g, '.');
}
