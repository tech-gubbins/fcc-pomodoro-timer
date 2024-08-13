import React from 'react';

const ControlPanel = ({ start, stop, reset }) => {
    return (
        <div className='flex justify-center space-x-4 my-4'>
            <button
                onClick={start}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'
            >
                Start
            </button>
            <button
                onClick={stop}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'
            >
                Stop
            </button>
            <button
                onClick={reset}
                className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700'
            >
                Reset
            </button>
        </div>
    );
};

export default ControlPanel;