import React from 'react';

const Settings = ({ label, time, increment, decrement }) => {
    return (
        <div className='flex flex-col items-conatiner'>
            <h3 className='text-lg font-semibold'>{label}</h3>
            <div className='flex items-center space-x-4'>
                <button
                    onClick={decrement}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                >
                    -
                </button>
                <span className='text-2x1'>{time}</span>
                <button
                    onClick={increment}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Settings;