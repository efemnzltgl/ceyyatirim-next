"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ProjectGalleryProps {
    images: { url: string; caption?: string }[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Unified Swipe/Drag state
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [dragEnd, setDragEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
        // Lock body scroll when modal opens
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        // Restore body scroll
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Keyboard support (ESC to close, Left/Right arrows to navigate)
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

    // Touch & Mouse swipe handlers
    const minSwipeDistance = 50;

    const handleDragEnd = () => {
        setIsDragging(false);
        if (!dragStart || !dragEnd) return;
        const distance = dragStart - dragEnd;
        if (distance > minSwipeDistance) nextImage();
        if (distance < -minSwipeDistance) prevImage();
        
        // Timeout to prevent click event if it was a drag
        setTimeout(() => {
            setDragStart(null);
            setDragEnd(null);
        }, 50);
    };

    // Touch
    const onTouchStart = (e: React.TouchEvent) => {
        setDragEnd(null);
        setDragStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e: React.TouchEvent) => {
        setDragEnd(e.targetTouches[0].clientX);
    };

    // Mouse
    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragEnd(null);
        setDragStart(e.clientX);
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setDragEnd(e.clientX);
    };

    // Clicking background shouldn't close if we were dragging
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            const distance = Math.abs((dragStart || 0) - (dragEnd || dragStart || 0));
            if (distance < 10) {
                closeLightbox();
            }
        }
    };

    if (!images || images.length === 0) return null;

    const mainImage = images[0];
    const galleryImages = images.slice(1);

    return (
        <div className="space-y-6">
            {/* Main Featured Image */}
            <div
                className="relative h-[400px] md:h-[550px] w-full overflow-hidden rounded-md group cursor-pointer border border-black/5"
                onClick={() => openLightbox(0)}
            >
                <Image
                    src={mainImage.url}
                    alt={mainImage.caption || title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                    <ZoomIn className="text-white/80 w-16 h-16 drop-shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500" />
                </div>
            </div>

            {/* Thumbnails Grid */}
            {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative h-32 md:h-40 w-full overflow-hidden rounded-md cursor-pointer group border border-black/5"
                            onClick={() => openLightbox(idx + 1)}
                        >
                            <Image
                                src={img.url}
                                alt={img.caption || `${title} gallery ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox Modal (React Portal kullanarak hiyerarşiden tamamen koparıldı, Navbar çakışmasını önler) */}
            {lightboxOpen && typeof document !== 'undefined' ? createPortal(
                <div
                    className="fixed inset-0 z-[999999] bg-white/95 flex items-center justify-center backdrop-blur-xl select-none"
                    onClick={handleBackgroundClick}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={handleDragEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                >
                    {/* Görünür Kapatma Butonu */}
                    <button
                        className="fixed top-4 right-4 md:top-6 md:right-6 z-[10010] bg-white/80 border border-black/10 text-black hover:text-white hover:bg-gold transition-all duration-300 p-2 md:p-3 rounded-full shadow-sm hover:shadow-lg"
                        onClick={closeLightbox}
                        title="Kapat (ESC)"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    {/* Görünür Sol/Sağ Butonları (Mobilde küçültüldü, transparanlaştırıldı) */}
                    <button
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[10005] bg-white/50 md:bg-white/80 border border-black/10 text-black/70 hover:text-white hover:bg-gold transition-all duration-300 p-2 md:p-4 rounded-full shadow-sm hover:shadow-lg backdrop-blur-sm"
                        onClick={prevImage}
                        title="Önceki Görsel (Sol Ok)"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-9 md:h-9" />
                    </button>

                    <button
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[10005] bg-white/50 md:bg-white/80 border border-black/10 text-black/70 hover:text-white hover:bg-gold transition-all duration-300 p-2 md:p-4 rounded-full shadow-sm hover:shadow-lg backdrop-blur-sm"
                        onClick={nextImage}
                        title="Sonraki Görsel (Sağ Ok)"
                    >
                        <ChevronRight className="w-6 h-6 md:w-9 md:h-9" />
                    </button>

                    {/* Görsel Container */}
                    <div className="relative w-full h-full max-w-7xl max-h-[85vh] mx-4 md:mx-24 pointer-events-none mt-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 1.02 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
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

                    {/* Caption */}
                    {images[currentIndex].caption && (
                        <div className="absolute bottom-10 left-0 right-0 text-center text-black/90 text-sm font-light tracking-wide px-4">
                            {images[currentIndex].caption}
                        </div>
                    )}

                    {/* Sayaç */}
                    <div className="fixed top-4 left-4 md:top-8 md:left-8 z-[10005] text-black/70 text-[10px] md:text-xs font-bold tracking-[0.3em] bg-white/80 px-3 md:px-4 py-2 rounded-full border border-black/5 backdrop-blur-md shadow-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>,
                document.body
            ) : null}
        </div>
    );
}
