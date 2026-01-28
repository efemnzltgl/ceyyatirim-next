import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projelerimiz',
  type: 'document',
  fields: [
    // --- TÜRKÇE İÇERİK ---
    defineField({
      name: 'title_tr',
      title: 'Proje Başlığı (TR)',
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
      title: 'Project Title (EN)',
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
    }),
    defineField({
      name: 'mainImage',
      title: 'Ana Görsel',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'location',
      title: 'Lokasyon',
      type: 'string',
      description: 'Örn: Ankara, Türkiye',
    }),
    defineField({
      name: 'completionDate',
      title: 'Tamamlanma Tarihi',
      type: 'date',
      description: 'Proje tamamlandıysa tarih giriniz',
    }),
    defineField({
      name: 'client',
      title: 'Müşteri',
      type: 'string',
    }),
    defineField({
      name: 'projectValue',
      title: 'Proje Değeri',
      type: 'string',
      description: 'Örn: 50 Milyon USD',
    }),
    defineField({
      name: 'relatedSector',
      title: 'İlgili Sektör',
      type: 'reference',
      to: [{ type: 'sector' }],
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Projelerin görüntülenme sırası',
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