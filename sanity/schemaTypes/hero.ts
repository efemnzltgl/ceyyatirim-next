import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Ana Sayfa Slider',
  type: 'document',
  fields: [
    // --- TÜRKÇE İÇERİK ---
    defineField({
      name: 'title_tr',
      title: 'Ana Başlık (TR)',
      type: 'string',
      description: 'Örn: Geleceğe Değer Katan Yatırımlar',
    }),
    defineField({
      name: 'subtitle_tr',
      title: 'Alt Açıklama (TR)',
      type: 'text',
      description: 'Slider üzerinde görünecek Türkçe kısa açıklama.',
    }),
    defineField({
      name: 'buttonText_tr',
      title: 'Buton Metni (TR)',
      type: 'string',
      initialValue: 'DETAY',
    }),

    // --- İNGİLİZCE İÇERİK ---
    defineField({
      name: 'title_en',
      title: 'Main Title (EN)',
      type: 'string',
      description: 'Example: Investments Adding Value to the Future',
    }),
    defineField({
      name: 'subtitle_en',
      title: 'Sub Description (EN)',
      type: 'text',
      description: 'English short description on the slider.',
    }),
    defineField({
      name: 'buttonText_en',
      title: 'Button Text (EN)',
      type: 'string',
      initialValue: 'DETAILS',
    }),

    // --- ORTAK ALANLAR ---
    defineField({
      name: 'image',
      title: 'Arka Plan Görseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Buton Linki',
      type: 'string',
      description: 'Butona tıklandığında gidilecek sayfa (Örn: /projeler veya /kurumsal)',
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Slider kaçıncı sırada görünecek?',
    }),
  ],
})