import { defineField, defineType } from 'sanity'
import { Map } from 'lucide-react'

export default defineType({
  name: 'contactPage',
  title: 'İletişim Sayfası İçeriği',
  type: 'document',
  icon: Map,
  groups: [
    { name: 'tr', title: 'Türkçe' },
    { name: 'en', title: 'İngilizce' },
    { name: 'details', title: 'Detaylar & Medya' },
  ],
  fields: [
    defineField({
      name: 'title_tr',
      title: 'Ana Başlık (TR)',
      type: 'string',
      group: 'tr',
      initialValue: 'Projeniz için bizimle iletişime geçin',
    }),
    defineField({
      name: 'description_tr',
      title: 'Açıklama (TR)',
      type: 'text',
      rows: 3,
      group: 'tr',
      initialValue: 'Enerji ve inşaat projeleriniz için teklif almak veya detaylı bilgi edinmek için formu doldurabilirsiniz.',
    }),
    
    defineField({
      name: 'title_en',
      title: 'Main Title (EN)',
      type: 'string',
      group: 'en',
      initialValue: 'Contact us for your project',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
      group: 'en',
      initialValue: 'You can fill out the form to request a quote or get detailed information for your energy and construction projects.',
    }),

    defineField({
      name: 'mainImage',
      title: 'Ana Görsel (İletişim Formu Yanındaki)',
      type: 'image',
      options: { hotspot: true },
      group: 'details',
    }),
    defineField({
      name: 'mapIframe',
      title: 'Google Maps Iframe Linki',
      type: 'string',
      description: 'Örn: https://www.google.com/maps/embed?pb=...',
      group: 'details',
    }),
  ],
  preview: {
    select: {
      title: 'title_tr',
      media: 'mainImage',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'İletişim Sayfası Statik İçerikleri',
      }
    }
  }
})
