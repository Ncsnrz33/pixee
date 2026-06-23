import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface DataValidationGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (reward: number) => void;
}

export default function DataValidationGame({ difficulty, onComplete }: DataValidationGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questions = [
    {
      text: 'O CPF "123.456.789-10" é válido?',
      correct: false,
      explanation: 'Este CPF não passa na validação de dígitos verificadores.',
    },
    {
      text: 'O email "usuario@exemplo.com.br" está no formato correto?',
      correct: true,
      explanation: 'Este é um formato de email válido.',
    },
    {
      text: 'O telefone "(11) 98765-4321" está no formato correto?',
      correct: true,
      explanation: 'Este é um formato de telefone válido para Brasil.',
    },
    {
      text: 'A data "31/02/2024" é válida?',
      correct: false,
      explanation: 'Fevereiro não tem 31 dias.',
    },
    {
      text: 'O CNPJ "11.222.333/0001-81" é válido?',
      correct: true,
      explanation: 'Este CNPJ passa na validação de dígitos verificadores.',
    },
  ];

  const totalQuestions = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const reward = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 50 : 130;

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === questions[currentQuestion].correct;
    setFeedback(questions[currentQuestion].explanation);

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setFeedback(null);
      } else {
        setCompleted(true);
        onComplete(reward);
      }
    }, 2000);
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold mb-2">Validação Concluída!</p>
        <p className="text-gray-600 mb-3">Acertos: {score}/{totalQuestions}</p>
        <p className="text-green-600 font-bold text-xl">+R$ {reward.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <p className="text-gray-700">
          Pergunta {currentQuestion + 1}/{totalQuestions}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-lg font-semibold mb-6">
          {questions[currentQuestion].text}
        </p>

        {feedback && (
          <div className="mb-4 p-3 bg-blue-100 rounded-lg text-sm">
            <p className="text-blue-900">{feedback}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => handleAnswer(true)}
            disabled={feedback !== null}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle size={18} className="mr-2" />
            Verdadeiro
          </Button>
          <Button
            onClick={() => handleAnswer(false)}
            disabled={feedback !== null}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            <XCircle size={18} className="mr-2" />
            Falso
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        Acertos até agora: {score}/{currentQuestion}
      </div>
    </div>
  );
}
