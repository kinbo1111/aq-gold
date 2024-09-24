import * as React from 'react';
import FilterItem from './FilterItem';

const FilterList = () => {
    return (
        <div className='flex items-center justify-start gap-2 mb-4'>
         <FilterItem
                label='新しい順'
                color
            />
            <FilterItem
                label='人気の動画'
            />
            <FilterItem
                label='古い順'
            />
        </div>
    );
};

export default FilterList;