import logo1 from './logo1.webp';
import logo1Small from './logo1-480.webp';
import logo1Blink from './logo1_slink.webp';
import logo1BlinkSmall from './logo1_slink-480.webp';
import logo2 from './logo2.webp';
import logo2Small from './logo2-480.webp';
import logo2Error from './logo2_error.webp';
import logo2ErrorSmall from './logo2_error-480.webp';
import logo2None from './logo2_none.webp';
import logo2NoneSmall from './logo2_none-480.webp';
import logo2Smile from './logo2_smile.webp';
import logo2SmileSmall from './logo2_smile-480.webp';
import logo3 from './logo3.webp';
import logo3Small from './logo3-480.webp';
import logo3Medium from './logo3-960.webp';

const image = (src: string, small: string, width: number, height: number) => ({
    src, width, height, srcset: `${small} 480w, ${src} ${width}w`,
});
export const heroImages = [
    image(logo1, logo1Small, 897, 1021),
    image(logo2, logo2Small, 759, 1021),
    { ...image(logo3, logo3Small, 1520, 1651), srcset: `${logo3Small} 480w, ${logo3Medium} 960w, ${logo3} 1520w` },
    image(logo1Blink, logo1BlinkSmall, 897, 1021),
    image(logo2Error, logo2ErrorSmall, 759, 1021),
    image(logo2None, logo2NoneSmall, 759, 1021),
    image(logo2Smile, logo2SmileSmall, 759, 1021),
];
export const heroImageSizes = '(max-width: 520px) 240px, (max-width: 820px) 320px, 500px';
