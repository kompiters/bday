import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Moon, Sun, Heart, ThumbsDown, Utensils, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';
import babyImg from '/baby.png'; // Vite will handle this relative to public or src depending on config, but for public assets in repo, standard img src might need base.
// Better approach for GH pages with public folder: use absolute path with base or import if in assets. 
// Since they are in public, we can use the base path or move them to assets. 
// Let's use the `import.meta.env.BASE_URL` approach which is standard for public dir access in Vite.

const BASE_URL = import.meta.env.BASE_URL;

const useWindowSizeHook = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useEffect(() => {
        const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
};
const CelebrationScene = () => {
    const [width, height] = useWindowSizeHook();

    // Debug Version
    useEffect(() => {
        console.log("App Version: v2.5 - Scroll Fade & New Text");
    }, []);

    const [showConfetti, setShowConfetti] = useState(true);
    const [feedback, setFeedback] = useState(null);
    const [proposalResponse, setProposalResponse] = useState(null);

    // EMAILJS CONFIG
    const PUBLIC_KEY = 'hnxwpukjvnz6DngDj';

    const SERVICE_ID = 'service_iaip1oi';
    const TEMPLATE_ID = 'template_62rg998';

    const sendEmail = (message) => {
        const templateParams = {
            message: message,
            to_email: 'fatihsafak@me.com',
            from_name: 'Birthday App',
            to_name: 'Fatih'
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((result) => {
                console.log('Email sent:', result.text);
                // alert('Mail gönderildi! (Test için ekrana yazdırıldı)');
            }, (error) => {
                console.log('Email failed:', error.text);
                alert('Mail gönderilemedi! Hata: ' + JSON.stringify(error));
            });
    };

    // Stop initial confetti after 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", bounce: 0.4, duration: 0.8 }
        }
    };

    const handleLike = () => {
        setFeedback('liked');
        setShowConfetti(true); // Restart confetti for positive vibe
        sendEmail('Beğendi! (Liked)');
    };

    const handleDislike = () => {
        setFeedback('disliked');
        setShowConfetti(false);
        sendEmail('Beğenmedi... (Disliked)');
    };

    const handleAcceptProposal = () => {
        setProposalResponse('accepted');
        setShowConfetti(true);
        sendEmail('Pasta TEKLİFİNİ KABUL ETTİ! (Accepted Proposal)');
    };

    const [hasScrolled, setHasScrolled] = useState(false);

    const handleScroll = (e) => {
        if (e.target.scrollTop > 50) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    };

    return (
        <div
            onScroll={handleScroll}
            className="h-screen w-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 overflow-x-hidden overflow-y-auto pb-40 relative touch-pan-y"
        >
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={feedback === 'liked' ? 800 : 300} recycle={feedback === 'liked'} />}

            {/* DEBUG VERSION MARKER */}


            {/* Scroll Indicator - Right Side */}
            <motion.div
                className="fixed right-6 bottom-10 z-50 flex flex-col items-center gap-2 pointer-events-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                    opacity: hasScrolled ? 0 : 1,
                    x: 0,
                    y: [0, 10, 0]
                }}
                transition={{
                    opacity: { duration: 0.5 },
                    x: { delay: 2, duration: 1 },
                    y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
            >
                <span className="text-white/60 text-xs font-light writing-vertical-rl">Scroll Down</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 backdrop-blur-sm bg-black/10">
                    <motion.div
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>

            <div className="max-w-4xl mx-auto px-4 pt-20 flex flex-col items-center">

                {/* Baby Reveal */}
                <motion.div
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 mb-10"
                >
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
                    <video
                        src={`${BASE_URL}aleyna_video.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="relative z-10 w-full h-full object-cover rounded-full drop-shadow-2xl border-4 border-white/20"
                        style={{ objectPosition: 'center 20%' }} // Slight top focus for faces usually
                    />
                </motion.div>

                {/* Header Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">Happy Birthday Aleyna!</h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light">Welcome to the world!</p>
                </motion.div>

                {/* Scrolling Text Section */}
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={cardVariants}
                    className="glass-panel w-full p-8 rounded-3xl mb-12 bg-white/10 backdrop-blur-md border border-white/20"
                >
                    <div className="h-64 overflow-hidden relative">
                        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/10 to-transparent z-10"></div>
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/10 to-transparent z-10"></div>

                        <div className="animate-[scroll_40s_linear_infinite] text-lg text-center leading-relaxed text-white space-y-8">
                            <p className="font-bold text-xl text-yellow-200">✨ 12 Şubat, Saat 13.30 ✨</p>
                            <p>Dünyaya sadece güzellik ve neşe değil;<br />keskin bir zekâ ve sınır tanımayan bir yaratıcılık geldi.</p>
                            <p>Henüz o an belliydi: <strong>Aleyna</strong>, yenilikçi bakış açısıyla EDM’ye vizyon katacak ve başarı çıtasını en üste taşıyacaktı.</p>
                            <p className="text-pink-300 font-bold text-xl">O parlak yıldız şimdi yeni yaşına giriyor!</p>
                            <p>Geleceğin parlak yıldızı, vizyonunla ilham vermeye devam et!</p>
                            <p>Bugüne kadar geçen yıllarından çok daha güzel, bol kahkahalı ve her anı mutlulukla dolu bir yaş seninle olsun. 😌</p>
                            <p className="font-bold text-2xl text-pink-400">İyi ki doğdun Aleyna! 🎂</p>
                            <p>Nice sağlıklı, huzurlu ve başarı dolu yıllara...</p>
                        </div>
                    </div>
                </motion.div>

                {/* Horizontal Info Cards (Carousel) */}
                <div className="w-full space-y-8 mb-20">
                    <h2 className="text-2xl font-bold text-white pl-4 mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6" /> On This Day
                    </h2>
                    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory px-4 no-scrollbar">

                        {/* Card 1: Events */}
                        <motion.div
                            className="glass-panel min-w-[300px] md:min-w-[350px] p-6 rounded-3xl snap-center flex-shrink-0 bg-gradient-to-br from-white/10 to-yellow-500/10 border-white/20"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="text-xl font-bold text-yellow-300 mb-4">Tarihte Bugün (12 Şubat)</h3>
                            <ul className="space-y-3 text-sm text-white/90">
                                <li className="flex gap-2"><span>🎤</span> 1946 - Süperstar Ajda Pekkan doğdu.</li>
                                <li className="flex gap-2"><span>🦁</span> 1911 - Galatasaray, Fenerbahçe'yi 7-0 yendi.</li>
                                <li className="flex gap-2"><span>🎮</span> 1990 - Super Mario Bros. 3 yayınlandı.</li>
                                <li className="flex gap-2"><span>🎩</span> 1809 - Abraham Lincoln doğdu.</li>
                                <li className="flex gap-2 text-lg font-bold text-pink-200 mt-2"><span>👸🏻</span> Ve tabiki ALEYNA!</li>
                            </ul>
                        </motion.div>

                        {/* Card 2: Horoscope */}
                        <motion.div
                            className="glass-panel min-w-[300px] md:min-w-[400px] p-6 rounded-3xl snap-center flex-shrink-0 bg-gradient-to-br from-white/10 to-purple-500/10 border-white/20"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="text-xl font-bold text-purple-300 mb-4">Kova Burcu (Aquarius)</h3>
                            <p className="text-sm text-white/90 mb-4 italic">"Özgür ruhlu, zeki ve tam bir gelecek insanıdır."</p>

                            <div className="space-y-3 text-sm text-white/80">
                                <p><strong>🚀 Zeka ve Vizyon:</strong> İlerici, yenilikçi ve dahi fikirlerle doludur.</p>
                                <p><strong>🕊️ Bağımsızlık:</strong> Özgürlüğüne düşkündür, kısıtlanmaya gelemez.</p>
                                <p><strong>🦄 Sıra Dışı:</strong> Herkesten farklı olmayı sever, "marjinal" bir duruşu vardır.</p>
                                <p><strong>🤝 Hümanist:</strong> Toplumun iyiliği için çalışır, adalet duygusu çok güçlüdür.</p>
                                <p><strong>🧊 Mesafeli:</strong> Duygularından ziyade mantığıyla hareket eder.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Surprise Video */}
                <motion.div
                    className="w-full max-w-[280px] md:max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                        <video
                            src={`${BASE_URL}bdays.mov`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </motion.div>

                {/* Footer Feedback Section */}
                <motion.div
                    className="w-full max-w-md mx-auto text-center pb-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <p className="text-white/70 mb-6 italic">Bu minik sürprizi nasıl buldun?</p>

                    {!feedback && (
                        <div className="flex flex-col gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLike}
                                className="w-full bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md border border-green-400/30 text-green-100 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all"
                            >
                                <Heart className="w-6 h-6 fill-current" />
                                Beğendim, Teşekkür Ederim
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDislike}
                                className="w-full bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md border border-red-400/30 text-red-100 font-medium py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all"
                            >
                                <ThumbsDown className="w-5 h-5" />
                                Kötü bir fikirdi
                            </motion.button>
                        </div>
                    )}

                    {/* Feedback Response: DISLIKED */}
                    {feedback === 'disliked' && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-red-500/20 backdrop-blur-md border border-red-400/30 p-6 rounded-2xl"
                        >
                            <p className="text-xl font-bold text-white mb-2">Olamaz! 😢</p>
                            <p className="text-white/80">Tamam tamam, seneye daha iyisini yaparız söz!</p>
                        </motion.div>
                    )}
                </motion.div>

            </div>

            {/* Proposal Overlay: LIKED */}
            <AnimatePresence>
                {feedback === 'liked' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-slate-900/90 border border-white/20 p-8 rounded-3xl max-w-sm w-full shadow-2xl relative overflow-hidden"
                        >
                            {/* Background decoration */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>

                            {!proposalResponse ? (
                                <>
                                    <div className="flex justify-center mb-6">
                                        <div className="bg-white/10 p-4 rounded-full">
                                            <Utensils className="w-8 h-8 text-yellow-300" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white text-center mb-4">Madem beğendin...</h3>
                                    <p className="text-white/90 text-center mb-8 text-lg leading-relaxed">
                                        Birdahaki organizasyonda  <br />
                                        Doğum günü pastanız benden 😇
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleAcceptProposal}
                                            className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl"
                                        >

                                            Olur! 🎂
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setProposalResponse('maybe')}
                                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center"
                                        >
                                            Pastaya kanmam <br />
                                            Hediyemi isterim 😒
                                        </motion.button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    {proposalResponse === 'accepted' ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="text-6xl mb-4"
                                            >
                                                🥳
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Harika!</h3>
                                            <p className="text-white/80">O zaman anlaştık! Sıradaki organizasyonda görüşmek üzere. 😁</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-6xl mb-4">🥳</div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Haklısın 😅</h3>
                                            <p className="text-white/80">En kısa zamanda kargoda</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateY(60%); }
                    100% { transform: translateY(-130%); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default CelebrationScene;
