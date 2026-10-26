import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do I choose my name and blood group?',
    answer: 'In our Studio Customiser, select your preferred product edition (Variant A, B, or C). Type your name or road callsign into the input field (up to 14 characters depending on the variant). If you select Variant B or C, pick your certified blood group from the selectable list (A+, A-, B+, B-, AB+, AB-, O+, O-).'
  },
  {
    question: 'How long does customisation and dispatch take?',
    answer: 'Because every tab is individually set up on our precision embroidery machines, custom production typically takes 2 to 3 business days. Once inspected and packed, express shipping across India takes an additional 2 to 4 business days depending on your PIN code.'
  },
  {
    question: 'Will the tab fit my specific motorcycle jacket?',
    answer: 'Our tabs measure 125mm × 30mm (5.0" × 1.2"), which is the standard size for chest and sleeve Velcro loop panels on jackets from Rynox, Royal Enfield, Dainese, Alpinestars, Viaterra, and MotoTech. Furthermore, every order includes a complimentary matching loop swatch that can be stitched onto any textile or leather jacket that lacks a factory loop area.'
  },
  {
    question: 'Can I use a club callsign or nickname instead of my real name?',
    answer: 'Yes. Many touring riders and motorcycle club members prefer their road callsigns (e.g., GHOST, MAVERICK, VIPER, BULLET). As long as it is within the character limit, you can use any alphanumeric name or moniker.'
  },
  {
    question: 'Can I order multiple tabs with different names in the same order?',
    answer: 'Yes. Customise your first tab and click "Add to Cart". Then return to the customiser, enter the new name and blood group, and add the second tab to your cart. All tabs will be bundled into one parcel.'
  },
  {
    question: 'Can I place a motorcycle club or bulk expedition order?',
    answer: 'Yes, we provide custom club batches for touring groups and regional chapters. For orders of 10 or more tabs with custom club threads, reach out to us at hq@callsignmoto.in for bulk pricing.'
  },
  {
    question: 'What happens if my name is spelt incorrectly?',
    answer: 'We embroider the exact spelling you enter and confirm in your cart and order snapshot. If you notice a typo immediately after placing your order, email our fulfilment desk within 2 hours with your Order ID so we can update the stitch file before production begins.'
  },
  {
    question: 'What are the shipping charges and return policies?',
    answer: 'We offer standard flat-rate express delivery across India for ₹49, with free shipping on orders of ₹999 or more. Because each tab is personalised with your unique name and blood group, custom items cannot be returned for change of mind. Defective items are 100% remade and replaced.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#F5F5F7]/80 dark:bg-black/70 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        
        <div className="text-center mb-16">
          <span className="text-[12px] font-sans text-[#86868B] uppercase tracking-widest block mb-2 font-medium">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
            Questions &amp; Answers
          </h2>
        </div>

        <div className="divide-y divide-black/[0.08] dark:divide-white/[0.08]">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-sans text-base sm:text-lg font-medium text-[#1D1D1F] dark:text-white group-hover:opacity-80 transition-opacity">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#86868B] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-black dark:text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-[#86868B] leading-relaxed pr-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
