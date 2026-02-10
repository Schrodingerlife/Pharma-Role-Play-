import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Mic, BarChart3, Users, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen pt-20 pb-10">
      
      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-cyan-neon/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-neon/20 rounded-full blur-[120px] pointer-events-none"></div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Master Pharma Sales <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-neon to-purple-neon animate-pulse-slow">
            With AI Roleplay
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Practice high-stakes conversations with realistic AI doctors. Get instant feedback on tone, objection handling, and efficacy arguments.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/training">
            <Button size="lg" className="w-full sm:w-auto">
              <Play className="w-5 h-5 fill-current" /> Start Training
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Mic,
              title: "Realistic Voice AI",
              desc: "Speak naturally with AI personas trained on real HCP objections and personality types."
            },
            {
              icon: BarChart3,
              title: "Instant Analytics",
              desc: "Get scored on empathy, clarity, and technical accuracy immediately after every session."
            },
            {
              icon: Users,
              title: "Diverse Scenarios",
              desc: "Practice everything from cold calls to deep clinical efficacy discussions."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center mb-6">
                <feature.icon className="text-cyan-neon w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
