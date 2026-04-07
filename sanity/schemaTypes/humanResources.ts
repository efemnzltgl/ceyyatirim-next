import { defineField, defineType } from 'sanity'
import { FolderClosed } from 'lucide-react'

export default defineType({
    name: 'humanResources',
    title: 'İnsan Kaynakları Sayfası',
    type: 'document',
    icon: FolderClosed,
    groups: [
        { name: 'tr', title: 'Türkçe' },
        { name: 'en', title: 'İngilizce' },
        { name: 'details', title: 'Detaylar & Medya' },
    ],
    fields: [
        defineField({
            name: 'title_tr',
            title: 'Başlık (TR)',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'İnsan Kaynakları',
            group: 'tr',
        }),
        defineField({
            name: 'title_en',
            title: 'Title (EN)',
            type: 'string',
            initialValue: 'Human Resources',
            group: 'en',
        }),
        defineField({
            name: 'content_tr',
            title: 'İçerik (TR)',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Sayfadaki açıklama metni',
            group: 'tr',
        }),
        defineField({
            name: 'content_en',
            title: 'Content (EN)',
            type: 'array',
            of: [{ type: 'block' }],
            group: 'en',
        }),
        defineField({
            name: 'image',
            title: 'Görsel',
            type: 'image',
            options: { hotspot: true },
            group: 'details',
        })
    ],
})

