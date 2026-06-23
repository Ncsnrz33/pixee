import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface UsabilityTestGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (reward: number) => void;
}

export default function UsabilityTestGame({ difficulty, onComplete }: UsabilityTestGameProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [completed, setCompleted] = useState(false);

  const steps = [
    {
      title: 'Passo 1: Navegação',
      instruction: 'Clique no botão "Produtos" no menu principal',
      action: 'Navegar',
    },
    {
      title: 'Passo 2: Busca',
      instruction: 'Use a barra de busca para procurar "Eletrônicos"',
      action: 'Buscar',
    },
    {
      title: 'Passo 3: Filtro',
      instruction: 'Aplique o filtro de preço entre R$ 100 e R$ 500',
      action: 'Filtrar',
    },
    {
      title: 'Passo 4: Carrinho',
      instruction: 'Adicione um produto ao carrinho',
      action: 'Adicionar',
    },
    {
      title: 'Passo 5: Checkout',
      instruction: 'Complete o processo de compra',
      action: 'Comprar',
    },
  ];

  const totalSteps = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const reward = difficulty === 'easy' ? 22 : difficulty === 'medium' ? 65 : 135;

  const handleStepComplete = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
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
        <p className="text-lg font-semibold mb-2">Teste de Usabilidade Concluído!</p>
        <p className="text-green-600 font-bold text-xl">+R$ {reward.toFixed(2)}</p>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <p className="text-gray-700">
          Etapa {currentStep + 1}/{totalSteps}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4">{currentStepData.title}</h3>
        <p className="text-gray-700 mb-6">{currentStepData.instruction}</p>

        <div className="bg-white border-2 border-dashed border-gray-300 p-8 rounded-lg text-center mb-6">
          <p className="text-gray-500">Simular clique: {currentStepData.action}</p>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
            {currentStepData.action}
          </Button>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-2">Sua opinião sobre esta etapa:</label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Descreva sua experiência..."
            rows={3}
            className="text-sm"
          />
        </div>
      </div>

      <Button
        onClick={handleStepComplete}
        className="w-full"
      >
        {currentStep < totalSteps - 1 ? 'Próxima Etapa' : 'Concluir Teste'}
      </Button>
    </div>
  );
}
