import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiBook, FiGlobe, FiUsers, FiAward, FiArrowRight } from "react-icons/fi";

const AboutUs = () => {
  const stats = [
    { icon: <FiBook />, count: "10,000+", label: "Books Available" },
    { icon: <FiUsers />, count: "50,000+", label: "Happy Readers" },
    { icon: <FiGlobe />, count: "100+", label: "Cities Delivered" },
    { icon: <FiAward />, count: "4.8/5", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar page-enter">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-card py-20 lg:py-28 border-b border-surface-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container-max px-4 sm:px-6 relative z-10 text-center max-w-3xl mx-auto">
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Our Story
          </motion.p>
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-text leading-tight mb-6">
            Empowering Minds Through <span className="gradient-text">Reading</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-brand-muted text-lg leading-relaxed">
            At BookBazaar, we believe that the right book at the right time can change a person's life. 
            Our mission is to make literature accessible, affordable, and enjoyable for everyone.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-surface-bg border-b border-surface-border">
        <div className="container-max px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 text-xl mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-brand-text mb-1">{stat.count}</h3>
                <p className="text-brand-muted text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-max px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-600/20 to-secondary-500/20 rounded-3xl blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800"
                alt="Library"
                className="relative rounded-2xl border border-surface-border shadow-card-hover w-full object-cover h-[500px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-text mb-6">Why Choose BookBazaar?</h2>
              <div className="space-y-6">
                {[
                  { title: "Curated Selection", desc: "Every book on our platform is carefully selected to ensure quality reading material across all genres." },
                  { title: "Seamless Experience", desc: "From browsing to checkout, our platform is designed to provide a smooth, distraction-free experience." },
                  { title: "Community First", desc: "We are built by readers, for readers. We value your feedback and constantly improve based on your needs." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-primary-600/20 text-primary-400 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-brand-text font-semibold text-lg mb-1">{item.title}</h4>
                      <p className="text-brand-muted leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link to="/all-books" className="btn-primary inline-flex items-center gap-2">
                  Explore Our Collection <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
