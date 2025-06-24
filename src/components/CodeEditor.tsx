
import React, { useState } from 'react';
import { ArrowLeft, Eye, Download, Save, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface CodeEditorProps {
  template: Template;
  onBack: () => void;
  onPreview: () => void;
  onDownload: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const CodeEditor = ({ 
  template, 
  onBack, 
  onPreview, 
  onDownload, 
  isDark, 
  onToggleTheme 
}: CodeEditorProps) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(template.htmlCode);
  const [cssCode, setCssCode] = useState(template.cssCode);
  const [jsCode, setJsCode] = useState(template.jsCode);

  const tabs = [
    { id: 'html', label: 'HTML', icon: Code, code: htmlCode, setCode: setHtmlCode },
    { id: 'css', label: 'CSS', icon: Palette, code: cssCode, setCode: setCssCode },
    { id: 'js', label: 'JavaScript', icon: Zap, code: jsCode, setCode: setJsCode }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  const handleSave = () => {
    // In a real implementation, this would save to localStorage or backend
    console.log('Saving changes...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="glass hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gradient">Editing: {template.name}</h1>
                <p className="text-sm text-muted-foreground">Make your customizations below</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleSave} className="glass hover:bg-white/10">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={onPreview} className="glass hover:bg-white/10">
                <Eye className="h-4 w-4 mr-2" />
                Preview
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

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Panel */}
          <Card className="glass border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gradient">Code Editor</CardTitle>
                <div className="flex gap-1">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      size="sm"
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      onClick={() => setActiveTab(tab.id as 'html' | 'css' | 'js')}
                      className={`glass ${activeTab === tab.id ? 'glow' : 'hover:bg-white/10'}`}
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTabData && (
                <div className="space-y-4">
                  <textarea
                    value={activeTabData.code}
                    onChange={(e) => activeTabData.setCode(e.target.value)}
                    className="w-full h-96 p-4 bg-black/20 border border-white/10 rounded-lg font-mono text-sm focus:border-brand-500 focus:outline-none resize-none"
                    placeholder={`Enter your ${activeTabData.label} code here...`}
                    spellCheck={false}
                  />
                  <div className="text-xs text-muted-foreground">
                    Pro tip: Use Tailwind CSS classes for styling. Press Ctrl+S to save your changes.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Preview Panel */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-gradient">Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 rounded-lg overflow-hidden border border-white/10 bg-white">
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>${template.name}</title>
                      <style>${cssCode}</style>
                    </head>
                    <body>
                      ${htmlCode}
                      <script>${jsCode}</script>
                    </body>
                    </html>
                  `}
                  className="w-full h-full"
                  title={`Live preview of ${template.name}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="glass hover:bg-white/10">
            <Code className="h-4 w-4 mr-2" />
            Format Code
          </Button>
          <Button variant="outline" className="glass hover:bg-white/10">
            <Palette className="h-4 w-4 mr-2" />
            Color Picker
          </Button>
          <Button variant="outline" className="glass hover:bg-white/10">
            <Zap className="h-4 w-4 mr-2" />
            Add Animation
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CodeEditor;
