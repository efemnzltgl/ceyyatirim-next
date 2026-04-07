import { defineField, defineType } from 'sanity'
import { FolderClosed } from 'lucide-react'

export default defineType({
    name: 'socialActivity',
    title: 'Sosyal Faaliyetler',
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
            title: 'Faaliyet Adı (TR)',
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
            title: 'Activity Name (EN)',
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
            name: 'featuredImage',
            title: 'Ana Görsel',
            type: 'image',
            options: { hotspot: true },
            group: 'details',
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
            group: 'details',
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
            group: 'details',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Faaliyetlerin görüntülenme sırası',
            validation: (Rule) => Rule.required().min(0),
            group: 'details',
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

