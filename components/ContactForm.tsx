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

        console.log('Form data:', formData)

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
            message: 'Mesaj',
            submit: 'Gönder',
            sending: 'Gönderiliyor...',
            success: 'Mesajınız başarıyla gönderildi!',
            error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        },
        en: {
            name: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            subject: 'Subject',
            message: 'Message',
            submit: 'Send',
            sending: 'Sending...',
            success: 'Your message has been sent successfully!',
            error: 'An error occurred. Please try again.',
        },
    }

    const t = labels[lang as keyof typeof labels] || labels.tr

    const inputClasses = `w-full px-4 py-3.5 border transition-all duration-300 focus:outline-none bg-white border-slate-200 focus:border-[#1a1c1e] text-black rounded-xl text-sm placeholder:text-slate-400`
    const labelClasses = `block text-sm font-semibold text-[#1a1c1e] mb-2`

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-12 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-black/[0.03]">
            <div>
                <label htmlFor="name" className={labelClasses}>
                    {t.name}
                </label>
                <input
                    type="text"
                    id="name"
                    required
                    placeholder={lang === 'tr' ? "Adınız Soyadınız" : "John Doe"}
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
                    placeholder={lang === 'tr' ? "ornek@eposta.com" : "example@mail.com"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClasses}
                />
            </div>

            <div>
                <label htmlFor="phone" className={labelClasses}>
                    {t.phone}
                </label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="+90 (5__) ___ __ __"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClasses}
                />
            </div>

            <div>
                <label htmlFor="subject" className={labelClasses}>
                    {t.subject}
                </label>
                <div className="relative">
                    <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                        <option value="" disabled hidden>
                            {lang === 'tr' ? "Bir konu seçin" : "Select a subject"}
                        </option>
                        <option value="teklif">{lang === 'tr' ? "Teklif Almak İstiyorum" : "Request a Quote"}</option>
                        <option value="bilgi">{lang === 'tr' ? "Bilgi Almak İstiyorum" : "Request Information"}</option>
                        <option value="diger">{lang === 'tr' ? "Diğer" : "Other"}</option>
                    </select>
                    {/* Select Dropdown Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="message" className={labelClasses}>
                    {t.message}
                </label>
                <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder={lang === 'tr' ? "Projeniz hakkında detayları yazın..." : "Write details about your project..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClasses} resize-none`}
                ></textarea>
            </div>

            {status === 'success' && (
                <div className="p-4 rounded-xl text-sm bg-green-50 border border-green-200 text-green-800 font-medium">
                    {t.success}
                </div>
            )}

            {status === 'error' && (
                <div className="p-4 rounded-xl text-sm bg-red-50 border border-red-200 text-red-800 font-medium">
                    {t.error}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full relative overflow-hidden px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 bg-[#1a1c1e] text-white hover:bg-black hover:shadow-lg"
            >
                <span className="relative z-10">{status === 'sending' ? t.sending : t.submit}</span>
            </button>
        </form>
    )
}
