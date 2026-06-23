import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SurveyGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (reward: number) => void;
}

export default function SurveyGame({ difficulty, onComplete }: SurveyGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      question: 'Com que frequência você compra online?',
      options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
    },
    {
      question: 'Qual é sua faixa de renda mensal?',
      options: ['Até R$ 1.000', 'R$ 1.000 - R$ 2.000', 'R$ 2.000 - R$ 5.000', 'R$ 5.000 - R$ 10.000', 'Acima de R$ 10.000'],
    },
    {
      question: 'Qual é seu nível de escolaridade?',
      options: ['Fundamental', 'Médio', 'Superior', 'Pós-graduação', 'Outro'],
    },
    {
      question: 'Você usa redes sociais diariamente?',
      options: ['Não', 'Menos de 1 hora', '1-2 horas', '2-4 horas', 'Mais de 4 horas'],
    },
    {
      question: 'Qual é sua idade?',
      options: ['18-25', '26-35', '36-45', '46-55', '56+'],
    },
  ];

  const totalQuestions = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const reward = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 35 : 100;

  const handleAnswer = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
      onComplete(reward);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold mb-2">Pesquisa Concluída!</p>
        <p className="text-green-600 font-bold text-xl">+R$ {reward.toFixed(2)}</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <p className="text-gray-700">
          Pergunta {currentQuestion + 1}/{totalQuestions}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-lg font-semibold mb-6">{currentQ.question}</p>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              onClick={handleAnswer}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        Progresso: {currentQuestion + 1}/{totalQuestions}
      </div>
    </div>
  );
}
