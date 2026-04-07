import { defineField, defineType } from 'sanity'
import { FolderClosed } from 'lucide-react'

export default defineType({
    name: 'office',
    title: 'Ofis Lokasyonları',
    type: 'document',
    icon: FolderClosed,
    groups: [
        { name: 'tr', title: 'Türkçe' },
        { name: 'en', title: 'İngilizce' },
        { name: 'details', title: 'Detaylar & İletişim' },
    ],
    fields: [
        // --- TÜRKÇE İÇERİK ---
        defineField({
            name: 'city_tr',
            title: 'Şehir (TR)',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'tr',
        }),
        defineField({
            name: 'address_tr',
            title: 'Adres (TR)',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
            group: 'tr',
        }),

        // --- İNGİLİZCE İÇERİK ---
        defineField({
            name: 'city_en',
            title: 'City (EN)',
            type: 'string',
            group: 'en',
        }),
        defineField({
            name: 'address_en',
            title: 'Address (EN)',
            type: 'text',
            rows: 3,
            group: 'en',
        }),

        // --- İLETİŞİM BİLGİLERİ ---
        defineField({
            name: 'phone',
            title: 'Telefon',
            type: 'string',
            description: 'Format: +90 312 443 33 33',
            group: 'details',
        }),
        defineField({
            name: 'fax',
            title: 'Fax',
            type: 'string',
            description: 'Format: +90 312 443 00 22',
            group: 'details',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
            group: 'details',
        }),

        // --- KONUM BİLGİLERİ ---
        defineField({
            name: 'location',
            title: 'Konum (Harita)',
            type: 'object',
            fields: [
                {
                    name: 'lat',
                    title: 'Enlem (Latitude)',
                    type: 'number',
                },
                {
                    name: 'lng',
                    title: 'Boylam (Longitude)',
                    type: 'number',
                },
            ],
            description: 'Google Maps için koordinatlar',
            group: 'details',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Ofislerin görüntülenme sırası',
            validation: (Rule) => Rule.required().min(0),
            group: 'details',
        }),
    ],
    preview: {
        select: {
            title: 'city_tr',
            subtitle: 'address_tr',
        },
    },
})

