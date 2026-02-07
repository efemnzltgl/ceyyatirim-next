import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Başlığı',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'object',
      fields: [
        defineField({ name: 'tr', title: 'Türkçe Adres', type: 'text', rows: 3 }),
        defineField({ name: 'en', title: 'İngilizce Adres', type: 'text', rows: 3 }),
      ]
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-posta',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      title: 'Sosyal Medya Linkleri',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
      ]
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Hakkımızda Metni',
      type: 'object',
      fields: [
        defineField({ name: 'tr', title: 'Türkçe Metin', type: 'text', rows: 3 }),
        defineField({ name: 'en', title: 'İngilizce Metin', type: 'text', rows: 3 }),
      ]
    }),
    defineField({
      name: 'completedProjectsText',
      title: 'Tamamlanan Projeler Yazısı',
      type: 'object',
      fields: [
        defineField({ name: 'title_tr', title: 'Başlık (TR)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'description_tr', title: 'Açıklama (TR)', type: 'text', rows: 3 }),
        defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
        defineField({ name: 'subtitle_tr', title: 'Alt Başlık (TR)', type: 'string', description: 'Örn: GELECEĞE DEĞER KATAN YAPILAR' }),
        defineField({ name: 'subtitle_en', title: 'Subtitle (EN)', type: 'string' }),
      ]
    }),
    defineField({
      name: 'ongoingProjectsText',
      title: 'Devam Eden Projeler Yazısı',
      type: 'object',
      fields: [
        defineField({ name: 'title_tr', title: 'Başlık (TR)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'description_tr', title: 'Açıklama (TR)', type: 'text', rows: 3 }),
        defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
        defineField({ name: 'subtitle_tr', title: 'Alt Başlık (TR)', type: 'string', description: 'Örn: GELECEĞİ BUGÜNDEN İNŞA EDİYORUZ' }),
        defineField({ name: 'subtitle_en', title: 'Subtitle (EN)', type: 'string' }),
      ]
    })
  ]
})