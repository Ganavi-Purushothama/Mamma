import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Heart, Stars, Camera, MessageCircle, Sparkles, ChevronDown, Flower, Flower2, Sun, Cloud, Ghost, Smile, Star, Moon, Gift, Cake, PartyPopper, Music } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

const DOODLES = [
  { Icon: Flower, color: "text-rose-400" },
  { Icon: Flower2, color: "text-amber-600" },
  { Icon: Sun, color: "text-yellow-600" },
  { Icon: Cloud, color: "text-rose-200" },
  { Icon: Ghost, color: "text-rose-300" },
  { Icon: Smile, color: "text-emerald-800" },
  { Icon: Star, color: "text-amber-500" },
  { Icon: Moon, color: "text-rose-100" },
  { Icon: Gift, color: "text-red-800" },
  { Icon: Cake, color: "text-amber-700" },
  { Icon: PartyPopper, color: "text-rose-500" },
];

const FloatingDoodle = ({ top, left, delay, rotate }: { top: string, left: string, delay: number, rotate: number }) => {
  const { Icon, color } = DOODLES[Math.floor(Math.random() * DOODLES.length)];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2], 
        scale: [1, 1.2, 1],
        y: [0, -20, 0],
        rotate: [rotate, rotate + 10, rotate]
      }}
      transition={{ 
        duration: 4 + Math.random() * 2, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      className={`absolute z-0 pointer-events-none ${color}`}
      style={{ top, left, transform: `rotate(${rotate}deg)` }}
    >
      <Icon size={24 + Math.random() * 24} strokeWidth={1.5} />
    </motion.div>
  );
};

const MOMENTS = [
  { id: 1, url: "/20150828_184922_LLS.jpg", caption: "The prettiest" },
  { id: 2, url: "/20160417_110654.jpg", caption: "The most hardworking" },
  { id: 3, url: "/IMG20190228154436.jpg", caption: "The kindest" },
  { id: 4, url: "/IMG20190331114524.jpg", caption: "The cutest" },
  { id: 5, url: "/IMG20190331121515.jpg", caption: "The smartest" },
  { id: 6, url: "/IMG20191229104452.jpg", caption: "The most caring" },
  { id: 7, url: "/WhatsApp Image 2026-02-26 at 9.36.23 PM.jpeg", caption: "The best cook" },
  { id: 8, url: "/WhatsApp Image 2026-02-26 at 9.36.24 PM.jpeg", caption: "The best Mother and Wife" },
];

const CAROUSEL_PHOTOS = [
  "/WhatsApp Image 2026-02-25 at 11.37.19 AM.jpeg",
  "/WhatsApp Image 2026-02-25 at 11.37.20 AM.jpeg",
  "/WhatsApp Image 2026-02-25 at 11.38.44 AM (1).jpeg",
  "/WhatsApp Image 2026-02-25 at 11.38.44 AM (2).jpeg",
  "/WhatsApp Image 2026-02-25 at 11.38.44 AM.jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.00 PM (1).jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.00 PM.jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.01 PM (1).jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.01 PM (2).jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.01 PM.jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.02 PM (1).jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.02 PM (2).jpeg",
];

const MARQUEE_PHOTOS = [
  "/WhatsApp Image 2026-02-26 at 8.52.02 PM.jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.03 PM (1).jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.03 PM (2).jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.03 PM.jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.04 PM (1).jpeg",
  "/WhatsApp Image 2026-02-26 at 8.52.04 PM.jpeg",
  "/WhatsApp Image 2026-02-26 at 9.36.16 PM.jpeg",
  "/WhatsApp Image 2026-02-26 at 9.36.17 PM.jpeg",
];

