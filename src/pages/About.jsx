import { motion } from "framer-motion";
import { Award, Users, Globe, Heart, CheckCircle, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-12 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900"
        >
          We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">ShopX.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto"
        >
          Redefining the digital shopping experience since 2025. We believe in quality, innovation, and customer obsession.
        </motion.p>
      </section>

      {/* 2. OUR STORY (Split Layout) */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-600 rounded-3xl rotate-3 opacity-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              className="relative rounded-3xl shadow-xl w-full"
              alt="Our Team" 
            />
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              It started with a simple idea: <strong>Shopping should be effortless.</strong> 
              <br/><br/>
              Founded in a small garage in 2024, ShopX has grown into a global platform connecting millions of customers with the brands they love. We are not just selling products; we are curating a lifestyle.
            </p>
            <div className="flex gap-4">
               <div className="flex flex-col">
                  <span className="text-4xl font-bold text-purple-600">50k+</span>
                  <span className="text-sm text-gray-500">Happy Customers</span>
               </div>
               <div className="w-px bg-gray-200 h-12 mx-4"></div>
               <div className="flex flex-col">
                  <span className="text-4xl font-bold text-purple-600">12+</span>
                  <span className="text-sm text-gray-500">Countries Served</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="bg-gray-50 py-24 px-6 mb-24">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-gray-500">The values that drive everything we do.</p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <Award size={32} />, title: "Quality First", desc: "We never compromise on the quality of our products." },
                { icon: <Users size={32} />, title: "Customer Obsessed", desc: "24/7 support because you deserve the best." },
                { icon: <Globe size={32} />, title: "Global Shipping", desc: "Fast delivery to over 10 countries worldwide." },
                { icon: <Heart size={32} />, title: "Eco Friendly", desc: "Commitment to sustainable packaging." }
              ].map((item, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center"
                 >
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                       {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. MEET THE TEAM */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
         <h2 className="text-3xl font-bold mb-12 text-center">Meet the Minds</h2>
         <div className="grid md:grid-cols-3 gap-8">
            {[
               { name: "Aditya Verma", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
               { name: "Sarah Jenkins", role: "Head of Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
               { name: "Rahul Mehta", role: "Lead Developer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" }
            ].map((member, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative overflow-hidden rounded-2xl"
               >
                  <img src={member.img} className="w-full h-96 object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white translate-y-4 group-hover:translate-y-0 transition">
                     <h3 className="text-xl font-bold">{member.name}</h3>
                     <p className="text-purple-300">{member.role}</p>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto bg-black rounded-3xl p-12 text-center text-white relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Revolution</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                 Experience the future of e-commerce today. Sign up now and get exclusive early bird access to our new features.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2 mx-auto">
                 Start Shopping <ArrowRight size={20} />
              </button>
           </div>
           {/* Decorative Blur */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
        </div>
      </section>

    </div>
  );
};

export default About;