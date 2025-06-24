
import React from 'react';
import { ArrowLeft, Edit, Download, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  category: string;
}

interface TemplatePreviewProps {
  template: Template;
  onBack: () => void;
  onEdit: () => void;
  onDownload: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const TemplatePreview = ({ 
  template, 
  onBack, 
  onEdit, 
  onDownload, 
  isDark, 
  onToggleTheme 
}: TemplatePreviewProps) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 glass relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="glass hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gradient">{template.name}</h1>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleFullscreen} className="glass hover:bg-white/10">
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={onEdit} className="glass hover:bg-white/10">
                <Edit className="h-4 w-4 mr-2" />
                Edit Code
              </Button>
              <Button size="sm" onClick={onDownload} className="glow">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Preview Frame */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-40 bg-background' : 'container mx-auto px-4 py-6'}`}>
        <div className={`${isFullscreen ? 'h-full' : 'h-[calc(100vh-200px)]'} rounded-lg overflow-hidden border border-white/10 glass`}>
          <iframe
            srcDoc={`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${template.name}</title>
                <style>${template.cssCode}</style>
              </head>
              <body>
                ${template.htmlCode}
                <script>${template.jsCode}</script>
              </body>
              </html>
            `}
            className="w-full h-full"
            title={`Preview of ${template.name}`}
          />
        </div>
      </div>

      {/* Floating Action Buttons (only in fullscreen) */}
      {isFullscreen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          <Button size="icon" onClick={handleFullscreen} className="glass hover:bg-white/10">
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={onEdit} className="glass hover:bg-white/10">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={onDownload} className="glow">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;
