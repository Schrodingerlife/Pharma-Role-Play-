import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScenarioSelector } from '../../components/ScenarioSelector';
import { Scenario } from '../../types';

export default function Training() {
  const navigate = useNavigate();

  const handleSelectScenario = (scenario: Scenario) => {
    // Navigate to session with scenario ID
    // In a real app we might pass object via state or fetch by ID
    navigate(`/session/${scenario.id}`, { state: { scenario } });
  };

  return (
    <div className="min-h-screen pt-24 px-6 container mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Select a Scenario</h1>
        <p className="text-gray-400">Choose a training module to begin your roleplay session.</p>
      </div>

      <ScenarioSelector onSelect={handleSelectScenario} />
    </div>
  );
}
