import React, { useState } from 'react';
import { 
  Sparkles, Check, Search, Trash2, BookOpen, 
  CheckSquare, ZoomIn, X, LogOut, LayoutDashboard 
} from 'lucide-react';

// Lista completa sincronizada com os seus arquivos exportados
const TAROT_CARDS = [
  { id: 'louco', mas: 'Louco', fem: 'Louca', number: '0', desc: 'Inícios, liberdade, ousadia e potencial puro.', img: '/assets/tarot/louco.jpg', glow: '#60a5fa' },
  { id: 'magico', mas: 'Mago', fem: 'Mágica', number: 'I', desc: 'Habilidade, ação, manifestação e recursos.', img: '/assets/tarot/magico.jpg', glow: '#a855f7' },
  { id: 'sacerdotisa', mas: 'Sacerdote', fem: 'Sacerdotisa', number: 'II', desc: 'Intuição, sabedoria interior e mistério.', img: '/assets/tarot/sacerdotisa.jpg', glow: '#ec4899' },
  { id: 'emperador', mas: 'Imperador', fem: 'Imperatriz', number: 'III', desc: 'Abundância, criação, estrutura e autoridade.', img: '/assets/tarot/emperador.jpg', glow: '#f59e0b' },
  { id: 'papa', mas: 'Papa', fem: 'Papisa', number: 'V', desc: 'Tradição, sabedoria espiritual e mentoria.', img: '/assets/tarot/papa.jpg', glow: '#10b981' },
  { id: 'enamorados', mas: 'Enamorado', fem: 'Enamorada', number: 'VI', desc: 'Escolhas, alinhamento de valores e união.', img: '/assets/tarot/enamorados.jpg', glow: '#ef4444' },
  { id: 'caroo', mas: 'Condutor', fem: 'Condutora', number: 'VII', desc: 'Determinação, triunfo e controle de rumo.', img: '/assets/tarot/caroo.jpg', glow: '#06b6d4' },
  { id: 'justica', mas: 'Justo', fem: 'Justa', number: 'VIII', desc: 'Verdade, equilíbrio, causa e efeito.', img: '/assets/tarot/justica.jpg', glow: '#3b82f6' },
  { id: 'eremita', mas: 'Eremita', fem: 'Eremita', number: 'IX', desc: 'Introspecção, busca por respostas e luz.', img: '/assets/tarot/eremita.jpg', glow: '#8b5cf6' },
  { id: 'roda', mas: 'Destino', fem: 'Destinada', number: 'X', desc: 'Mudança de ciclos, evolução e oportunidade.', img: '/assets/tarot/roda.jpg', glow: '#14b8a6' },
  { id: 'forca', mas: 'Forte', fem: 'Forte', number: 'XI', desc: 'Coragem, domínio interior e resiliência.', img: '/assets/tarot/forca.jpg', glow: '#f97316' },
  { id: 'enforcado', mas: 'Visionário', fem: 'Visionária', number: 'XII', desc: 'Nova perspectiva, pausa e desapego.', img: '/assets/tarot/enforcado.jpg', glow: '#6366f1' },
  { id: 'morte', mas: 'Renascido', fem: 'Renascida', number: 'XIII', desc: 'Transformação profunda, encerramentos e renovação.', img: '/assets/tarot/morte.jpg', glow: '#64748b' },
  { id: 'temperança', mas: 'Equilibrado', fem: 'Equilibrada', number: 'XIV', desc: 'Moderação, harmonia, paciência e alinhamento.', img: '/assets/tarot/temperança.jpg', glow: '#38bdf8' },
  { id: 'diabo', mas: 'Desbravador', fem: 'Desbravadora', number: 'XV', desc: 'Paixão intensa, quebra de amarras e instinto.', img: '/assets/tarot/diabo.jpg', glow: '#dc2626' },
  { id: 'torre', mas: 'Catalisador', fem: 'Catalisadora', number: 'XVI', desc: 'Revelação repentina, ruptura e reconstrução.', img: '/assets/tarot/torre.jpg', glow: '#ea580c' },
  { id: 'estrela', mas: 'Iluminado', fem: 'Iluminada', number: 'XVII', desc: 'Esperança, inspiração, fé e clareza.', img: '/assets/tarot/estrela.jpg', glow: '#38bdf8' },
  { id: 'lua', mas: 'Onírico', fem: 'Onírica', number: 'XVIII', desc: 'Imaginação, intuição e desvendar de ilusões.', img: '/assets/tarot/lua.jpg', glow: '#818cf8' },
  { id: 'sol', mas: 'Solar', fem: 'Solar', number: 'XIX', desc: 'Vitalidade, alegria, sucesso e clareza absoluta.', img: '/assets/tarot/sol.jpg', glow: '#facc15' },
  { id: 'julgamento', mas: 'Despertador', fem: 'Despertadora', number: 'XX', desc: 'Renovação de propósitos, veredito e chamado.', img: '/assets/tarot/julgamento.jpg', glow: '#4ade80' },
  { id: 'mundo', mas: 'Mestre do Mundo', fem: 'Mestra do Mundo', number: 'XXI', desc: 'Realização plena, conclusão de ciclo e maestria.', img: '/assets/tarot/mundo.jpg', glow: '#c084fc' }
];

