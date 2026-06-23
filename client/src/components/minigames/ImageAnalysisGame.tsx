import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ImageAnalysisGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (reward: number) => void;
}

export default function ImageAnalysisGame({ difficulty, onComplete }: ImageAnalysisGameProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const images = [
    {
      title: 'Imagem 1: Loja de Eletrônicos',
      prompt: 'Descreva o que você vê nesta imagem de loja. Mencione os produtos, organização e ambiente.',
    },
    {
      title: 'Imagem 2: Produto em Prateleira',
      prompt: 'Analise a qualidade da apresentação do produto. Como está a embalagem, iluminação e posicionamento?',
    },
    {
      title: 'Imagem 3: Fachada de Loja',
      prompt: 'Descreva a aparência externa da loja. Mencione limpeza, sinalização e primeira impressão.',
    },
    {
      title: 'Imagem 4: Atendimento ao Cliente',
      prompt: 'Observe a cena de atendimento. Como está a interação entre vendedor e cliente?',
    },
  ];

  const totalImages = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
  const reward = difficulty === 'easy' ? 25 : difficulty === 'medium' ? 60 : 140;

  const handleSubmit = () => {
    if (description.trim().length < 10) {
      alert('Por favor, escreva uma descrição com pelo menos 10 caracteres');
      return;
    }

    if (currentImage < totalImages - 1) {
      setCurrentImage(currentImage + 1);
      setDescription('');
    } else {
      setCompleted(true);
      onComplete(reward);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold mb-2">Análise Concluída!</p>
        <p className="text-green-600 font-bold text-xl">+R$ {reward.toFixed(2)}</p>
      </div>
    );
  }

  const currentImg = images[currentImage];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <p className="text-gray-700">
          Imagem {currentImage + 1}/{totalImages}
        </p>
      </div>

      <div>
        <p className="font-semibold mb-2">{currentImg.title}</p>
        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
          <p className="text-gray-500">Imagem para análise</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">{currentImg.prompt}</p>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escreva sua análise aqui..."
          rows={4}
          className="text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">{description.length} caracteres</p>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={description.trim().length < 10}
        className="w-full"
      >
        {currentImage < totalImages - 1 ? 'Próxima Imagem' : 'Concluir Análise'}
      </Button>
    </div>
  );
}
