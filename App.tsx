
import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

const App: React.FC = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 flex flex-col">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid-white -z-10" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full -z-10" />

      <Header onCtaClick={scrollToCalculator} />
      
      <main className="flex-grow">
        <Hero onCtaClick={scrollToCalculator} />
        <section ref={calculatorRef} className="py-20 px-4">
          <Calculator />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
