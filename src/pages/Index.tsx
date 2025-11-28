import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const services = [
  {
    icon: 'Code',
    title: 'Разработка сайтов',
    description: 'Создаём цифровые пространства будущего с инновационным дизайном и технологиями завтрашнего дня',
  },
  {
    icon: 'Smartphone',
    title: 'Мобильные приложения',
    description: 'iOS и Android решения мирового уровня с безупречным пользовательским опытом',
  },
  {
    icon: 'Bot',
    title: 'Чат-боты и AI',
    description: 'Умные боты с искусственным интеллектом для автоматизации бизнеса в соцсетях',
  },
  {
    icon: 'Rocket',
    title: 'Digital-маркетинг',
    description: 'Комплексное продвижение и масштабирование вашего присутствия в цифровом мире',
  }
];

const portfolio = [
  { title: 'Luxe E-commerce', category: 'E-commerce', tech: 'React, Node.js' },
  { title: 'FinTech Platform', category: 'Финтех', tech: 'Next.js, Python' },
  { title: 'AI Assistant Bot', category: 'AI', tech: 'GPT-4, Telegram' },
  { title: 'Brand Campaign', category: 'Маркетинг', tech: 'Instagram, TikTok' },
  { title: 'SaaS Dashboard', category: 'SaaS', tech: 'React, TypeScript' },
  { title: 'Crypto Exchange', category: 'Web3', tech: 'Solidity, Web3.js' }
];

const team = [
  { name: 'Александр Код', role: 'CEO & Visionary', initial: 'A' },
  { name: 'Екатерина Дизайн', role: 'Creative Director', initial: 'E' },
  { name: 'Михаил Тех', role: 'Tech Architect', initial: 'M' },
  { name: 'Ольга Маркет', role: 'Growth Lead', initial: 'O' }
];

