import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  CreditCardIcon, 
  ClockIcon,
  StarIcon,
  MapPinIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  PhoneIcon 
} from '@heroicons/react/24/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedCarClass, setSelectedCarClass] = useState('economy');
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [calculatedPrice, setCalculatedPrice] = useState(210);

  const features = [
    {
      icon: SparklesIcon,
      title: 'Новые автомобили',
      description: 'Современный автопарк с последними моделями'
    },
    {
      icon: CreditCardIcon,
      title: 'Доступные цены',
      description: 'От 4 ₽/минута'
    },
    {
      icon: ClockIcon,
      title: 'Быстрый старт',
      description: 'Начните поездку за 2 минуты'
    },
    {
      icon: SparklesIcon,
      title: 'Большой выбор',
      description: '14 автомобилей в автопарке'
    }
  ];

  const advantages = [
    {
      icon: ShieldCheckIcon,
      title: "Безопасность",
      description: "Все автомобили застрахованы и регулярно проходят техобслуживание"
    },
    {
      icon: UserGroupIcon,
      title: "Поддержка 24/7",
      description: "Наша команда всегда готова помочь вам в любой ситуации"
    },
    {
      icon: PhoneIcon,
      title: "Простое бронирование",
      description: "Быстрая регистрация и аренда автомобиля через сайт за пару кликов"
    }
  ];

  const testimonials = [
    {
      name: "Анна М.",
      role: "Клиент",
      content: "Отличный сервис! Машина была чистая и в идеальном состоянии. Очень удобное приложение.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Дмитрий К.",
      role: "Клиент",
      content: "Пользуюсь регулярно. Нравится разнообразие автомобилей и прозрачные цены.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Елена В.",
      role: "Клиент",
      content: "Быстрая подача и отличная поддержка. Рекомендую!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Александр П.",
      role: "Клиент",
      content: "В целом доволен сервисом. Иногда бывают задержки с подачей, но машины всегда в хорошем состоянии.",
      rating: 4.5,
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    }
  ];

  const faqs = [
    {
      question: "Как начать пользоваться каршерингом?",
      answer: "Зарегистрируйтесь в приложении, загрузите необходимые документы и после проверки вы сможете арендовать автомобиль."
    },
    {
      question: "Какие документы нужны?",
      answer: "Паспорт и водительское удостоверение. Стаж вождения должен быть не менее 2 лет."
    },
    {
      question: "Что входит в стоимость аренды?",
      answer: "В стоимость включено топливо, страховка и парковка в разрешенных зонах."
    }
  ];

  const partners = [
    {
      name: "СберАвто",
      logo: "/images/partners/sberauto.png",
      description: "Финансовый партнер",
      website: "https://sberauto.com"
    },
    {
      name: "Ресо-Гарантия",
      logo: "/images/partners/reso.png",
      description: "Страховой партнер",
      website: "https://reso.ru"
    },
    {
      name: "УРАЛХИМ",
      logo: "/images/partners/uralchem.png",
      description: "Корпоративный партнер",
      website: "https://uralchem.ru"
    },
    {
      name: "ПАО Метафракс",
      logo: "/images/partners/metafrax.png",
      description: "Промышленный партнер",
      website: "https://metafrax.ru"
    }
  ];

  const carCategories = [
    {
      id: 'economy',
      name: 'Эконом',
      price: 7,
      cars: [
        {
          name: 'Skoda Octavia',
          image: '/images/cars/skoda-octavia.jpg',
          specs: {
            transmission: 'Передний',
            power: '190 л.с.',
            consumption: '6.4 л/100км'
          }
        },
        {
          name: 'Volkswagen Polo',
          image: '/images/cars/volkswagen-polo.jpg',
          specs: {
            transmission: 'Передний',
            power: '110 л.с.',
            consumption: '5.7 л/100км'
          }
        },
        {
          name: 'Kia Rio',
          image: '/images/cars/kia-rio.jpg',
          specs: {
            transmission: 'Передний',
            power: '100 л.с.',
            consumption: '6.0 л/100км'
          }
        },
        {
          name: 'Hyundai Solaris',
          image: '/images/cars/hyundai-solaris.jpg',
          specs: {
            transmission: 'Передний',
            power: '100 л.с.',
            consumption: '5.8 л/100км'
          }
        }
      ]
    },
    {
      id: 'comfort',
      name: 'Комфорт',
      price: 10,
      cars: [
        {
          name: 'Toyota Camry',
          image: '/images/cars/toyota-camry.jpg',
          specs: {
            transmission: 'Передний',
            power: '249 л.с.',
            consumption: '7.7 л/100км'
          }
        },
        {
          name: 'Kia K5',
          image: '/images/cars/kia-k5.jpg',
          specs: {
            transmission: 'Передний',
            power: '194 л.с.',
            consumption: '7.2 л/100км'
          }
        },
        {
          name: 'Mazda 6',
          image: '/images/cars/mazda-6.jpg',
          specs: {
            transmission: 'Передний',
            power: '231 л.с.',
            consumption: '7.3 л/100км'
          }
        },
        {
          name: 'Honda Civic',
          image: '/images/cars/honda-civic.jpg',
          specs: {
            transmission: 'Передний',
            power: '182 л.с.',
            consumption: '6.9 л/100км'
          }
        }
      ]
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: 20,
      cars: [
        {
          name: 'BMW 7 Series',
          image: '/images/cars/bmw-7series.jpg',
          specs: {
            transmission: 'xDrive',
            power: '530 л.с.',
            consumption: '8.3 л/100км'
          }
        },
        {
          name: 'Mercedes-AMG GT R',
          image: '/images/cars/mercedes-amg-gtr.jpg',
          specs: {
            transmission: 'Задний',
            power: '585 л.с.',
            consumption: '12.4 л/100км'
          }
        },
        {
          name: 'BMW M3',
          image: '/images/cars/bmw-m3.jpg',
          specs: {
            transmission: 'M xDrive',
            power: '510 л.с.',
            consumption: '10.0 л/100км'
          }
        }
      ]
    }
  ];

  const calculatePrice = useCallback(() => {
    const category = carCategories.find(cat => cat.id === selectedCarClass);
    const price = category ? category.price : 7;
    const duration = parseInt(selectedDuration);
    setCalculatedPrice(price * duration);
  }, [selectedCarClass, selectedDuration]);

  useEffect(() => {
    calculatePrice();
  }, [selectedCarClass, selectedDuration, calculatePrice]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-16 sm:py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Каршеринг в Соликамске
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Арендуйте автомобиль прямо сейчас. От эконом до премиум класса.
              Быстро, удобно и по доступным ценам.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200 shadow-sm hover:shadow-lg"
            >
              Выбрать автомобиль
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 mb-3 sm:mb-4 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Каршеринг в Соликамске — это просто!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Мы делаем городскую мобильность доступной для каждого. Наш сервис предоставляет современные автомобили для краткосрочной аренды на любой случай жизни.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Быстрая регистрация
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Загрузите документы и начните пользоваться сервисом
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Выберите автомобиль
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    От эконом до премиум класса в разных районах города
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Начните поездку
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Оплачивайте только время использования автомобиля
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 lg:gap-8 items-start"
          >
            <div className="space-y-4 lg:space-y-8">
              <div className="aspect-w-3 aspect-h-4">
                <img
                  className="object-cover rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Городская поездка"
                />
              </div>
              <div className="aspect-w-3 aspect-h-4">
                <img
                  className="object-cover rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1600320254374-ce2d293c324e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="Довольный водитель"
                />
              </div>
            </div>
            <div className="space-y-4 lg:space-y-8">
              <div className="aspect-w-3 aspect-h-4">
                <img
                  className="object-cover rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
                  alt="Аренда автомобиля"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mx-4 sm:mx-10 md:mx-12 lg:mx-auto max-w-screen-xl py-12 sm:py-16 bg-gray-50 dark:bg-gray-800/50 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Мы стремимся сделать каршеринг максимально удобным и доступным для каждого
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-6">
                <advantage.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">1000+</div>
            <div className="text-gray-600 dark:text-gray-300">Поездок в день</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">14</div>
            <div className="text-gray-600 dark:text-gray-300">Автомобилей</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-300">Довольных клиентов</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Поддержка</div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Что говорят наши клиенты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
                {testimonial.rating % 1 === 0.5 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <defs>
                      <linearGradient id="half-fill">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="#E5E7EB" />
                      </linearGradient>
                    </defs>
                    <path
                      fillRule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 01-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 110 2h11.586l-4.293-4.293a1 1 0 010-1.414z" fill="url(#half-fill)" />
                  </svg>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Часто задаваемые вопросы
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <button
                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    activeQuestion === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeQuestion === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Наши партнеры
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Мы сотрудничаем с ведущими компаниями региона для обеспечения высокого качества услуг
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-stretch">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="flex items-center justify-center h-24 mb-4 flex-shrink-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`object-contain w-full h-full dark:filter dark:brightness-0 dark:invert ${
                    partner.name === "УРАЛХИМ" || partner.name === "СберАвто" 
                    ? "scale-125" 
                    : "max-h-20"
                  }`}
                />
              </div>
              <div className="text-center flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {partner.description}
                </p>
                <div className="mt-auto">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                  >
                    Подробнее
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-indigo-50 dark:bg-indigo-900/30 p-8 sm:p-12 rounded-2xl"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Начните свое путешествие
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-xl mx-auto">
            Выберите автомобиль, который идеально подходит для вашей поездки
          </p>
          <Link
            to="/cars"
            className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
          >
            Посмотреть автомобили
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;

<style jsx>{`
  @media (max-width: 639px) {
    .car-swiper .swiper-button-next,
    .car-swiper .swiper-button-prev {
      display: none !important;
    }
  }
`}</style>
