'use client'

import { useState } from 'react'

interface ContactFormProps {
    lang: string
    isDark?: boolean
}

export default function ContactForm({ lang, isDark = false }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        // TODO: Email gönderim entegrasyonu
        console.log('Form data:', formData)

        // Simülasyon
        setTimeout(() => {
            setStatus('success')
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        }, 1000)
    }

    const labels = {
        tr: {
            name: 'Ad Soyad',
            email: 'E-posta',
            phone: 'Telefon',
            subject: 'Konu',
            message: 'Mesajınız',
            submit: 'GÖNDER',
            sending: 'GÖNDERİLİYOR...',
            success: 'Mesajınız başarıyla gönderildi!',
            error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        },
        en: {
            name: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            subject: 'Subject',
            message: 'Your Message',
            submit: 'SEND',
            sending: 'SENDING...',
            success: 'Your message has been sent successfully!',
            error: 'An error occurred. Please try again.',
        },
    }

    const t = labels[lang as keyof typeof labels] || labels.tr

    const inputClasses = `w-full px-4 py-4 border transition-all duration-300 focus:outline-none ${isDark
            ? 'bg-white/5 border-white/10 text-white focus:border-gold focus:bg-white/10'
            : 'bg-white border-slate-200 focus:border-[#b39359] text-dark'
        }`

    const labelClasses = `block text-[10px] font-bold tracking-[0.2em] mb-3 uppercase ${isDark ? 'text-gold' : 'text-[#1a1c1e]'
        }`

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="name" className={labelClasses}>
                        {t.name}
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        placeholder={isDark ? "..." : ""}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="email" className={labelClasses}>
                        {t.email}
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="phone" className={labelClasses}>
                        {t.phone}
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="subject" className={labelClasses}>
                        {t.subject}
                    </label>
                    <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={inputClasses}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className={labelClasses}>
                    {t.message}
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClasses} resize-none`}
                ></textarea>
            </div>

            {status === 'success' && (
                <div className={`p-4 border text-sm ${isDark ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-800'}`}>
                    {t.success}
                </div>
            )}

            {status === 'error' && (
                <div className={`p-4 border text-sm ${isDark ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    {t.error}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'sending'}
                className={`group relative overflow-hidden px-12 py-5 text-[10px] font-black tracking-[0.3em] transition-all duration-500 disabled:opacity-50 ${isDark
                        ? 'bg-gold text-black hover:bg-white'
                        : 'bg-[#1a1c1e] text-white hover:bg-gold'
                    }`}
            >
                <span className="relative z-10">{status === 'sending' ? t.sending : t.submit}</span>
            </button>
        </form>
    )
}
