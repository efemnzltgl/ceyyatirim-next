'use server'

import { client } from '@/sanity/lib/client'

export async function submitJobApplication(prevState: any, formData: FormData) {
    try {
        const fullName = formData.get('fullName') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const position = formData.get('position') as string
        const message = formData.get('message') as string
        const cvFile = formData.get('cv') as File

        if (!cvFile || !fullName || !email) {
            return { success: false, message: 'Lütfen zorunlu alanları doldurunuz.' }
        }

        // 1. Upload the file to Sanity
        const fileAsset = await client.assets.upload('file', cvFile, {
            filename: cvFile.name,
            contentType: cvFile.type,
        })

        // 2. Create the document in Sanity
        await client.create({
            _type: 'jobApplication',
            fullName,
            email,
            phone,
            position,
            message,
            cvFile: {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: fileAsset._id
                }
            },
            submittedAt: new Date().toISOString()
        })

        return { success: true, message: 'Başvurunuz başarıyla alındı.' }
    } catch (error) {
        console.error('Submission error:', error)
        return { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' }
    }
}
