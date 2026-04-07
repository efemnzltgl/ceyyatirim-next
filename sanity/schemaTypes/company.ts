import { defineField, defineType } from 'sanity'
import { FolderClosed } from 'lucide-react'

export default defineType({
  name: 'company',
  title: 'Grup Şirketleri',
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
      name: 'name_tr',
      title: 'Şirket Adı (TR)',
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
      name: 'name_en',
      title: 'Company Name (EN)',
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
        source: 'name_tr',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      name: 'website',
      title: 'Web Sitesi',
      type: 'url',
      description: 'Şirketin web sitesi URL\'si',
      group: 'details',
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Şirketlerin görüntülenme sırası',
      validation: (Rule) => Rule.required().min(0),
      group: 'details',
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
