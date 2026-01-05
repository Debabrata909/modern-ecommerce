import { useState } from "react";
import { Save, Store, CreditCard, Bell, Shield, Globe, LayoutTemplate, Image as ImageIcon, Type, Clock, MessageSquare, Mail } from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("home"); // Default to Home for this demo

  // MOCK STATE: In a real app, this would come from your Database/API
  const [homeConfig, setHomeConfig] = useState({
      hero: {
          title: "Elevate Your Lifestyle.",
          subtitle: "Discover premium aesthetics with our curated collection.",
          buttonText: "Shop Now",
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b"
      },
      deal: {
          title: "Sony WH-1000XM5",
          subtitle: "Experience the next level of silence.",
          price: "14,999",
          endDate: "2025-02-14",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
      },
      testimonials: [
          { name: "Alex Johnson", role: "Photographer", text: "The camera quality is absolutely stunning." },
          { name: "Sarah Williams", role: "Designer", text: "I love the aesthetic of this store." },
          { name: "Michael Chen", role: "Developer", text: "Customer support was super helpful." }
      ],
      newsletter: {
          title: "Join the Club",
          subtitle: "Subscribe to our newsletter and get 20% off your first order."
      }
  });

  // Handler to update nested state
  const updateConfig = (section, field, value) => {
      setHomeConfig(prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              [field]: value
          }
      }));
  };

  const updateTestimonial = (index, field, value) => {
      const newTestimonials = [...homeConfig.testimonials];
      newTestimonials[index][field] = value;
      setHomeConfig(prev => ({ ...prev, testimonials: newTestimonials }));
  };

  const renderTabContent = () => {
      switch(activeTab) {
          case 'home':
              return (
                <div className="space-y-8 animate-fade-in">
                    
                    {/* 1. HERO SECTION CONFIG */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <LayoutTemplate size={20} className="text-purple-600" /> Hero Section
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Main Headline (Max 30 chars)</label>
                                    <input 
                                        type="text" 
                                        maxLength={30}
                                        value={homeConfig.hero.title}
                                        onChange={(e) => updateConfig('hero', 'title', e.target.value)}
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" 
                                    />
                                    <div className="text-right text-xs text-gray-400 mt-1">{homeConfig.hero.title.length}/30</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Subtitle (Max 80 chars)</label>
                                    <textarea 
                                        rows={2}
                                        maxLength={80}
                                        value={homeConfig.hero.subtitle}
                                        onChange={(e) => updateConfig('hero', 'subtitle', e.target.value)}
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none" 
                                    />
                                    <div className="text-right text-xs text-gray-400 mt-1">{homeConfig.hero.subtitle.length}/80</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Button Text</label>
                                    <input 
                                        type="text" 
                                        value={homeConfig.hero.buttonText}
                                        onChange={(e) => updateConfig('hero', 'buttonText', e.target.value)}
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Hero Image URL</label>
                                <div className="flex gap-2 mb-2">
                                    <input 
                                        type="text" 
                                        value={homeConfig.hero.image}
                                        onChange={(e) => updateConfig('hero', 'image', e.target.value)}
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm" 
                                    />
                                </div>
                                {/* Image Preview */}
                                <div className="w-full h-40 bg-gray-200 rounded-xl overflow-hidden border border-gray-300 relative">
                                    <img src={homeConfig.hero.image} className="w-full h-full object-cover opacity-80" alt="Preview" />
                                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-black/30">Preview</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. DEAL OF THE MONTH */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-purple-600" /> Deal of the Month
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Product Title</label>
                                    <input 
                                        type="text" 
                                        value={homeConfig.deal.title}
                                        onChange={(e) => updateConfig('deal', 'title', e.target.value)}
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Deal Price</label>
                                    <input 
                                        type="text" 
                                        value={homeConfig.deal.price}
                                        onChange={(e) => updateConfig('deal', 'price', e.target.value)}
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">End Date</label>
                                    <input 
                                        type="date" 
                                        value={homeConfig.deal.endDate}
                                        onChange={(e) => updateConfig('deal', 'endDate', e.target.value)}
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" 
                                    />
                                </div>
                             </div>
                             <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Product Image URL</label>
                                <input 
                                    type="text" 
                                    value={homeConfig.deal.image}
                                    onChange={(e) => updateConfig('deal', 'image', e.target.value)}
                                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm mb-2" 
                                />
                                <div className="w-full h-32 bg-gray-200 rounded-xl overflow-hidden border border-gray-300">
                                    <img src={homeConfig.deal.image} className="w-full h-full object-cover" alt="Preview" />
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* 3. TESTIMONIALS */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <MessageSquare size={20} className="text-purple-600" /> What Customers Say
                        </h3>
                        <div className="space-y-4">
                            {homeConfig.testimonials.map((t, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs shrink-0">
                                        {i + 1}
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 w-full">
                                        <input 
                                            type="text" 
                                            value={t.name}
                                            onChange={(e) => updateTestimonial(i, 'name', e.target.value)}
                                            placeholder="Customer Name"
                                            className="border p-2 rounded-lg text-sm"
                                        />
                                        <input 
                                            type="text" 
                                            value={t.role}
                                            onChange={(e) => updateTestimonial(i, 'role', e.target.value)}
                                            placeholder="Role (e.g. Designer)"
                                            className="border p-2 rounded-lg text-sm"
                                        />
                                        <input 
                                            type="text" 
                                            value={t.text}
                                            onChange={(e) => updateTestimonial(i, 'text', e.target.value)}
                                            placeholder="Review Text"
                                            className="border p-2 rounded-lg text-sm w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. NEWSLETTER */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Mail size={20} className="text-purple-600" /> Join the Club
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Section Title</label>
                                <input 
                                    type="text" 
                                    value={homeConfig.newsletter.title}
                                    onChange={(e) => updateConfig('newsletter', 'title', e.target.value)}
                                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                <input 
                                    type="text" 
                                    value={homeConfig.newsletter.subtitle}
                                    onChange={(e) => updateConfig('newsletter', 'subtitle', e.target.value)}
                                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" 
                                />
                            </div>
                        </div>
                    </div>

                </div>
              );
          case 'general':
              // ... (Your existing General Tab Code)
              return <div className="text-gray-500 p-4">General Settings Placeholder</div>;
          case 'payment':
              // ... (Your existing Payment Tab Code)
              return <div className="text-gray-500 p-4">Payment Settings Placeholder</div>;
          default:
              return null;
      }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
                <p className="text-gray-500">Manage your store layout and preferences.</p>
            </div>
            <button className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 transition shadow-lg shadow-purple-200">
                <Save size={18} /> Save Changes
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 space-y-2 shrink-0">
                {[
                    { id: 'home', label: 'Home Page', icon: LayoutTemplate },
                    { id: 'general', label: 'General', icon: Store },
                    { id: 'payment', label: 'Payments', icon: CreditCard },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'security', label: 'Security', icon: Shield },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition text-left ${
                            activeTab === tab.id 
                            ? 'bg-white text-purple-600 shadow-sm border border-gray-100' 
                            : 'text-gray-500 hover:bg-white/50'
                        }`}
                    >
                        <tab.icon size={18} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
                {renderTabContent()}
            </div>
        </div>
    </div>
  );
};

export default AdminSettings;