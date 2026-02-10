import React from 'react';
import { SCENARIOS } from '../constants';
import { Scenario } from '../types';
import { cn } from '../lib/utils';
import { ArrowRight, BrainCircuit, Target, Users } from 'lucide-react';

interface ScenarioSelectorProps {
  onSelect: (scenario: Scenario) => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ onSelect }) => {
  const getIcon = (category: string) => {
    switch(category) {
      case 'Objection Handling': return Target;
      case 'Product Knowledge': return BrainCircuit;
      case 'Soft Skills': return Users;
      default: return Target;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SCENARIOS.map((scenario) => {
        const Icon = getIcon(scenario.category);
        return (
          <div 
            key={scenario.id}
            className="group relative bg-navy-light/50 border border-white/5 rounded-2xl p-6 hover:bg-navy-light hover:border-cyan-neon/30 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => onSelect(scenario)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="text-cyan-neon" />
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-navy-medium flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon className="text-purple-neon" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                scenario.difficulty === 'Beginner' ? 'border-green-500/30 text-green-400' :
                scenario.difficulty === 'Intermediate' ? 'border-yellow-500/30 text-yellow-400' :
                'border-red-500/30 text-red-400'
              )}>
                {scenario.difficulty}
              </span>
              <span className="text-xs text-gray-400">{scenario.category}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-neon transition-colors">
              {scenario.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-3">
              {scenario.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
