import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Cross, ShoppingCart, Film, Camera, MessageCircle, 
  MapPin, Train, Plane, GraduationCap, Landmark, ChevronDown 
} from 'lucide-react';

const usages = [
  { icon: Building2, name: "Banks", desc: "Manage accounts, transactions, balances, and prevent fraud in real-time." },
  { icon: Cross, name: "Hospitals", desc: "Store patient records, medical history, prescriptions, and billing securely." },
  { icon: ShoppingCart, name: "Amazon", desc: "Track inventory, user carts, orders, payments, and product catalogs." },
  { icon: Film, name: "Netflix", desc: "Store movies, user watch history, recommendations, and billing details." },
  { icon: Camera, name: "Instagram", desc: "Manage billions of photos, likes, comments, followers, and user profiles." },
  { icon: MessageCircle, name: "WhatsApp", desc: "Route messages, store contacts, backup chat histories, and manage groups." },
  { icon: MapPin, name: "Google Maps", desc: "Store locations, routes, traffic data, reviews, and business information." },
  { icon: Train, name: "Railways", desc: "Handle reservations, seat availability, train schedules, and cancellations." },
  { icon: Plane, name: "Airlines", desc: "Manage flight schedules, ticketing, boarding passes, and crew assignments." },
  { icon: GraduationCap, name: "College", desc: "Store student info, attendance, grades, fees, and course registrations." },
  { icon: Landmark, name: "Government", desc: "Manage taxes, citizen records, voting data, passports, and public services." }
];

const UsageSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleScroll = () => {
    const nextSection = document.getElementById('myth-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="usage-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center glow-text-purple">
        Where Do We Use DBMS?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 w-full max-w-7xl mb-16">
        {usages.map((usage, idx) => {
          const Icon = usage.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCard(activeCard === idx ? null : idx)}
              className={`cursor-pointer glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all min-h-[160px]
                ${activeCard === idx ? 'border-[var(--color-neon-purple)] bg-[var(--color-galaxy-700)] shadow-[0_0_20px_rgba(176,38,255,0.4)]' : 'border-gray-700 hover:border-[var(--color-neon-cyan)] hover:bg-[var(--color-galaxy-800)]'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`mb-4 ${activeCard === idx ? 'text-[var(--color-neon-purple)]' : 'text-gray-400'}`}>
                <Icon size={40} />
              </div>
              <h3 className={`font-bold text-lg ${activeCard === idx ? 'text-white' : 'text-gray-300'}`}>
                {usage.name}
              </h3>
            </motion.div>
          );
        })}
      </div>

      <div className="h-[120px] w-full max-w-3xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeCard !== null ? (
            <motion.div
              key="detail-panel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full glass-panel p-6 rounded-xl border border-[var(--color-neon-purple)] bg-[var(--color-galaxy-800)] text-center flex flex-col items-center justify-center h-full"
            >
              <p className="text-xl text-white">
                <strong className="text-[var(--color-neon-purple)] mr-2">{usages[activeCard].name}:</strong>
                {usages[activeCard].desc}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-lg animate-pulse"
            >
              Click on any sector to discover its database usage
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleScroll}
        className="mt-12 px-6 py-2 rounded-full flex items-center gap-2 font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 transition-colors"
      >
        Continue <ChevronDown size={20} />
      </motion.button>
    </section>
  );
};

export default UsageSection;
