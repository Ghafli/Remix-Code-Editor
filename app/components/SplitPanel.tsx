import { useState } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

interface SplitPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  initialLeftWidth?: number;
}

export default function SplitPanel({ 
  left, 
  right, 
  initialLeftWidth = 250 
}: SplitPanelProps) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setLeftWidth(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="flex h-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <motion.div
        style={{ width: leftWidth }}
        className="h-full overflow-hidden"
      >
        {left}
      </motion.div>
      
      <div
        className="w-4 flex items-center justify-center cursor-col-resize hover:bg-gray-200 dark:hover:bg-gray-700"
        onMouseDown={handleMouseDown}
      >
        <GripVertical className="w-4 h-4" />
      </div>
      
      <div className="flex-1 h-full overflow-hidden">
        {right}
      </div>
    </div>
  );
}