const MESSAGES = [
  { from: "-Dear", text: "My dearest Angry Bird, a very happy birthday to you my love. It's 21 years we been together and not sure how days rolled out so fast...... Want you to be happy always my dear..... Desires to keep you Happy is like a hill but at present the luck point seems to be a Hell. I'm sure that God will never let me/you down and we'll definitely bounce back to the world. Have a wonderful year ahead my love 💕" },
  { from: "-Ganavi 🖤", text: "Happy birthday Mammaa, I love you soooo muchhh, ur the best and the most attentive mother ever, and ik as u say, no one cares as much as you do, and it's true, though its a lil overbearing sometimes, ik it's the way u show love, and i'm really greatful for it (PS, make more of my fav foods plej i love your cooking )" },
  { from: "-Neeta", text: "Yeshu,\nHappy birthday!🎉🎊\nEvery year is a blessing and todday we have the joy of celebrating yet another year in your life" },
  { from: "-Prapulla (Pappi)", text: "Hi Putani, First of all Many more happy returns of the day!! Sorry after a long time I am messaging you . I remember those days standing near the gate and having long long discussions with you. Do you remember all those things? Those were the best days we had spent together. I hope this birthday brings you a great year ahead. WITHHHH LOADSSSSS OFFFFFFF LOVEEEEEEE💗💗" },
  { from: "-Mummy", text: "Happy birthday putani 🎉🥰 Baba ninna channgitirali 🙌 ayashu arogya ishwarya kottu kapadali 🤝 sada Kushi tumbida jeevana ninndagali magale 🥰 god bless u putani♥️" },
  { from: "-Rekha & family", text: "Happy birthday putani have a great year ahead may all your dreams come true" },
  { from: "-Ganika ", text: "happy birthday chikammaaaa🎉🎉 \nps. pls send akka for sleepover 😝" },
  { from: "-Sridhar and family with loads of love❤️❤️❤️❤️", text: "Wishing a happy birthday to the strongest and phenomenal woman! 👩 🦾May your day be as fearless, bold, and beautiful as you are.\nYou make it happen with your will and passion.\nWishing you the best birthday yet" },

];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const [showLetter, setShowLetter] = useState(false);
  const [showCakePrompt, setShowCakePrompt] = useState(false);
  const [isMad, setIsMad] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (!confettiCanvasRef.current) return;

    const myConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true
    });

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      myConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      myConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-warm-accent/20 overflow-x-hidden">
      <canvas 
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-[100] w-full h-full"
      />
      {/* Background Doodles */}
      <FloatingDoodle top="10%" left="5%" delay={0} rotate={15} />
      <FloatingDoodle top="15%" left="85%" delay={1} rotate={-10} />
      <FloatingDoodle top="40%" left="10%" delay={2} rotate={45} />
      <FloatingDoodle top="60%" left="90%" delay={0.5} rotate={-20} />
      <FloatingDoodle top="80%" left="15%" delay={1.5} rotate={30} />
      <FloatingDoodle top="25%" left="75%" delay={2.5} rotate={10} />
      <FloatingDoodle top="50%" left="5%" delay={3} rotate={-35} />
      <FloatingDoodle top="70%" left="80%" delay={1.2} rotate={25} />
      <FloatingDoodle top="90%" left="40%" delay={0.8} rotate={-15} />
      <FloatingDoodle top="5%" left="50%" delay={2.2} rotate={5} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div 
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/Express-collage.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-6 flex justify-center items-center gap-4"
          >
            <Flower className="text-rose-400 w-8 h-8 animate-bounce" />
            <Sparkles className="text-warm-accent w-12 h-12" />
            <Flower2 className="text-amber-600 w-8 h-8 animate-bounce delay-100" />
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-serif mb-4 tracking-tight leading-none relative">
            <motion.span
              className="absolute -top-12 -left-12 opacity-40 hidden md:block"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Smile size={48} className="text-amber-500" />
            </motion.span>
            Happy birthday, <br />
            <span className="italic text-warm-accent font-serif">Yeshaswini</span>
            <motion.span
              className="absolute -bottom-8 -right-8 opacity-40 hidden md:block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart size={48} className="text-warm-accent" fill="currentColor" />
            </motion.span>
          </h1>
          
          <p className="text-xl md:text-2xl font-serif italic opacity-70 max-w-2xl mx-auto">
            Celebrating the woman who taught us everything about love, <br className="hidden md:block" />
            kindness, and the beauty of life.
          </p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Moments Gallery */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <Camera className="text-warm-accent" />
          <h2 className="text-4xl md:text-5xl font-serif italic">Beautiful Moments</h2>
          <div className="h-px flex-1 bg-warm-accent/20 ml-4"></div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {MOMENTS.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="break-inside-avoid group mb-8"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-warm-accent/5 shadow-lg">
                <img 
                  src={moment.url} 
                  alt={moment.caption}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-text/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <p className="font-serif italic text-lg opacity-80 text-center px-4">
                "{moment.caption}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="py-32 overflow-hidden bg-warm-accent/5">
        <div className="px-6 max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-4">
            <Sparkles className="text-warm-accent" />
            <h2 className="text-4xl md:text-5xl font-serif italic">A Journey in Photos</h2>
          </div>
          <p className="font-serif italic opacity-60 mt-4">Swipe or drag to see more memories...</p>
        </div>

        <motion.div 
          className="flex gap-8 px-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ right: 0, left: -4000 }} // Increased constraint for more photos
          whileTap={{ cursor: "grabbing" }}
        >
          {CAROUSEL_PHOTOS.map((url, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] md:min-w-[450px] rounded-2xl overflow-hidden shadow-2xl shadow-warm-accent/10 bg-white"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={url} 
                alt={`Carousel ${index}`} 
                className="w-full h-[500px] object-contain bg-warm-accent/5 pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Messages Section */}
      <section className="bg-warm-accent/5 py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="bg-white p-4 rounded-full shadow-lg mb-6">
              <MessageCircle className="text-warm-accent w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif italic">Messages for Yeshaswini</h2>
            <p className="font-serif italic opacity-60 mt-4">Heartfelt wishes from everyone who loves you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MESSAGES.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-warm-accent/5 relative group"
              >
                <div className="absolute -top-4 -left-4 bg-warm-accent text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart size={16} fill="currentColor" />
                </div>
                <p className="text-xl font-serif italic leading-relaxed mb-6 whitespace-pre-wrap">
                  "{msg.text}"
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-warm-accent tracking-wider uppercase text-sm">
                    {msg.from}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-20 overflow-hidden border-y border-warm-accent/10">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-8 pr-8"
          >
            {[...MARQUEE_PHOTOS, ...MARQUEE_PHOTOS, ...MARQUEE_PHOTOS].map((url, index) => (
              <div key={index} className="w-64 h-64 rounded-3xl overflow-hidden border-2 border-warm-accent/20 flex-shrink-0 shadow-lg">
                <img src={url} alt={`Marquee ${index}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Wish */}
      <section className="py-40 px-6 text-center overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10"
        >
          <Stars className="text-warm-accent w-16 h-16 mx-auto mb-8 opacity-40" />
          <h2 className="text-6xl md:text-8xl font-serif mb-8">We Love You</h2>
          <p className="text-xl md:text-2xl font-serif italic opacity-70 max-w-xl mx-auto mb-12">
            May your day be as beautiful as the love you give us every single day.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCakePrompt(true)}
            className="px-12 py-4 bg-warm-accent text-white rounded-full font-serif italic text-xl shadow-xl shadow-warm-accent/20 flex items-center gap-3 mx-auto"
          >
            <Heart size={20} fill="currentColor" />
            Open a Special Surprise
          </motion.button>
        </motion.div>

        {/* Cake Love Prompt Modal */}
        <AnimatePresence>
          {showCakePrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-warm-accent"></div>
                <Cake className="w-16 h-16 text-warm-accent mx-auto mb-6" />
                <h3 className="text-3xl font-serif mb-6 leading-tight">
                  Wait! Before you proceed...
                </h3>
                <p className="text-xl font-serif italic mb-8 text-warm-text/80">
                  "Do you promise that you absolutely love the cake we got you and you aren't even a little bit mad about it?" 🎂✨
                </p>

                {isMad && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 font-serif italic mb-6"
                  >
                    Error: Incorrect answer! Pappa and Ganavi are currently hiding... 🏃‍♂️💨 Try again!
                  </motion.p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => {
                      setShowCakePrompt(false);
                      setShowLetter(true);
                      setIsMad(false);
                    }}
                    className="px-8 py-3 bg-warm-accent text-white rounded-full font-serif italic text-lg shadow-lg hover:bg-warm-accent/90 transition-colors w-full sm:w-auto"
                  >
                    Yes, I love it! ❤️
                  </button>
                  
                  <motion.button
                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                    onHoverStart={() => {
                      setNoButtonPos({
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 100 - 50
                      });
                    }}
                    onClick={() => {
                      setIsMad(true);
                      setNoButtonPos({
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 100 - 50
                      });
                    }}
                    className="px-8 py-3 border-2 border-warm-accent/20 text-warm-accent/60 rounded-full font-serif italic text-lg hover:bg-warm-accent/5 transition-colors w-full sm:w-auto"
                  >
                    No, I'm mad! 😤
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Surprise Letter Modal */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowLetter(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 100, rotate: -5 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.8, y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#fffcf5] w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-12 rounded-sm shadow-2xl relative border-t-[30px] border-warm-accent/10"
                style={{
                  backgroundImage: "radial-gradient(#d1d1d1 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              >
                <button 
                  onClick={() => setShowLetter(false)}
                  className="absolute top-4 right-4 text-warm-accent/40 hover:text-warm-accent transition-colors"
                >
                  Close
                </button>
                <div className="font-serif italic text-2xl md:text-3xl text-warm-text leading-relaxed space-y-6">
                  <p>Dearest Yeshaswini,</p>
                  <p>
                    I know how much you have been through and how much hard work you do so me and pappa have the most comfort. 
                    We love you so much!
                  </p>
                  <p>
                    All your tantrums and quarrels are what make you, YOU. Even though it sometimes annoys, 
                    it's what shows you care.
                  </p>
                  <p>
                    We love you so much and don't say it enough, so once for all the times we haven't said it...
                  </p>
                  <p className="text-right mt-8 md:mt-12 pb-6">
                    We love you,<br />
                    <span className="text-warm-accent font-bold not-italic">Putaniii ❤️</span>
                  </p>
                </div>
                
                {/* Decorative doodles inside letter */}
                <div className="absolute -bottom-6 -right-6">
                  <Flower size={64} className="text-pink-200 rotate-12" />
                </div>
                <div className="absolute -top-10 -left-6">
                  <Sparkles size={48} className="text-yellow-200 -rotate-12" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-warm-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-warm-accent/5 rounded-full blur-3xl"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-warm-accent/10 text-center opacity-40">
        <p className="font-serif italic text-sm">Made with love for Mom • 2026</p>
      </footer>
    </div>
  );
}
