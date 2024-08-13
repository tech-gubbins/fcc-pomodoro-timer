import React from 'react';

const Timer = ({ timeLeft, label }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className='text-center my-4'>
            <h2 className='text-2x1 font-bold'>{label}</h2>
            <p className='text-4x1 font-mono'>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
            </p>
        </div>
    );
};

export default Timer;