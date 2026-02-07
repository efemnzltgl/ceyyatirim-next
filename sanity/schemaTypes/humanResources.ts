import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'humanResources',
    title: 'İnsan Kaynakları Sayfası',
    type: 'document',
    fields: [
        defineField({
            name: 'title_tr',
            title: 'Başlık (TR)',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'İnsan Kaynakları',
        }),
        defineField({
            name: 'title_en',
            title: 'Title (EN)',
            type: 'string',
            initialValue: 'Human Resources',
        }),
        defineField({
            name: 'content_tr',
            title: 'İçerik (TR)',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Sayfadaki açıklama metni',
        }),
        defineField({
            name: 'content_en',
            title: 'Content (EN)',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'image',
            title: 'Görsel',
            type: 'image',
            options: { hotspot: true },
        })
    ],
})
