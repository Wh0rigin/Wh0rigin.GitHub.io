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

export interface BlogPost {
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
    sections: BlogSection[];
}

export const posts: BlogPost[] = [
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
        sections: [
            {
                id: 'the-tatami-galaxy',
                title: '01 / 四叠半神话大系：良机就在眼前',
                paragraphs: [
                    '我最喜欢的动画是《四叠半神话大系》。在 BGM.tv 的自我介绍里，我写过它对我的影响：让我知道良机就在眼前，也让我开始更积极地面对事物。',
                    '对我来说，这部作品留下的是一种愿意行动的态度。把目光放回眼前，再主动迈出一步，是它留给我的提醒。',
                ],
                quote: '良机就在眼前。',
            },
            {
                id: 'lain-and-ghost-in-the-shell',
                title: '02 / 铃音与攻壳机动队：兴趣的起点',
                paragraphs: [
                    '《铃音》和《攻壳机动队》让我对 AI 产生了兴趣。高中时，我曾因此自学过一段时间，虽然当时的学习效果并不太好，但这段尝试确实是由动画里的好奇心开始的。',
                    '现在，我在杭州师范大学就读人工智能专业的工学硕士。从高中时的自学，到现在继续学习 AI，这段经历也把观看故事时产生的好奇心，带进了我的学习生活。',
                ],
            },
            {
                id: 'mushishi-and-books',
                title: '03 / 虫师：从动画走向书页',
                paragraphs: [
                    '《虫师》让我开始接触日本文学。那段时间，我读了十余部日本文学作品，观看的兴趣也由此延伸到了阅读。',
                    '我喜欢的作家是森见登美彦，喜欢的漫画家有安达充、藤本树和浅野一二〇。这些名字和动画一起，构成了我在故事之间不断寻找新作品的路径。',
                ],
            },
            {
                id: 'from-dvd-to-bangumi',
                title: '04 / 从 DVD 播放器，到追番记录',
                paragraphs: [
                    '我看的第一部日本动画是《数码宝贝 驯兽师之王》，当时用的是 DVD 播放器。至于真正开始持续追番，大概是在 2013、2014 年左右；具体是哪一部作品成为起点，我已经记不太清了。',
                    '我在 BGM.tv 上使用的名字是「七月の光酒」。那里的评分是主观的，我会给自己想打分的作品打分。这里先记录几部对我影响很深的动画，完整的观看状态和评分则留在 BGM.tv。',
                ],
            },
            {
                id: 'my-bangumi-records',
                title: '05 / 我的 BGM.tv 时光机',
                paragraphs: [
                    '如果想看看我最近在看什么、看过哪些作品，可以到我的 BGM.tv 主页逛逛。这篇随笔整理自我在那里的自我介绍，后续也可以从某一部作品继续展开。',
                ],
                links: [
                    { label: '在 BGM.tv 查看我的追番记录', href: 'https://bgm.tv/user/wh0rigin' },
                ],
            },
        ],
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
        sections: [
            {
                id: 'a-place-to-connect',
                title: '01 / 给好奇心一个落点',
                paragraphs: [
                    '欢迎来到 The Wired World，连线世界。这是 Wh0rigin 的个人网站，也是一个把零散想法慢慢连起来的地方。代码、音乐、学习经历，乍看像是不同的频道，却共同组成了一个人的日常。',
                    '主页负责最初的相遇，博客则留给那些需要多说几句的内容：一个项目为什么这样做，一首歌为什么反复听，一个问题又是怎样从模糊的念头变成具体的尝试。',
                    '这篇文章是博客的第一篇示例。先从网站本身讲起，也给之后的记录留一个起点。',
                ],
                quote: '把好奇心写进代码，把想法连成现实。',
            },
            {
                id: 'three-channels',
                title: '02 / 同一个世界，三种频道',
                paragraphs: [
                    '白天模式从《女神异闻录 3》的视觉语言中寻找灵感：深蓝、天蓝、斜切的色块，以及像落入水中一样的空间感。加载页的日期从昨天走到今天，像翻开新的一页。',
                    '黑夜模式则借鉴《女神异闻录 5》的红黑张力。更大胆的字形、不规则的拼贴和层叠，让页面多一点跳出屏幕的感觉。切换主题时，颜色从按钮附近展开，仿佛换了一个观看世界的角度。',
                    '还有一个小小的隐藏频道：点击页脚的电视，会进入以《女神异闻录 4》为灵感的黄色主题。它藏在普通的黑白切换之外，留给愿意往下看一眼的人。',
                ],
            },
            {
                id: 'more-than-code',
                title: '03 / 代码之外，也留一张唱片',
                paragraphs: [
                    '关于我的部分放着一张转动的唱片。最喜欢的专辑是 Vaundy 的《replica》，最喜欢的音乐人是 ASIAN KUNG-FU GENERATION。点击唱片，页面会展开一束聚光灯，让关于这张专辑的话暂时成为主角。',
                    '音乐不需要占满主页，但它值得拥有自己的片刻。唱片、聚光灯和对话框，是这个网站用交互讲述偏好的一次尝试。',
                    '教育经历与开源项目也在这里：从浙江万里学院的计算机科学与技术，到杭州师范大学的人工智能；从开发工具到视觉识别。它们提供了另一种认识我的方式——看看我在学习什么，又在把什么想法做出来。',
                ],
            },
            {
                id: 'keep-writing',
                title: '04 / 下一篇，写点什么',
                paragraphs: [
                    '这里不必只放完成后的成果。一个还没有解决的问题、一段调试过程、一份学习笔记，也可以成为值得留下的记录。比起一次把所有事情讲完，更想让这个网站随着新的经历慢慢生长。',
                    '之后的手记，可以从这些方向开始：',
                ],
                items: [
                    '开发记录：项目的想法、实现过程，以及踩过的坑。',
                    '学习片段：计算机、人工智能，和把知识用起来的尝试。',
                    '音乐与日常：听过的专辑、突然想到的事，以及值得记住的瞬间。',
                ],
            },
        ],
    },
];

export function findPost(slug: string) {
    return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
    return date.replace(/-/g, '.');
}
