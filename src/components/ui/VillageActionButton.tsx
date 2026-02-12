import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface VillageActionButtonProps {
    onClick: () => void;
    disabled?: boolean;
    label: string;
    subLabel?: React.ReactNode;
    icon: LucideIcon;
    gradientClasses: string;
    variant?: 'gather' | 'build';
}

export const VillageActionButton: React.FC<VillageActionButtonProps> = ({
    onClick,
    disabled = false,
    label,
    subLabel,
    icon: Icon,
    gradientClasses,
    variant = 'gather'
}) => {
    const isGather = variant === 'gather';

    // Base classes
    const baseClasses = "group w-full flex items-center gap-4 text-white font-bold rounded-xl shadow-lg transition-all transform border-b-4";

    // Variant specific classes
    const layoutClasses = isGather
        ? "py-3 justify-center"
        : "p-4";

    // State classes (active vs disabled)
    const stateClasses = disabled
        ? "from-gray-700 to-gray-800 cursor-not-allowed border-gray-900 opacity-60"
        : `${gradientClasses} hover:-translate-y-1 active:translate-y-0`;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${layoutClasses} bg-gradient-to-br ${stateClasses}`}
        >
            {isGather ? (
                // Gather Variant Layout
                <>
                    <Icon size={24} />
                    <div className="flex flex-col items-start min-w-[120px]">
                        <span>{label}</span>
                        <span className="text-[10px] text-white/60 font-normal">{subLabel}</span>
                    </div>
                </>
            ) : (
                // Build Variant Layout
                <>
                    <div className="bg-white/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                    </div>
                    <div className="text-left">
                        <span className="block text-lg">{label}</span>
                        <span className="text-xs text-white/60 font-normal">{subLabel}</span>
                    </div>
                </>
            )}
        </button>
    );
};
