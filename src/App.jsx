import React, { useState } from 'react';
import { 
  Sparkles, Check, Search, Trash2, BookOpen, 
  CheckSquare, X, LogOut, LayoutDashboard, Shuffle, Eye, ArrowRight, Users, Plus, AlertCircle, Clock
} from 'lucide-react';

const TAROT_CARDS = [
  { id: 'louco', mas: 'O Louco', fem: 'A Louca', number: '0', desc: 'Inícios, liberdade, ousadia e potencial puro.', img: '/assets/tarot/louco.jpg' },
  { id: 'magico', mas: 'O Mago', fem: 'A Mágica', number: 'I', desc: 'Habilidade, ação, manifestação e recursos.', img: '/assets/tarot/magico.jpg' },
  { id: 'sacerdotisa', mas: 'O Sacerdote', fem: 'A Sacerdotisa', number: 'II', desc: 'Intuição, sabedoria interior e mistério.', img: '/assets/tarot/sacerdotisa.jpg' },
  { id: 'emperador', mas: 'O Imperador', fem: 'A Imperatriz', number: 'III', desc: 'Estrutura, autoridade e liderança.', img: '/assets/tarot/emperador.jpg' },
  { id: 'imperatriz', mas: 'O Imperador', fem: 'A Imperatriz', number: 'IV', desc: 'Abundância, criação e natureza.', img: '/assets/tarot/imperatriz.jpg' },
  { id: 'papa', mas: 'O Papa', fem: 'A Papisa', number: 'V', desc: 'Tradição, sabedoria espiritual e mentoria.', img: '/assets/tarot/papa.jpg' },
  { id: 'enamorados', mas: 'O Enamorado', fem: 'A Enamorada', number: 'VI', desc: 'Escolhas, alinhamento de valores e união.', img: '/assets/tarot/enamorados.jpg' },
  { id: 'caroo', mas: 'O Condutor', fem: 'A Condutora', number: 'VII', desc: 'Determinação, triunfo e controle de rumo.', img: '/assets/tarot/caroo.jpg' },
  { id: 'justica', mas: 'O Justo', fem: 'A Justa', number: 'VIII', desc: 'Verdade, equilíbrio, causa e efeito.', img: '/assets/tarot/justica.jpg' },
  { id: 'eremita', mas: 'O Eremita', fem: 'A Eremita', number: 'IX', desc: 'Introspecção, busca por respostas e luz.', img: '/assets/tarot/eremita.jpg' },
  { id: 'roda', mas: 'O Destino', fem: 'A Destinada', number: 'X', desc: 'Mudança de ciclos, evolução e oportunidade.', img: '/assets/tarot/roda.jpg' },
  { id: 'forca', mas: 'O Forte', fem: 'A Forte', number: 'XI', desc: 'Coragem, domínio interior e resiliência.', img: '/assets/tarot/forca.jpg' },
  { id: 'enforcado', mas: 'O Visionário', fem: 'A Visionária', number: 'XII', desc: 'Nova perspectiva, pausa e desapego.', img: '/assets/tarot/enforcado.jpg' },
  { id: 'morte', mas: 'O Renascido', fem: 'A Renascida', number: 'XIII', desc: 'Transformação profunda e renovação.', img: '/assets/tarot/morte.jpg' },
  { id: 'temperança', mas: 'O Equilibrado', fem: 'A Equilibrada', number: 'XIV', desc: 'Moderação, harmonia e paciência.', img: '/assets/tarot/temperança.jpg' },
  { id: 'diabo', mas: 'O Desbravador', fem: 'A Desbravadora', number: 'XV', desc: 'Paixão intensa, ambição e quebra de amarras.', img: '/assets/tarot/diabo.jpg' },
  { id: 'torre', mas: 'O Catalisador', fem: 'A Catalisadora', number: 'XVI', desc: 'Revelação repentina e reconstrução.', img: '/assets/tarot/torre.jpg' },
  { id: 'estrela', mas: 'O Iluminado', fem: 'A Iluminada', number: 'XVII', desc: 'Esperança, inspiração e clareza.', img: '/assets/tarot/estrela.jpg' },
  { id: 'lua', mas: 'O Onírico', fem: 'A Onírica', number: 'XVIII', desc: 'Imaginação, intuição e mistério.', img: '/assets/tarot/lua.jpg' },
  { id: 'sol', mas: 'O Solar', fem: 'A Solar', number: 'XIX', desc: 'Vitalidade, sucesso e clareza absoluta.', img: '/assets/tarot/sol.jpg' },
  { id: 'julgamento', mas: 'O Despertador', fem: 'A Despertadora', number: 'XX', desc: 'Renovação de propósitos e chamado.', img: '/assets/tarot/julgamento.jpg' },
  { id: 'mundo', mas: 'O Mestre do Mundo', fem: 'A Mestra do Mundo', number: 'XXI', desc: 'Realização plena e conclusão de ciclo.', img: '/assets/tarot/mundo.jpg' }
];

