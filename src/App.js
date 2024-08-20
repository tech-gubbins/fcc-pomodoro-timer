import React, { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import ControlPanel from "./ControlPanel";
import Settings from "./Settings";

const App = () => {
    const [sessionLength, setSessionLength] = useState(1);
    const [breakLength, setBreakLength] = useState(5);
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isSession, setIsSession] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        if (timeLeft === 0) {
            audioRef.current.play();
            setIsRunning(false);
            setTimeout(() => {
              setIsRunning(true);
            }, 5000)
        }
    }, [timeLeft]);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 0) {
                        if (isSession) {
                            setIsSession(false);
                            return breakLength * 60;
                        } else {
                            setIsSession(true);
                            return sessionLength * 60;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, breakLength, sessionLength, isSession]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setIsSession(true);
        setSessionLength(25);
        setBreakLength(5);
        setTimeLeft(25 * 60);
        audioRef.current.pause();
    };

    const incrementSession = () => {
        if (!isRunning) {
            setSessionLength((prev) => Math.min(prev + 1, 60));
            setTimeLeft((sessionLength + 1) * 60);
        }
    };
    const decrementSession = () => {
        if (!isRunning) {
            setSessionLength((prev) => Math.max(prev - 1, 1));
            setTimeLeft((sessionLength - 1) * 60);
        }
    };
    const incrementBreak = () => {
        if (!isRunning) {
            setBreakLength((prev) => Math.min(prev + 1, 15));
        }
    };
    const decrementBreak = () => {
        if (!isRunning) {
            setBreakLength((prev) => Math.max(prev - 1, 1));
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-200 min-h-screen">
            <audio
                ref={audioRef}
                src="./alarm.mp3"></audio>
            <h1 className="text-3xl font-bold mb-6">Pomodoro Timer</h1>
            <div className="flex space-x-8">
                <Settings
                    label="Session"
                    time={sessionLength}
                    increment={incrementSession}
                    decrement={decrementSession}
                />
                <Settings
                    id="break-label"
                    label="Break Length"
                    time={breakLength}
                    increment={incrementBreak}
                    decrement={decrementBreak}
                />
            </div>
            <Timer
                timeLeft={timeLeft}
                label={isSession ? "Session" : "Break"}
            />
            <ControlPanel
                start={startTimer}
                stop={stopTimer}
                reset={resetTimer}
            />
        </div>
    );
};

export default App;
