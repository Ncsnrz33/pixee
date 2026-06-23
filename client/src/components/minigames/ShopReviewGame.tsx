import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShopReviewGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (reward: number) => void;
}

export default function ShopReviewGame({ difficulty, onComplete }: ShopReviewGameProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [completed, setCompleted] = useState(false);

  const shopImages = [
    { name: 'Loja A', issues: ['Limpeza ruim', 'Atendimento lento'] },
    { name: 'Loja B', issues: ['Produtos vencidos', 'Preços altos'] },
    { name: 'Loja C', issues: ['Falta de estoque', 'Organização ruim'] },
  ];

  const currentShop = shopImages[currentStep % shopImages.length];
  const totalSteps = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
  const reward = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 45 : 120;

  const handleComplete = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setRating(0);
      setFeedback('');
    } else {
      setCompleted(true);
      onComplete(reward);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold mb-2">Avaliação Concluída!</p>
        <p className="text-green-600 font-bold text-xl">+R$ {reward.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-lg p-6 h-48 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Loja: {currentShop.name}</p>
          <p className="text-gray-500">Imagem da loja</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-3">Avalie a experiência (1-5 estrelas):</p>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold block mb-2">Observações (opcional):</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Descreva sua experiência..."
          className="w-full p-2 border rounded-lg text-sm"
          rows={3}
        />
      </div>

      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <p className="text-gray-700">
          Progresso: {currentStep + 1}/{totalSteps} lojas avaliadas
        </p>
      </div>

      <Button
        onClick={handleComplete}
        disabled={rating === 0}
        className="w-full"
      >
        {currentStep < totalSteps - 1 ? 'Próxima Loja' : 'Concluir Avaliação'}
      </Button>
    </div>
  );
}
