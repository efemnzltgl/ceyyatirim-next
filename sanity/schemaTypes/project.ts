import { defineField, defineType } from 'sanity'
import { FolderClosed } from 'lucide-react'

export default defineType({
  name: 'project',
  title: 'Projelerimiz',
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
      title: 'Proje Başlığı (TR)',
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
      title: 'Project Title (EN)',
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
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Tamamlanan Projeler', value: 'completed' },
          { title: 'Devam Eden Projeler', value: 'ongoing' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'mainImage',
      title: 'Ana Görsel',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'gallery',
      title: 'Proje Galerisi',
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
      name: 'location',
      title: 'Lokasyon',
      type: 'string',
      description: 'Örn: Ankara, Türkiye',
      group: 'details',
    }),
    defineField({
      name: 'completionDate',
      title: 'Tamamlanma Tarihi',
      type: 'date',
      description: 'Proje tamamlandıysa tarih giriniz',
      group: 'details',
    }),
    defineField({
      name: 'client',
      title: 'Müşteri',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'projectValue',
      title: 'Proje Değeri',
      type: 'string',
      description: 'Örn: 50 Milyon USD',
      group: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Yıl',
      type: 'string',
      description: 'Proje Yılı (Örn: 2023 veya 2022-2024)',
      group: 'details',
    }),
    defineField({
      name: 'constructionArea',
      title: 'İnşaat Alanı',
      type: 'string',
      description: 'Örn: 45.000 m²',
      group: 'details',
    }),
    defineField({
      name: 'installedPower',
      title: 'Kurulu Güç',
      type: 'string',
      description: 'Örn: 50 MW',
      group: 'details',
    }),
    defineField({
      name: 'investor',
      title: 'Yatırımcı',
      type: 'string',
      description: 'Proje Yatırımcısı',
      group: 'details',
    }),
    defineField({
      name: 'relatedSector',
      title: 'İlgili Sektör',
      type: 'reference',
      to: [{ type: 'sector' }],
      group: 'details',
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Projelerin görüntülenme sırası',
      group: 'details',
    }),
    // Eski alanlar (geriye uyumluluk için)
    {
      name: 'title',
      title: 'Proje Başlığı (Eski)',
      type: 'string',
      hidden: true,
    },
    {
      name: 'description',
      title: 'Açıklama (Eski)',
      type: 'text',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title_tr',
      subtitle: 'category',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 'completed' ? 'Tamamlanan' : 'Devam Eden',
        media,
      }
    },
  },
})