//import { useEffect} from 'react';
import LoginForm from '../components/LoginForm';
import { IconAlertTriangle } from '@tabler/icons-react';
//import { gsap} from 'gsap';
//import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

*/
export default function Home() {
  /*useEffect(() => {
    // Animate hero title and description on load
    gsap.from(".hero-title", {
      opacity: 0,
      y: -20,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(".hero-description", {
      opacity: 0,
      y: 20,
      delay: 0.5,
      duration: 1.5,
      ease: "power3.out",
    });

    // Scroll-triggered animations for sections
    gsap.from(".fade-up", {
      opacity:0,
      y: 30,
      duratin: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fade-up",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      
    });

    // For badge animation
    gsap.from(".footer-badge", {
      opacity: 0,
      y: 20,
      delay: 1,
      duration: 1,
      ease: "power3.out",
    });
  }, []); */

  return (
    <div className="relative min-h-screen">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* First blob */}
        <div 
          className="absolute left-[50vw] top-[50vh] -translate-x-1/2 -translate-y-1/2 
          w-[300px] h-[300px] 
          bg-gradient-to-r dark:from-blue-500/30 dark:to-purple-500/30 from-blue-300/40 to-sky-300/40 
          rounded-[60%_40%_70%_30%] blur-3xl 
          animate-blob-1" 
        />
        
        {/* Second blob */}
        <div 
          className="absolute left-[50vw] top-[50vh] -translate-x-1/2 -translate-y-1/2 
          w-[400px] h-[400px] 
          bg-gradient-to-r dark:from-red-500/30 dark:to-pink-500/30 from-orange-300/40 to-yellow-300/40 
          rounded-[70%_30%_50%_50%] blur-3xl 
          animate-blob-2" 
        />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-8 backdrop-blur-lg bg-white/20 dark:bg-black/20 p-8 rounded-2xl border border-black/10 dark:border-white/10">
          {/* Maintenance Badge */}
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <IconAlertTriangle size={20} />
              <span>All systems working!</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-blue-400 dark:to-red-400 bg-clip-text text-transparent">
            MU Calendar Sync
          </h1>
          <p className="text-center text-gray-700 dark:text-gray-300">
            Seamlessly sync your <a 
              href="https://muerp.mahindrauniversity.edu.in/login.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors underline"
            > MUERP</a> timetable with Google Calendar, iCalendar, and more!
          </p>
          <LoginForm />
        </div>
      </main>

      {/* Footer Badge */}
      <div className="fixed bottom-4 right-4 z-20 flex gap-3">
        {/* Made by badge */}
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
          <span>Made with 🦖 by</span>
          <a 
            href="https://github.com/markvi2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            AviatorGator
          </a>
        </div>

        {/* Version badge */}
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
          <span>v0.1.0-beta</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        {/*Privacy Policy*/}
        <div className = "bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
          <a 
            href = "https://drive.google.com/file/d/1MCrN5cnivI21gfFpT3fzml6IAYiLo7bi/view?usp=sharing"
            target = "_blank"
            rel = "noopener noreferrer"
            className = "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Privacy Policy
            </a>
        </div>
      </div>
    </div>
  )
}