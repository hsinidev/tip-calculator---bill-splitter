import React from 'react';
import ThemeLayout from './components/ThemeLayout';
import TipCalculatorTool from './components/TipCalculatorTool';
import SeoArticle from './components/SeoArticle';

const App: React.FC = () => {
  return (
    <ThemeLayout>
      <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center gap-y-16">
        <TipCalculatorTool />
        <SeoArticle />
      </div>
    </ThemeLayout>
  );
};

export default App;