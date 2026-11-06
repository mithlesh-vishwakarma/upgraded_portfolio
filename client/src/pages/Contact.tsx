import { useState, useEffect } from "react";
import BackgroundPattern from "../components/BackgroundPattern";
import Magnet from '../components/Magnet';
import { useToast } from "../context/ToastContext";
import SEO from "../components/SEO";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  const pageTitle = "Contact Mithlesh Vishwakarma | OrdinaryCoder - Surat, Gujarat";
  const pageDescription = "Get in touch with Mithlesh Vishwakarma (OrdinaryCoder) for custom web development, SaaS platforms, Shopify stores, AI agents, or Android app projects in Surat, Gujarat, India.";
  const canonicalUrl = "https://ordinarycoder.com/contact";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = {
      access_key: "4108bd75-dcae-46cf-9ae5-39c1e9ae2c65",
      subject: "New Contact Message from OrdinaryCoder Portfolio",
      from_name: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      const result = await response.json();

      if (result.success) {
        showToast("Thank you for your message! I'll get back to you soon.", "success");
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          message: "",
        });
      } else {
        showToast("Something went wrong. Please try again later.", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("Error submitting the form. Please check your connection.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-roboto">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
      />
      <BackgroundPattern />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            Let's Connect !
          </h1>
          <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-6 md:mb-8 text-center max-w-full">
            Have a project concept, custom web application idea, or software requirement? Let's connect and build it together.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {/* Contact Cards - Left Side */}
          <div className="space-y-6">
            {/* Email Card */}
            <div
              className={`group bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:-translate-y-2 hover:scale-105 transition-all duration-500 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                }`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-slate-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                Email
              </h3>
              <p className="text-slate-300 text-sm">
                mithlesh.workplace@gmail.com
              </p>
            </div>

            {/* Phone Card */}
            <div
              className={`group bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:-translate-y-2 hover:scale-105 transition-all duration-500 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                }`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-slate-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                Phone
              </h3>
              <p className="text-slate-300 text-sm">
                +91 9327832747
              </p>
            </div>

            {/* Location Card */}
            <div
              className={`group bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:-translate-y-2 hover:scale-105 transition-all duration-500 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                }`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-slate-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                Location
              </h3>
              <p className="text-slate-300 text-sm">
                Surat, Gujarat, India - 394210
              </p>
              {/* TODO: Google Business Profile link will be inserted here when verified */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 shadow-[0_0_15px_#6b5815,0_0_30px_#6b5815]">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-yellow-400 mb-3">
                  Send a Message
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border-2 border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border-2 border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message / Project Details"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="text-center">
                  <Magnet padding={100} disabled={false} magnetStrength={20}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </Magnet>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
