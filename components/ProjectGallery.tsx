'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay, Thumbs, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectGalleryProps {
    images: { url: string; caption?: string }[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'auto';
        }
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Keyboard support for Lightbox
    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, currentIndex, images.length]);

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation, Pagination, Keyboard, Autoplay, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                spaceBetween={20}
                slidesPerView={1}
                keyboard={{ enabled: true }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} custom-gallery-bullet"></span>`;
                    }
                }}
                navigation={{
                    prevEl: '.gallery-prev',
                    nextEl: '.gallery-next',
                }}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
                autoHeight={true}
                className="w-full rounded-[24px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] bg-white border border-black/[0.03]"
                style={{ paddingBottom: '3rem' }} // For pagination bullets
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <div 
                            className="relative h-[400px] md:h-[600px] w-full cursor-pointer group"
                            onClick={() => openLightbox(idx)}
                        >
                            <Image
                                src={img.url}
                                alt={img.caption || `${title} - Image ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                                <ZoomIn className="text-white drop-shadow-lg w-16 h-16 scale-50 group-hover:scale-100 transition-transform duration-500" />
                            </div>
                            {img.caption && (
                                <div className="absolute bottom-6 left-6 text-white text-sm bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
                                    {img.caption}
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation for Swiper */}
            <button className="gallery-prev absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 shadow-lg rounded-full flex items-center justify-center text-black hover:bg-[#1a1c1e] hover:text-white transition-colors border border-black/5">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="gallery-next absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 shadow-lg rounded-full flex items-center justify-center text-black hover:bg-[#1a1c1e] hover:text-white transition-colors border border-black/5">
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Global style for pagination customization */}
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-gallery-bullet {
                  display: inline-block;
                  width: 32px;
                  height: 4px;
                  background: #d4d4d8; /* slate-300 */
                  border-radius: 4px;
                  margin: 0 4px !important;
                  cursor: pointer;
                  transition: all 0.3s ease;
                }
                .custom-gallery-bullet:hover {
                  background: #a1a1aa; /* slate-400 */
                }
                .custom-gallery-bullet.swiper-pagination-bullet-active {
                  background: #b39359; /* gold */
                  width: 48px;
                }
                .swiper-pagination-clickable .swiper-pagination-bullet {
                  cursor: pointer;
                }
                /* Swiper inner bottom padding */
                .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
                  bottom: 12px;
                }
                
                /* Thumbnail styling */
                .thumbs-swiper .swiper-slide {
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }
                .thumbs-swiper .swiper-slide-thumb-active {
                    opacity: 1;
                }
                .thumbs-swiper .swiper-slide-thumb-active > div {
                    border-color: #b39359;
                }
            `}} />

            {/* Thumbnail Swiper */}
            {images.length > 1 && (
                <div className="mt-6 px-1">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={16}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="thumbs-swiper cursor-pointer h-24 md:h-32"
                        breakpoints={{
                            640: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                            1024: { slidesPerView: 6 },
                            1280: { slidesPerView: 8 },
                        }}
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={`thumb-${idx}`}>
                                <div className="relative h-full w-full rounded-xl overflow-hidden border-[3px] border-transparent transition-colors">
                                    <Image
                                        src={img.url}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* FULLSCREEN LIGHTBOX (Portal) */}
            {lightboxOpen && typeof document !== 'undefined' ? createPortal(
                <div
                    className="fixed inset-0 z-[999999] bg-white/95 flex items-center justify-center backdrop-blur-xl select-none"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeLightbox();
                    }}
                >
                    <button
                        className="fixed top-4 right-4 md:top-6 md:right-6 z-[10010] bg-white/80 border border-black/10 text-black hover:text-white hover:bg-gold transition-all duration-300 p-2 md:p-3 rounded-full shadow-sm hover:shadow-lg"
                        onClick={closeLightbox}
                        title="Kapat (ESC)"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    <button
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[10005] bg-white/50 md:bg-white/80 border border-black/10 text-black/70 hover:text-white hover:bg-gold transition-all duration-300 p-2 md:p-4 rounded-full shadow-sm hover:shadow-lg backdrop-blur-sm"
                        onClick={prevImage}
                    >
                        <ChevronLeft className="w-6 h-6 md:w-9 md:h-9" />
                    </button>

                    <button
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[10005] bg-white/50 md:bg-white/80 border border-black/10 text-black/70 hover:text-white hover:bg-gold transition-all duration-300 p-2 md:p-4 rounded-full shadow-sm hover:shadow-lg backdrop-blur-sm"
                        onClick={nextImage}
                    >
                        <ChevronRight className="w-6 h-6 md:w-9 md:h-9" />
                    </button>

                    <div className="relative w-full h-full max-w-7xl max-h-[85vh] mx-4 md:mx-24 pointer-events-none mt-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="absolute inset-0 pointer-events-auto"
                            >
                                <Image
                                    src={images[currentIndex].url}
                                    alt={images[currentIndex].caption || title}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                    draggable={false}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="fixed top-4 left-4 md:top-8 md:left-8 z-[10005] text-black/70 text-[10px] md:text-xs font-bold tracking-[0.3em] bg-white/80 px-3 md:px-4 py-2 rounded-full border border-black/5 backdrop-blur-md shadow-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>,
                document.body
            ) : null}
        </div>
    );
}
