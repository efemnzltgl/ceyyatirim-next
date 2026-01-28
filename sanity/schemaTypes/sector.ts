import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'sector',
    title: 'Sektörler',
    type: 'document',
    fields: [
        // --- TÜRKÇE İÇERİK ---
        defineField({
            name: 'title_tr',
            title: 'Sektör Adı (TR)',
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
            title: 'Sector Name (EN)',
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
            name: 'icon',
            title: 'İkon/Görsel',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'featuredImage',
            title: 'Kapak Görseli',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'relatedProjects',
            title: 'İlgili Projeler',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'project' }] }],
            description: 'Bu sektörle ilgili projeler',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Sektörlerin görüntülenme sırası',
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: 'title_tr',
            subtitle: 'description_tr',
            media: 'icon',
        },
    },
})