export default function ArcanaWorkspace() {
  const [stage, setStage] = useState('name_entry'); 
  const [username, setUsername] = useState('Serafim');
  const [deck, setDeck] = useState(TAROT_CARDS);
  const [selectedCard, setSelectedCard] = useState(null);
  const [genderChoice, setGenderChoice] = useState('mas');

  const [isFaceDown, setIsFaceDown] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Lista global de membros da equipe
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Carlos Lima', title: 'O Mago', cardId: 'magico', role: 'Liderança Técnica & Arquitetura' },
    { name: 'Mariana Souza', title: 'A Sacerdotisa', cardId: 'sacerdotisa', role: 'Design & Experiência' },
    { name: 'Julio César', title: 'O Imperador', cardId: 'emperador', role: 'Gestão de Produção' }
  ]);

  const [viewingMember, setViewingMember] = useState(null);

  // Workspace States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Atividades Avançadas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Revisão de Vetorização e Arquivos DTF',
      description: 'Verificar alinhamento de vetores e separação de camadas para impressão.',
      dueDate: '2026-11-10',
      assignedCards: ['magico', 'emperador'],
      completions: { magico: true, emperador: false }
    },
    {
      id: 2,
      title: 'Calibragem de Retículas CMYK',
      description: 'Ajustar os ângulos de retícula para evitar efeito moiré.',
      dueDate: '2026-10-25',
      assignedCards: ['sacerdotisa'],
      completions: { sacerdotisa: false }
    }
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [selectedAssignedCards, setSelectedAssignedCards] = useState([]);

  const [notes, setNotes] = useState([
    { id: 1, title: 'Diretrizes de Layout', content: 'Design Dark Neon com efeitos de câmera e zoom 3D.', tag: 'Design' },
    { id: 2, title: 'Logística de Entregas', content: 'Verificar envios pendentes com o parceiro comercial.', tag: 'Equipe' }
  ]);

  const handleShuffle = () => {
    setIsShuffling(true);
    setIsFaceDown(true);

    setTimeout(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
    }, 400);

    setTimeout(() => {
      setIsShuffling(false);
    }, 800);
  };

  const handleRandomPick = () => {
    setIsShuffling(true);
    setIsFaceDown(true);

    setTimeout(() => {
      const randomCard = deck[Math.floor(Math.random() * deck.length)];
      setSelectedCard(randomCard);
      setGenderChoice('mas');
      setIsShuffling(false);
    }, 700);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setGenderChoice('mas');
  };

  const handleFinalConfirm = () => {
    if (!selectedCard) return;

    const titleFormatted = genderChoice === 'mas' ? selectedCard.mas : selectedCard.fem;

    const newProfile = {
      name: username || 'Membro Arcana',
      title: titleFormatted,
      card: selectedCard
    };

    setUserProfile(newProfile);

    setTeamMembers(prev => {
      const filtered = prev.filter(m => m.name !== newProfile.name);
      return [{
        name: newProfile.name,
        title: titleFormatted,
        cardId: selectedCard.id,
        role: 'Membro Ativo'
      }, ...filtered];
    });

    setStage('workspace');
  };

  const getTaskStatus = (task) => {
    const today = new Date().toISOString().split('T')[0];
    const allCompleted = task.assignedCards.every(cardId => task.completions[cardId] === true);
    
    if (allCompleted) return 'completed';
    if (task.dueDate && task.dueDate < today) return 'failed';
    return 'pending';
  };

  const toggleUserTaskCompletion = (taskId) => {
    if (!userProfile?.card?.id) return;
    const userCardId = userProfile.card.id;

    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId && task.assignedCards.includes(userCardId)) {
        const updatedCompletions = {
          ...task.completions,
          [userCardId]: !task.completions[userCardId]
        };
        return { ...task, completions: updatedCompletions };
      }
      return task;
    }));
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || selectedAssignedCards.length === 0) return;

    const initialCompletions = {};
    selectedAssignedCards.forEach(cId => { initialCompletions[cId] = false; });

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDesc,
      dueDate: newTaskDueDate,
      assignedCards: selectedAssignedCards,
      completions: initialCompletions
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDueDate('');
    setSelectedAssignedCards([]);
    setIsTaskModalOpen(false);
  };

  // --- 1. TELA DE ENTRADA DO NOME ---
  if (stage === 'name_entry') {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-6 select-none relative overflow-hidden">
        <div className="bg-[#121624] border border-cyan-500/40 rounded-3xl p-8 max-w-md w-full shadow-[0_0_80px_rgba(6,182,212,0.3)] flex flex-col items-center text-center relative">
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-5">
            <Sparkles className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            ARCANA WORKSPACE
          </h1>
          <p className="text-xs text-gray-400 mb-6">Identifique-se para iniciar a jornada dos arcanos.</p>

          <div className="w-full space-y-4 text-left">
            <label className="block text-[11px] font-semibold uppercase text-gray-400">Seu Nome ou Codinome:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-cyan-400 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <button
            onClick={() => {
              if (!username.trim()) return;
              setStage('card_selection');
            }}
            className="w-full mt-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition flex items-center justify-center gap-2 text-sm"
          >
            Avançar para o Baralho
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // --- 2. TELA DE SELEÇÃO DE CARTAS COM TODAS VISÍVEIS (MEIO ESCURAS) E ILUMINADAS AO CLICAR/HOVER ---
  if (stage === 'card_selection') {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between p-6 select-none relative overflow-x-hidden">
        <style>{`
          .perspective-container { perspective: 1000px; }
          .card-3d-inner {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
            position: relative;
            width: 100%;
            height: 100%;
          }
          .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            top: 0;
            left: 0;
            border-radius: 0.75rem;
          }
          .card-back {
            transform: rotateY(180deg);
          }
          .card-front {
            transform: rotateY(0deg);
          }
          @keyframes slowCoinZoom {
            0% { transform: scale(0.2) rotateY(0deg); opacity: 0; }
            40% { opacity: 1; }
            100% { transform: scale(1) rotateY(720deg); opacity: 1; }
          }
          .animate-slow-coin {
            animation: slowCoinZoom 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes fadeInBox {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-box {
            animation: fadeInBox 0.8s ease 0.4s forwards;
            opacity: 0;
          }
        `}</style>

        <header className="flex flex-col md:flex-row items-center justify-between gap-4 z-20 max-w-7xl mx-auto w-full mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ARCANA WORKSPACE
              </h1>
              <p className="text-xs text-gray-400">Olá, <span className="text-cyan-400 font-semibold">{username}</span>. Selecione seu Arcano.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFaceDown(!isFaceDown)}
              className="px-3.5 py-2 rounded-xl bg-[#121624] border border-gray-800 text-xs font-semibold hover:border-cyan-400 flex items-center gap-2 transition"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              {isFaceDown ? 'Revelar Cartas' : 'Virar Cartas'}
            </button>

            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className="px-3.5 py-2 rounded-xl bg-[#121624] border border-gray-800 text-xs font-semibold hover:border-purple-400 flex items-center gap-2 transition disabled:opacity-50"
            >
              <Shuffle className={`w-4 h-4 text-purple-400 ${isShuffling ? 'animate-spin' : ''}`} />
              Embaralhar
            </button>

            <button
              onClick={handleRandomPick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold shadow-md hover:scale-105 transition"
            >
              Sorteio Aleatório
            </button>

            <button
              onClick={() => setStage('name_entry')}
              className="px-3 py-2 rounded-xl bg-[#121624] border border-gray-800 text-xs text-gray-400 hover:text-white transition"
            >
              Voltar
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full flex-1 flex items-center justify-center py-2 relative">
          <div 
            onClick={() => setSelectedCard(null)}
            className={`fixed inset-0 bg-black/85 backdrop-blur-md z-30 transition-opacity duration-300 ${
              selectedCard ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`} 
          />

          <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-7 gap-3 w-full scale-90 transition-opacity duration-500 ${
            selectedCard ? 'opacity-20' : 'opacity-100'
          }`}>
            {deck.map((card, index) => {
              const owner = teamMembers.find(m => m.cardId === card.id);

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className="perspective-container relative rounded-xl p-1.5 border border-gray-800/60 bg-[#0f121d]/80 opacity-50 filter brightness-75 hover:opacity-100 hover:brightness-100 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between"
                  style={{
                    transform: isShuffling ? `translate(${(index % 2 === 0 ? 1 : -1) * 15}px, ${(index % 3 === 0 ? 1 : -1) * 15}px)` : 'none'
                  }}
                >
                  <div className="w-full aspect-[675/1015] rounded-lg overflow-hidden relative">
                    <div className={`card-3d-inner ${isFaceDown ? 'rotate-y-180' : ''}`} style={{ transform: isFaceDown ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                      <div className="card-face card-front bg-[#0a0d14]">
                        <img src={card.img} alt={card.mas} className="w-full h-full object-cover rounded-md" />
                      </div>
                      <div className="card-face card-back bg-[#0a0d14]">
                        <img 
                          src="/assets/tarot/back.jpg" 
                          alt="Verso Carta" 
                          className="w-full h-full object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-between w-full px-1 min-h-[16px]">
                    {!isFaceDown && (
                      <>
                        <span className="text-[9px] font-mono text-cyan-400">{card.number}</span>
                        <span className="text-[9px] text-gray-300 truncate max-w-[70px]">
                          {owner ? owner.name : card.mas}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {selectedCard && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <div className="pointer-events-auto w-[240px] sm:w-[310px] md:w-[360px] aspect-[675/1015] rounded-2xl border-2 border-cyan-400 overflow-hidden shadow-[0_0_90px_rgba(6,182,212,0.9)] bg-[#0a0d14] mb-4 animate-slow-coin relative flex-shrink-0">
              <img src={selectedCard.img} alt={selectedCard.mas} className="w-full h-full object-cover" />
            </div>

            <div className="pointer-events-auto bg-[#121624] border border-cyan-500/60 rounded-3xl p-5 max-w-md w-full shadow-[0_0_80px_rgba(6,182,212,0.6)] relative flex flex-col items-center text-center animate-fade-in-box">
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full bg-gray-800/60 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">ARCANO {selectedCard.number}</span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {genderChoice === 'mas' ? selectedCard.mas : selectedCard.fem}
              </h3>
              <p className="text-xs text-gray-400 mt-1 mb-4 leading-relaxed px-2">{selectedCard.desc}</p>

              <div className="w-full space-y-3">
                <label className="block text-[10px] font-semibold uppercase text-gray-400">Escolha o Tratamento da Carta:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGenderChoice('mas')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      genderChoice === 'mas'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-md'
                        : 'bg-[#1a1f33] border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {selectedCard.mas}
                  </button>
                  <button
                    onClick={() => setGenderChoice('fem')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      genderChoice === 'fem'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 border-purple-400 text-white shadow-md'
                        : 'bg-[#1a1f33] border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {selectedCard.fem}
                  </button>
                </div>

                <button
                  onClick={handleFinalConfirm}
                  className="w-full mt-2 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition text-sm"
                >
                  Confirmar & Ingressar no Workspace
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- 3. WORKSPACE PRINCIPAL ---
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white flex">
      <aside className="w-64 bg-[#121624] border-r border-gray-800/80 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ARCANA
              </h1>
              <span className="text-[10px] text-gray-500 font-mono tracking-widest block">WORKSPACE</span>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'team', label: 'Equipe', icon: Users },
              { id: 'tasks', label: 'Atividades', icon: CheckSquare },
              { id: 'notes', label: 'Anotações', icon: BookOpen },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                      : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bg-[#1a1f33] border border-gray-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
            {userProfile?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-bold truncate text-white">{userProfile?.name}</h4>
            <p className="text-xs text-cyan-400 truncate">{userProfile?.title}</p>
          </div>
          <button
            onClick={() => { setSelectedCard(null); setStage('card_selection'); }}
            className="text-gray-500 hover:text-red-400 p-1 transition"
            title="Trocar Arcano"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-extrabold capitalize text-white">
              {activeTab === 'dashboard' && 'Visão Geral'}
              {activeTab === 'team' && 'Equipe & Arcanos'}
              {activeTab === 'tasks' && 'Gestão de Atividades'}
              {activeTab === 'notes' && 'Caderno de Anotações'}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Sessão ativa para <span className="text-cyan-400 font-semibold">{userProfile?.title}</span>
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#121624] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition w-64"
            />
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#121624] via-[#1a1f38] to-[#121624] border border-cyan-500/20 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
              <div className="max-w-md">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">ARCANO ATIVO</span>
                <h3 className="text-2xl font-bold mt-1 text-white">{userProfile?.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{userProfile?.card?.desc}</p>
              </div>

              <div className="w-24 aspect-[675/1015] rounded-xl border border-cyan-500/40 bg-[#0a0d14] overflow-hidden flex flex-col items-center justify-center shadow-lg shadow-cyan-500/10 flex-shrink-0">
                <img
                  src={userProfile?.card?.img}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#121624] border border-gray-800 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-400 font-medium">Atividades Totais</span>
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="text-2xl font-bold">{tasks.length}</h4>
              </div>

              <div className="bg-[#121624] border border-gray-800 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-400 font-medium">Concluídas</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-2xl font-bold">
                  {tasks.filter(t => getTaskStatus(t) === 'completed').length}
                </h4>
              </div>

              <div className="bg-[#121624] border border-gray-800 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-400 font-medium">Anotações</span>
                  <BookOpen className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-2xl font-bold">{notes.length}</h4>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-[#121624] border border-gray-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-1">Mural de Arcanos da Equipe</h3>
              <p className="text-xs text-gray-400 mb-6">Veja quais cartas já foram reivindicadas pelos membros. Clique em uma carta escolhida para inspecionar o perfil.</p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
                {TAROT_CARDS.map((card) => {
                  const owner = teamMembers.find(m => m.cardId === card.id);

                  return (
                    <div
                      key={card.id}
                      onClick={() => owner && setViewingMember({ member: owner, card })}
                      className={`relative rounded-xl p-2 border transition-all flex flex-col items-center justify-between ${
                        owner 
                          ? 'bg-[#121929] border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-105 cursor-pointer' 
                          : 'bg-[#0f121d] border-gray-800/40 opacity-30 grayscale cursor-default'
                      }`}
                    >
                      <div className="w-full aspect-[675/1015] rounded-lg overflow-hidden bg-[#0a0d14]">
                        <img src={card.img} alt={card.mas} className="w-full h-full object-cover" />
                      </div>

                      <div className="mt-2 text-center w-full">
                        <span className="text-[9px] font-mono text-cyan-400 block">{card.number}</span>
                        {owner ? (
                          <span className="text-[10px] font-bold text-white truncate block mt-0.5">{owner.name}</span>
                        ) : (
                          <span className="text-[9px] text-gray-500 italic block mt-0.5">Disponível</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {viewingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="bg-[#121624] border border-cyan-500/50 rounded-3xl p-6 max-w-md w-full shadow-[0_0_60px_rgba(6,182,212,0.4)] relative flex flex-col items-center text-center">
              <button
                onClick={() => setViewingMember(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full bg-gray-800/60 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-24 aspect-[675/1015] rounded-xl border border-cyan-400 overflow-hidden shadow-md bg-[#0a0d14] mb-3">
                <img src={viewingMember.card.img} alt="" className="w-full h-full object-cover" />
              </div>

              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">PERFIL DE MEMBRO</span>
              <h3 className="text-xl font-bold text-white mt-0.5">{viewingMember.member.name}</h3>
              <p className="text-xs text-cyan-300 font-medium mt-0.5">{viewingMember.member.title}</p>
              
              <div className="w-full bg-[#1a1f33] border border-gray-800 rounded-xl p-3 mt-4 text-left space-y-3">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-mono">Função</span>
                  <p className="text-xs text-gray-200 mt-0.5">{viewingMember.member.role}</p>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-mono mb-1.5">Atividades Convocadas</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {tasks.filter(t => t.assignedCards.includes(viewingMember.card.id)).length === 0 ? (
                      <p className="text-[11px] text-gray-500 italic">Nenhuma atividade atribuída no momento.</p>
                    ) : (
                      tasks.filter(t => t.assignedCards.includes(viewingMember.card.id)).map(task => {
                        const isDone = task.completions[viewingMember.card.id];
                        return (
                          <div key={task.id} className="bg-[#121624] border border-gray-800 p-2 rounded-lg flex items-center justify-between text-xs">
                            <span className="truncate max-w-[200px] text-gray-300">{task.title}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              isDone ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {isDone ? 'Concluído' : 'Pendente'}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setViewingMember(null)}
                className="w-full mt-4 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs hover:scale-[1.01] transition shadow-md"
              >
                Fechar Perfil
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">Quadro de Missões & Atividades</h3>
                <p className="text-xs text-gray-400">Atividades compartilhadas entre as cartas da equipe.</p>
              </div>

              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-xs hover:scale-105 transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                Criar Nova Atividade
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => {
                const status = getTaskStatus(task);
                const userCardId = userProfile?.card?.id;
                const isUserAssigned = userCardId && task.assignedCards.includes(userCardId);
                const isUserDone = userCardId && task.completions[userCardId];

                return (
                  <div
                    key={task.id}
                    className={`bg-[#121624] border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                      status === 'completed' 
                        ? 'border-emerald-500/40 bg-emerald-950/10' 
                        : status === 'failed' 
                        ? 'border-red-500/40 bg-red-950/10' 
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-bold text-white">{task.title}</h4>
                        
                        {status === 'completed' && (
                          <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                            <Check className="w-3 h-3" /> Concluída
                          </span>
                        )}
                        {status === 'failed' && (
                          <span className="text-[10px] bg-red-500/20 border border-red-500/40 text-red-400 px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Fracassada (Prazo)
                          </span>
                        )}
                        {status === 'pending' && (
                          <span className="text-[10px] bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Em Andamento
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed">{task.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
                        {task.dueDate && (
                          <div className="flex items-center gap-1 font-mono text-[11px]">
                            <span className="text-gray-500">Prazo:</span>
                            <span className={status === 'failed' ? 'text-red-400 font-bold' : 'text-gray-300'}>{task.dueDate}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-gray-500">Convocados:</span>
                          <div className="flex items-center gap-2">
                            {task.assignedCards.map(cId => {
                              const cardObj = TAROT_CARDS.find(c => c.id === cId);
                              const owner = teamMembers.find(m => m.cardId === cId);
                              const isDone = task.completions[cId];
                              return (
                                <div
                                  key={cId}
                                  className={`text-[10px] px-2 py-1 rounded-md font-semibold border flex items-center gap-1.5 ${
                                    isDone 
                                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                                      : 'bg-[#1a1f33] border-gray-700 text-gray-300'
                                  }`}
                                >
                                  <img src={cardObj?.img} alt="" className="w-4 h-6 object-cover rounded" />
                                  <span>{owner ? owner.name : cardObj?.mas} {isDone ? '✓' : ''}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isUserAssigned && status === 'pending' && (
                        <button
                          onClick={() => toggleUserTaskCompletion(task.id)}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                            isUserDone
                              ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/30'
                              : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          {isUserDone ? 'Concluído por você' : 'Marcar Minha Parte'}
                        </button>
                      )}

                      <button
                        onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                        className="text-gray-500 hover:text-red-400 p-2 transition"
                        title="Excluir Atividade"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="bg-[#121624] border border-cyan-500/60 rounded-3xl p-6 max-w-md w-full shadow-[0_0_80px_rgba(6,182,212,0.5)] relative">
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-gray-800/60 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-white mb-4">Nova Atividade Arcana</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">Título da Atividade</label>
                  <input
                    type="text"
                    placeholder="Ex: Refatoração do Banco de Dados..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">Descrição</label>
                  <textarea
                    placeholder="Detalhamento das tarefas a serem entregues..."
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">Prazo Final (Deadline)</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-2">Convocação de Cartas (Equipe)</label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                    {teamMembers.map((member) => {
                      const cardObj = TAROT_CARDS.find(c => c.id === member.cardId);
                      const isSelected = selectedAssignedCards.includes(member.cardId);

                      return (
                        <button
                          key={member.cardId}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedAssignedCards(selectedAssignedCards.filter(id => id !== member.cardId));
                            } else {
                              setSelectedAssignedCards([...selectedAssignedCards, member.cardId]);
                            }
                          }}
                          className={`p-2 rounded-xl text-left border text-xs transition flex items-center justify-between ${
                            isSelected 
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                              : 'bg-[#1a1f33] border-gray-700 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <img src={cardObj?.img} alt="" className="w-5 h-7 object-cover rounded flex-shrink-0" />
                            <div className="truncate">
                              <span className="font-bold text-white text-[11px] block truncate">{member.name}</span>
                              <span className="text-[9px] text-cyan-400 block truncate">{cardObj?.mas}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleCreateTask}
                  className="w-full mt-2 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition text-xs"
                >
                  Criar & Convocar Cartas
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div key={note.id} className="bg-[#121624] border border-gray-800 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white">{note.title}</h4>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-md font-mono">{note.tag}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}