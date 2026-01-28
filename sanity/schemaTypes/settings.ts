export default {
  name: 'settings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    { name: 'title', title: 'Site Başlığı', type: 'string' },
    {
      name: 'address',
      title: 'Adres',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe Adres', type: 'text' },
        { name: 'en', title: 'İngilizce Adres', type: 'text' },
      ]
    },
    { name: 'phone', title: 'Telefon', type: 'string' },
    { name: 'email', title: 'E-posta', type: 'string' },
    {
      name: 'socials',
      title: 'Sosyal Medya Linkleri',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
      ]
    },
    {
      name: 'footerText',
      title: 'Footer Hakkımızda Metni',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe Metin', type: 'text' },
        { name: 'en', title: 'İngilizce Metin', type: 'text' },
      ]
    }
  ]
}