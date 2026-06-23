import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CategorizationGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (reward: number) => void;
}

export default function CategorizationGame({ difficulty, onComplete }: CategorizationGameProps) {
  const [currentItem, setCurrentItem] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const items = [
    { name: 'Maçã', correct: 'Frutas' },
    { name: 'Cenoura', correct: 'Vegetais' },
    { name: 'Frango', correct: 'Proteínas' },
    { name: 'Leite', correct: 'Laticínios' },
    { name: 'Banana', correct: 'Frutas' },
    { name: 'Queijo', correct: 'Laticínios' },
    { name: 'Brócolis', correct: 'Vegetais' },
    { name: 'Peixe', correct: 'Proteínas' },
  ];

  const categories = ['Frutas', 'Vegetais', 'Proteínas', 'Laticínios'];
  const totalItems = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const reward = difficulty === 'easy' ? 18 : difficulty === 'medium' ? 55 : 125;

  const handleCategory = (category: string) => {
    const isCorrect = category === items[currentItem].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentItem < totalItems - 1) {
      setCurrentItem(currentItem + 1);
    } else {
      setCompleted(true);
      onComplete(reward);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold mb-2">Categorização Concluída!</p>
        <p className="text-gray-600 mb-3">Acertos: {score}/{totalItems}</p>
        <p className="text-green-600 font-bold text-xl">+R$ {reward.toFixed(2)}</p>
      </div>
    );
  }

  const currentItemData = items[currentItem];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <p className="text-gray-700">
          Item {currentItem + 1}/{totalItems}
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg text-center">
        <p className="text-sm opacity-90 mb-2">Categorize este item:</p>
        <p className="text-3xl font-bold">{currentItemData.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategory(category)}
            variant="outline"
            className="h-auto py-4"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="text-center text-sm text-gray-600">
        Acertos até agora: {score}/{currentItem}
      </div>
    </div>
  );
}
