import { defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projelerimiz',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Proje Başlığı',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Proje Görseli',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    },
  ],
})