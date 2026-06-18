'use client';

import { useState, useEffect } from 'react';

type RatingBarProps = {
  filmId: string;
  label: string;
};

export default function RatingBar({ filmId, label }: RatingBarProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  // Load rating from localStorage on mount
  useEffect(() => {
    const savedRating = localStorage.getItem(`film-rating-${filmId}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [filmId]);

  // Save rating to localStorage
  const handleRating = (value: number) => {
    setRating(value);
    localStorage.setItem(`film-rating-${filmId}`, value.toString());
  };

  return (
    <div className="mt-8 rounded-xl bg-[#fff7f1] border border-[#d99f8b] p-6">
      <p className="text-sm uppercase tracking-[0.25em] font-semibold text-[#7d5a4e] mb-4">
        {label}
      </p>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="text-4xl transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#d94d33] rounded"
            aria-label={`Rate ${star} stars`}
          >
            <span
              className={`inline-block ${
                star <= (hoveredRating || rating || 0)
                  ? 'text-[#d94d33]'
                  : 'text-[#ddd]'
              }`}
            >
              ★
            </span>
          </button>
        ))}
        {rating && (
         <span className="ml-4 self-center text-xl font-semibold text-[#7d5a4e]">
          {rating}/5
        </span>
        )}
      </div>
    </div>
  );
}
