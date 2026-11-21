import React from 'react';
import { Sparkles } from 'lucide-react';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 text-center text-sm font-medium">
      <p className="flex items-center justify-center gap-2">
        <Sparkles className="size-4 text-amber-200 animate-pulse" />
        New Year Special: Get 50% off on all premium templates this week!
        <Sparkles className="size-4 text-amber-200 animate-pulse" />
      </p>
    </div>
  );
};

export default Banner;
