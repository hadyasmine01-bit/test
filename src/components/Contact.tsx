"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-[#FAFAFA]">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold block mb-4">
            Connect With Us
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-brand-blue mb-6 uppercase font-lemon-milk">
            Start Your Progress
          </h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full origin-center" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards Grid */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold uppercase tracking-wider text-brand-blue font-lemon-milk">
                CTRL S Workspace
              </h3>
              <p className="text-brand-blue/70 font-light leading-relaxed text-sm">
                Have questions or want to tour our luxury space? Contact us directly or visit us in Monastir.
              </p>
            </motion.div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {/* Location */}
              <div className="sm:col-span-2 flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-blue/15 hover:border-brand-orange/40 transition-all duration-300 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-blue/60 mb-1 font-lemon-milk">Location</h4>
                  <p className="text-sm font-medium text-brand-blue leading-relaxed">
                    CTRL S Coworking Space<br />
                    R6 Avenue Avicenne, Facing Dental Faculty,<br />
                    Monastir, Tunisia
                  </p>
                </div>
              </div>

              {/* Phone */}
              <a 
                href="tel:+21670283230"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-blue/15 hover:border-brand-orange/40 transition-all duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-blue/60 mb-1 font-lemon-milk">Phone</h4>
                  <p className="text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors duration-300">
                    +216 70 283 230
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/21692277771"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-blue/15 hover:border-brand-orange/40 transition-all duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-blue/60 mb-1 font-lemon-milk">WhatsApp</h4>
                  <p className="text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors duration-300">
                    +216 92 277 771
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/control.and.study/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-blue/15 hover:border-brand-orange/40 transition-all duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors duration-300">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-blue/60 mb-1 font-lemon-milk">Instagram</h4>
                  <p translate="no" className="text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors duration-300">
                    @control.and.study
                  </p>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:contact@controlandstudy.com"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-blue/15 hover:border-brand-orange/40 transition-all duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-blue/60 mb-1 font-lemon-milk">Email</h4>
                  <p className="text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors duration-300">
                    contact@controlandstudy.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-6 h-full min-h-[420px]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-brand-blue/15 shadow-sm"
            >
              <iframe
                title="CTRL S Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.343888319696!2d10.826283711928065!3d35.76541267243912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130213813665bf93%3A0xdea77ced2179332f!2sCTRL%20S!5e0!3m2!1sen!2stn!4v1717200000000!5m2!1sen!2stn"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 transition-all duration-700 min-h-[420px]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
