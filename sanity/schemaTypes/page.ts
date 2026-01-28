import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Kurumsal Sayfalar',
  type: 'document',
  fields: [
    // --- TÜRKÇE İÇERİK ---
    defineField({
      name: 'title_tr',
      title: 'Başlık (TR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content_tr',
      title: 'İçerik (TR)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
    }),
    defineField({
      name: 'metaDescription_tr',
      title: 'Meta Açıklama (TR)',
      type: 'text',
      description: 'SEO için sayfa açıklaması',
      rows: 2,
    }),

    // --- İNGİLİZCE İÇERİK ---
    defineField({
      name: 'title_en',
      title: 'Başlık (EN)',
      type: 'string',
    }),
    defineField({
      name: 'content_en',
      title: 'İçerik (EN)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
    }),
    defineField({
      name: 'metaDescription_en',
      title: 'Meta Description (EN)',
      type: 'text',
      rows: 2,
    }),

    // --- ORTAK ALANLAR ---
    defineField({
      name: 'slug',
      title: 'Sayfa URL (Slug)',
      type: 'slug',
      options: { source: 'title_tr' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Sayfa Tipi',
      type: 'string',
      options: {
        list: [
          { title: 'Hakkımızda', value: 'about' },
          { title: 'Başkanın Mesajı', value: 'chairman-message' },
          { title: 'Diğer', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'keywords',
      title: 'Anahtar Kelimeler',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO için anahtar kelimeler',
    }),
  ],
  preview: {
    select: {
      title: 'title_tr',
      subtitle: 'pageType',
      media: 'featuredImage',
    },
  },
})