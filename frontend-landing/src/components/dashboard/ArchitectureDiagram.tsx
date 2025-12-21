import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const ArchitectureDiagram = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false, // Ważne: false przy ręcznym renderowaniu
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'monospace'
    });

    const renderChart = async () => {
      const graphDefinition = `
        graph TD
          subgraph Frontend
              React[React SPA]:::react
          end

          subgraph Gateway
              Nginx[Nginx Proxy]:::nginx
          end

          subgraph Services
              Fintech[Fintech Core]:::django
              B2B[B2B API]:::fastapi
              Monitor[Celery]:::celery
          end

          subgraph Data
              Postgres[(Postgres)]:::db
              Redis[(Redis)]:::redis
          end

          React --> Nginx
          Nginx --> Fintech
          Nginx --> B2B
          
          Fintech --> Postgres
          B2B --> Redis
          Monitor --> Redis
          
          classDef react fill:#1e293b,stroke:#3b82f6,color:#fff
          classDef nginx fill:#1e293b,stroke:#10b981,color:#fff
          classDef django fill:#1e293b,stroke:#059669,color:#fff
          classDef fastapi fill:#1e293b,stroke:#06b6d4,color:#fff
          classDef celery fill:#1e293b,stroke:#eab308,color:#fff
          classDef db fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
          classDef redis fill:#0f172a,stroke:#ef4444,stroke-width:2px,color:#fff
          
          linkStyle default stroke:#64748b
      `;
      
      try {
          // Unikalne ID dla każdego renderowania
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, graphDefinition);
          setSvgContent(svg);
      } catch (error) {
          console.error('Mermaid render error:', error);
          setSvgContent('<div class="text-red-500">Error rendering diagram</div>');
      }
    };

    renderChart();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 bg-[#0f172a] rounded-xl overflow-hidden min-h-[300px]">
      {svgContent ? (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} className="w-full max-w-3xl flex justify-center" />
      ) : (
          <div className="text-slate-500 animate-pulse">Generowanie diagramu...</div>
      )}
    </div>
  );
};

export default ArchitectureDiagram;