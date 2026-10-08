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
    images?: BlogImage[];
    dialogue?: BlogDialogueLine[];
}

export interface BlogImage {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
    sourceHref?: string;
    sourceLabel?: string;
}

export interface BlogDialogueLine {
    speaker: string;
    text: string;
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
        slug: 'pseudo-electric-brandy-journey',
        issue: '004',
        title: '寻伪电气白兰之旅',
        subtitle: '跟着黑发少女走进京都的夜里，聊聊伪电气白兰和人生的滋味。',
        date: '2026-10-08',
        readMinutes: 4,
        category: '动画随笔',
        tags: ['森见登美彦', '动画电影', '春宵苦短少女前进吧'],
        summary: '从《春宵苦短，少女前进吧！》里寻找伪电气白兰的夜晚开始，看看李白先生和少女如何用几句对话，谈虚妄、孤独、分享与欢愉。',
        artwork: {
            headline: 'A NIGHT,',
            highlight: 'SEARCH.',
            caption: 'PSEUDO ELECTRIC BRANDY',
        },
    },
    {
        slug: 'welcome-to-the-ai-age',
        issue: '003',
        title: '欢迎来到 AI 时代',
        subtitle: '和父亲喝酒聊天时，聊起电脑，也想了想 AI。',
        date: '2026-10-08',
        readMinutes: 4,
        category: '生活随笔',
        tags: ['AI', '编程', '成长经历'],
        summary: '国庆回家，和父亲久违地喝酒聊天。从他组装电脑、装系统的日子，想到自己这些年的竞赛和编程经历，也聊聊 AI 编程工具出现后，我对出路的焦虑。',
        artwork: {
            headline: 'AI,',
            highlight: 'AGE.',
            caption: 'A TALK WITH MY FATHER.',
        },
    },
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
