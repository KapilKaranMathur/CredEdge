import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuTrendingUpDown,
  LuShieldCheck,
  LuChartBar,
  LuArrowRight,
  LuPiggyBank,
} from "react-icons/lu";
import HERO_IMG from "../assets/images/img01.jpg";



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};


const GradientMesh = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.2, y: 0.15, r: 0.35, color: "3, 29, 68",    speed: 0.0004, phase: 0 },
      { x: 0.8, y: 0.1,  r: 0.30, color: "4, 57, 94",     speed: 0.0003, phase: 2 },
      { x: 0.5, y: 0.7,  r: 0.38, color: "112, 162, 136",  speed: 0.0005, phase: 4 },
      { x: 0.15, y: 0.8, r: 0.25, color: "218, 183, 133",  speed: 0.0003, phase: 1 },
      { x: 0.75, y: 0.6, r: 0.28, color: "112, 162, 136",  speed: 0.0004, phase: 3 },
    ];

    const draw = () => {
      time++;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, w, h);

      for (const b of blobs) {
        const offsetX = Math.sin(time * b.speed + b.phase) * 40;
        const offsetY = Math.cos(time * b.speed * 0.8 + b.phase) * 30;
        const cx = b.x * w + offsetX;
        const cy = b.y * h + offsetY;
        const radius = b.r * Math.min(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${b.color}, 0.08)`);
        grad.addColorStop(0.5, `rgba(${b.color}, 0.03)`);
        grad.addColorStop(1, `rgba(${b.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 1 }}
    />
  );
};


const LandingPage = () => {
  return (
    <div className="min-h-screen text-black overflow-x-hidden" style={{ background: "transparent" }}>
      <GradientMesh />


      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="group">
            <span className="text-xl font-semibold tracking-tight text-black">
              CredEdge
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-medium text-white rounded-full transition-all hover:scale-[1.03] hover:shadow-lg"
              style={{
                background: "#031D44",
                boxShadow: "0 4px 14px rgba(3,29,68,0.25)",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>


      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 -z-10 opacity-60 pointer-events-none"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-black/70 mb-10"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(0,0,0,0.06)",
              backdropFilter: "blur(8px)",
            }}
            variants={fadeUp}
            custom={0}
          >
            <LuTrendingUpDown className="text-sm" />
            Personal Finance Tracker
          </motion.div>


          <motion.h1
            className="text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-black"
            variants={fadeUp}
            custom={1}
          >
            Take Control of Your Money
          </motion.h1>


          <motion.p
            className="mt-6 text-base md:text-lg text-black/50 max-w-xl mx-auto leading-relaxed"
            variants={fadeUp}
            custom={2}
          >
            Track income and expenses effortlessly. Visual analytics and smart
            insights to stay on top of your finances.
          </motion.p>


          <motion.div className="mt-10" variants={fadeUp} custom={3}>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white rounded-full transition-all hover:scale-[1.03]"
              style={{
                background: "#031D44",
                boxShadow: "0 8px 30px rgba(3,29,68,0.2)",
              }}
            >
              Get Started — It's Free
              <LuArrowRight className="text-base group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>


        <motion.div
          className="max-w-2xl mx-auto mt-20 grid grid-cols-3 gap-3"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {[
            { value: "100%", label: "Free to Use" },
            { value: "Real-time", label: "Analytics" },
            { value: "Secure", label: "Data Privacy" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center py-4 px-3 rounded-2xl border border-black/[0.04]"
              style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}
              variants={fadeUp}
              custom={i + 4}
            >
              <p className="text-xl md:text-2xl font-semibold text-black">
                {stat.value}
              </p>
              <p className="text-xs text-black/40 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span
              className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-black/40 mb-3"
              variants={fadeUp}
            >
              Features
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl font-semibold text-black tracking-tight"
              variants={fadeUp}
              custom={1}
            >
              Everything You Need to Manage Money
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <FeatureCard
              icon={<LuPiggyBank />}
              title="Track Income & Expenses"
              description="Log transactions with categories and notes. See where your money goes at a glance."
              accent="#04395E"
              index={0}
            />
            <FeatureCard
              icon={<LuChartBar />}
              title="Visual Analytics"
              description="Beautiful charts that turn your financial data into clear, actionable insights."
              accent="#70A288"
              index={1}
            />
            <FeatureCard
              icon={<LuShieldCheck />}
              title="Secure & Private"
              description="Your data is encrypted and securely stored. We never share your information."
              accent="#DAB785"
              index={2}
            />
          </motion.div>
        </div>
      </section>


      <section className="py-20 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-3xl px-8 py-14 md:px-14 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #031D44 0%, #04395E 50%, #70A288 100%)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >

          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/4"
            style={{ background: "rgba(218,183,133,0.12)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-44 h-44 rounded-full translate-y-1/2 -translate-x-1/4"
            style={{ background: "rgba(112,162,136,0.1)" }}
          />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-3 tracking-tight">
              Ready to Master Your Finances?
            </h2>
            <p className="text-sm text-white/60 max-w-md mx-auto mb-8">
              Join CredEdge today and build better financial habits.
              It only takes a minute.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-sm font-medium text-black rounded-full hover:scale-[1.03] transition-all"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              Create Free Account
              <LuArrowRight className="text-base" />
            </Link>
          </div>
        </motion.div>
      </section>


      <footer className="border-t border-black/[0.04] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-sm font-medium text-black tracking-tight">
            CredEdge
          </span>
          <p className="text-xs text-black/30">
            © {new Date().getFullYear()} CredEdge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


const FeatureCard = ({ icon, title, description, accent, index }) => {
  return (
    <motion.div
      className="group relative rounded-2xl p-7 border border-black/[0.04] cursor-default transition-all duration-300 hover:shadow-lg"
      style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)" }}
      variants={fadeUp}
      custom={index}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg text-white mb-5 group-hover:scale-105 transition-transform duration-300"
        style={{
          background: accent,
          boxShadow: `0 4px 12px ${accent}30`,
        }}
      >
        {icon}
      </div>
      <h3 className="text-base font-medium text-black mb-2">{title}</h3>
      <p className="text-sm text-black/40 leading-relaxed">{description}</p>
    </motion.div>
  );
};
