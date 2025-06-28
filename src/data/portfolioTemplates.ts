export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  category: 'developer' | 'designer' | 'data-scientist' | 'general' | 'creative' | 'business' | 'student';
}

export const portfolioTemplates: Template[] = [
  {
    id: 'modern-developer',
    name: 'Modern Developer',
    description: 'Clean, professional developer portfolio with dark theme',
    tags: ['Developer', 'Dark Theme', 'One-page', 'Modern'],
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    category: 'developer',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>John Developer - Full Stack Engineer</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
    <div class="min-h-screen">
        <!-- Hero Section -->
        <section class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
            <div class="text-center">
                <h1 class="text-6xl font-bold mb-4">John Developer</h1>
                <p class="text-xl text-gray-300 mb-8">Full Stack Engineer & Problem Solver</p>
                <div class="flex gap-4 justify-center">
                    <a href="#projects" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">View Projects</a>
                    <a href="#contact" class="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-lg transition-colors">Contact Me</a>
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="py-20 px-8">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12">Featured Projects</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-gray-800 rounded-lg p-6 hover:transform hover:scale-105 transition-all">
                        <h3 class="text-xl font-semibold mb-3">E-Commerce Platform</h3>
                        <p class="text-gray-400 mb-4">Full-stack React app with Node.js backend</p>
                        <div class="flex gap-2 flex-wrap">
                            <span class="bg-blue-600 text-xs px-2 py-1 rounded">React</span>
                            <span class="bg-green-600 text-xs px-2 py-1 rounded">Node.js</span>
                            <span class="bg-yellow-600 text-xs px-2 py-1 rounded">MongoDB</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-20 px-8 bg-gray-800">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold mb-8">Let's Work Together</h2>
                <p class="text-gray-400 mb-8">I'm always open to discussing new opportunities</p>
                <a href="mailto:john@example.com" class="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg transition-colors">Get In Touch</a>
            </div>
        </section>
    </div>
</body>
</html>`,
    cssCode: `/* Additional custom styles can be added here */
.hover-glow:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}`,
    jsCode: `// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});`
  },
  {
    id: 'frontend-specialist',
    name: 'Frontend Specialist',
    description: 'Vibrant, interactive portfolio showcasing frontend expertise',
    tags: ['Frontend', 'Interactive', 'Modern', 'React'],
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    category: 'developer',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sarah Frontend - Interactive Developer</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
    <div class="min-h-screen">
        <!-- Navigation -->
        <nav class="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50">
            <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Sarah.dev</h1>
                <div class="flex gap-6">
                    <a href="#skills" class="hover:text-pink-400 transition-colors">Skills</a>
                    <a href="#projects" class="hover:text-pink-400 transition-colors">Projects</a>
                    <a href="#contact" class="hover:text-pink-400 transition-colors">Contact</a>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="pt-20 pb-16 min-h-screen flex items-center">
            <div class="max-w-6xl mx-auto px-6">
                <h2 class="text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Frontend Developer</h2>
                <p class="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">Crafting beautiful, interactive web experiences with modern JavaScript frameworks</p>
                <div class="flex gap-4">
                    <button class="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-lg hover:scale-105 transition-transform">View Work</button>
                    <button class="border border-purple-400 px-8 py-3 rounded-lg hover:bg-purple-400/20 transition-colors">Download CV</button>
                </div>
            </div>
        </section>

        <!-- Skills -->
        <section id="skills" class="py-20 px-6">
            <div class="max-w-6xl mx-auto">
                <h3 class="text-4xl font-bold text-center mb-12">Technical Skills</h3>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <h4 class="text-xl font-semibold mb-4 text-pink-400">Frontend Frameworks</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">React</span>
                            <span class="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Vue.js</span>
                            <span class="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">Angular</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
</html>`,
    cssCode: `/* Interactive animations */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}
