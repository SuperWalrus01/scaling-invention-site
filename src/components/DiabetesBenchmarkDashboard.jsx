import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const MODELS = [
  {
    id: 'logreg',
    name: 'Logistic Regression',
    short: 'LogReg',
    metrics: {
      accuracy: 0.82,
      precision: 0.80,
      recall: 0.79,
      f1: 0.79,
    },
    features: [
      { name: 'Glucose', importance: 0.9 },
      { name: 'BMI', importance: 0.7 },
      { name: 'Age', importance: 0.55 },
      { name: 'Blood Pressure', importance: 0.45 },
    ],
    params: "Best Params: C=1.0, penalty='l2', solver='liblinear'",
  },
  {
    id: 'dt',
    name: 'Decision Tree',
    short: 'Decision Tree',
    metrics: {
      accuracy: 0.78,
      precision: 0.75,
      recall: 0.77,
      f1: 0.76,
    },
    features: [
      { name: 'Glucose', importance: 0.8 },
      { name: 'BMI', importance: 0.6 },
      { name: 'Age', importance: 0.5 },
      { name: 'Pregnancies', importance: 0.4 },
    ],
    params: 'Best Params: max_depth=5, min_samples_split=8',
  },
  {
    id: 'rf',
    name: 'Random Forest',
    short: 'Random Forest',
    metrics: {
      accuracy: 0.86,
      precision: 0.84,
      recall: 0.83,
      f1: 0.83,
    },
    features: [
      { name: 'Glucose', importance: 0.95 },
      { name: 'BMI', importance: 0.75 },
      { name: 'Age', importance: 0.6 },
      { name: 'Blood Pressure', importance: 0.5 },
    ],
    params: 'Best Params: n_estimators=200, max_depth=8',
  },
  {
    id: 'svm',
    name: 'Support Vector Machine',
    short: 'SVM',
    metrics: {
      accuracy: 0.84,
      precision: 0.82,
      recall: 0.80,
      f1: 0.81,
    },
    features: [
      { name: 'Glucose', importance: 0.85 },
      { name: 'BMI', importance: 0.65 },
      { name: 'Age', importance: 0.5 },
      { name: 'Insulin', importance: 0.4 },
    ],
    params: "Best Params: C=2.0, kernel='rbf', gamma=0.1",
  },
  {
    id: 'gb',
    name: 'Gradient Boosting',
    short: 'Grad Boost',
    metrics: {
      accuracy: 0.88,
      precision: 0.86,
      recall: 0.85,
      f1: 0.85,
    },
    features: [
      { name: 'Glucose', importance: 0.97 },
      { name: 'BMI', importance: 0.8 },
      { name: 'Age', importance: 0.65 },
      { name: 'Blood Pressure', importance: 0.55 },
    ],
    params: 'Best Params: learning_rate=0.05, n_estimators=300, max_depth=3',
  },
];

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

