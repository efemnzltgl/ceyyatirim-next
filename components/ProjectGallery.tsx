"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProjectGalleryProps {
    images: { url: string; caption?: string }[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    // First image is the "Main" image, displayed prominently
    const mainImage = images[0];
    const galleryImages = images.slice(1);

    return (
        <div className="space-y-6">
            {/* Main Featured Image */}
            <div
                className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-sm group cursor-pointer"
                onClick={() => openLightbox(0)}
            >
                <Image
                    src={mainImage.url}
                    alt={mainImage.caption || title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="text-white w-12 h-12 drop-shadow-lg" />
                </div>
            </div>

            {/* Thumbnails Grid */}
            {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative h-32 w-full overflow-hidden rounded-sm cursor-pointer group"
                            onClick={() => openLightbox(idx + 1)}
                        >
                            <Image
                                src={img.url}
                                alt={img.caption || `${title} gallery ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition p-2"
                        onClick={closeLightbox}
                    >
                        <X size={40} />
                    </button>

                    <button
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition p-4 hover:bg-white/10 rounded-full"
                        onClick={prevImage}
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition p-4 hover:bg-white/10 rounded-full"
                        onClick={nextImage}
                    >
                        <ChevronRight size={40} />
                    </button>

                    <div className="relative w-full h-full max-w-6xl max-h-[85vh] m-8 pointer-events-none">
                        <Image
                            src={images[currentIndex].url}
                            alt={images[currentIndex].caption || title}
                            fill
                            className="object-contain pointer-events-auto"
                            quality={100}
                        />
                    </div>

                    {/* Caption in Lightbox */}
                    {images[currentIndex].caption && (
                        <div className="absolute bottom-10 left-0 right-0 text-center text-white/90 text-lg font-light tracking-wide px-4">
                            {images[currentIndex].caption}
                        </div>
                    )}

                    {/* Counter */}
                    <div className="absolute top-6 left-6 text-white/50 text-sm tracking-widest">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}
