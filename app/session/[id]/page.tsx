import React, { useState } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { VoiceInterfaceLocal } from '../../../components/VoiceInterfaceLocal';
import { ReportCard } from '../../../components/ReportCard';
import { Scenario, Message, SessionMetrics, SessionReport } from '../../../types';
import { SCENARIOS } from '../../../constants';

export default function Session() {
  const { id } = useParams();
  const location = useLocation();
  const [report, setReport] = useState<SessionReport | null>(null);

  // Retrieve scenario from state or find by ID
  const scenarioState = location.state?.scenario as Scenario;
  const scenario = scenarioState || SCENARIOS.find(s => s.id === id);

  if (!scenario) {
    return <Navigate to="/training" replace />;
  }

  const handleFinish = (transcript: Message[], metrics: SessionMetrics) => {
    const reportData: SessionReport = {
      sessionId: Date.now().toString(),
      scenarioId: scenario.title,
      date: new Date().toISOString(),
      durationSeconds: Math.floor((Date.now() - transcript[0].timestamp) / 1000),
      overallScore: Math.round((metrics.tone + metrics.clarity + metrics.empathy + metrics.technical) / 4),
      metrics,
      transcript,
      feedbacks: []
    };
    setReport(reportData);
  };

  const handleRestart = () => {
    setReport(null);
  };

  return (
    <div className="h-screen pt-20 pb-4 px-4 bg-gradient-to-b from-navy-dark to-navy-medium flex flex-col">
      {report ? (
        <ReportCard report={report} onRestart={handleRestart} />
      ) : (
        <VoiceInterfaceLocal scenario={scenario} onFinish={handleFinish} />
      )}
    </div>
  );
}
