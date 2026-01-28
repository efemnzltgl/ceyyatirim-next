import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'office',
    title: 'Ofis Lokasyonları',
    type: 'document',
    fields: [
        // --- TÜRKÇE İÇERİK ---
        defineField({
            name: 'city_tr',
            title: 'Şehir (TR)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'address_tr',
            title: 'Adres (TR)',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),

        // --- İNGİLİZCE İÇERİK ---
        defineField({
            name: 'city_en',
            title: 'City (EN)',
            type: 'string',
        }),
        defineField({
            name: 'address_en',
            title: 'Address (EN)',
            type: 'text',
            rows: 3,
        }),

        // --- İLETİŞİM BİLGİLERİ ---
        defineField({
            name: 'phone',
            title: 'Telefon',
            type: 'string',
            description: 'Format: +90 312 443 33 33',
        }),
        defineField({
            name: 'fax',
            title: 'Fax',
            type: 'string',
            description: 'Format: +90 312 443 00 22',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
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
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            description: 'Ofislerin görüntülenme sırası',
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: 'city_tr',
            subtitle: 'address_tr',
        },
    },
})
