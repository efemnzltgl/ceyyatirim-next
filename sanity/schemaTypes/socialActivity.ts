import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'socialActivity',
    title: 'Sosyal Faaliyetler',
    type: 'document',
    fields: [
        // --- TÜRKÇE İÇERİK ---
        defineField({
            name: 'title_tr',
            title: 'Faaliyet Adı (TR)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description_tr',
            title: 'Kısa Açıklama (TR)',
            type: 'text',
            description: 'Liste sayfasında gösterilecek kısa açıklama',
            rows: 3,
        }),
        defineField({
            name: 'content_tr',
            title: 'Detaylı İçerik (TR)',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true }
                }
            ],
        }),

        // --- İNGİLİZCE İÇERİK ---
        defineField({
            name: 'title_en',
            title: 'Activity Name (EN)',
            type: 'string',
        }),
        defineField({
            name: 'description_en',
            title: 'Short Description (EN)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'content_en',
            title: 'Detailed Content (EN)',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true }
                }
            ],
        }),

        // --- ORTAK ALANLAR ---
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title_tr',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featuredImage',
            title: 'Ana Görsel',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'gallery',
            title: 'Fotoğraf Galerisi',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'caption',
                            title: 'Açıklama',
                            type: 'string',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'externalLinks',
            title: 'İlgili Bağlantılar',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Başlık', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Faaliyetlerin görüntülenme sırası',
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: 'title_tr',
            subtitle: 'description_tr',
            media: 'featuredImage',
        },
    },
})
