import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      e.target.reset();
    }, 2000);
  };

  const faqData = [
    { q: "How do I track my order?", a: "You can track your order by clicking the tracking link in your shipping confirmation email or by logging into your account." },
    { q: "What is your return policy?", a: "We offer a 30-day return policy for all unused items in original packaging. Refunds are processed within 5-7 business days." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 10 countries. International shipping costs are calculated at checkout." },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      
      {/* 1. HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 max-w-xl mx-auto"
        >
          Have a question or just want to say hi? We'd love to hear from you. Our team is always here to help.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
        
        {/* 2. LEFT COLUMN: INFO & FAQ */}
        <div className="space-y-8">
            
            {/* Contact Cards */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Email Us</h3>
                            <p className="text-gray-500 text-sm mb-1">Our friendly team is here to help.</p>
                            <a href="mailto:support@shopx.com" className="text-purple-600 font-semibold hover:underline">support@shopx.com</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Office</h3>
                            <p className="text-gray-500 text-sm mb-1">Come say hello at our office HQ.</p>
                            <p className="text-gray-900 font-medium">100 Smith Street, Pune, India 411001</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Phone</h3>
                            <p className="text-gray-500 text-sm mb-1">Mon-Fri from 8am to 5pm.</p>
                            <p className="text-gray-900 font-medium">+91 90000 00000</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare size={20} className="text-purple-600" /> Frequent Questions
                </h3>
                <div className="space-y-4">
                    {faqData.map((item, i) => (
                        <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                            <button 
                                onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                className="w-full flex justify-between items-center text-left font-semibold text-gray-800 hover:text-purple-600 transition"
                            >
                                {item.q}
                                {activeAccordion === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {activeAccordion === i && (
                                <motion.p 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="text-gray-500 text-sm mt-2 leading-relaxed"
                                >
                                    {item.a}
                                </motion.p>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

        {/* 3. RIGHT COLUMN: CONTACT FORM */}
        <div className="lg:col-span-2">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 h-full relative overflow-hidden"
            >
                {/* Success Overlay */}
                {formStatus === 'success' && (
                    <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <Send size={32} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-gray-500 max-w-md">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                        <button onClick={() => setFormStatus('idle')} className="mt-8 text-purple-600 font-bold hover:underline">Send another message</button>
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                    <p className="text-gray-500">We usually respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">First Name</label>
                            <input type="text" placeholder="John" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Last Name</label>
                            <input type="text" placeholder="Doe" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input type="email" placeholder="john@example.com" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Message</label>
                        <textarea rows="5" placeholder="How can we help you?" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none" />
                    </div>

                    <button 
                        type="submit" 
                        disabled={formStatus === 'sending'}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {formStatus === 'sending' ? (
                            "Sending..."
                        ) : (
                            <>Send Message <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>

      </div>

      {/* 4. MAP SECTION (Optional Visual) */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
         <div className="w-full h-80 bg-gray-200 rounded-3xl overflow-hidden relative grayscale hover:grayscale-0 transition duration-700">
            {/* Using an image to simulate a map for now */}
            <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80" 
                className="w-full h-full object-cover opacity-80"
                alt="Office Map" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
                 <button className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition">
                    <MapPin size={20} className="text-purple-600" /> View on Google Maps
                 </button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Contact;