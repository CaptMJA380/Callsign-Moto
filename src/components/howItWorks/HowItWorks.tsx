import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Edition',
      desc: 'Select from our 3 signature formats: Name Tab, Name + Blood Group, or the Indian Tricolour Edition.'
    },
    {
      num: '02',
      title: 'Enter Callsign',
      desc: 'Type your official highway callsign or nickname and pick your medical blood group.'
    },
    {
      num: '03',
      title: 'Live Preview',
      desc: 'Inspect the high-resolution vector embroidery preview with authentic rayon thread sheen.'
    },
    {
      num: '04',
      title: 'Precision Craft',
      desc: 'Digitised and embroidered on 1000D Cordura, inspected, and dispatched across India.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#F5F5F7]/80 dark:bg-black/70 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[12px] font-sans text-[#86868B] uppercase tracking-widest block mb-2 font-medium">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
            Four simple steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-3xl glass-panel p-6 flex flex-col justify-between hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-xs text-[#86868B] block mb-6 font-semibold">
                  {step.num}
                </span>

                <h3 className="text-base font-sans font-semibold text-[#1D1D1F] dark:text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-[#86868B] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-[11px] font-mono text-zinc-500">
                Step {step.num} of 04
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
