
export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  category: 'developer' | 'designer' | 'data-scientist' | 'general';
}

export const portfolioTemplates: Template[] = [
  {
    id: 'modern-developer',
    name: 'Modern Developer',
    description: 'Clean, professional developer portfolio with dark theme',
    tags: ['Developer', 'Dark Theme', 'One-page', 'Modern'],
    thumbnail: '/api/placeholder/400/300',
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
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Vibrant, visual-first portfolio for designers and creatives',
    tags: ['Designer', 'Colorful', 'Multi-page', 'Creative'],
    thumbnail: '/api/placeholder/400/300',
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
            <img src="/api/placeholder/300/300" alt="Profile" class="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-xl">
        </div>
    </section>

    <!-- Work Section -->
    <section id="work" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
            <h3 class="text-4xl font-bold text-center mb-12">Featured Work</h3>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="group cursor-pointer">
                    <div class="overflow-hidden rounded-lg">
                        <img src="/api/placeholder/500/400" alt="Project" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <h4 class="text-xl font-semibold mt-4">Brand Identity Design</h4>
                    <p class="text-gray-600">Complete brand identity for tech startup</p>
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
    id: 'data-scientist',
    name: 'Data Scientist Pro',
    description: 'Analytics-focused portfolio with data visualizations',
    tags: ['Data Science', 'Professional', 'Charts', 'Clean'],
    thumbnail: '/api/placeholder/400/300',
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
    thumbnail: '/api/placeholder/400/300',
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
