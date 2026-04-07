import { defineField, defineType } from 'sanity'
import { Image as ImageIcon } from 'lucide-react'

export default defineType({
  name: 'hero',
  title: 'Ana Sayfa Arka Plan (Görsel/Video)',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Arka Plan Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Ana sayfa arka planında kullanılacak görsel',
    }),
    defineField({
      name: 'video',
      title: 'Arka Plan Videosu (Opsiyonel)',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Eğer görsel yerine video göstermek isterseniz MP4 formatında bir video yükleyin. Yüklendiğinde görsel yerine bu video oynatılır.',
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({ media }) {
      return {
        title: 'Ana Sayfa Arka Planı',
        subtitle: 'Görsel veya Video Medyası',
        media,
      }
    }
  },
})
