"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate contact form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-[#07090E]">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold block mb-4">
            Connect With Us
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 uppercase">
            Start Your Progress
          </h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full origin-center" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Cards and Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-2xl font-bold uppercase tracking-wider text-white">
                CTRL S Workspace
              </h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Have questions or want to tour our luxury space? Drop us a line, send a WhatsApp, or call directly. We are ready to help you save your progress.
              </p>

              {/* Info Items */}
              <div className="flex flex-col gap-5 mt-4">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D111A] border border-dark-border/40 hover:border-brand-orange/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">Location</h4>
                    <p className="text-sm font-medium text-white leading-relaxed">
                      CTRL S Coworking Space<br />
                      R6 Avenue Avicenne,<br />
                      Facing the Dental Faculty, Monastir, Tunisia
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <a 
                  href="tel:+21670283230"
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0D111A] border border-dark-border/40 hover:border-brand-orange/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">Phone</h4>
                    <p className="text-sm font-semibold text-white group-hover:text-brand-orange transition-colors duration-300">
                      +216 70 283 230
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/21692277771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0D111A] border border-dark-border/40 hover:border-brand-orange/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] flex-shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">WhatsApp</h4>
                    <p className="text-sm font-semibold text-white group-hover:text-brand-orange transition-colors duration-300">
                      +216 92 277 771
                    </p>
                  </div>
                </a>

                {/* Instagram */}
<a 
  href="https://www.instagram.com/control.and.study/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-4 p-4 rounded-xl bg-[#0D111A] border border-dark-border/40 hover:border-brand-orange/30 transition-all duration-300 group"
>
  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 flex-shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300">
    <InstagramIcon className="w-5 h-5" />
  </div>

  <div>
    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">
      Instagram
    </h4>

    <p 
      translate="no"
      className="text-sm font-semibold text-white group-hover:text-brand-orange transition-colors duration-300"
    >
      @control.and.study
    </p>
  </div>
</a>

                {/* Email (Editable placeholder) */}
                <a 
                  href="mailto:contact@controlandstudy.com"
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0D111A] border border-dark-border/40 hover:border-brand-orange/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">Email</h4>
                    <p className="text-sm font-semibold text-white group-hover:text-brand-orange transition-colors duration-300">
                      contact@controlandstudy.com
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Maps & Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Interactive Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#0D111A] border border-dark-border/60 rounded-2xl p-8 relative"
            >
              <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6">
                Send A Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-slate-400">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#07090E] border border-dark-border/80 focus:border-brand-orange/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-slate-400">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#07090E] border border-dark-border/80 focus:border-brand-orange/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs uppercase tracking-wider font-semibold text-slate-400">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-[#07090E] border border-dark-border/80 focus:border-brand-orange/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300"
                    placeholder="Inquiry or Tour Booking"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold text-slate-400">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#07090E] border border-dark-border/80 focus:border-brand-orange/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`mt-2 py-4 rounded-xl flex items-center justify-center gap-2 font-bold tracking-wider text-sm transition-all duration-500 cursor-pointer ${
                    submitted
                      ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-brand-orange text-white hover:bg-brand-orange/95 hover:shadow-[0_0_15px_rgba(214,90,45,0.3)]"
                  }`}
                >
                  {submitted ? (
                    "Thank You! Message Sent Successfully"
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Google Map Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-dark-border/60"
            >
              <iframe
                title="CTRL S Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.343888319696!2d10.826283711928065!3d35.76541267243912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130213813665bf93%3A0xdea77ced2179332f!2sCTRL%20S!5e0!3m2!1sen!2stn!4v1717200000000!5m2!1sen!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