.floating { animation: float 3s ease-in-out infinite; }`,
    jsCode: `// Interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});`
  },
  {
    id: 'backend-architect',
    name: 'Backend Architect',
    description: 'Professional backend developer portfolio with system architecture focus',
    tags: ['Backend', 'Architecture', 'Professional', 'Systems'],
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    category: 'developer',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Backend - System Architect</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-900">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-6xl mx-auto px-6 py-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Alex Richardson</h1>
                        <p class="text-gray-600">Senior Backend Engineer & System Architect</p>
                    </div>
                    <nav class="flex gap-6">
                        <a href="#experience" class="text-gray-600 hover:text-blue-600 transition-colors">Experience</a>
                        <a href="#architecture" class="text-gray-600 hover:text-blue-600 transition-colors">Architecture</a>
                        <a href="#contact" class="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Hero -->
        <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div class="max-w-6xl mx-auto px-6 text-center">
                <h2 class="text-5xl font-bold mb-6">Building Scalable Systems</h2>
                <p class="text-xl mb-8 max-w-3xl mx-auto">8+ years of experience designing and implementing high-performance backend systems that handle millions of requests</p>
                <div class="grid md:grid-cols-4 gap-6 mt-12">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h3 class="text-3xl font-bold">50M+</h3>
                        <p>Requests/Day Handled</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h3 class="text-3xl font-bold">99.9%</h3>
                        <p>System Uptime</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h3 class="text-3xl font-bold">15+</h3>
                        <p>Microservices Built</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h3 class="text-3xl font-bold">5</h3>
                        <p>Team Members Led</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience -->
        <section id="experience" class="py-20">
            <div class="max-w-6xl mx-auto px-6">
                <h3 class="text-4xl font-bold text-center mb-12">Technical Expertise</h3>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h4 class="text-xl font-semibold mb-4 text-blue-600">Backend Technologies</h4>
                        <div class="space-y-3">
                            <div class="flex items-center gap-3">
                                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span>Node.js, Python, Java, Go</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span>PostgreSQL, MongoDB, Redis</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span>AWS, Docker, Kubernetes</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h4 class="text-xl font-semibold mb-4 text-blue-600">Architecture Patterns</h4>
                        <div class="space-y-3">
                            <div class="flex items-center gap-3">
                                <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
                                <span>Microservices Architecture</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
                                <span>Event-Driven Systems</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
                                <span>Domain-Driven Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
</html>`,
    cssCode: `/* Professional styling */
.tech-badge {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
}`,
    jsCode: `// Professional interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});`
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Vibrant, visual-first portfolio for designers and creatives',
    tags: ['Designer', 'Colorful', 'Multi-page', 'Creative'],
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    category: 'designer',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sarah Designer - Creative Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Sarah</h1>
            <div class="flex gap-6">
                <a href="#work" class="hover:text-pink-500 transition-colors">Work</a>
                <a href="#about" class="hover:text-pink-500 transition-colors">About</a>
                <a href="#contact" class="hover:text-pink-500 transition-colors">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Creative Designer</h2>
            <p class="text-xl text-gray-600 mb-8">Crafting beautiful experiences through design</p>
            <img src="https://images.unsplash.com/photo-1494790108755-2616c359e68e?w=300&h=300&fit=crop&crop=face" alt="Profile" class="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-xl">
        </div>
    </section>

    <!-- Work Section -->
    <section id="work" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
            <h3 class="text-4xl font-bold text-center mb-12">Featured Work</h3>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="group cursor-pointer">
                    <div class="overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=400&fit=crop" alt="Project" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <h4 class="text-xl font-semibold mt-4">Brand Identity Design</h4>
                    <p class="text-gray-600">Complete brand identity for tech startup</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=400&fit=crop" alt="Project" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <h4 class="text-xl font-semibold mt-4">Mobile App Design</h4>
                    <p class="text-gray-600">UI/UX design for fitness tracking app</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* Custom animations and effects */
.gradient-text {
    background: linear-gradient(45deg, #ec4899, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}`,
    jsCode: `// Parallax scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        parallax.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
    }
});`
  },
  {
    id: 'ux-designer',
    name: 'UX Designer Pro',
    description: 'User experience focused portfolio with case studies and process documentation',
    tags: ['UX', 'Case Studies', 'Process', 'Professional'],
    thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    category: 'designer',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emma UX - User Experience Designer</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-900">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-6xl mx-auto px-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Emma Johnson</h1>
                    <p class="text-gray-600">Senior UX Designer</p>
                </div>
                <nav class="flex gap-6">
                    <a href="#case-studies" class="text-gray-600 hover:text-indigo-600 transition-colors">Case Studies</a>
                    <a href="#process" class="text-gray-600 hover:text-indigo-600 transition-colors">Process</a>
                    <a href="#about" class="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="py-20 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-5xl font-bold mb-6 text-gray-900">Designing for Humans</h2>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">I create intuitive, accessible, and delightful user experiences that solve real problems and drive business results</p>
            <div class="grid md:grid-cols-3 gap-8 mt-12">
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-3xl font-bold text-indigo-600 mb-2">150+</h3>
                    <p class="text-gray-600">Projects Completed</p>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-3xl font-bold text-indigo-600 mb-2">25%</h3>
                    <p class="text-gray-600">Avg. Conversion Increase</p>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-3xl font-bold text-indigo-600 mb-2">6</h3>
                    <p class="text-gray-600">Years Experience</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Case Studies -->
    <section id="case-studies" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
            <h3 class="text-4xl font-bold text-center mb-12">Case Studies</h3>
            <div class="space-y-12">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="md:flex">
                        <div class="md:w-1/2">
                            <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop" alt="E-commerce redesign" class="w-full h-64 md:h-full object-cover">
                        </div>
                        <div class="md:w-1/2 p-8">
                            <h4 class="text-2xl font-bold mb-4 text-gray-900">E-commerce Platform Redesign</h4>
                            <p class="text-gray-600 mb-6">Complete UX overhaul resulting in 40% increase in conversion rates and 60% reduction in cart abandonment</p>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">User Research</span>
                                <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Wireframing</span>
                                <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Prototyping</span>
                            </div>
                            <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">View Case Study</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* UX-focused styling */
.case-study-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.case-study-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}`,
    jsCode: `// UX interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for case studies
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});`
  },
  {
    id: 'photographer-portfolio',
    name: 'Photographer Portfolio',
    description: 'Visual-first portfolio perfect for photographers and visual artists',
    tags: ['Photography', 'Visual', 'Gallery', 'Creative'],
    thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
    category: 'creative',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maya Photography - Visual Artist</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold">Maya Photography</h1>
            <div class="flex gap-6">
                <a href="#gallery" class="hover:text-gray-300 transition-colors">Gallery</a>
                <a href="#about" class="hover:text-gray-300 transition-colors">About</a>
                <a href="#contact" class="hover:text-gray-300 transition-colors">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="h-screen bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop');">
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative z-10 h-full flex items-center justify-center text-center">
            <div>
                <h2 class="text-7xl font-bold mb-6">Capturing Life</h2>
                <p class="text-2xl mb-8 max-w-2xl mx-auto">Professional photographer specializing in portraits, landscapes, and storytelling through imagery</p>
                <button class="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">View Portfolio</button>
            </div>
        </div>
    </section>

    <!-- Gallery Preview -->
    <section id="gallery" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
            <h3 class="text-4xl font-bold text-center mb-12">Featured Work</h3>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616c359e68e?w=400&h=600&fit=crop" alt="Portrait" class="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop" alt="Landscape" class="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop" alt="Wedding" class="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500">
                </div>
            </div>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="py-20 bg-gray-900">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h3 class="text-4xl font-bold mb-8">About Maya</h3>
            <p class="text-xl text-gray-300 mb-8 leading-relaxed">With over 8 years of experience, I've had the privilege of capturing thousands of moments that tell unique stories. My approach combines technical expertise with artistic vision to create images that resonate emotionally.</p>
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h4 class="text-2xl font-bold mb-2">500+</h4>
                    <p class="text-gray-400">Happy Clients</p>
                </div>
                <div>
                    <h4 class="text-2xl font-bold mb-2">50+</h4>
                    <p class="text-gray-400">Weddings Captured</p>
                </div>
                <div>
                    <h4 class="text-2xl font-bold mb-2">8</h4>
                    <p class="text-gray-400">Years Experience</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* Photography portfolio styles */
.gallery-item {
    position: relative;
    overflow: hidden;
}
.gallery-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.gallery-item:hover::before {
    opacity: 1;
}`,
    jsCode: `// Gallery interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});`
  },
  {
    id: 'writer-portfolio',
    name: 'Writer Portfolio',
    description: 'Clean, content-focused portfolio for writers and content creators',
    tags: ['Writer', 'Content', 'Minimal', 'Typography'],
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    category: 'creative',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>James Writer - Content Creator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="bg-white text-gray-900" style="font-family: 'Open Sans', sans-serif;">
    <!-- Header -->
    <header class="border-b border-gray-200">
        <div class="max-w-4xl mx-auto px-6 py-6">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold" style="font-family: 'Merriweather', serif;">James Writer</h1>
                <nav class="flex gap-8">
                    <a href="#writing" class="text-gray-600 hover:text-gray-900 transition-colors">Writing</a>
                    <a href="#about" class="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                    <a href="#contact" class="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="py-20">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-5xl font-bold mb-6" style="font-family: 'Merriweather', serif;">Words that Move</h2>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">I craft compelling content that tells stories, builds brands, and connects with audiences across digital platforms</p>
            <div class="flex justify-center gap-4">
                <button class="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">Read My Work</button>
                <button class="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">Download Resume</button>
            </div>
        </div>
    </section>

    <!-- Featured Writing -->
    <section id="writing" class="py-20 bg-gray-50">
        <div class="max-w-4xl mx-auto px-6">
            <h3 class="text-4xl font-bold text-center mb-12" style="font-family: 'Merriweather', serif;">Featured Articles</h3>
            <div class="space-y-8">
                <article class="bg-white rounded-lg shadow-sm p-8">
                    <h4 class="text-2xl font-bold mb-4 hover:text-blue-600 cursor-pointer" style="font-family: 'Merriweather', serif;">The Future of Digital Storytelling</h4>
                    <p class="text-gray-600 mb-4 leading-relaxed">Exploring how emerging technologies are reshaping the way we tell stories and connect with audiences in the digital age...</p>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Published in TechCrunch • 5 min read</span>
                        <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Read More →</a>
                    </div>
                </article>
                <article class="bg-white rounded-lg shadow-sm p-8">
                    <h4 class="text-2xl font-bold mb-4 hover:text-blue-600 cursor-pointer" style="font-family: 'Merriweather', serif;">Building Brand Voice in the Modern Era</h4>
                    <p class="text-gray-600 mb-4 leading-relaxed">A comprehensive guide to developing authentic brand voice that resonates with today's conscious consumers...</p>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Published in Content Marketing Institute • 8 min read</span>
                        <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Read More →</a>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="py-20">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">200+</h4>
                    <p class="text-gray-600">Articles Published</p>
                </div>
                <div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">50M+</h4>
                    <p class="text-gray-600">Total Reads</p>
                </div>
                <div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">25</h4>
                    <p class="text-gray-600">Award-Winning Pieces</p>
                </div>
                <div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">5</h4>
                    <p class="text-gray-600">Years Experience</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* Typography-focused styling */
.article-title {
    font-family: 'Merriweather', serif;
    line-height: 1.3;
}
.reading-time {
    color: #6b7280;
    font-size: 0.875rem;
}`,
    jsCode: `// Writer portfolio interactions
document.addEventListener('DOMContentLoaded', function() {
    // Reading time estimator
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        const text = article.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);
        console.log(\`Estimated reading time: \${readingTime} minutes\`);
    });
});`
  },
  {
    id: 'marketing-professional',
    name: 'Marketing Professional',
    description: 'Results-driven portfolio for marketing and business professionals',
    tags: ['Marketing', 'Business', 'Results', 'Professional'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    category: 'business',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lisa Marketing - Digital Marketing Strategist</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-6xl mx-auto px-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Lisa Chen</h1>
                    <p class="text-gray-600">Digital Marketing Strategist</p>
                </div>
                <nav class="flex gap-6">
                    <a href="#results" class="text-gray-600 hover:text-blue-600 transition-colors">Results</a>
                    <a href="#services" class="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
                    <a href="#contact" class="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-5xl font-bold mb-6">Driving Growth Through Data</h2>
            <p class="text-xl mb-8 max-w-3xl mx-auto">I help businesses achieve measurable growth through strategic digital marketing, proven methodologies, and data-driven insights</p>
            <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Let's Grow Together</button>
        </div>
    </section>

    <!-- Results -->
    <section id="results" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
            <h3 class="text-4xl font-bold text-center mb-12">Proven Results</h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-blue-600">↗</span>
                    </div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">300%</h4>
                    <p class="text-gray-600">Average ROI Increase</p>
                </div>
                <div class="text-center">
                    <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-green-600">$</span>
                    </div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">$5M+</h4>
                    <p class="text-gray-600">Revenue Generated</p>
                </div>
                <div class="text-center">
                    <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">👥</span>
                    </div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">50+</h4>
                    <p class="text-gray-600">Successful Campaigns</p>
                </div>
                <div class="text-center">
                    <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-orange-600">⭐</span>
                    </div>
                    <h4 class="text-3xl font-bold text-gray-900 mb-2">98%</h4>
                    <p class="text-gray-600">Client Satisfaction</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Case Studies -->
    <section class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6">
            <h3 class="text-4xl font-bold text-center mb-12">Case Studies</h3>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <h4 class="text-xl font-bold mb-4 text-gray-900">E-commerce Growth Strategy</h4>
                    <p class="text-gray-600 mb-6">Increased online sales by 400% in 6 months through strategic SEO, PPC, and conversion optimization</p>
                    <div class="space-y-2 mb-6">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Traffic Increase</span>
                            <span class="font-semibold">250%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Conversion Rate</span>
                            <span class="font-semibold">+180%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Revenue Growth</span>
                            <span class="font-semibold">400%</span>
                        </div>
                    </div>
                    <button class="text-blue-600 font-semibold hover:text-blue-800">View Full Case Study →</button>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <h4 class="text-xl font-bold mb-4 text-gray-900">SaaS Lead Generation</h4>
                    <p class="text-gray-600 mb-6">Built comprehensive lead generation funnel resulting in 300% increase in qualified leads</p>
                    <div class="space-y-2 mb-6">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Lead Quality</span>
                            <span class="font-semibold">+300%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Cost per Lead</span>
                            <span class="font-semibold">-60%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Pipeline Value</span>
                            <span class="font-semibold">$2M+</span>
                        </div>
                    </div>
                    <button class="text-blue-600 font-semibold hover:text-blue-800">View Full Case Study →</button>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* Marketing portfolio styles */
.metric-card {
    transition: transform 0.3s ease;
}
.metric-card:hover {
    transform: translateY(-5px);
}
.case-study-card {
    border-left: 4px solid #3b82f6;
}`,
    jsCode: `// Marketing portfolio interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animated counters for metrics
    const counters = document.querySelectorAll('.metric-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 20);
    });
});`
  },
  {
    id: 'student-portfolio',
    name: 'Student Portfolio',
    description: 'Fresh, modern portfolio perfect for students and early-career professionals',
    tags: ['Student', 'Fresh', 'Modern', 'Beginner'],
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
    category: 'student',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Student - Computer Science Student</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50 shadow-sm">
        <div class="max-w-4xl mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-bold text-gray-900">Alex Student</h1>
                <div class="flex gap-6">
                    <a href="#projects" class="text-gray-600 hover:text-blue-600 transition-colors">Projects</a>
                    <a href="#skills" class="text-gray-600 hover:text-blue-600 transition-colors">Skills</a>
                    <a href="#contact" class="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="pt-24 pb-16 min-h-screen flex items-center">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white shadow-lg">
            <h2 class="text-5xl font-bold mb-6 text-gray-900">Hi, I'm Alex! 👋</h2>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Computer Science student at University of Technology, passionate about web development and creating solutions that make a difference</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">View My Projects</button>
                <button class="border border-gray-300 px-8 py-3 rounded-lg hover:bg-white/50 transition-colors">Download Resume</button>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-6">
            <h3 class="text-4xl font-bold text-center mb-12">My Projects</h3>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                    <h4 class="text-xl font-bold mb-3 text-gray-900">Todo App with React</h4>
                    <p class="text-gray-600 mb-4">A full-stack todo application built with React and Node.js, featuring user authentication and real-time updates</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">React</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Node.js</span>
                        <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">MongoDB</span>
                    </div>
                    <div class="flex gap-3">
                        <button class="text-blue-600 hover:text-blue-800 font-medium">Live Demo →</button>
                        <button class="text-gray-600 hover:text-gray-800 font-medium">GitHub →</button>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
                    <h4 class="text-xl font-bold mb-3 text-gray-900">Weather Dashboard</h4>
                    <p class="text-gray-600 mb-4">Interactive weather dashboard using OpenWeather API with location-based forecasts and beautiful visualizations</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">JavaScript</span>
                        <span class="bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">API Integration</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">CSS3</span>
                    </div>
                    <div class="flex gap-3">
                        <button class="text-purple-600 hover:text-purple-800 font-medium">Live Demo →</button>
                        <button class="text-gray-600 hover:text-gray-800 font-medium">GitHub →</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills & Education -->
    <section id="skills" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="max-w-4xl mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 class="text-3xl font-bold mb-8 text-gray-900">Skills</h3>
                    <div class="space-y-6">
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">JavaScript</span>
                                <span class="text-gray-600">Intermediate</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: 70%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">React</span>
                                <span class="text-gray-600">Beginner</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: 50%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="font-medium">Python</span>
                                <span class="text-gray-600">Intermediate</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: 65%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="text-3xl font-bold mb-8 text-gray-900">Education</h3>
                    <div class="space-y-6">
                        <div class="border-l-4 border-blue-600 pl-6">
                            <h4 class="font-bold text-lg">Bachelor of Computer Science</h4>
                            <p class="text-gray-600">University of Technology</p>
                            <p class="text-sm text-gray-500">2021 - 2025 (Expected)</p>
                            <p class="text-sm mt-2">Current GPA: 3.8/4.0</p>
                        </div>
                        <div class="border-l-4 border-gray-300 pl-6">
                            <h4 class="font-bold text-lg">Web Development Bootcamp</h4>
                            <p class="text-gray-600">CodeCamp Academy</p>
                            <p class="text-sm text-gray-500">Summer 2023</p>
                            <p class="text-sm mt-2">Intensive 12-week program focusing on full-stack development</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* Student portfolio styles */
.skill-bar {
    transition: width 2s ease-in-out;
}
.project-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}`,
    jsCode: `// Student portfolio interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width;
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
});`
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist Pro',
    description: 'Analytics-focused portfolio with data visualizations',
    tags: ['Data Science', 'Professional', 'Charts', 'Clean'],
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    category: 'data-scientist',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. Data - Data Scientist Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-6xl mx-auto px-6 py-6">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-blue-600">Dr. Data</h1>
                <nav class="flex gap-6">
                    <a href="#projects" class="text-gray-600 hover:text-blue-600">Projects</a>
                    <a href="#skills" class="text-gray-600 hover:text-blue-600">Skills</a>
                    <a href="#contact" class="text-gray-600 hover:text-blue-600">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-5xl font-bold mb-4">Data Scientist & ML Engineer</h2>
            <p class="text-xl opacity-90 mb-8">Transforming data into actionable insights</p>
            <div class="grid md:grid-cols-3 gap-8 mt-12">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 class="text-2xl font-bold">50+</h3>
                    <p>ML Models Deployed</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 class="text-2xl font-bold">99.2%</h3>
                    <p>Average Model Accuracy</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 class="text-2xl font-bold">$2M+</h3>
                    <p>Business Value Generated</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
            <h3 class="text-4xl font-bold text-center mb-12">Key Projects</h3>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h4 class="text-xl font-semibold mb-3">Predictive Analytics Dashboard</h4>
                    <p class="text-gray-600 mb-4">Real-time machine learning pipeline for customer churn prediction</p>
                    <canvas id="chart1" width="300" height="150"></canvas>
                    <div class="flex gap-2 mt-4">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Python</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">TensorFlow</span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">AWS</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* Data visualization styles */
.chart-container {
    position: relative;
    height: 300px;
    margin: 20px 0;
}

.metric-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 24px;
    color: white;
    text-align: center;
}`,
    jsCode: `// Initialize chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('chart1');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Model Accuracy',
                    data: [85, 88, 92, 89, 94, 96],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: false, min: 80 }
                }
            }
        });
    }
});`
  },
  {
    id: 'minimal-professional',
    name: 'Minimal Professional',
    description: 'Clean, minimal design perfect for any profession',
    tags: ['Minimal', 'Professional', 'Light Theme', 'Beginner'],
    thumbnail: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop',
    category: 'general',
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Professional - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900 font-sans">
    <!-- Navigation -->
    <nav class="border-b border-gray-200">
        <div class="max-w-4xl mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-semibold">Alex Professional</h1>
                <div class="flex gap-8">
                    <a href="#about" class="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                    <a href="#work" class="text-gray-600 hover:text-gray-900 transition-colors">Work</a>
                    <a href="#contact" class="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="py-24">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-5xl font-light mb-6 leading-tight">Hi, I'm Alex.<br>I solve problems.</h2>
            <p class="text-xl text-gray-600 max-w-2xl">I'm a professional who believes in the power of simple, effective solutions. With a focus on quality and attention to detail.</p>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-6">
            <h3 class="text-3xl font-light mb-8">About</h3>
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <p class="text-gray-600 leading-relaxed mb-6">With over 5 years of experience, I specialize in creating solutions that matter. My approach combines strategic thinking with practical execution.</p>
                    <p class="text-gray-600 leading-relaxed">I believe great work comes from understanding the problem deeply and iterating towards elegant solutions.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Core Skills</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Strategic Planning</li>
                        <li>• Project Management</li>
                        <li>• Team Leadership</li>
                        <li>• Problem Solving</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Work -->
    <section id="work" class="py-16">
        <div class="max-w-4xl mx-auto px-6">
            <h3 class="text-3xl font-light mb-12">Selected Work</h3>
            <div class="space-y-12">
                <div class="border-b border-gray-200 pb-8">
                    <h4 class="text-xl font-semibold mb-2">Strategic Initiative Lead</h4>
                    <p class="text-gray-600 mb-4">Led cross-functional team to deliver 30% efficiency improvement</p>
                    <span class="text-sm text-gray-500">2023 - Present</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h3 class="text-3xl font-light mb-8">Let's Talk</h3>
            <p class="text-gray-600 mb-8">I'm always interested in new opportunities and meaningful conversations.</p>
            <a href="mailto:alex@example.com" class="inline-block bg-gray-900 text-white px-8 py-3 hover:bg-gray-700 transition-colors">Get In Touch</a>
        </div>
    </section>
</body>
</html>`,
    cssCode: `/* Minimal custom styles */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`,
    jsCode: `// Smooth scroll and fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});`
  }
];
