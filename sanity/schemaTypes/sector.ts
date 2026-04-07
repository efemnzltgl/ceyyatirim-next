import { defineField, defineType } from 'sanity'
import { FolderClosed } from 'lucide-react'

export default defineType({
    name: 'sector',
    title: 'Sektörler',
    type: 'document',
    icon: FolderClosed,
    groups: [
      { name: 'tr', title: 'Türkçe' },
      { name: 'en', title: 'İngilizce' },
      { name: 'details', title: 'Detaylar & Medya' },
    ],
    fields: [
        // --- TÜRKÇE İÇERİK ---
        defineField({
            name: 'title_tr',
            title: 'Sektör Adı (TR)',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'tr',
        }),
        defineField({
            name: 'description_tr',
            title: 'Kısa Açıklama (TR)',
            type: 'text',
            description: 'Liste sayfasında gösterilecek kısa açıklama',
            rows: 3,
            group: 'tr',
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
            group: 'tr',
        }),

        // --- İNGİLİZCE İÇERİK ---
        defineField({
            name: 'title_en',
            title: 'Sector Name (EN)',
            type: 'string',
            group: 'en',
        }),
        defineField({
            name: 'description_en',
            title: 'Short Description (EN)',
            type: 'text',
            rows: 3,
            group: 'en',
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
            group: 'en',
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
            group: 'details',
        }),
        defineField({
            name: 'icon',
            title: 'İkon/Görsel',
            type: 'image',
            options: { hotspot: true },
            group: 'details',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Kapak Görseli',
            type: 'image',
            options: { hotspot: true },
            group: 'details',
        }),
        defineField({
            name: 'relatedProjects',
            title: 'İlgili Projeler',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'project' }] }],
            description: 'Bu sektörle ilgili projeler',
            group: 'details',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Sektörlerin görüntülenme sırası',
            validation: (Rule) => Rule.required().min(0),
            group: 'details',
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

