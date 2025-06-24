
export const portfolioTemplates = [
  {
    id: 'minimal-dev',
    name: 'Minimal Developer',
    description: 'Clean, minimalist portfolio perfect for software developers',
    tags: ['Beginner', 'One-pager', 'Dark Theme', 'Minimalist'],
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    category: 'developer',
    htmlCode: `
      <div class="min-h-screen bg-gray-900 text-white">
        <nav class="container mx-auto px-6 py-8">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">John Doe</h1>
            <div class="space-x-6">
              <a href="#about" class="hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" class="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" class="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </nav>
        
        <main class="container mx-auto px-6">
          <section class="py-20 text-center">
            <h2 class="text-5xl font-bold mb-6">Full Stack Developer</h2>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto">
              I create beautiful, responsive web applications using modern technologies.
            </p>
            <button class="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition-colors">
              View My Work
            </button>
          </section>
          
          <section id="projects" class="py-20">
            <h3 class="text-3xl font-bold mb-12 text-center">Featured Projects</h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-gray-800 rounded-lg p-6">
                <h4 class="text-xl font-semibold mb-4">E-Commerce Platform</h4>
                <p class="text-gray-300 mb-4">React, Node.js, MongoDB</p>
                <a href="#" class="text-blue-400 hover:underline">View Project →</a>
              </div>
              <div class="bg-gray-800 rounded-lg p-6">
                <h4 class="text-xl font-semibold mb-4">Task Management App</h4>
                <p class="text-gray-300 mb-4">Vue.js, Express, PostgreSQL</p>
                <a href="#" class="text-blue-400 hover:underline">View Project →</a>
              </div>
              <div class="bg-gray-800 rounded-lg p-6">
                <h4 class="text-xl font-semibold mb-4">Weather Dashboard</h4>
                <p class="text-gray-300 mb-4">React, TypeScript, API Integration</p>
                <a href="#" class="text-blue-400 hover:underline">View Project →</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    `,
    cssCode: `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
      }
      
      .container {
        max-width: 1200px;
      }
      
      @media (max-width: 768px) {
        .grid {
          grid-template-columns: 1fr;
        }
        
        h2 {
          font-size: 2.5rem;
        }
        
        nav .space-x-6 {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      }
    `,
    jsCode: `
      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
      
      // Add scroll effect to navigation
      window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
          nav.classList.add('backdrop-blur-sm', 'bg-gray-900/80');
        } else {
          nav.classList.remove('backdrop-blur-sm', 'bg-gray-900/80');
        }
      });
    `
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Vibrant, creative portfolio showcasing design work',
    tags: ['Creative', 'Multi-page', 'Light Theme', 'Advanced'],
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    category: 'designer',
    htmlCode: `
      <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <nav class="container mx-auto px-6 py-8">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <h1 class="text-2xl font-bold text-gray-800">Sarah Chen</h1>
            </div>
            <div class="space-x-6">
              <a href="#work" class="text-gray-700 hover:text-purple-600 transition-colors">Work</a>
              <a href="#about" class="text-gray-700 hover:text-purple-600 transition-colors">About</a>
              <a href="#contact" class="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
            </div>
          </div>
        </nav>
        
        <main class="container mx-auto px-6">
          <section class="py-20 text-center">
            <h2 class="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              UI/UX Designer
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Creating delightful digital experiences through thoughtful design and user research.
            </p>
            <div class="flex justify-center space-x-4">
              <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform">
                View Portfolio
              </button>
              <button class="border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-full hover:bg-purple-50 transition-colors">
                Download Resume
              </button>
            </div>
          </section>
          
          <section id="work" class="py-20">
            <h3 class="text-4xl font-bold mb-12 text-center text-gray-800">Featured Work</h3>
            <div class="grid md:grid-cols-2 gap-12">
              <div class="group cursor-pointer">
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-6"></div>
                  <h4 class="text-2xl font-semibold mb-3 text-gray-800">Mobile Banking App</h4>
                  <p class="text-gray-600 mb-4">Complete redesign of mobile banking experience with focus on accessibility and user flow optimization.</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">UI Design</span>
                    <span class="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">User Research</span>
                  </div>
                </div>
              </div>
              
              <div class="group cursor-pointer">
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div class="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-xl mb-6"></div>
                  <h4 class="text-2xl font-semibold mb-3 text-gray-800">E-Learning Platform</h4>
                  <p class="text-gray-600 mb-4">Modern learning platform design with interactive components and gamification elements.</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">UX Design</span>
                    <span class="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">Prototyping</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    `,
    cssCode: `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
      }
      
      .container {
        max-width: 1200px;
      }
      
      .bg-clip-text {
        -webkit-background-clip: text;
        background-clip: text;
      }
      
      @media (max-width: 768px) {
        .grid {
          grid-template-columns: 1fr;
        }
        
        h2 {
          font-size: 3rem;
        }
        
        nav .space-x-6 {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .flex.justify-center.space-x-4 {
          flex-direction: column;
          gap: 1rem;
        }
      }
    `,
    jsCode: `
      // Smooth animations on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      
      // Observe all project cards
      document.querySelectorAll('.group').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
      });
      
      // Parallax effect for hero section
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('main section:first-child');
        if (hero) {
          hero.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
        }
      });
    `
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist Pro',
    description: 'Professional portfolio for data scientists and analysts',
    tags: ['Advanced', 'One-pager', 'Dark Theme', 'Professional'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'data-scientist',
    htmlCode: `
      <div class="min-h-screen bg-gray-900 text-white">
        <nav class="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50">
          <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
              <h1 class="text-xl font-bold">Dr. Alex Rodriguez</h1>
              <div class="space-x-6">
                <a href="#expertise" class="hover:text-blue-400 transition-colors">Expertise</a>
                <a href="#projects" class="hover:text-blue-400 transition-colors">Projects</a>
                <a href="#publications" class="hover:text-blue-400 transition-colors">Publications</a>
                <a href="#contact" class="hover:text-blue-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </nav>
        
        <main class="pt-20">
          <section class="container mx-auto px-6 py-20 text-center">
            <h2 class="text-5xl font-bold mb-6">Data Scientist & ML Engineer</h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transforming complex data into actionable insights through advanced analytics, 
              machine learning, and statistical modeling.
            </p>
            <div class="flex justify-center space-x-8 mb-12">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-400">5+</div>
                <div class="text-gray-400">Years Experience</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-400">50+</div>
                <div class="text-gray-400">Projects Completed</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-400">12</div>
                <div class="text-gray-400">Research Papers</div>
              </div>
            </div>
          </section>
          
          <section id="expertise" class="container mx-auto px-6 py-20">
            <h3 class="text-3xl font-bold mb-12 text-center">Technical Expertise</h3>
            <div class="grid md:grid-cols-3 gap-8">
              <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h4 class="text-xl font-semibold mb-4 text-blue-400">Machine Learning</h4>
                <ul class="space-y-2 text-gray-300">
                  <li>• Deep Learning (TensorFlow, PyTorch)</li>
                  <li>• Natural Language Processing</li>
                  <li>• Computer Vision</li>
                  <li>• Reinforcement Learning</li>
                </ul>
              </div>
              
              <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h4 class="text-xl font-semibold mb-4 text-green-400">Data Engineering</h4>
                <ul class="space-y-2 text-gray-300">
                  <li>• Python, R, SQL</li>
                  <li>• Apache Spark, Hadoop</li>
                  <li>• AWS, Google Cloud</li>
                  <li>• Docker, Kubernetes</li>
                </ul>
              </div>
              
              <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h4 class="text-xl font-semibold mb-4 text-purple-400">Analytics</h4>
                <ul class="space-y-2 text-gray-300">
                  <li>• Statistical Modeling</li>
                  <li>• A/B Testing</li>
                  <li>• Data Visualization</li>
                  <li>• Business Intelligence</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section id="projects" class="container mx-auto px-6 py-20">
            <h3 class="text-3xl font-bold mb-12 text-center">Featured Projects</h3>
            <div class="space-y-8">
              <div class="bg-gray-800 rounded-lg p-8 border border-gray-700">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h4 class="text-2xl font-semibold mb-2 md:mb-0">Predictive Healthcare Analytics</h4>
                  <div class="flex space-x-2">
                    <span class="bg-blue-600 px-3 py-1 rounded-full text-sm">Python</span>
                    <span class="bg-green-600 px-3 py-1 rounded-full text-sm">ML</span>
                    <span class="bg-purple-600 px-3 py-1 rounded-full text-sm">Healthcare</span>
                  </div>
                </div>
                <p class="text-gray-300 mb-4">
                  Developed machine learning models to predict patient readmission risks, 
                  reducing readmission rates by 23% and saving $2.1M annually.
                </p>
                <div class="text-sm text-gray-400">
                  Technologies: Python, scikit-learn, XGBoost, PostgreSQL, Tableau
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    `,
    cssCode: `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
      }
      
      .container {
        max-width: 1200px;
      }
      
      nav {
        transition: all 0.3s ease;
      }
      
      @media (max-width: 768px) {
        .grid {
          grid-template-columns: 1fr;
        }
        
        h2 {
          font-size: 2.5rem;
        }
        
        nav .space-x-6 {
          display: none;
        }
        
        .flex.justify-center.space-x-8 {
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }
      }
    `,
    jsCode: `
      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
      
      // Counter animation
      function animateCounters() {
        const counters = document.querySelectorAll('.text-3xl.font-bold');
        
        counters.forEach(counter => {
          const target = parseInt(counter.textContent.replace('+', ''));
          let current = 0;
          const increment = target / 50;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }
          }, 40);
        });
      }
      
      // Trigger counter animation on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      });
      
      const statsSection = document.querySelector('.flex.justify-center.space-x-8');
      if (statsSection) {
        observer.observe(statsSection);
      }
    `
  }
];
