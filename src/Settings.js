import React from "react";

const Settings = ({ id, label, time, increment, decrement }) => {
    return (
        <div className="flex flex-col items-conatiner">
            <h3
                id={id + "-label"}
                className="text-lg font-semibold">
                {label}
            </h3>
            <div className="flex items-center space-x-4">
                <button
                    id={id + "-decrement"}
                    onClick={decrement}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    -
                </button>
                <span
                    id={id + "-length"}
                    className="text-2x1">
                    {time}
                </span>
                <button
                    id={id + "-increment"}
                    onClick={increment}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    +
                </button>
            </div>
        </div>
    );
};

export default Settings;