const process = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'Глубокое погружение в ваш бизнес. Анализ рынка, конкурентов и целевой аудитории. Формирование стратегии цифровой трансформации.',
    duration: '3-5 дней',
  },
  {
    step: '02',
    title: 'Design & Prototype',
    description: 'Создание визуальной концепции будущего. Разработка UX/UI дизайна и интерактивных прототипов для тестирования гипотез.',
    duration: '7-10 дней',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Воплощение идей в код. Разработка функционала, интеграция систем, тестирование производительности и безопасности.',
    duration: '14-21 день',
  },
  {
    step: '04',
    title: 'Launch & Growth',
    description: 'Вывод продукта на рынок. Настройка аналитики, непрерывная оптимизация и масштабирование результатов.',
    duration: 'от 2 дней',
  }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.1), transparent)`
        }}
      />

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-xl border-b border-gold/20' : ''
      }`}>
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-3xl font-display font-bold tracking-wider">
            <span className="text-white">KOD</span>
            <span className="text-gold"> FUTURE</span>
          </div>
          
          <div className="hidden md:flex gap-10">
            {['home', 'services', 'process', 'portfolio', 'team', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-gold ${
                  activeSection === section ? 'text-gold' : 'text-white/70'
                }`}
              >
                {section === 'home' ? 'Главная' : 
                 section === 'services' ? 'Услуги' :
                 section === 'process' ? 'Процесс' :
                 section === 'portfolio' ? 'Портфолио' :
                 section === 'team' ? 'Команда' : 'Контакты'}
              </button>
            ))}
          </div>
          
          <Button className="bg-gold text-black hover:bg-gold/90 font-bold uppercase tracking-wider">
            Связаться
          </Button>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://cdn.poehali.dev/projects/1bbb6ac1-045d-4e25-a215-055f2dadc9db/files/63176fa2-f118-4c94-b760-b2d2deb30b59.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="vertical-text text-8xl font-display font-bold text-white/5 tracking-wider">
            INNOVATION
          </div>
        </div>

        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="vertical-text text-8xl font-display font-bold text-white/5 tracking-wider">
            EXCELLENCE
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <div className="inline-block px-6 py-2 border border-gold/30 text-xs uppercase tracking-[0.3em] text-gold font-medium">
                Digital Agency Full Cycle
              </div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-display font-bold mb-8 leading-none animate-slide-up">
              <span className="text-white">СОЗДАЁМ</span>
              <br />
              <span className="text-gradient text-8xl md:text-[10rem]">БУДУЩЕЕ</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-in uppercase tracking-wide" style={{ animationDelay: '0.2s' }}>
              От разработки до маркетинга — воплощаем амбициозные идеи в цифровую реальность
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90 text-base px-10 py-7 font-bold uppercase tracking-wider glow-gold-strong">
                Начать проект
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gold text-gold hover:bg-gold hover:text-black text-base px-10 py-7 font-bold uppercase tracking-wider">
                Портфолио
              </Button>
            </div>

            <div className="mt-24 grid grid-cols-3 gap-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold text-gold mb-2">50+</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Проектов</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gold mb-2">5+</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gold mb-2">24/7</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Поддержка</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-gold" />
        </div>
      </section>

      <section id="services" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">Services</div>
            <h2 className="text-6xl md:text-7xl font-display font-bold mb-6">
              ЧТО МЫ <span className="text-gold">ДЕЛАЕМ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-gold/20 max-w-7xl mx-auto border border-gold/20">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-12 bg-black hover:bg-card transition-all duration-500 cursor-pointer"
              >
                <div className="absolute top-8 right-8">
                  <Icon name={service.icon} size={40} className="text-gold/20 group-hover:text-gold transition-all duration-500" />
                </div>
                
                <div className="text-sm text-gold/50 mb-4 font-mono">0{index + 1}</div>
                <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-gold transition-colors uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-8 flex items-center text-gold font-medium uppercase text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                  Подробнее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://cdn.poehali.dev/projects/1bbb6ac1-045d-4e25-a215-055f2dadc9db/files/70d66679-f472-4d79-ae82-b0c85da28ce7.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">Process</div>
            <h2 className="text-6xl md:text-7xl font-display font-bold mb-6">
              КАК МЫ <span className="text-gold">РАБОТАЕМ</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-1">
            {process.map((item, index) => (
              <div
                key={index}
                className="group relative border border-gold/20 hover:border-gold transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row items-start bg-black/80 backdrop-blur-sm p-10 hover:bg-black transition-all duration-500">
                  <div className="flex-shrink-0 mr-8 mb-6 md:mb-0">
                    <div className="text-6xl font-display font-bold text-gold/20 group-hover:text-gold transition-all duration-500">
                      {item.step}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <h3 className="text-3xl font-display font-bold uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-gold px-4 py-2 border border-gold/30 whitespace-nowrap uppercase tracking-wider">
                        <Icon name="Clock" size={14} />
                        {item.duration}
                      </div>
                    </div>
                    <p className="text-white/60 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">Portfolio</div>
            <h2 className="text-6xl md:text-7xl font-display font-bold mb-6">
              НАШИ <span className="text-gold">РАБОТЫ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 max-w-7xl mx-auto bg-gold/20">
            {portfolio.map((project, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden cursor-pointer bg-black"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-gold/20 group-hover:from-gold/20 group-hover:to-gold/40 transition-all duration-700" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="text-8xl font-display font-bold text-white/5 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-mono text-gold/70 mb-3 uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-wide">{project.title}</h3>
                  <p className="text-xs text-white/40 font-mono">{project.tech}</p>
                </div>
                
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">Team</div>
            <h2 className="text-6xl md:text-7xl font-display font-bold mb-6">
              НАША <span className="text-gold">КОМАНДА</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center border border-gold/20 p-10 hover:border-gold transition-all duration-500 cursor-pointer bg-black/50 backdrop-blur-sm"
              >
                <div className="mb-8 mx-auto w-32 h-32 border-2 border-gold/30 group-hover:border-gold flex items-center justify-center transition-all duration-500">
                  <div className="text-5xl font-display font-bold text-gold/30 group-hover:text-gold transition-all duration-500">
                    {member.initial}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wide">
                  {member.name}
                </h3>
                <p className="text-xs text-white/50 uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">Contact</div>
              <h2 className="text-6xl md:text-7xl font-display font-bold mb-6">
                НАЧНЁМ <span className="text-gold">ПРОЕКТ</span>?
              </h2>
            </div>

            <div className="border-2 border-gold/20 p-12 bg-black/50 backdrop-blur-sm">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-3 font-medium">Ваше имя</label>
                    <input
                      type="text"
                      required
                      className="w-full px-6 py-4 bg-black border border-gold/30 focus:border-gold text-white focus:outline-none transition-colors font-medium"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-3 font-medium">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-6 py-4 bg-black border border-gold/30 focus:border-gold text-white focus:outline-none transition-colors font-medium"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold/70 mb-3 font-medium">Расскажите о проекте</label>
                  <textarea
                    rows={6}
                    required
                    className="w-full px-6 py-4 bg-black border border-gold/30 focus:border-gold text-white focus:outline-none transition-colors resize-none font-medium"
                    placeholder="Опишите ваши цели и задачи..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gold text-black hover:bg-gold/90 text-base py-7 font-bold uppercase tracking-wider glow-gold-strong"
                >
                  Отправить заявку
                </Button>
              </form>
            </div>

            <div className="mt-20 grid md:grid-cols-3 gap-12 text-center">
              <div>
                <Icon name="Mail" size={32} className="text-gold mx-auto mb-4" />
                <div className="text-xs uppercase tracking-wider text-gold/70 mb-2 font-medium">Email</div>
                <p className="text-white/80">hello@kodfuture.com</p>
              </div>
              <div>
                <Icon name="Phone" size={32} className="text-gold mx-auto mb-4" />
                <div className="text-xs uppercase tracking-wider text-gold/70 mb-2 font-medium">Телефон</div>
                <p className="text-white/80">+7 (999) 123-45-67</p>
              </div>
              <div>
                <Icon name="MapPin" size={32} className="text-gold mx-auto mb-4" />
                <div className="text-xs uppercase tracking-wider text-gold/70 mb-2 font-medium">Офис</div>
                <p className="text-white/80">Москва, Центр</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gold/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-display font-bold tracking-wider">
              <span className="text-white">KOD</span>
              <span className="text-gold"> FUTURE</span>
            </div>
            <p className="text-sm text-white/50 uppercase tracking-wider">
              © 2024 KOD FUTURE. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="border border-gold/30 hover:border-gold hover:bg-gold/10">
                <Icon name="Github" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="border border-gold/30 hover:border-gold hover:bg-gold/10">
                <Icon name="Linkedin" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="border border-gold/30 hover:border-gold hover:bg-gold/10">
                <Icon name="Instagram" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
