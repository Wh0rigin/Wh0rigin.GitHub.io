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
        title: '03 / 一杯酒，也是一段故事',
        paragraphs: [
            '我把这组电影截图、书和酒杯的照片放在一起看。酒杯是现实里能看见的东西，伪电气白兰则留在故事里；放在同一页上，两者之间的距离刚好可以让人想一想。',
            '这段寻酒之旅吸引我的地方，不是酒最后有没有一个确定的味道，而是少女愿意带着好奇心往前走。她每走一步，就多认识一个人，也多听到一种看法。',
        ],
        images: [
            {
                src: '/blog/pseudo-electric-brandy/morimi-book.webp',
                alt: '森见登美彦《春宵苦短，少女前进吧！》原著书籍照片',
                width: 1279,
                height: 1706,
                caption: '森见登美彦的原著',
            },
            {
                src: '/blog/pseudo-electric-brandy/a-glass-at-night.webp',
                alt: '桌上的一杯酒与酒杯照片',
                width: 1350,
                height: 1800,
                caption: '一杯酒，和一段故事',
            },
        ],
    },
    {
        id: 'keep-walking',
        title: '04 / 春宵苦短，继续前行',
        paragraphs: [
            '《春宵苦短，少女前进吧！》把奇遇放在京都的一夜里。少女顺着自己的兴趣四处走，学长也在后面追赶她。伪电气白兰只是这一晚的一个线索，沿途遇见的人和对话又把线索连向别处。',
            '森见登美彦笔下的城市里，奇怪的人和日常生活挨在一起。对我来说，这场寻找最简单的意思就是：有想知道的事，就先走过去看看。至于那杯酒是什么味道，可以留给每个人自己想。',
        ],
        links: [
            { label: '查看《春宵苦短，少女前进吧！》片方官网', href: 'https://kurokaminootome.com/sp/' },
        ],
    },
];

export default sections;
