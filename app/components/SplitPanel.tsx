import { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { useStore } from 'nanostores/react';
import { uiStore } from '../stores/ui';

interface SplitPanelProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  initialWidth?: string;
  minWidth?: number;
  maxWidth?: number;
}

export function SplitPanel({ leftContent, rightContent, initialWidth = '50%', minWidth = 200, maxWidth = 1000 }: SplitPanelProps) {
  const [leftPanelWidth, setLeftPanelWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
    const ui = useStore(uiStore);
    
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !panelRef.current || !dividerRef.current) return;
        const panelRect = panelRef.current.getBoundingClientRect();
        const dividerRect = dividerRef.current.getBoundingClientRect();

        const mousePosition = e.clientX - panelRect.left;
        let width = mousePosition;

        if (width < minWidth) {
          width = minWidth;
        }
        if (width > maxWidth) {
          width = maxWidth;
        }


       setLeftPanelWidth(`${width}px`)

    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minWidth, maxWidth]);


  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div className="flex h-full" ref={panelRef}>
          <motion.div className="h-full overflow-y-hidden" style={{ width: leftPanelWidth }}  >
               {leftContent}
          </motion.div>
           <div
        ref={dividerRef}
        className={`z-10 flex-0 flex items-center cursor-ew-resize select-none  ${ui.theme === "dark" ? 'bg-gray-700' : 'bg-gray-200'}  h-full`}
        onMouseDown={handleMouseDown}
      >
           <div className={`w-1 h-6  ${ui.theme === "dark" ? 'bg-gray-500' : 'bg-gray-400'} `} />
       </div>
          <motion.div className="flex-1 h-full overflow-y-hidden">
            {rightContent}
        </motion.div>
    </div>
  );
}