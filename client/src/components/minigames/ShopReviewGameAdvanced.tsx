import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, MapPin, Phone, Clock } from 'lucide-react';

interface ShopReviewGameAdvancedProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (reward: number) => void;
}

interface Shop {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  realRating: number;
  realReviews: number;
  description: string;
  image: string;
}

const SHOPS_DATABASE: Shop[] = [
  {
    id: '1',
    name: 'Restaurante Bella Italia',
    category: 'Restaurante Italiano',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    phone: '(11) 3456-7890',
    hours: '11:00 - 23:00',
    realRating: 4.7,
    realReviews: 342,
    description: 'Autêntica culinária italiana com ambiente aconchegante',
    image: '🍝',
  },
  {
    id: '2',
    name: 'Café Aroma Premium',
    category: 'Cafeteria',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    phone: '(11) 2345-6789',
    hours: '07:00 - 20:00',
    realRating: 4.5,
    realReviews: 218,
    description: 'Café especial com pastéis artesanais',
    image: '☕',
  },
  {
    id: '3',
    name: 'Loja de Roupas Fashion',
    category: 'Vestuário',
    address: 'Rua 25 de Março, 500 - São Paulo, SP',
    phone: '(11) 1234-5678',
    hours: '09:00 - 19:00',
    realRating: 4.2,
    realReviews: 156,
    description: 'Roupas e acessórios de moda contemporânea',
    image: '👗',
  },
  {
    id: '4',
    name: 'Farmácia Popular',
    category: 'Farmácia',
    address: 'Rua XV de Novembro, 200 - São Paulo, SP',
    phone: '(11) 9876-5432',
    hours: '08:00 - 22:00',
    realRating: 4.6,
    realReviews: 289,
    description: 'Medicamentos, cosméticos e produtos de saúde',
    image: '💊',
  },
  {
    id: '5',
    name: 'Pizzaria Napoli',
    category: 'Pizzaria',
    address: 'Rua Augusta, 800 - São Paulo, SP',
    phone: '(11) 5555-1234',
    hours: '11:30 - 23:30',
    realRating: 4.8,
    realReviews: 425,
    description: 'Pizzas artesanais com ingredientes importados',
    image: '🍕',
  },
  {
    id: '6',
    name: 'Academia FitLife',
    category: 'Academia',
    address: 'Av. Brasil, 3000 - São Paulo, SP',
    phone: '(11) 7777-8888',
    hours: '06:00 - 23:00',
    realRating: 4.3,
    realReviews: 192,
    description: 'Equipamentos modernos e instrutores certificados',
    image: '💪',
  },
  {
    id: '7',
    name: 'Salão de Beleza Glamour',
    category: 'Salão de Beleza',
    address: 'Rua Oscar Freire, 400 - São Paulo, SP',
    phone: '(11) 3333-4444',
    hours: '09:00 - 20:00',
    realRating: 4.9,
    realReviews: 367,
    description: 'Cabelo, manicure e tratamentos faciais',
    image: '💅',
  },
  {
    id: '8',
    name: 'Mercado Orgânico',
    category: 'Supermercado',
    address: 'Rua Bandeira, 600 - São Paulo, SP',
    phone: '(11) 2222-3333',
    hours: '07:00 - 21:00',
    realRating: 4.4,
    realReviews: 201,
    description: 'Produtos orgânicos e alimentos naturais',
    image: '🥕',
  },
];

export default function ShopReviewGameAdvanced({
  difficulty,
  onComplete,
}: ShopReviewGameAdvancedProps) {
  const [currentShop, setCurrentShop] = useState<Shop | null>(null);
  const [displayedRating, setDisplayedRating] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !completed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, completed]);

  const initializeGame = () => {
    const randomShop = SHOPS_DATABASE[Math.floor(Math.random() * SHOPS_DATABASE.length)];
    setCurrentShop(randomShop);

    // Gerar avaliação fictícia baseada na dificuldade
    const baseRating = randomShop.realRating;
    let fakeRating: number;

    if (difficulty === 'easy') {
      // Fácil: diferença pequena (0.1-0.3)
      fakeRating = baseRating + (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.2);
      setTimeLeft(120); // 2 minutos
    } else if (difficulty === 'medium') {
      // Médio: diferença média (0.3-0.6)
      fakeRating = baseRating + (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.3);
      setTimeLeft(90); // 1.5 minutos
    } else {
      // Difícil: diferença grande (0.6-1.0)
      fakeRating = baseRating + (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.4);
      setTimeLeft(60); // 1 minuto
    }

    // Garantir que a avaliação fica entre 1 e 5
    fakeRating = Math.max(1, Math.min(5, Math.round(fakeRating * 10) / 10));
    setDisplayedRating(fakeRating);
    setUserAnswer(null);
    setFeedback('');
    setIsCorrect(null);
  };

  const handleAnswer = (answer: 'correct' | 'incorrect') => {
    if (!currentShop || displayedRating === null) return;

    const isAnswerCorrect = answer === 'correct' ? displayedRating === currentShop.realRating : displayedRating !== currentShop.realRating;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setFeedback('✓ Correto! Você identificou corretamente!');
      const reward = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 45 : 120;
      setTimeout(() => {
        onComplete(reward);
        setCompleted(true);
      }, 1500);
    } else {
      setFeedback(`✗ Incorreto! A avaliação real é ${currentShop.realRating}★`);
      setTimeout(() => {
        initializeGame();
      }, 2000);
    }
  };

  if (!currentShop) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Avaliação de Loja</h2>
        <p className="text-gray-600">Verifique se a avaliação exibida condiz com as informações da loja</p>
      </div>

      {/* Loja Info */}
      <Card className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl">{currentShop.image}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{currentShop.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{currentShop.category}</p>
            <p className="text-gray-700 mb-3">{currentShop.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} />
                {currentShop.address}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                {currentShop.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} />
                {currentShop.hours}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Avaliação Exibida */}
      <Card className="mb-6 p-6 bg-yellow-50 border-2 border-yellow-200">
        <p className="text-sm text-gray-600 mb-2">Avaliação Exibida no Google Maps:</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="text-4xl font-bold text-yellow-600">{displayedRating}★</div>
          <p className="text-gray-600">({currentShop.realReviews} avaliações)</p>
        </div>
        <p className="text-xs text-gray-500">Essa avaliação está correta ou incorreta?</p>
      </Card>

      {/* Timer */}
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-600">Tempo restante: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(timeLeft / (difficulty === 'easy' ? 120 : difficulty === 'medium' ? 90 : 60)) * 100}%` }}
          />
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <Card className={`mb-6 p-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-sm font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{feedback}</p>
        </Card>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={() => handleAnswer('correct')}
          disabled={isCorrect !== null}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
        >
          Avaliação Correta ✓
        </Button>
        <Button
          onClick={() => handleAnswer('incorrect')}
          disabled={isCorrect !== null}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
        >
          Avaliação Incorreta ✗
        </Button>
      </div>
    </div>
  );
}
