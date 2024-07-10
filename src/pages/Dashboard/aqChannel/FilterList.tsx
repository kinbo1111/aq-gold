import * as React from 'react';
import FilterItem from './FilterItem';

const FilterList = () => {
    return (
        <div className='flex items-center justify-start gap-2 mb-4'>
            <p className='body-1r text-white'>動画の並び順</p>
            <FilterItem
                label='Latest'
                color
            />
            <FilterItem
                label='Popular'
            />
            <FilterItem
                label='Oldest'
            />
        </div>
    );
};

export default FilterList;