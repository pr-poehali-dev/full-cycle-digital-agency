import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const services = [
  {
    icon: 'Globe',
    title: 'Разработка сайтов',
    description: 'Создаём современные веб-сайты с уникальным дизайном и безупречной функциональностью',
    gradient: 'from-primary to-secondary'
  },
  {
    icon: 'Smartphone',
    title: 'Мобильные приложения',
    description: 'Разрабатываем iOS и Android приложения с нативным UX и высокой производительностью',
    gradient: 'from-secondary to-accent'
  },
  {
    icon: 'MessageSquare',
    title: 'Боты и чат-боты',
    description: 'Автоматизируем взаимодействие с клиентами через умных ботов в соцсетях',
    gradient: 'from-accent to-primary'
  },
  {
    icon: 'TrendingUp',
    title: 'Реклама и продвижение',
    description: 'Комплексное продвижение бизнеса в digital-пространстве с гарантированным результатом',
    gradient: 'from-primary to-accent'
  }
];

const portfolio = [
  { title: 'E-commerce платформа', category: 'Web', image: '🛍️' },
  { title: 'Финтех приложение', category: 'Mobile', image: '💳' },
  { title: 'AI чат-бот поддержки', category: 'Bot', image: '🤖' },
  { title: 'Social Media кампания', category: 'Marketing', image: '📱' },
  { title: 'SaaS платформа', category: 'Web', image: '☁️' },
  { title: 'Криптовалютный сервис', category: 'Mobile', image: '₿' }
];

const team = [
  { name: 'Алексей Волков', role: 'CEO & Founder', emoji: '👨‍💼' },
  { name: 'Мария Соколова', role: 'Creative Director', emoji: '🎨' },
  { name: 'Дмитрий Петров', role: 'Tech Lead', emoji: '👨‍💻' },
  { name: 'Анна Кузнецова', role: 'Marketing Head', emoji: '📊' }
];

const process = [
  {
    step: '01',
    title: 'Анализ и исследование',
    description: 'Изучаем ваш бизнес, конкурентов и целевую аудиторию. Формируем стратегию развития.',
    duration: '3-5 дней',
    color: 'primary'
  },
  {
    step: '02',
    title: 'Дизайн и прототипирование',
    description: 'Создаём концепцию, UX/UI дизайн и интерактивный прототип для согласования.',
    duration: '7-10 дней',
    color: 'secondary'
  },
  {
    step: '03',
    title: 'Разработка',
    description: 'Программируем функционал, интегрируем системы, проводим тестирование и отладку.',
    duration: '14-21 день',
    color: 'accent'
  },
  {
    step: '04',
    title: 'Запуск и поддержка',
    description: 'Выводим продукт на рынок, настраиваем аналитику и обеспечиваем техподдержку.',
    duration: 'от 2 дней',
    color: 'primary'
  }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://functions.poehali.dev/12f1320e-6e19-4acd-9609-60738f0becd3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-background/80 backdrop-blur-lg border-b border-border' : ''
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-display font-bold text-gradient">
            DIGITAL
          </div>
          <div className="hidden md:flex gap-8">
            {['home', 'services', 'process', 'portfolio', 'team', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section ? 'text-primary' : 'text-muted-foreground'
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
          <Button className="glow">
            Связаться
          </Button>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary glow">
                Digital-агенство полного цикла
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 animate-slide-up">
              <span className="text-gradient">
                Создаём будущее
              </span>
              <br />
              <span className="text-foreground">
                вашего бизнеса
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              От разработки сайтов и приложений до рекламных кампаний — 
              воплощаем смелые идеи в цифровую реальность
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="text-lg px-8 py-6 glow-strong">
                <Icon name="Rocket" className="mr-2" size={20} />
                Запустить проект
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="Play" className="mr-2" size={20} />
                Смотреть работы
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-muted-foreground" />
        </div>
      </section>

      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Наши <span className="text-gradient">услуги</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексные решения для развития вашего бизнеса в цифровой среде
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative p-8 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="mb-6 inline-block p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon name={service.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-gradient transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Подробнее
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Процесс <span className="text-gradient">разработки</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Прозрачная система работы с чёткими этапами и сроками выполнения
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-${item.color} to-${item.color}/50 flex items-center justify-center font-display font-bold text-2xl text-white glow group-hover:scale-110 transition-transform duration-300`}>
                    {item.step}
                  </div>
                  
                  <Card className="flex-1 p-8 bg-card/50 backdrop-blur border-border group-hover:border-primary/50 transition-all duration-300 hover-lift">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-display font-bold group-hover:text-gradient transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full whitespace-nowrap">
                        <Icon name="Clock" size={16} />
                        {item.duration}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </div>
                
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute left-10 top-24 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
              <Icon name="Zap" size={20} className="text-primary" />
              <span className="font-medium">Средний срок реализации проекта: 21-36 дней</span>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-gradient">Портфолио</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Избранные проекты, которыми мы гордимся
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {portfolio.map((project, index) => (
              <Card
                key={index}
                className="group relative aspect-square overflow-hidden cursor-pointer border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                  {project.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-medium text-primary mb-2">{project.category}</span>
                  <h3 className="text-xl font-display font-bold">{project.title}</h3>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Смотреть все проекты
              <Icon name="ExternalLink" className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section id="team" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Наша <span className="text-gradient">команда</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Профессионалы, создающие выдающиеся продукты
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group text-center p-8 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer"
              >
                <div className="mb-6 text-6xl group-hover:scale-110 transition-transform duration-300">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-gradient transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {member.role}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Готовы начать <span className="text-gradient">проект</span>?
              </h2>
              <p className="text-xl text-muted-foreground">
                Свяжитесь с нами и получите бесплатную консультацию
              </p>
            </div>

            <Card className="p-12 bg-card/50 backdrop-blur border-border">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">Расскажите о проекте</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Опишите ваши цели и задачи..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary font-medium flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} />
                    Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive font-medium flex items-center gap-2">
                    <Icon name="AlertCircle" size={20} />
                    Ошибка отправки. Попробуйте позже или свяжитесь с нами напрямую.
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6 glow-strong"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2" size={20} />
                      Отправить заявку
                    </>
                  )}
                </Button>
              </form>
            </Card>

            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">hello@digital.agency</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (999) 123-45-67</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold mb-2">Офис</h3>
                <p className="text-muted-foreground">Москва, Тверская 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-display font-bold text-gradient">
              DIGITAL
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Digital Agency. Все права защищены.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost">
                <Icon name="Github" size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Icon name="Linkedin" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;