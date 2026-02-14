import styles from './about.module.css';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
import MasonryContainer from '../../components/MasonryCard/MasonryContainer';
import { MasonryCardProps } from 'components/MasonryCard/MasonryCard';

// 获取图片完整路径
const getStrapiMedia = (url: string) => {
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

// 定义获取数据的函数
async function getCardsData(): Promise<MasonryCardProps[]> {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    
    // Skip fetching during static build if no base URL
    if (!baseUrl || baseUrl.includes('localhost')) {
        return [];
    }
    
    try {
        const result = await fetch(`${baseUrl}/api/information-cards?populate=*`, {
            cache: 'force-cache',
        });

        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }

        const json = await result.json();

        return json.data
            .filter((item: any) => item?.attributes?.content)
            .map((item: any) => ({
                content: item.attributes.content,
                image: item.attributes.image?.data
                    ? getStrapiMedia(item.attributes.image.data.attributes.url)
                    : '/fallback_image.jpg',
            }));
    } catch (error) {
        console.error('Error fetching cards data:', error);
        return [];
    }
}

export default async function About() {
    const cardsData = await getCardsData();

    return (
        <div className={styles.about}>
            <Navigation />
            <div className={styles.container}>
                <div className={styles.text}>
                    <h4 className={styles.title}>Ciallo! I'm Nyaabyte.</h4>
                    <p className={styles.description}>
                        I'm a freshman from the Nanchang University.
                        I'm currently learning front-end development 
                        and I'm looking forward to becoming a full-stack developer.
                        Beneath my quiet exterior beats a wild and untamed(hentai) soul.
                        Nice to meet you, welcome to make friends with me!
                    </p>
                </div>

                <div className={styles.image}>
                    <Image
                        src="https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/126671504_p0_master1200.jpg"
                        alt="Nyaabyte"
                        width={400}
                        height={400}
                        className={styles.profileImage}
                        style={{objectFit: "cover"}}
                    />
                </div>
            </div>

            <MasonryContainer items={cardsData} />
        </div>
    )
}