export default function ArcanaWorkspace() {
  const [step, setStep] = useState('login'); // login | card_select | app
  const [username, setUsername] = useState('');
  const [titleType, setTitleType] = useState('Sr'); // 'Sr' | 'Sra'
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [zoomedCard, setZoomedCard] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // App State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Organizar assets de vetorização e DTF', type: 'individual', category: 'Design', status: 'pending', date: 'Hoje' },
    { id: 2, title: 'Alinhamento com produção de São Paulo', type: 'team', category: 'Logística', status: 'completed', date: 'Hoje' },
    { id: 3, title: 'Calibrar retículas CMYK', type: 'individual', category: 'Prepress', status: 'pending', date: 'Amanhã' },
  ]);
  const [notes, setNotes] = useState([
    { id: 1, title: 'Diretrizes do Workspace', content: 'Manter a estética Dark Neon Neumorphic consistente nas views.', tag: 'Design' },
    { id: 2, title: 'Pipeline de Impressão', content: 'Conferir perfis de cor antes de enviar para o filme DTF.', tag: 'Produção' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskType, setNewTaskType] = useState('individual');

  // Comportamento de Cliques na Carta: 1º Clique acende, 2º Clique abre o zoom
  const handleCardClick = (card) => {
    if (selectedCardId === card.id) {
      setZoomedCard(card);
    } else {
      setSelectedCardId(card.id);
    }
  };

  const handleConfirmCard = (card) => {
    const cardObj = card || TAROT_CARDS.find(c => c.id === selectedCardId);
    if (!cardObj) return;

    const cardName = titleType === 'Sr' ? cardObj.mas : cardObj.fem;
    const fullName = `${titleType}. ${cardName}`; // Sem "O" ou "A" intermediários

    const profile = {
      name: username || 'Membro',
      arcanaTitle: fullName,
      card: cardObj
    };

    setUserProfile(profile);
    setZoomedCard(null);
    setStep('app');
  };

  // 1. TELA DE LOGIN
  if (step === 'login') {
    return (
      <div className="min-h-screen bg-[#0a0d14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#121624] border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden backdrop-blur-xl">
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ARCANA
            </h1>
            <p className="text-gray-400 text-sm mt-1">Gestão Pessoal & de Equipe</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); if (username.trim()) setStep('card_select'); }} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Identificação / Nome</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu nome ou alias..."
                className="w-full bg-[#1a1f33] border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition active:scale-[0.99]"
            >
              Iniciar Conexão
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. TELA DE SELEÇÃO DE CARTAS (Todas apagadas, clique acende, segundo clique/botão dá zoom)
  if (step === 'card_select') {
    const activeCard = TAROT_CARDS.find(c => c.id === selectedCardId);

    return (
      <div className="min-h-screen bg-[#0a0d14] text-white p-6 relative flex flex-col items-center">
        <div className="max-w-7xl w-full flex flex-col items-center">
          
          <div className="text-center my-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Escolha seu Arcano Superior
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Clique uma vez para <span className="text-cyan-400 font-semibold">acender</span>. Clique novamente para <span className="text-purple-400 font-semibold">inspecionar</span>.
            </p>
          </div>

          {/* Seleção de Tratamento (Sr. / Sra.) */}
          <div className="flex gap-4 mb-8 bg-[#121624] p-1.5 rounded-2xl border border-gray-800">
            <button
              onClick={() => setTitleType('Sr')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition ${
                titleType === 'Sr' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sr.
            </button>
            <button
              onClick={() => setTitleType('Sra')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition ${
                titleType === 'Sra' ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sra.
            </button>
          </div>

          {/* Grid de Cartas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 w-full mb-24">
            {TAROT_CARDS.map((card) => {
              const isSelected = selectedCardId === card.id;
              const titleName = titleType === 'Sr' ? card.mas : card.fem;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`group relative rounded-2xl p-2.5 border transition-all duration-300 cursor-pointer flex flex-col items-center select-none ${
                    isSelected
                      ? 'bg-[#1a1f38] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-105 opacity-100 z-10'
                      : 'bg-[#121624] border-gray-800 opacity-35 hover:opacity-70 hover:scale-102'
                  }`}
                >
                  <div className="w-full h-40 rounded-xl bg-[#0d101a] border border-gray-800 overflow-hidden relative mb-2 flex items-center justify-center">
                    <img
                      src={card.img}
                      alt={titleName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 flex-col items-center justify-center p-2 text-center bg-gradient-to-b from-gray-900 to-[#121624]">
                      <span className="text-xl font-serif text-cyan-400/80 mb-1">{card.number}</span>
                      <span className="text-[11px] font-semibold text-gray-300">{titleName}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-cyan-500 rounded-full p-1 shadow-lg">
                        <Check className="w-3 h-3 text-black stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 mb-0.5">{card.number}</span>
                  <h3 className="text-xs font-bold text-center text-white truncate w-full">{titleName}</h3>
                </div>
              );
            })}
          </div>

          {/* Painel Flutuante Inferior de Confirmação */}
          {activeCard && (
            <div className="fixed bottom-6 bg-[#121624]/95 backdrop-blur-md border border-cyan-500/40 px-6 py-4 rounded-2xl flex items-center gap-6 shadow-2xl animate-fade-in z-30">
              <div>
                <span className="text-xs text-cyan-400 font-semibold">CARTA SELECIONADA</span>
                <h4 className="text-lg font-bold">
                  {titleType}. {titleType === 'Sr' ? activeCard.mas : activeCard.fem}
                </h4>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setZoomedCard(activeCard)}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 bg-[#1a1f33] hover:border-cyan-400 flex items-center gap-2 text-sm transition"
                >
                  <ZoomIn className="w-4 h-4 text-cyan-400" />
                  Inspecionar
                </button>
                <button
                  onClick={() => handleConfirmCard(activeCard)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
                >
                  Confirmar Carta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Zoom / Inspeção da Carta */}
        {zoomedCard && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#121624] border border-cyan-500/40 rounded-3xl p-6 max-w-sm w-full relative shadow-[0_0_60px_rgba(6,182,212,0.3)] animate-scale-up">
              <button
                onClick={() => setZoomedCard(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-gray-800/50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-80 rounded-2xl bg-[#0a0d14] border border-gray-800 overflow-hidden relative mb-4 flex items-center justify-center">
                <img
                  src={zoomedCard.img}
                  alt={zoomedCard.mas}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-gray-900 to-[#121624]">
                  <span className="text-4xl font-serif text-cyan-400 mb-2">{zoomedCard.number}</span>
                  <h3 className="text-xl font-bold">{titleType}. {titleType === 'Sr' ? zoomedCard.mas : zoomedCard.fem}</h3>
                </div>
              </div>

              <div className="text-center mb-6">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">ARCANO {zoomedCard.number}</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {titleType}. {titleType === 'Sr' ? zoomedCard.mas : zoomedCard.fem}
                </h3>
                <p className="text-gray-400 text-sm mt-2">{zoomedCard.desc}</p>
              </div>

              <button
                onClick={() => handleConfirmCard(zoomedCard)}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition"
              >
                Confirmar Carta Escolhida
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. APLICAÇÃO PRINCIPAL (WORKSPACE)
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white flex">
      {/* Sidebar Lateral */}
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

        {/* Perfil do Usuário na Sidebar */}
        <div className="bg-[#1a1f33] border border-gray-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm shadow-md">
            {userProfile?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-bold truncate text-white">{userProfile?.name}</h4>
            <p className="text-xs text-cyan-400 truncate">{userProfile?.arcanaTitle}</p>
          </div>
          <button
            onClick={() => setStep('login')}
            className="text-gray-500 hover:text-red-400 p-1 transition"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-extrabold capitalize text-white">
              {activeTab === 'dashboard' && 'Visão Geral'}
              {activeTab === 'tasks' && 'Gestão de Atividades'}
              {activeTab === 'notes' && 'Caderno de Anotações'}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Bem-vindo ao workspace, <span className="text-cyan-400 font-semibold">{userProfile?.arcanaTitle}</span>
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

        {/* TAB: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#121624] via-[#1a1f38] to-[#121624] border border-cyan-500/20 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
              <div className="max-w-md">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">ARCANO VINCULADO</span>
                <h3 className="text-2xl font-bold mt-1 text-white">{userProfile?.arcanaTitle}</h3>
                <p className="text-sm text-gray-400 mt-2">{userProfile?.card?.desc}</p>
              </div>

              <div className="w-24 h-36 rounded-xl border border-cyan-500/40 bg-[#0a0d14] overflow-hidden flex flex-col items-center justify-center p-2 shadow-lg shadow-cyan-500/10">
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
                  {tasks.filter(t => t.status === 'completed').length}
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

        {/* TAB: ATIVIDADES */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-[#121624] border border-gray-800 rounded-2xl p-4 flex gap-3">
              <input
                type="text"
                placeholder="Nova atividade..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 bg-[#1a1f33] border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
              />
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value)}
                className="bg-[#1a1f33] border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none"
              >
                <option value="individual">Individual</option>
                <option value="team">Equipe</option>
              </select>
              <button
                onClick={() => {
                  if (!newTaskTitle.trim()) return;
                  setTasks([...tasks, { id: Date.now(), title: newTaskTitle, type: newTaskType, category: 'Geral', status: 'pending', date: 'Hoje' }]);
                  setNewTaskTitle('');
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-sm hover:scale-105 transition"
              >
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#121624] border border-gray-800 rounded-2xl p-4 flex items-center justify-between hover:border-gray-700 transition"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        setTasks(tasks.map(t => t.id === task.id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
                      }}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${
                        task.status === 'completed' ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-gray-700 hover:border-cyan-400'
                      }`}
                    >
                      {task.status === 'completed' && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                    <div>
                      <h4 className={`text-sm font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${
                          task.type === 'individual' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                        }`}>
                          {task.type === 'individual' ? 'Individual' : 'Equipe'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                    className="text-gray-500 hover:text-red-400 p-2 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: ANOTAÇÕES */}
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