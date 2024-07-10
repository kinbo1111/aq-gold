import * as React from 'react';

interface FilterItemProps {
    label: string;
    color?: boolean;
}

const FilterItem: React.FC<FilterItemProps> = ({
    label,
    color
}) => {
    return (
        <div className={`
        flex items-center justify-center px-2 py-1 rounded button-4b
        ${color? "b-brand-600" : "b-gray-200"}
        ${color? "text-white" : "gray-800"}
        `}>
            {label}
        </div>
    );
};

export default FilterItem;