export default function DiabetesBenchmarkDashboard() {
  const [selectedModelId, setSelectedModelId] = useState('gb');

  const selectedModel = useMemo(
    () => MODELS.find((m) => m.id === selectedModelId) ?? MODELS[0],
    [selectedModelId],
  );

  const radarData = useMemo(
    () => [
      { metric: 'Accuracy', value: selectedModel.metrics.accuracy },
      { metric: 'Precision', value: selectedModel.metrics.precision },
      { metric: 'Recall', value: selectedModel.metrics.recall },
      { metric: 'F1-Score', value: selectedModel.metrics.f1 },
    ],
    [selectedModel],
  );

  const barData = selectedModel.features;

  return (
    <div className="mt-4 space-y-4 text-sm">
      {/* Top row: sidebar + performance radar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Sidebar: Model selector */}
        <div className="md:w-52 flex-shrink-0">
          <div className="rounded-2xl bg-slate-900 text-slate-100 border border-emerald-500/40 shadow-sm p-3 md:p-4 h-full flex flex-col">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-300 mb-2">
              Algorithm Benchmark Dashboard
            </h4>
            <p className="text-[0.7rem] text-slate-300 mb-3">
              Click a model to update the performance view.
            </p>
            <div className="flex flex-col gap-1.5">
              {MODELS.map((model) => {
                const isActive = model.id === selectedModelId;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedModelId(model.id)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-[0.75rem] transition-colors border ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700'
                    }`}
                  >
                    <span className="font-medium">{model.name}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${
                        isActive ? 'bg-emerald-100/90 text-emerald-900' : 'bg-slate-700 text-slate-100'
                      }`}
                    >
                      {model.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main: performance radar next to sidebar */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-2xl bg-slate-900 text-slate-100 border border-emerald-500/40 shadow-sm p-3 md:p-4 flex flex-col md:h-full">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Performance Radar
                </h4>
                <p className="text-[0.7rem] text-slate-300">
                  Comparing accuracy, precision, recall, and F1.
                </p>
              </div>
              <span className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/50">
                {selectedModel.name}
              </span>
            </div>
            <div className="mt-1 h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="rgba(148, 163, 184, 0.4)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#475569', fontSize: 10 }} />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 1]}
                    tickFormatter={formatPercent}
                    tick={{ fill: '#94a3b8', fontSize: 9 }}
                  />
                  <Radar
                    key={selectedModel.id}
                    name={selectedModel.name}
                    dataKey="value"
                    stroke="#0f766e"
                    fill="#14b8a6"
                    fillOpacity={0.3}
                    animationBegin={0}
                    animationDuration={600}
                    isAnimationActive
                  />
                  <Tooltip
                    formatter={(value) => formatPercent(value)}
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 8,
                      borderColor: '#020617',
                      backgroundColor: '#ffffff',
                      color: '#020617',
                      boxShadow: '0 10px 25px rgba(15,23,42,0.25)',
                    }}
                    labelStyle={{ color: '#020617' }}
                    itemStyle={{ color: '#020617' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Feature importance below benchmark + performance */}
      <div className="rounded-2xl bg-slate-900 text-slate-100 border border-emerald-500/40 shadow-sm p-3 md:p-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Feature Importance
            </h4>
            <p className="text-[0.7rem] text-slate-300">
              Top predictors for diabetes risk.
            </p>
          </div>
          <span className="text-[0.65rem] font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-400/40">
            Model-aware view
          </span>
        </div>
        <div className="h-56 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={selectedModel.id}
              data={barData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
            >
              <XAxis
                type="number"
                domain={[0, 1]}
                tickFormatter={formatPercent}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: '#475569', fontSize: 11 }}
                width={90}
              />
              <Tooltip
                formatter={(value) => formatPercent(value)}
                contentStyle={{
                  fontSize: 11,
                  borderRadius: 8,
                  borderColor: '#020617',
                  backgroundColor: '#ffffff',
                  color: '#020617',
                  boxShadow: '0 10px 25px rgba(15,23,42,0.25)',
                }}
                labelStyle={{ color: '#020617' }}
                itemStyle={{ color: '#020617' }}
              />
              <Bar
                dataKey="importance"
                fill="#0ea5e9"
                radius={[4, 4, 4, 4]}
                animationDuration={600}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hyperparameter ticker below everything, same dark palette */}
      <div className="rounded-xl bg-slate-900 text-emerald-300 border border-emerald-500/40 px-3 py-2 flex items-center gap-2 font-mono text-[0.7rem] shadow-sm">
        <span className="text-emerald-400 animate-pulse">▌</span>
        <span className="text-slate-300/90">Hyperparameter Search &rarr;</span>
        <span className="truncate">{selectedModel.params}</span>
      </div>

      <p className="text-[0.7rem] text-slate-400 leading-relaxed">
        This dashboard compresses the full benchmarking workflow into a single view:
        a radar chart for aggregate performance, model-specific feature importance, and the
        final hyperparameters chosen after grid/random search. It is designed for a
        quantitative, medical-ML audience evaluating supervised models for diabetes risk.
      </p>
    </div>
  );
}
