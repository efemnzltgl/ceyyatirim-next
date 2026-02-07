import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'jobApplication',
    title: 'İş Başvuruları',
    type: 'document',
    readOnly: true, // Admin panelinden değiştirilmemeli, sadece okunmalı
    fields: [
        defineField({
            name: 'fullName',
            title: 'Ad Soyad',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'E-posta',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Telefon',
            type: 'string',
        }),
        defineField({
            name: 'position',
            title: 'Başvurulan Pozisyon',
            type: 'string',
        }),
        defineField({
            name: 'message',
            title: 'Mesaj',
            type: 'text',
        }),
        defineField({
            name: 'cvFile',
            title: 'CV Dosyası',
            type: 'file',
        }),
        defineField({
            name: 'submittedAt',
            title: 'Başvuru Tarihi',
            type: 'datetime',
        }),
    ],
    preview: {
        select: {
            title: 'fullName',
            subtitle: 'position',
            date: 'submittedAt',
        },
        prepare({ title, subtitle, date }) {
            return {
                title,
                subtitle: `${subtitle} | ${date ? new Date(date).toLocaleDateString('tr-TR') : ''}`
            }
        }
    }
})
