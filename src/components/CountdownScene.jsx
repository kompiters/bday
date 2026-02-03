import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const TARGET_DATE = new Date('2026-02-12T13:30:00');
const BASE_URL = import.meta.env.BASE_URL;

const CountdownScene = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +TARGET_DATE - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const tl = calculateTimeLeft();
            setTimeLeft(tl);
            if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
                clearInterval(timer);
                onComplete();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">

            {/* Stars Background */}
            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        initial={{ opacity: Math.random() }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: Math.random() * 3 + 'px',
                            height: Math.random() * 3 + 'px',
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-10">

                {/* Orbiting System */}
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">

                    {/* Sun Orbit */}
                    <motion.div
                        className="absolute w-full h-full rounded-full border border-white/5 pointer-events-none"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-yellow-400/20 p-2 rounded-full backdrop-blur-md">
                                <Sun size={32} className="text-yellow-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Moon Orbit */}
                    <motion.div
                        className="absolute w-3/4 h-3/4 rounded-full border border-white/5 pointer-events-none"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                            <div className="bg-slate-400/20 p-2 rounded-full backdrop-blur-md">
                                <Moon size={24} className="text-slate-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Central Earth - Click to Celebrate */}
                    <motion.div
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)] relative z-20 cursor-pointer active:scale-95 transition-transform"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        onClick={() => {
                            console.log("Earth clicked!");
                            onComplete();
                        }}
                    >
                        <img src={`${BASE_URL}earth.png`} alt="Earth" className="w-full h-full object-cover" />
                        {/* Atmosphere Glow */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                    </motion.div>
                </div>

                {/* Timer Card - Placed below/separate on mobile layout naturally via flex-col */}
                <motion.div
                    className="relative z-30 w-full max-w-xs px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="glass-panel rounded-2xl p-6 text-center backdrop-blur-xl bg-white/10 border border-white/20">
                        <h2 className="text-white/80 text-sm tracking-widest uppercase mb-4 font-light">Countdown</h2>
                        <div className="flex justify-between items-center text-white">
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold font-mono">{timeLeft.days}</span>
                                <span className="text-[10px] uppercase text-white/50">Days</span>
                            </div>
                            <span className="text-xl text-white/30">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="text-[10px] uppercase text-white/50">Hrs</span>
                            </div>
                            <span className="text-xl text-white/30">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className="text-[10px] uppercase text-white/50">Min</span>
                            </div>
                            <span className="text-xl text-white/30">:</span>
                            <div className="flex flex-col items-center">
                                <motion.span
                                    key={timeLeft.seconds}
                                    initial={{ y: -5, opacity: 0.5 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-3xl font-bold font-mono text-blue-300"
                                >
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </motion.span>
                                <span className="text-[10px] uppercase text-white/50">Sec</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CountdownScene;
