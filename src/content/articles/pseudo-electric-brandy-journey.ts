import type { BlogSection } from '../posts';

const sections: BlogSection[] = [
    {
        id: 'a-name-to-look-for',
        title: '01 / 一杯有些古怪的酒',
        paragraphs: [
            '这次想记下电影里的春天。黑发少女在京都的夜里一路前行，开始寻找一杯叫作“伪电气白兰”的酒。',
            '“伪电气白兰”这个名字听起来像真的，又带着一点谜面。她一路向前，遇到酒场里形形色色的人，也让这一夜的故事从找酒开始，慢慢展开。',
        ],
        images: [
            {
                src: '/blog/pseudo-electric-brandy/night-is-short-mainvisual.jpg',
                alt: '动画电影《春宵苦短，少女前进吧！》官方主视觉海报',
                width: 640,
                height: 904,
                caption: '《春宵苦短，少女前进吧！》电影主视觉 · ©森見登美彦・KADOKAWA／ナカメの会',
                sourceHref: 'https://kurokaminootome.com/sp/',
                sourceLabel: '片方官网',
            },
        ],
    },
    {
        id: 'li-bai-and-the-girl',
        title: '02 / 李白先生和少女',
        paragraphs: [
            '找酒的路上，少女遇见了李白先生。他们一边喝酒，一边谈人生。李白说得直接，少女也没有绕开他的话，而是给出了自己的回答。',
            '这几句很短，放在一起却能看出两个人看待人生的差别。我喜欢少女的回答：她没有否认痛苦，只是也记得分享和欢愉。',
        ],
        dialogue: [
            { speaker: '李白先生', text: '人生是虚妄的。' },
            { speaker: '黑发少女', text: '人生是丰满的。' },
            { speaker: '李白先生', text: '相互掠夺。' },
            { speaker: '黑发少女', text: '相互分享。' },
            { speaker: '李白先生', text: '痛苦。' },
            { speaker: '黑发少女', text: '欢愉。' },
        ],
        images: [
            {
                src: '/blog/pseudo-electric-brandy/li-bai-at-the-bar.webp',
                alt: '酒桌上的对话字幕问道：你为何要持酒而行',
                width: 1800,
                height: 1002,
                caption: '酒桌上抛出的问题',
            },
            {
                src: '/blog/pseudo-electric-brandy/girl-and-the-brandy.webp',
                alt: '黑发少女谈起伪电气白兰的味道',
                width: 1800,
                height: 1007,
                caption: '少女说起自己喝到的滋味',
            },
        ],
    },
    {
        id: 'a-drink-and-a-story',
        title: '03 / 去杭州，找那杯同名酒',
        paragraphs: [
            '后来，我在小红书上看到杭州有家酒吧有一杯同名的“伪电气白兰”。电影里少女一直在找这个名字，我看到时就想去看看，于是专程去了那家酒吧。',
            '在那里，我遇见了一位同样来巡礼的少女。她把带来的书和饼熊借给我，我拿出自己带来的 AKG 专辑，和它们一起拍了照。那张专辑里，正好收录着这部动画电影的主题曲。',
            '酒杯、借来的书和饼熊，还有我带去的 CD，都留在了这张照片里。原本只是因为一杯同名酒出发，最后还遇见了同样喜欢这部作品的人。这些小事让那趟杭州之行变成了我自己的故事。',
        ],
        images: [
            {
                src: '/blog/pseudo-electric-brandy/morimi-book.webp',
                alt: '酒吧桌上的借来的书和饼熊，以及 AKG 专辑',
                width: 1279,
                height: 1706,
                caption: '巡礼时遇见的少女借给我的书和饼熊，以及我带来的 AKG 专辑',
            },
            {
                src: '/blog/pseudo-electric-brandy/a-glass-at-night.webp',
                alt: '杭州酒吧里拍下的伪电气白兰同名酒',
                width: 1350,
                height: 1800,
                caption: '小红书上的一条笔记让我来到了这家酒吧',
            },
        ],
    },
    {
        id: 'keep-walking',
        title: '04 / 春宵苦短，继续前行',
        paragraphs: [
            '《春宵苦短，少女前进吧！》把奇遇放在京都的一夜里。少女顺着自己的兴趣四处走，学长也在后面追赶她。伪电气白兰只是这一晚的一个线索，沿途遇见的人和对话又把线索连向别处。',
            '这次杭州之行也让我觉得，巡礼不只是去一个和作品有关的地点。因为一个名字出发，遇见同样喜欢它的人，借到一本书，再把自己带来的东西放在一起留影，这些偶然也成了作品留给我的记忆。那杯酒有没有和电影里的一样，反而没那么重要。',
        ],
        links: [
            { label: '查看《春宵苦短，少女前进吧！》片方官网', href: 'https://kurokaminootome.com/sp/' },
        ],
    },
];

export default sections;
