'use client';

import { useFormState } from 'react-dom';
import { submitJobApplication } from '@/app/actions/submitJobApplication';
import { useEffect, useRef } from 'react';

const initialState = {
    success: false,
    message: '',
};

interface JobApplicationFormProps {
    t: {
        title: string;
        name: string;
        email: string;
        phone: string;
        position: string;
        message: string;
        cv: string;
        submit: string;
        submitting: string;
    }
}

export default function JobApplicationForm({ t }: JobApplicationFormProps) {
    const [state, formAction] = useFormState(submitJobApplication, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <div className="bg-slate-50 p-8 md:p-12 border border-slate-100 rounded-sm">
            <h2 className="text-2xl font-light text-[#1a1c1e] mb-8 text-center italic">
                {t.title}
            </h2>

            {state.message && (
                <div className={`mb-6 p-4 text-center text-sm font-medium ${state.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {state.message}
                </div>
            )}

            <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.name}</label>
                    <input type="text" name="fullName" required className="w-full bg-white border border-slate-200 p-3 text-slate-700 focus:outline-none focus:border-[#b39359] transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.email}</label>
                    <input type="email" name="email" required className="w-full bg-white border border-slate-200 p-3 text-slate-700 focus:outline-none focus:border-[#b39359] transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.phone}</label>
                    <input type="tel" name="phone" className="w-full bg-white border border-slate-200 p-3 text-slate-700 focus:outline-none focus:border-[#b39359] transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.position}</label>
                    <input type="text" name="position" className="w-full bg-white border border-slate-200 p-3 text-slate-700 focus:outline-none focus:border-[#b39359] transition-colors" />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.message}</label>
                    <textarea name="message" rows={4} className="w-full bg-white border border-slate-200 p-3 text-slate-700 focus:outline-none focus:border-[#b39359] transition-colors"></textarea>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{t.cv}</label>
                    <input type="file" name="cv" accept=".pdf,.doc,.docx" required className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#b39359]/10 file:text-[#b39359] hover:file:bg-[#b39359]/20" />
                </div>

                <div className="col-span-1 md:col-span-2 pt-4 text-center">
                    <button type="submit" className="bg-[#b39359] text-white px-10 py-4 text-xs font-black tracking-[0.2em] hover:bg-[#9a7e4b] transition-colors uppercase">
                        {t.submit}
                    </button>
                </div>
            </form>
        </div>
    );
}
