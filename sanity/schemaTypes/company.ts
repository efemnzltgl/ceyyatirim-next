import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'company',
  title: 'Grup Şirketleri',
  type: 'document',
  fields: [
    // --- TÜRKÇE İÇERİK ---
    defineField({
      name: 'name_tr',
      title: 'Şirket Adı (TR)',
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
      name: 'name_en',
      title: 'Company Name (EN)',
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
        source: 'name_tr',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      name: 'website',
      title: 'Web Sitesi',
      type: 'url',
      description: 'Şirketin web sitesi URL\'si',
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Şirketlerin görüntülenme sırası',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name_tr',
      subtitle: 'description_tr',
      media: 'logo',
    },
  },
})
