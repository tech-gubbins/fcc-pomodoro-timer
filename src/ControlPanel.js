import React from 'react';

const ControlPanel = ({ status, start_stop, reset }) => {
    return (
        <div className='flex justify-center space-x-4 my-4'>
            <button
                id="start_stop"
                onClick={start_stop}
                className={`px-4 py-2 bg-green-500 text-white rounded ${
                    status ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                }`}
            >
                Start / Stop
            </button>
            <button
                id="reset"
                onClick={reset}
                className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700'
            >
                Reset
            </button>
        </div>
    );
};

export default ControlPanel;