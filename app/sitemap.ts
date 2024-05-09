import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url : 'https://bili.whis.pw',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1
        }
    ]
}