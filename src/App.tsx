import React from 'react';
import SortingVisualizer from './components/SortingVisualizer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Sorting Algorithm Visualizer
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-10xl mx-auto py-6 sm:px-6 lg:px-8">
          <SortingVisualizer />
        </div>
      </main>
    </div>
  );
}

export default App;
