import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="my-8">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Image'}
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-lg"
                    />
                    {value.caption && (
                        <p className="text-sm text-slate-500 mt-2 text-center italic">
                            {value.caption}
                        </p>
                    )}
                </div>
            )
        },
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-4xl font-light text-dark mb-6 mt-12 tracking-tight">
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-light text-dark mb-5 mt-10 tracking-tight">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-light text-dark mb-4 mt-8 tracking-tight">
                {children}
            </h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-xl font-medium text-dark mb-3 mt-6">
                {children}
            </h4>
        ),
        normal: ({ children }: any) => (
            <p className="text-slate-600 leading-relaxed mb-4 font-light">
                {children}
            </p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-gold pl-6 my-6 italic text-slate-600">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-slate-600">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-600">
                {children}
            </ol>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-bold text-dark">{children}</strong>
        ),
        em: ({ children }: any) => <em className="italic">{children}</em>,
        link: ({ value, children }: any) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-gold hover:text-gold-dark underline underline-offset-4"
                >
                    {children}
                </a>
            )
        },
    },
}

export default function RichTextRenderer({ content }: { content: any }) {
    return (
        <div className="prose prose-lg max-w-none">
            <PortableText value={content} components={components} />
        </div>
    )
}
