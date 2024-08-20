import React, { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import ControlPanel from "./ControlPanel";
import Settings from "./Settings";

//
// MAIN WEB APP COMPONENT
//
const App = () => {
    // INITIALIZE STATES AND REFERENCES
    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isSession, setIsSession] = useState(true);
    const audioRef = useRef(null);

    // EFFECT FOR TRIGGERING AUDIO BEEP AT END OF TIMER
    useEffect(() => {
        if (timeLeft === 1) {
            audioRef.current.play();
            setIsRunning(false);
            setTimeout(() => {
                setIsRunning(true);
            }, 5000);
        }
    }, [timeLeft]);

    // EFFECT FOR RUNNING AND UPDATING TIMER
    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    console.log(`Current timeLeft: ${prev}`); // Log the current timeLeft
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

    // ONCLICK FUNCTION FOR STARTING AND STOPPING THE TIMER
    const startStopTimer = () => {
        isRunning ? setIsRunning(false) : setIsRunning(true);
    };

    // ONCLICK FUNCTION FOR RESETTING THE TIMER
    const resetTimer = () => {
        setIsRunning(false);
        setIsSession(true);
        setSessionLength(25);
        setBreakLength(5);
        setTimeLeft(25 * 60);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    // ONCLICK FUNCTION FOR ADDING MORE TIME TO SESSION TIMER
    const incrementSession = () => {
        if (!isRunning) {
            setSessionLength((prev) => {
                const newLength = Math.min(prev + 1, 60);
                setTimeLeft(newLength * 60); // Update timeLeft based on new session length
                return newLength;
            });
        }
    };

    // ONCLICK FUNCTION FOR ADDING LESS TIME TO SESSION TIMER
    const decrementSession = () => {
        if (!isRunning) {
            setSessionLength((prev) => {
                const newLength = Math.max(prev - 1, 1);
                setTimeLeft(newLength * 60); // Update timeLeft based on new session length
                return newLength;
            });
        }
    };

    // ONCLICK FUNCTION FOR ADDING MORE TIME TO BREAK TIMER
    const incrementBreak = () => {
        if (!isRunning) {
            setBreakLength((prev) => Math.min(prev + 1, 60));
        }
    };

    // ONCLICK FUNCTION FOR ADDING LESS TIME TO BREAK TIMER
    const decrementBreak = () => {
        if (!isRunning) {
            setBreakLength((prev) => Math.max(prev - 1, 1));
        }
    };

    // RETURN STATEMENT TO RENDER HTML ELEMENTS AND OTHER COMPONENTS TO THE DOM
    return (
        <div className="flex flex-col items-center p-6 bg-gray-200 min-h-screen">
            <audio
                id="beep"
                ref={audioRef}
                src="./alarm.mp3"></audio>
            <h1 className="text-3xl font-bold mb-6">Pomodoro Timer</h1>
            <div className="flex space-x-8">
                <Settings
                    id="session"
                    label="Session Length"
                    time={sessionLength}
                    increment={incrementSession}
                    decrement={decrementSession}
                />
                <Settings
                    id="break"
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
                status={isRunning}
                start_stop={startStopTimer}
                reset={resetTimer}
            />
        </div>
    );
};

export default App;
