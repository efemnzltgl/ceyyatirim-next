import { defineField, defineType } from 'sanity'
import { FolderClosed } from 'lucide-react'

export default defineType({
  name: 'page',
  title: 'Kurumsal Sayfalar',
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
      title: 'Başlık (TR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'tr',
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
      group: 'tr',
    }),
    defineField({
      name: 'metaDescription_tr',
      title: 'Meta Açıklama (TR)',
      type: 'text',
      description: 'SEO için sayfa açıklaması',
      rows: 2,
      group: 'tr',
    }),

    // --- İNGİLİZCE İÇERİK ---
    defineField({
      name: 'title_en',
      title: 'Başlık (EN)',
      type: 'string',
      group: 'en',
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
      group: 'en',
    }),
    defineField({
      name: 'metaDescription_en',
      title: 'Meta Description (EN)',
      type: 'text',
      rows: 2,
      group: 'en',
    }),

    // --- ORTAK ALANLAR ---
    defineField({
      name: 'slug',
      title: 'Sayfa URL (Slug)',
      type: 'slug',
      options: { source: 'title_tr' },
      validation: (Rule) => Rule.required(),
      group: 'details',
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
      name: 'keywords',
      title: 'Anahtar Kelimeler',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO için anahtar kelimeler',
      group: 'details',
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