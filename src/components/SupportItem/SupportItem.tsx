import React from 'react';

interface SupportItemProps {
    title: string;
    description: string;
}

export const SupportItem: React.FC<SupportItemProps> = ({ title, description }) => {
    return (
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
};
