import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';
import { 
  Sparkles, Check, Search, Trash2, BookOpen, 
  CheckSquare, X, LogOut, LayoutDashboard, Shuffle, Eye, ArrowRight, Users, Plus, AlertCircle, Clock, Lock, User, Menu, Layers, Folder, FileText, ZoomIn, ZoomOut, Save, Edit3, Type, RotateCcw, Palette, Settings, Unlock
} from 'lucide-react';

const TAROT_CARDS = [
  { id: 'louco', mas: 'O Louco', fem: 'A Louca', number: '0', roman: '0', desc: 'Inícios, liberdade, ousadia e potencial puro.', img: '/assets/tarot/louco.jpg' },
  { id: 'magico', mas: 'O Mago', fem: 'A Mágica', number: 'I', roman: 'I', desc: 'Habilidade, ação, manifestação e recursos.', img: '/assets/tarot/magico.jpg' },
  { id: 'sacerdotisa', mas: 'O Sacerdote', fem: 'A Sacerdotisa', number: 'II', roman: 'II', desc: 'Intuição, sabedoria interior e mistério.', img: '/assets/tarot/sacerdotisa.jpg' },
  { id: 'emperador', mas: 'O Imperador', fem: 'A Imperatriz', number: 'III', roman: 'III', desc: 'Estrutura, autoridade e liderança.', img: '/assets/tarot/emperador.jpg' },
  { id: 'imperatriz', mas: 'O Imperador', fem: 'A Imperatriz', number: 'IV', roman: 'IV', desc: 'Abundância, criação e natureza.', img: '/assets/tarot/imperatriz.jpg' },
  { id: 'papa', mas: 'O Papa', fem: 'A Papisa', number: 'V', roman: 'V', desc: 'Tradição, sabedoria espiritual e mentoria.', img: '/assets/tarot/papa.jpg' },
  { id: 'enamorados', mas: 'O Enamorado', fem: 'A Enamorada', number: 'VI', roman: 'VI', desc: 'Escolhas, alinhamento de valores e união.', img: '/assets/tarot/enamorados.jpg' },
  { id: 'caroo', mas: 'O Condutor', fem: 'A Condutora', number: 'VII', roman: 'VII', desc: 'Determinação, triunfo e controle de rumo.', img: '/assets/tarot/caroo.jpg' },
  { id: 'justica', mas: 'O Justo', fem: 'A Justiça', number: 'VIII', roman: 'VIII', desc: 'Verdade, equilíbrio, causa e efeito.', img: '/assets/tarot/justica.jpg' },
  { id: 'eremita', mas: 'O Eremita', fem: 'A Eremita', number: 'IX', roman: 'IX', desc: 'Introspecção, busca por respostas e luz.', img: '/assets/tarot/eremita.jpg' },
  { id: 'roda', mas: 'O Destino', fem: 'A Destinada', number: 'X', roman: 'X', desc: 'Mudança de ciclos, evolução e oportunidade.', img: '/assets/tarot/roda.jpg' },
  { id: 'forca', mas: 'O Forte', fem: 'A Forte', number: 'XI', roman: 'XI', desc: 'Coragem, domínio interior e resiliência.', img: '/assets/tarot/forca.jpg' },
  { id: 'enforcado', mas: 'O Visionário', fem: 'A Visionária', number: 'XII', roman: 'XII', desc: 'Nova perspectiva, pausa e desapego.', img: '/assets/tarot/enforcado.jpg' },
  { id: 'morte', mas: 'O Renascido', fem: 'A Renascida', number: 'XIII', roman: 'XIII', desc: 'Transformação profunda e renovação.', img: '/assets/tarot/morte.jpg' },
  { id: 'temperança', mas: 'O Equilibrado', fem: 'A Equilibrada', number: 'XIV', roman: 'XIV', desc: 'Moderação, harmonia e paciência.', img: '/assets/tarot/temperança.jpg' },
  { id: 'diabo', mas: 'O Desbravador', fem: 'A Desbravadora', number: 'XV', roman: 'XV', desc: 'Paixão intensa, ambição e quebra de amarras.', img: '/assets/tarot/diabo.jpg' },
  { id: 'torre', mas: 'O Catalisador', fem: 'A Catalisadora', number: 'XVI', roman: 'XVI', desc: 'Revelação repentina e reconstrução.', img: '/assets/tarot/torre.jpg' },
  { id: 'estrela', mas: 'O Iluminado', fem: 'A Iluminada', number: 'XVII', roman: 'XVII', desc: 'Esperança, inspiração e clareza.', img: '/assets/tarot/estrela.jpg' },
  { id: 'lua', mas: 'O Onírico', fem: 'A Onírica', number: 'XVIII', roman: 'XVIII', desc: 'Imaginação, intuição e mistério.', img: '/assets/tarot/lua.jpg' },
  { id: 'sol', mas: 'O Solar', fem: 'A Solar', number: 'XIX', roman: 'XIX', desc: 'Vitalidade, sucesso e clareza absoluta.', img: '/assets/tarot/sol.jpg' },
  { id: 'julgamento', mas: 'O Despertador', fem: 'A Despertadora', number: 'XX', roman: 'XX', desc: 'Renovação de propósitos e chamado.', img: '/assets/tarot/julgamento.jpg' },
  { id: 'mundo', mas: 'O Mestre do Mundo', fem: 'A Mestra do Mundo', number: 'XXI', roman: 'XXI', desc: 'Realização plena e conclusão de ciclo.', img: '/assets/tarot/mundo.jpg' }
];

const LOBBY_CANVAS_WIDTH = 1600;
const LOBBY_CANVAS_HEIGHT = 900;

const SEAT_POSITIONS = [
  { index: 0, x: 800, y: 150 },
  { index: 1, x: 304, y: 279 },
  { index: 2, x: 352, y: 342 },
  { index: 3, x: 400, y: 405 },
  { index: 4, x: 448, y: 477 },
  { index: 5, x: 496, y: 549 },
  { index: 6, x: 544, y: 621 },
  { index: 7, x: 592, y: 693 },
  { index: 8, x: 640, y: 756 },
  { index: 9, x: 704, y: 810 },
  { index: 10, x: 752, y: 846 },
  { index: 11, x: 800, y: 864 },
  { index: 12, x: 848, y: 846 },
  { index: 13, x: 896, y: 810 },
  { index: 14, x: 960, y: 756 },
  { index: 15, x: 1008, y: 693 },
  { index: 16, x: 1056, y: 621 },
  { index: 17, x: 1104, y: 549 },
  { index: 18, x: 1152, y: 477 },
  { index: 19, x: 1200, y: 405 },
  { index: 20, x: 1248, y: 342 },
  { index: 21, x: 1296, y: 279 }
];

const DOUBLE_CARD_NICKS = ['Sr.Discordia', 'Sra.Fluttershy'];
const FOLDER_COLORS = ['#00e5ff', '#a855f7', '#ec4899', '#eab308', '#22c55e', '#f97316'];
const PALACE_CANVAS_WIDTH = 3344;
const PALACE_CANVAS_HEIGHT = 1882;

export default function ArcanaWorkspace() {
  const [stage, setStage] = useState('auth'); 
  const [username, setUsername] = useState(() => localStorage.getItem('arcana_last_user') || '');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [deck, setDeck] = useState(TAROT_CARDS);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [flyingCard, setFlyingCard] = useState(null);
  const flightTimerRef = useRef(null);
  const closeFlightTimerRef = useRef(null); 
  const [genderChoice, setGenderChoice] = useState('mas');

  const [isFaceDown, setIsFaceDown] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isConfirmingSpin, setIsConfirmingSpin] = useState(false);
  const [isInfoFadeOut, setIsInfoFadeOut] = useState(false);

  const [userProfile, setUserProfile] = useState(null);

  const [teamMembers, setTeamMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  
  const getDefaultPositions = () => {
    const initial = {};
    SEAT_POSITIONS.forEach(seat => {
      initial[seat.index] = { x: seat.x, y: seat.y };
    });
    return initial;
  };
  const [lobbyCardPositions, setLobbyCardPositions] = useState(getDefaultPositions());

  const [isFoolModeActive, setIsFoolModeActive] = useState(false);

  const [selectedNoteDetails, setSelectedNoteDetails] = useState(null);
  const [editingNoteTitle, setEditingNoteTitle] = useState('');
  const [editingNoteContent, setEditingNoteContent] = useState('');

  const [selectedFolderDetails, setSelectedFolderDetails] = useState(null);
  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');
  const [folderColorInput, setFolderColorInput] = useState('#00e5ff');

  const [zoomedLobbyCard, setZoomedLobbyCard] = useState(null);

  const [editMode, setEditMode] = useState('text');
  const [penThickness, setPenThickness] = useState(3);
  const [penColor, setPenColor] = useState('#00e5ff');
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const historyStackRef = useRef([]);

  const [palaceZoom, setPalaceZoom] = useState(0.4);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const palaceContainerRef = useRef(null);
  const lobbyContainerRef = useRef(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [selectedAssignedCards, setSelectedAssignedCards] = useState([]);

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteFolder, setNewNoteFolder] = useState('');

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const itemDragRef = useRef(null);
  const lobbyCardDragRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('arcana_session');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.name) verifyAndRestoreSession(parsed.name, parsed.password);
      } catch (e) { localStorage.removeItem('arcana_session'); }
    }
    fetchTeamMembers();
    fetchTasks();
    loadSavedLobbyPositions();
  }, []);

  const loadSavedLobbyPositions = () => {
    const globalPositions = localStorage.getItem(`arcana_lobby_cards_global`);
    if (globalPositions) {
      try { setLobbyCardPositions(JSON.parse(globalPositions)); } catch (e) {}
    }
  };

  useEffect(() => {
    if (!userProfile?.name) return;

    const channel = supabase.channel('arcana_global_room', {
      config: { presence: { key: userProfile.name } }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setOnlineUsers(Object.keys(state));
      })
      .on('broadcast', { event: 'positions_update' }, ({ payload }) => {
        if (payload?.positions) {
          setLobbyCardPositions(payload.positions);
          localStorage.setItem('arcana_lobby_cards_global', JSON.stringify(payload.positions));
        }
      })
      .on('broadcast', { event: 'fool_mode_update' }, ({ payload }) => {
        if (payload) {
          setIsFoolModeActive(payload.active);
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ name: userProfile.name, online_at: new Date().toISOString() });
        }
      });

    const profilesSub = supabase
      .channel('public:profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchTeamMembers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(profilesSub);
    };
  }, [userProfile?.name]);

  useEffect(() => {
    if (userProfile?.name) {
      loadUserPalaceData(userProfile.name);
    }
  }, [userProfile?.name]);

  useEffect(() => {
    if (selectedNoteDetails && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      historyStackRef.current = [];
      
      if (selectedNoteDetails.drawingData) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          historyStackRef.current.push(canvas.toDataURL());
        };
        img.src = selectedNoteDetails.drawingData;
      } else {
        historyStackRef.current.push(canvas.toDataURL());
      }
    }
  }, [selectedNoteDetails]);

  const loadUserPalaceData = (userNick) => {
    const savedFoldersKey = `arcana_folders_${userNick}`;
    const savedNotesKey = `arcana_notes_${userNick}`;
    const localFolders = localStorage.getItem(savedFoldersKey);
    const localNotes = localStorage.getItem(savedNotesKey);

    if (localFolders) {
      try { setFolders(JSON.parse(localFolders)); } catch (e) { setFolders([]); }
    } else {
      setFolders([]);
      localStorage.setItem(savedFoldersKey, JSON.stringify([]));
    }
    try { setNotes(localNotes ? JSON.parse(localNotes) : []); } catch (e) { setNotes([]); }
  };

  const savePalaceFolders = (updatedFolders) => {
    setFolders(updatedFolders);
    if (userProfile?.name) localStorage.setItem(`arcana_folders_${userProfile.name}`, JSON.stringify(updatedFolders));
  };

  const savePalaceNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    if (userProfile?.name) localStorage.setItem(`arcana_notes_${userProfile.name}`, JSON.stringify(updatedNotes));
  };

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data) {
      setTeamMembers(data.map(m => ({ 
        name: m.name, 
        title: m.title || 'Iniciado', 
        cardId: m.card_id, 
        secondCardId: m.second_card_id, 
        role: m.role 
      })));
    }
  };

  const fetchTasks = async () => {
    const { data: tasksData, error: tasksError } = await supabase.from('tasks').select('*');
    const { data: assignsData, error: assignsError } = await supabase.from('task_assignments').select('*');
    if (!tasksError && !assignsError && tasksData) {
      setTasks(tasksData.map(t => {
        const tAssigns = (assignsData || []).filter(a => a.task_id === t.id);
        const assignedCards = tAssigns.map(a => a.card_id);
        const completions = {}; 
        tAssigns.forEach(a => completions[a.card_id] = a.completed);
        return { id: t.id, title: t.title, description: t.description, dueDate: t.due_date, assignedCards, completions };
      }));
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault(); setAuthError('');
    if (!username.trim() || !password.trim()) { setAuthError('Preencha o nick e a senha.'); return; }
    const { data: existingUser, error: fetchError } = await supabase.from('profiles').select('*').eq('name', username.trim()).maybeSingle();
    if (fetchError || !existingUser || existingUser.password !== password) { setAuthError('Credenciais incorretas.'); return; }
    
    localStorage.setItem('arcana_session', JSON.stringify({ name: username.trim(), password }));
    localStorage.setItem('arcana_last_user', username.trim());
    
    const assignedCard = TAROT_CARDS.find(c => c.id === existingUser.card_id);
    const secondCard = TAROT_CARDS.find(c => c.id === existingUser.second_card_id);
    setUserProfile({ name: existingUser.name, title: existingUser.title || 'Membro Ativo', card: assignedCard || null, secondCard: secondCard || null });
    
    if (!assignedCard) setStage('card_selection');
    else setStage('workspace');
  };

  const verifyAndRestoreSession = async (savedName, savedPass) => {
    const { data: existingUser } = await supabase.from('profiles').select('*').eq('name', savedName).maybeSingle();
    if (existingUser && existingUser.password === savedPass) {
      const assignedCard = TAROT_CARDS.find(c => c.id === existingUser.card_id);
      const secondCard = TAROT_CARDS.find(c => c.id === existingUser.second_card_id);
      setUserProfile({ name: existingUser.name, title: existingUser.title || 'Membro Ativo', card: assignedCard || null, secondCard: secondCard || null });
      if (!assignedCard) setStage('card_selection');
      else setStage('workspace');
    }
  };

  const handleLogout = () => { 
    localStorage.removeItem('arcana_session'); 
    setUserProfile(null); 
    setStage('auth'); 
    setIsSidebarOpen(false); 
  };
  
  const handleOpenSecondCardSelection = () => {
    setSelectedCardIndex(null);
    setFlyingCard(null);
    setStage('second_card_selection');
    setIsSidebarOpen(false);
  };

  const handleShuffle = () => {
    setIsShuffling(true); 
    setIsFaceDown(true);
    setSelectedCardIndex(null);
    setFlyingCard(null);
    setTimeout(() => {
      setDeck([...deck].sort(() => Math.random() - 0.5));
    }, 400);
    setTimeout(() => setIsShuffling(false), 900);
  };

  const handleToggleFaceDown = () => {
    const nextState = !isFaceDown;
    setIsFaceDown(nextState);
    if (nextState) {
      setSelectedCardIndex(null);
      setFlyingCard(null);
    }
  };

  const currentCard = selectedCardIndex !== null && deck[selectedCardIndex] ? deck[selectedCardIndex] : null;

  const cardOwner = currentCard ? teamMembers.find(m => m.cardId === currentCard.id || m.secondCardId === currentCard.id) : null;
  const isCardAlreadyTaken = cardOwner && cardOwner.name !== userProfile?.name;
  const isUserOwnCard = userProfile?.card?.id === currentCard?.id || userProfile?.secondCard?.id === currentCard?.id;

  const handleConfirmSelection = async () => {
    if (!currentCard || !userProfile || isCardAlreadyTaken || isUserOwnCard || isConfirmingSpin) return;
    setIsConfirmingSpin(true);

    const titleFormatted = genderChoice === 'mas' ? currentCard.mas : currentCard.fem;

    setTimeout(async () => {
      if (stage === 'second_card_selection') {
        const { error } = await supabase.from('profiles').update({ second_card_id: currentCard.id }).eq('name', userProfile.name);
        if (!error) {
          setUserProfile(prev => ({ ...prev, secondCard: currentCard }));
          await fetchTeamMembers(); 
          setSelectedCardIndex(null);
          setFlyingCard(null);
          setStage('workspace');
        }
      } else {
        const { error } = await supabase.from('profiles').update({ title: titleFormatted, card_id: currentCard.id }).eq('name', userProfile.name);
        if (!error) {
          setUserProfile(prev => ({ ...prev, title: titleFormatted, card: currentCard }));
          await fetchTeamMembers(); 
          setSelectedCardIndex(null);
          setFlyingCard(null);
          setStage('workspace');
        }
      }
      setIsConfirmingSpin(false);
    }, 1400);
  };

  const closeFlyingCard = () => {
    if (!flyingCard || flyingCard.closing || isConfirmingSpin) return;
    if (flightTimerRef.current) cancelAnimationFrame(flightTimerRef.current);
    setFlyingCard(prev => prev ? { ...prev, expanded: false, closing: true } : prev);
    if (closeFlightTimerRef.current) clearTimeout(closeFlightTimerRef.current);
    closeFlightTimerRef.current = setTimeout(() => {
      setFlyingCard(null);
      setSelectedCardIndex(null);
      closeFlightTimerRef.current = null;
    }, 1050);
  };

  const selectCardOnTable = (idx, event) => {
    if (isConfirmingSpin || flyingCard) return;
    const table = document.getElementById('table-container');
    if (!table) return;
    const tableRect = table.getBoundingClientRect();
    const rect = event.currentTarget.getBoundingClientRect();
    const targetWidth = Math.min(255, tableRect.width * 0.54, (tableRect.height - 40) * 675 / 1015);
    const targetHeight = targetWidth * 1015 / 675;
    const targetX = (tableRect.width - targetWidth) / 2;
    const targetY = (tableRect.height - targetHeight) / 2;
    setSelectedCardIndex(idx);
    setIsInfoFadeOut(false);
    setFlyingCard({
      idx, start: { left: rect.left - tableRect.left, top: rect.top - tableRect.top, width: rect.width, height: rect.height },
      end: { left: targetX, top: targetY, width: targetWidth, height: targetHeight },
      expanded: false, closing: false,
    });
    if (flightTimerRef.current) cancelAnimationFrame(flightTimerRef.current);
    flightTimerRef.current = requestAnimationFrame(() => {
      flightTimerRef.current = requestAnimationFrame(() => {
        setFlyingCard(prev => prev?.idx === idx ? { ...prev, expanded: true } : prev);
      });
    });
  };

  const handleTableBackgroundClick = () => closeFlyingCard();

  const toggleFoolMode = async () => {
    const nextState = !isFoolModeActive;
    setIsFoolModeActive(nextState);

    if (!nextState) {
      localStorage.setItem(`arcana_lobby_cards_global`, JSON.stringify(lobbyCardPositions));
    }

    await supabase.channel('arcana_global_room').send({
      type: 'broadcast',
      event: 'fool_mode_update',
      payload: { active: nextState }
    });
  };

  const handleLobbyCardPointerDown = (e, index) => {
    if (!isFoolModeActive) return;
    e.stopPropagation();
    const containerEl = lobbyContainerRef.current;
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    const currentPos = lobbyCardPositions[index] || SEAT_POSITIONS[index] || { x: 800, y: 450 };

    const scale = rect.width / LOBBY_CANVAS_WIDTH;

    lobbyCardDragRef.current = {
      index,
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentPos.x,
      initialY: currentPos.y,
      scale,
      moved: false
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleLobbyCardPointerMove = async (e) => {
    if (!isFoolModeActive || !lobbyCardDragRef.current) return;
    const drag = lobbyCardDragRef.current;
    const deltaX = (e.clientX - drag.startX) / drag.scale;
    const deltaY = (e.clientY - drag.startY) / drag.scale;

    if (Math.hypot(deltaX, deltaY) > 2) {
      drag.moved = true;
    }

    if (drag.moved) {
      const newX = Math.max(30, Math.min(1570, drag.initialX + deltaX));
      const newY = Math.max(30, Math.min(870, drag.initialY + deltaY));

      const updated = {
        ...lobbyCardPositions,
        [drag.index]: { x: newX, y: newY }
      };

      setLobbyCardPositions(updated);

      await supabase.channel('arcana_global_room').send({
        type: 'broadcast',
        event: 'positions_update',
        payload: { positions: updated }
      });
    }
  };

  const handleLobbyCardPointerUp = (e, index, tarotObj) => {
    e.stopPropagation();
    if (!lobbyCardDragRef.current) return;
    const drag = lobbyCardDragRef.current;

    if (!drag.moved) {
      if (tarotObj) {
        const owner = teamMembers.find(m => m.cardId === tarotObj?.id || m.secondCardId === tarotObj?.id);
        setZoomedLobbyCard({ tarot: tarotObj, owner });
      }
    } else {
      localStorage.setItem(`arcana_lobby_cards_global`, JSON.stringify(lobbyCardPositions));
    }
    lobbyCardDragRef.current = null;
  };

  const clampPan = (x, y, zoom) => {
    if (!palaceContainerRef.current) return { x, y };
    const containerWidth = palaceContainerRef.current.clientWidth;
    const containerHeight = palaceContainerRef.current.clientHeight;

    const scaledWidth = PALACE_CANVAS_WIDTH * zoom;
    const scaledHeight = PALACE_CANVAS_HEIGHT * zoom;

    const minX = containerWidth - scaledWidth;
    const minY = containerHeight - scaledHeight;

    const clampedX = Math.min(0, Math.max(minX, x));
    const clampedY = Math.min(0, Math.max(minY, y));

    return { x: clampedX, y: clampedY };
  };

  const handleZoomChange = (newZoom) => {
    const minZoom = 0.4;
    const maxZoom = 2.0;
    const clampedZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));

    if (!palaceContainerRef.current) {
      setPalaceZoom(clampedZoom);
      return;
    }

    const containerWidth = palaceContainerRef.current.clientWidth;
    const containerHeight = palaceContainerRef.current.clientHeight;

    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    const mapX = (centerX - panOffset.x) / palaceZoom;
    const mapY = (centerY - panOffset.y) / palaceZoom;

    const newPanX = centerX - mapX * clampedZoom;
    const newPanY = centerY - mapY * clampedZoom;

    const clampedPan = clampPan(newPanX, newPanY, clampedZoom);

    setPalaceZoom(clampedZoom);
    setPanOffset(clampedPan);
  };

  const handlePalaceBgPointerDown = (e) => {
    if (e.target.id === 'palace-bg-container' || e.target.id === 'palace-inner-bg' || e.target.id === 'palace-overlay') {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePalacePointerMove = (e) => {
    if (isPanningRef.current) {
      const rawX = e.clientX - panStartRef.current.x;
      const rawY = e.clientY - panStartRef.current.y;
      setPanOffset(clampPan(rawX, rawY, palaceZoom));
      return;
    }

    if (itemDragRef.current) {
      const drag = itemDragRef.current;
      const deltaX = (e.clientX - drag.startX) / palaceZoom;
      const deltaY = (e.clientY - drag.startY) / palaceZoom;

      if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 2) {
        drag.moved = true;
      }

      if (drag.moved) {
        const newX = Math.max(10, Math.min(3300, drag.initialX + deltaX));
        const newY = Math.max(10, Math.min(1850, drag.initialY + deltaY));

        if (drag.type === 'folder') {
          setFolders(prev => prev.map(f => f.id === drag.id ? { ...f, posX: newX, posY: newY } : f));
        } else if (drag.type === 'note') {
          setNotes(prev => prev.map(n => n.id === drag.id ? { ...n, posX: newX, posY: newY } : n));
        }
      }
    }
  };

  const handlePalaceBgPointerUp = () => {
    isPanningRef.current = false;
  };

  const handleItemPointerDown = (e, type, item) => {
    e.stopPropagation();
    itemDragRef.current = {
      type,
      id: item.id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: item.posX,
      initialY: item.posY,
      moved: false
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleItemPointerUp = (e, type, item) => {
    e.stopPropagation();
    if (!itemDragRef.current) return;
    const drag = itemDragRef.current;

    if (drag.moved) {
      if (type === 'note') {
        const noteEl = document.getElementById(`note-${item.id}`);
        if (noteEl) {
          const noteRect = noteEl.getBoundingClientRect();
          const targetFolder = folders.find(f => {
            const folderEl = document.getElementById(`folder-${f.id}`);
            if (!folderEl) return false;
            const folderRect = folderEl.getBoundingClientRect();
            return !(
              noteRect.right < folderRect.left ||
              noteRect.left > folderRect.right ||
              noteRect.bottom < folderRect.top ||
              noteRect.top > folderRect.bottom
            );
          });

          if (targetFolder) {
            const updatedNotes = notes.map(n => n.id === item.id ? { ...n, folderId: targetFolder.id } : n);
            savePalaceNotes(updatedNotes);
          } else {
            savePalaceNotes(notes);
          }
        }
      } else if (type === 'folder') {
        savePalaceFolders(folders);
      }
    } else {
      if (type === 'folder') {
        setSelectedFolderDetails(item);
        setFolderNameInput(item.name);
        setFolderColorInput(item.color || '#00e5ff');
        setIsEditingFolder(false);
      }
      else if (type === 'note') {
        setSelectedNoteDetails(item);
        setEditingNoteTitle(item.title);
        setEditingNoteContent(item.content);
        setEditMode('text');
      }
    }
    itemDragRef.current = null;
  };

  const getTaskStatus = (task) => {
    const now = new Date().toISOString();
    const allCompleted = task.assignedCards.length > 0 && task.assignedCards.every(cardId => task.completions[cardId] === true);
    if (allCompleted) return 'completed';
    if (task.dueDate && task.dueDate < now) return 'failed';
    return 'pending';
  };

  const toggleUserTaskCompletion = async (taskId) => {
    if (!userProfile?.card?.id) return;
    const userCardId = userProfile.card.id;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const currentStatus = !!task.completions[userCardId];
    await supabase.from('task_assignments').update({ completed: !currentStatus }).eq('task_id', taskId).eq('card_id', userCardId);
    fetchTasks();
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim() || selectedAssignedCards.length === 0) return;
    const { data: taskData, error: taskError } = await supabase.from('tasks').insert([{ title: newTaskTitle, description: newTaskDesc, due_date: newTaskDueDate || null }]).select().single();
    if (!taskError && taskData) {
      const assignments = selectedAssignedCards.map(cId => ({ task_id: taskData.id, card_id: cId, completed: false }));
      await supabase.from('task_assignments').insert(assignments);
      setNewTaskTitle(''); setNewTaskDesc(''); setNewTaskDueDate(''); setSelectedAssignedCards([]); setIsTaskModalOpen(false); fetchTasks();
    }
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const newF = { id: 'f_' + Date.now(), name: newFolderName, posX: 400 + (folders.length % 4) * 200, posY: 300, color: '#00e5ff' };
    savePalaceFolders([...folders, newF]);
    setNewFolderName(''); setIsFolderModalOpen(false);
  };

  const handleSaveFolderEdit = () => {
    if (!selectedFolderDetails) return;
    const updated = folders.map(f => f.id === selectedFolderDetails.id ? { ...f, name: folderNameInput, color: folderColorInput } : f);
    savePalaceFolders(updated);
    setSelectedFolderDetails({ ...selectedFolderDetails, name: folderNameInput, color: folderColorInput });
    setIsEditingFolder(false);
  };

  const handleDeleteFolder = (folderId) => {
    const updatedFolders = folders.filter(f => f.id !== folderId);
    const updatedNotes = notes.map(n => n.folderId === folderId ? { ...n, folderId: null } : n);
    savePalaceFolders(updatedFolders);
    savePalaceNotes(updatedNotes);
    setSelectedFolderDetails(null);
    setIsEditingFolder(false);
  };

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) return;
    const newN = { id: 'n_' + Date.now(), title: newNoteTitle, content: newNoteContent, posX: 450 + (notes.length % 4) * 180, posY: 400, folderId: newNoteFolder || null };
    savePalaceNotes([...notes, newN]);
    setNewNoteTitle(''); setNewNoteContent(''); setNewNoteFolder(''); setIsNoteModalOpen(false);
  };

  const handleDeleteNote = (noteId) => {
    const updated = notes.filter(n => n.id !== noteId);
    savePalaceNotes(updated);
    setSelectedNoteDetails(null);
  };

  const handleSaveNoteEdit = () => {
    if (!selectedNoteDetails) return;
    let canvasData = selectedNoteDetails.drawingData || null;
    if (canvasRef.current) {
      canvasData = canvasRef.current.toDataURL();
    }
    const updated = notes.map(n => n.id === selectedNoteDetails.id ? { ...n, title: editingNoteTitle, content: editingNoteContent, drawingData: canvasData } : n);
    savePalaceNotes(updated);
    setSelectedNoteDetails(null);
  };

  const handleStartDrawing = (e) => {
    if (editMode !== 'draw' || !canvasRef.current) return;
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = penThickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDraw = (e) => {
    if (!isDrawingRef.current || editMode !== 'draw' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopDrawing = () => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    historyStackRef.current.push(canvas.toDataURL());
  };

  const handleUndoDrawing = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (historyStackRef.current.length > 1) {
      historyStackRef.current.pop();
      const previousStateDataUrl = historyStackRef.current[historyStackRef.current.length - 1];
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = previousStateDataUrl;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      historyStackRef.current = [canvas.toDataURL()];
    }
  };

  const handleClearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    historyStackRef.current = [canvas.toDataURL()];
  };

  if (stage === 'auth') {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-6 select-none relative overflow-hidden">
        <div className="bg-[#121624] border border-cyan-500/40 rounded-3xl p-8 max-w-md w-full shadow-[0_0_80px_rgba(6,182,212,0.3)] flex flex-col items-center text-center relative">
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-5">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">ARCANA WORKSPACE</h1>
          <p className="text-xs text-gray-400 mb-6">Acesse com seu Nick e Senha.</p>
          {authError && <div className="w-full bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded-xl text-xs mb-4 flex items-center gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{authError}</span></div>}
          <form onSubmit={handleAuthSubmit} className="w-full space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">Seu Nick (Cadastrado)</label>
              <div className="relative"><User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" /><input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-cyan-400 focus:outline-none focus:border-cyan-400 transition" /></div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">Senha de Acesso</label>
              <div className="relative"><Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" /><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-cyan-400 focus:outline-none focus:border-cyan-400 transition" /></div>
            </div>
            <button type="submit" className="w-full mt-4 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider">Entrar no Workspace <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    );
  }

  if (stage === 'card_selection' || stage === 'second_card_selection') {
    return (
      <div className="min-h-screen bg-[#040609] text-white flex flex-col justify-between p-3 sm:p-4 select-none relative overflow-hidden">
        <style>{`
          .card-3d-inner { 
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
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
            border-radius: 0.4rem; 
          }
          .card-back { transform: rotateY(180deg); }
          .card-front { transform: rotateY(0deg); }

          @keyframes tableShuffle {
            0% { transform: scale(1) translateY(0); }
            50% { transform: scale(0.95) translateY(-5px); filter: blur(1px); }
            100% { transform: scale(1) translateY(0); }
          }
          .animate-table-shuffle { animation: tableShuffle 0.6s ease-in-out; }

          .dark-room-vignette {
            background: radial-gradient(circle at 60% 50%, rgba(12, 18, 32, 0.9) 0%, rgba(2, 3, 6, 0.98) 90%);
            box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.95);
          }
        `}</style>

        <header className="flex flex-col md:flex-row items-center justify-between gap-2 z-20 max-w-7xl mx-auto w-full mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20"><Sparkles className="w-3.5 h-3.5 text-white" /></div>
            <div>
              <h1 className="text-sm font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stage === 'second_card_selection' ? 'SELEÇÃO DE SEGUNDA CARTA' : 'ARCANA WORKSPACE'}
              </h1>
              <p className="text-[10px] text-gray-400">Nick: <span className="text-cyan-400 font-semibold">{userProfile?.name}</span>. Clique em uma carta livre para examiná-la.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleToggleFaceDown} className="px-2.5 py-1 rounded-xl bg-[#121624] border border-gray-800 text-[11px] font-semibold hover:border-cyan-400 flex items-center gap-1.5 transition"><Eye className="w-3.5 h-3.5 text-cyan-400" /> {isFaceDown ? 'Revelar Cartas' : 'Virar Cartas'}</button>
            <button onClick={handleShuffle} disabled={isShuffling} className="px-2.5 py-1 rounded-xl bg-[#121624] border border-gray-800 text-[11px] font-semibold hover:border-purple-400 flex items-center gap-1.5 transition"><Shuffle className={`w-3.5 h-3.5 text-purple-400 ${isShuffling ? 'animate-spin' : ''}`} /> Embaralhar</button>
            {stage === 'second_card_selection' && (
              <button onClick={() => { setSelectedCardIndex(null); setFlyingCard(null); setStage('workspace'); }} className="px-2.5 py-1 rounded-xl bg-gray-800 text-[11px] font-bold text-gray-300 hover:text-white transition">Voltar</button>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center py-1">
          <div className="lg:col-span-5 flex flex-col justify-center">
            {currentCard ? (
              <div className={`flex flex-col space-y-3.5 bg-[#121624]/90 border border-cyan-500/30 rounded-3xl p-5 backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all duration-300 ${isInfoFadeOut ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      ARCANO {currentCard.number}
                    </span>
                    {cardOwner && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${isUserOwnCard ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                        {isUserOwnCard ? 'Sua carta atual' : `Pertence a ${cardOwner.name}`}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {genderChoice === 'mas' ? currentCard.mas : currentCard.fem}
                  </h2>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-light border-l-2 border-cyan-500/50 pl-3">
                  {currentCard.desc}
                </p>

                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">Gênero da Carta</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setGenderChoice('mas')} 
                      className={`py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${genderChoice === 'mas' ? 'bg-cyan-500 border-cyan-400 text-black shadow-md shadow-cyan-500/25' : 'bg-[#1a1f33] border-gray-700 text-gray-300 hover:border-gray-600'}`}
                    >
                      {currentCard.mas}
                    </button>
                    <button 
                      onClick={() => setGenderChoice('fem')} 
                      className={`py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${genderChoice === 'fem' ? 'bg-purple-500 border-purple-400 text-white shadow-md shadow-purple-500/25' : 'bg-[#1a1f33] border-gray-700 text-gray-300 hover:border-gray-600'}`}
                    >
                      {currentCard.fem}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleConfirmSelection}
                  disabled={isCardAlreadyTaken || isUserOwnCard || isConfirmingSpin}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-xl transition flex items-center justify-center gap-2 ${
                    isCardAlreadyTaken || isUserOwnCard
                      ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white shadow-cyan-500/20 hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {isConfirmingSpin ? 'Salvando Escolha...' : isUserOwnCard ? 'Você já possui esta carta' : isCardAlreadyTaken ? 'Carta já escolhida' : 'Confirmar Escolha'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 bg-[#121624]/40 border border-dashed border-gray-800 rounded-3xl text-center space-y-2">
                <BookOpen className="w-6 h-6 text-cyan-400/60" />
                <h3 className="text-xs font-bold text-gray-300">Escolha uma carta na mesa</h3>
                <p className="text-[11px] text-gray-500 max-w-xs">Cartas com tom cinza já foram atribuídas a outros membros.</p>
              </div>
            )}
          </div>

          <div 
            id="table-container"
            onClick={handleTableBackgroundClick}
            className="lg:col-span-7 flex flex-col justify-center items-center relative h-[450px] sm:h-[480px] dark-room-vignette rounded-3xl border border-cyan-500/20 overflow-hidden p-3 sm:p-4"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0%,transparent_75%)] pointer-events-none" />

            <div 
              id="table-grid"
              className={`w-full h-full grid grid-cols-6 gap-2 sm:gap-2.5 items-center justify-items-center transition-all duration-500 relative ${selectedCardIndex !== null ? 'opacity-20 blur-[2px] pointer-events-none' : 'opacity-100'} ${isShuffling ? 'animate-table-shuffle' : ''}`}
            >
              {deck.map((card, idx) => {
                const owner = teamMembers.find(m => m.cardId === card.id || m.secondCardId === card.id);
                const isTaken = !!owner;
                const isMine = owner && owner.name === userProfile?.name;

                return (
                  <div
                    key={card.id}
                    onClick={(e) => { 
                      if (isTaken) return; 
                      e.stopPropagation(); 
                      selectCardOnTable(idx, e); 
                    }}
                    className={`transition-all duration-300 flex flex-col items-center w-full max-w-[65px] sm:max-w-[78px] ${
                      isTaken 
                        ? 'opacity-40 grayscale cursor-not-allowed' 
                        : 'cursor-pointer hover:scale-105 hover:brightness-110'
                    } ${selectedCardIndex === idx ? 'invisible' : ''}`}
                  >
                    <div className={`w-full aspect-[675/1015] rounded-sm border ${isMine ? 'border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'border-gray-800/80'} bg-[#0a0d14] shadow-md relative`}>
                      <div className="card-3d-inner" style={{ transform: isFaceDown ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                        <div className="card-face card-front bg-[#0a0d14]">
                          <img src={card.img} alt="" className="w-full h-full object-cover rounded-sm" />
                        </div>
                        <div className="card-face card-back bg-[#0a0d14]">
                          <img src="/assets/tarot/back.jpg" alt="" className="w-full h-full object-cover rounded-sm" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500'; }} />
                        </div>
                      </div>
                      {isTaken && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-[0.5px] rounded-sm flex flex-col items-center justify-center p-1 text-center">
                          <span className="text-[8px] font-bold text-gray-300 truncate w-full">{owner.name}</span>
                          <span className="text-[7px] text-gray-500 font-mono">{isMine ? '(Sua 1ª)' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {flyingCard && currentCard && (
              <div className="absolute inset-0 z-30 pointer-events-none" style={{ perspective: '1600px' }}>
                <button
                  type="button"
                  aria-label="Voltar carta para a mesa"
                  className="absolute inset-0 w-full h-full bg-transparent cursor-default pointer-events-auto"
                  onClick={closeFlyingCard}
                />
                <div
                  className="absolute cursor-pointer pointer-events-auto"
                  onClick={closeFlyingCard}
                  role="button"
                  tabIndex={0}
                  aria-label="Clique para devolver a carta à mesa"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeFlyingCard(); } }}
                  style={{
                    ...(flyingCard.expanded ? flyingCard.end : flyingCard.start),
                    transition: 'left 1050ms cubic-bezier(.25,.7,.2,1), top 1050ms cubic-bezier(.25,.7,.2,1), width 1050ms cubic-bezier(.25,.7,.2,1), height 1050ms cubic-bezier(.25,.7,.2,1)',
                    transformStyle: 'preserve-3d',
                    filter: flyingCard.expanded ? 'drop-shadow(0 24px 28px rgba(0,0,0,.5))' : 'none',
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-md"
                    style={{
                      transform: flyingCard.expanded ? 'rotateY(360deg) translateZ(38px)' : 'rotateY(0deg) translateZ(0px)',
                      transition: 'transform 1050ms cubic-bezier(.25,.7,.2,1)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <img
                      src={currentCard.img}
                      alt={currentCard.mas}
                      draggable="false"
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    />
                    <img
                      src={isFaceDown ? '/assets/tarot/back.jpg' : currentCard.img}
                      alt=""
                      draggable="false"
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white flex flex-col md:flex-row relative w-full overflow-x-hidden">
      <style>{`
        @keyframes cardSpinApproach {
          0% { transform: scale(1) rotateY(0deg); }
          100% { transform: scale(1.15) rotateY(360deg); }
        }
        .animate-card-approach {
          animation: cardSpinApproach 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .arcana-parchment {
          position: relative;
          color: #e8e5dc;
          background:
            linear-gradient(90deg, transparent 31px, rgba(6,182,212,.27) 32px, transparent 33px),
            repeating-linear-gradient(0deg, transparent 0 29px, rgba(107,137,161,.20) 30px 31px),
            radial-gradient(ellipse at 30% 15%, #243044, #101722 67%, #090e17 100%);
          border: 1px solid rgba(87,192,215,.38);
          box-shadow: inset 0 0 24px rgba(0,0,0,.5), 0 18px 45px rgba(0,0,0,.45);
          clip-path: polygon(0.8% 0, 99% 0.7%, 100% 98.5%, 98.5% 100%, 0 99%, 0.6% 75%);
        }
        .arcana-parchment:before, .arcana-parchment:after {
          content: ''; position: absolute; pointer-events: none; left: 0; right: 0; height: 10px;
          background: linear-gradient(180deg, #344256, #0c111c);
          border: 1px solid rgba(111,199,211,.36);
          border-radius: 50%; z-index: 2;
        }
        .arcana-parchment:before { top: -4px; }
        .arcana-parchment:after { bottom: -4px; transform: rotate(180deg); }
        .arcana-parchment textarea { background: transparent; resize: vertical; }
        .arcana-parchment textarea:focus, .arcana-parchment input:focus { outline: none; }
      `}</style>
      
      <div className="md:hidden flex items-center justify-between bg-[#121624] border-b border-gray-800 px-4 py-3 z-30 sticky top-0 w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">ARCANA</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-cyan-400 hover:bg-gray-800/60 rounded-xl transition">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#121624] border-r border-gray-800/80 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"><Sparkles className="w-5 h-5 text-white" /></div>
              <div>
                <h1 className="font-extrabold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">ARCANA</h1>
                <span className="text-[10px] text-gray-500 font-mono">WORKSPACE</span>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white p-1"><X className="w-5 h-5" /></button>
          </div>

          <nav className="space-y-1">
            {[ { id: 'dashboard', label: 'Lobby do Conselho', icon: LayoutDashboard }, { id: 'team', label: 'Equipe', icon: Users }, { id: 'tasks', label: 'Atividades', icon: CheckSquare }, { id: 'notes', label: 'Palácio Mental', icon: BookOpen } ].map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${activeTab === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'}`}>
                <item.icon className="w-5 h-5" /> {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          {DOUBLE_CARD_NICKS.includes(userProfile?.name) && !userProfile?.secondCard && (
            <button onClick={handleOpenSecondCardSelection} className="w-full py-2.5 px-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-2">
              <Layers className="w-4 h-4" /> Escolher 2ª Carta
            </button>
          )}

          <div className="bg-[#1a1f33] border border-gray-800 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">{userProfile?.name?.charAt(0).toUpperCase()}</div>
            <div className="flex-1 overflow-hidden"><h4 className="text-sm font-bold truncate text-white">{userProfile?.name}</h4><p className="text-xs text-cyan-400 truncate">{userProfile?.title}</p></div>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 p-1 transition"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-4 sm:p-8 min-h-screen w-full overflow-y-auto">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">SALA DO CONSELHO</h2>
              </div>

              {userProfile?.card?.id === 'louco' && (
                <button 
                  onClick={toggleFoolMode}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition flex items-center gap-1.5 ${
                    isFoolModeActive 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
                      : 'bg-[#121624] text-gray-400 border-gray-800 hover:text-cyan-400 hover:border-cyan-500/40'
                  }`}
                >
                  {isFoolModeActive ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5 text-gray-400" />}
                  {isFoolModeActive ? 'Travar Posições' : 'Ajustar Posições'}
                </button>
              )}
            </div>

            <div className="w-full aspect-[16/9] max-h-[720px] rounded-3xl border border-cyan-500/30 overflow-hidden bg-[#07090e] shadow-2xl flex items-center justify-center relative select-none touch-none">
              
              <div 
                ref={lobbyContainerRef}
                onPointerMove={isFoolModeActive ? handleLobbyCardPointerMove : undefined}
                onPointerUp={(e) => isFoolModeActive ? handleLobbyCardPointerUp(e) : undefined}
                className="w-full h-full max-w-full max-h-full relative flex items-center justify-center bg-[url('/assets/lobby.jpg')] bg-cover bg-center"
                style={{ aspectRatio: '16/9' }}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] pointer-events-none" />

                <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                  <img 
                    src="/assets/mesa-conselho.png" 
                    alt="Mesa do Conselho" 
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-none"
                    onError={(e) => { e.target.src = '/assets/tarot/mesa-conselho.png'; }}
                  />
                </div>

                {TAROT_CARDS.map((tarotObj, seatIndex) => {
                  const owner = teamMembers.find(m => m.cardId === tarotObj?.id || m.secondCardId === tarotObj?.id);
                  const isOnline = owner && onlineUsers.includes(owner.name);
                  
                  if (!isFoolModeActive && !isOnline) return null;

                  const pos = lobbyCardPositions[seatIndex] || SEAT_POSITIONS[seatIndex] || { x: 800, y: 450 };

                  const leftPercent = (pos.x / LOBBY_CANVAS_WIDTH) * 100;
                  const topPercent = (pos.y / LOBBY_CANVAS_HEIGHT) * 100;

                  return (
                    <div
                      key={tarotObj.id}
                      onPointerDown={(e) => handleLobbyCardPointerDown(e, seatIndex)}
                      onPointerUp={(e) => handleLobbyCardPointerUp(e, seatIndex, tarotObj)}
                      style={{ left: `${leftPercent}%`, top: `${topPercent}%`, touchAction: 'none' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group ${isFoolModeActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                    >
                      <div className={`w-[3vw] min-w-[28px] max-w-[48px] aspect-[675/1015] rounded border shadow-lg relative select-none ${isOnline ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.8)]' : 'border-gray-600 opacity-60 grayscale'}`}>
                        <img src={tarotObj.img} alt="" draggable="false" className="w-full h-full object-cover rounded-sm pointer-events-none" />
                        {isOnline && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-black animate-pulse" />}
                      </div>

                      <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border mt-0.5 whitespace-nowrap shadow-md pointer-events-none ${isOnline ? 'text-cyan-200 bg-black/90 border-cyan-500/30' : 'text-gray-400 bg-black/80 border-gray-700'}`}>
                        {owner ? owner.name : `[ ${tarotObj.mas} ]`}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {zoomedLobbyCard && (
          <div 
            onClick={() => setZoomedLobbyCard(null)} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
            style={{ perspective: '1200px' }}
          >
            <div className="flex flex-col items-center space-y-4 animate-card-approach" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative w-[240px] sm:w-[290px] aspect-[675/1015] rounded-2xl border-2 border-cyan-400 shadow-[0_0_60px_rgba(0,229,255,0.4)] overflow-hidden bg-[#0a0d14]">
                <img src={zoomedLobbyCard.tarot.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="text-center space-y-1 bg-[#121624]/90 p-4 rounded-2xl border border-cyan-500/40 backdrop-blur-sm max-w-sm">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">ARCANO {zoomedLobbyCard.tarot.number}</span>
                <h3 className="text-xl font-extrabold text-white">{zoomedLobbyCard.tarot.mas}</h3>
                {zoomedLobbyCard.owner ? (
                  <p className="text-xs text-cyan-300 font-semibold">Representado por: {zoomedLobbyCard.owner.name} ({onlineUsers.includes(zoomedLobbyCard.owner.name) ? 'Online' : 'Offline'})</p>
                ) : (
                  <p className="text-xs text-gray-500 italic">Disponível / Sem Dono</p>
                )}
                <p className="text-[11px] text-gray-400 pt-1">{zoomedLobbyCard.tarot.desc}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Mural de Arcanos da Equipe</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
              {TAROT_CARDS.map(card => {
                const owner = teamMembers.find(m => m.cardId === card.id || m.secondCardId === card.id);
                const isOnline = owner && onlineUsers.includes(owner.name);
                
                if (!isOnline) return null;

                return (
                  <div key={card.id} className="relative rounded-xl p-2 border bg-[#121929] border-cyan-500/60 shadow-md">
                    <div className="w-full aspect-[675/1015] rounded-lg overflow-hidden bg-[#0a0d14]"><img src={card.img} alt="" className="w-full h-full object-cover" /></div>
                    <span className="text-[10px] font-bold text-white truncate block mt-2 text-center">{owner.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Quadro de Missões & Atividades</h3>
                <p className="text-xs text-gray-400">Acompanhe prazos e os responsáveis convocados para cada missão.</p>
              </div>
              <button onClick={() => setIsTaskModalOpen(true)} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition">
                <Plus className="w-4 h-4" /> Criar Nova Atividade
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map(task => {
                const status = getTaskStatus(task);
                const userCardId = userProfile?.card?.id;
                const isUserAssigned = userCardId && task.assignedCards.includes(userCardId);
                const isUserDone = userCardId && task.completions[userCardId];

                return (
                  <div key={task.id} className={`bg-[#121624] border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${status === 'completed' ? 'border-emerald-500/40 bg-emerald-950/10' : status === 'failed' ? 'border-red-500/40 bg-red-950/10' : 'border-gray-800'}`}>
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-base font-bold text-white">{task.title}</h4>
                        {status === 'completed' && <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase">Concluída</span>}
                        {status === 'failed' && <span className="text-[10px] bg-red-500/20 border border-red-500/40 text-red-400 px-2 py-0.5 rounded-full font-bold uppercase">Fracassada</span>}
                        {status === 'pending' && <span className="text-[10px] bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 px-2 py-0.5 rounded-full font-bold uppercase">Em Andamento</span>}
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{task.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 pt-2 border-t border-gray-800/60">
                        {task.dueDate && (
                          <div className="flex items-center gap-1.5 font-mono text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-gray-500">Prazo Limite:</span>
                            <span className={status === 'failed' ? 'text-red-400 font-bold' : 'text-cyan-300 font-semibold'}>{task.dueDate.replace('T', ' às ')}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-gray-500">Participantes:</span>
                          <div className="flex flex-wrap items-center gap-2">
                            {task.assignedCards.map(cId => {
                              const cardObj = TAROT_CARDS.find(c => c.id === cId);
                              const owner = teamMembers.find(m => m.cardId === cId || m.secondCardId === cId);
                              const isDone = task.completions[cId];
                              return (
                                <div key={cId} className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border flex items-center gap-2 ${isDone ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-[#1a1f33] border-gray-700 text-gray-300'}`}>
                                  {cardObj && <img src={cardObj.img} alt="" className="w-4 h-6 object-cover rounded" />}
                                  <span><strong>{owner ? owner.name : cardObj?.mas}</strong> {isDone ? '✓' : ''}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {isUserAssigned && status === 'pending' && (
                      <button onClick={() => toggleUserTaskCompletion(task.id)} className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${isUserDone ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg'}`}>
                        <Check className="w-4 h-4" /> {isUserDone ? 'Concluído por você' : 'Marcar Conclusão'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">Palácio Mental - <span className="text-cyan-400">{userProfile?.name}</span></h3>
                <p className="text-xs text-gray-400">Arraste notas diretamente para pastas para guardá-las.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-[#121624] border border-gray-800 rounded-xl px-3 py-1.5 shadow-md">
                  <ZoomOut className="w-3.5 h-3.5 text-gray-400" />
                  <input 
                    type="range" 
                    min="0.4" 
                    max="2.0" 
                    step="0.05"
                    value={palaceZoom} 
                    onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                    className="w-24 sm:w-32 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <ZoomIn className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] font-mono text-cyan-400 min-w-[32px] text-right">{Math.round(palaceZoom * 100)}%</span>
                </div>

                <button onClick={() => setIsFolderModalOpen(true)} className="px-3.5 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-900/40 transition">
                  <Folder className="w-4 h-4 text-[#00e5ff]" /> Criar Pasta
                </button>
                <button onClick={() => setIsNoteModalOpen(true)} className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition shadow">
                  <Plus className="w-4 h-4" /> Nova Nota
                </button>
              </div>
            </div>
            
            {/* PALÁCIO MENTAL CORRIGIDO (SEM FLEX DE CENTRALIZAÇÃO, MANTENDO PAN/ZOOM CORRETO) */}
            <div 
              ref={palaceContainerRef}
              id="palace-bg-container"
              onPointerDown={handlePalaceBgPointerDown}
              onPointerMove={handlePalacePointerMove}
              onPointerUp={handlePalaceBgPointerUp}
              className="w-full h-[600px] border border-cyan-500/30 rounded-3xl relative overflow-hidden bg-[#0d111d] shadow-[0_0_50px_rgba(6,182,212,0.15)] cursor-grab active:cursor-grabbing touch-none select-none"
            >
              <div 
                id="palace-inner-bg"
                className="absolute w-[3344px] h-[1882px] bg-[url('/assets/palace-bg.jpg')] bg-cover bg-center bg-no-repeat"
                style={{ 
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${palaceZoom})`,
                  transformOrigin: '0 0'
                }}
              >
                <div id="palace-overlay" className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />

                {folders.map(folder => {
                  const folderNotes = notes.filter(n => n.folderId === folder.id);
                  return (
                    <div 
                      key={folder.id}
                      id={`folder-${folder.id}`}
                      onPointerDown={(e) => handleItemPointerDown(e, 'folder', folder)}
                      onPointerUp={(e) => handleItemPointerUp(e, 'folder', folder)}
                      style={{ left: `${folder.posX}px`, top: `${folder.posY}px`, touchAction: 'none' }} 
                      className="absolute z-10 p-2 cursor-pointer flex flex-col items-center group select-none hover:scale-105 transition-transform"
                    >
                      <Folder className="w-12 h-12 drop-shadow-[0_0_12px_rgba(0,229,255,0.7)]" style={{ color: folder.color || '#00e5ff' }} />
                      <span className="text-[11px] font-bold text-cyan-200 mt-1 drop-shadow bg-black/80 px-2 py-0.5 rounded-md whitespace-nowrap border border-cyan-500/20">{folder.name} ({folderNotes.length})</span>
                    </div>
                  );
                })}

                {notes.filter(n => !n.folderId).map(note => (
                  <div 
                    key={note.id}
                    id={`note-${note.id}`}
                    onPointerDown={(e) => handleItemPointerDown(e, 'note', note)}
                    onPointerUp={(e) => handleItemPointerUp(e, 'note', note)}
                    style={{ left: `${note.posX}px`, top: `${note.posY}px`, touchAction: 'none' }} 
                    className="arcana-parchment absolute z-10 px-3 py-1.5 w-max max-w-xs cursor-pointer group select-none flex items-center justify-center text-center shadow-md hover:border-cyan-300"
                  >
                    <h4 className="font-serif text-xs font-bold text-cyan-100 whitespace-nowrap truncate">
                      {note.title}
                    </h4>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {isTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#121624] border border-cyan-500/60 rounded-3xl p-6 max-w-md w-full relative shadow-2xl">
              <button onClick={() => setIsTaskModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
              <h3 className="text-lg font-bold mb-4">Nova Missão Arcana</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Título da atividade..." value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl p-3 text-xs text-white" />
                <textarea placeholder="Descrição..." value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} rows={3} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl p-3 text-xs text-white" />
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">Prazo Limite e Hora (Deadline)</label>
                  <input type="datetime-local" value={newTaskDueDate} onChange={e => setNewTaskDueDate(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl p-3 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-2">Convocados (Equipe)</label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {teamMembers.map(member => {
                      const cardObj = TAROT_CARDS.find(c => c.id === member.cardId);
                      const isSelected = selectedAssignedCards.includes(member.cardId);
                      return (
                        <button key={member.cardId} type="button" onClick={() => isSelected ? setSelectedAssignedCards(selectedAssignedCards.filter(id => id !== member.cardId)) : setSelectedAssignedCards([...selectedAssignedCards, member.cardId])} className={`p-2 rounded-xl text-left border text-xs flex items-center gap-2.5 transition ${isSelected ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#1a1f33] border-gray-700 text-gray-400'}`}>
                          {cardObj && <img src={cardObj.img} alt="" className="w-6 h-9 object-cover rounded-md flex-shrink-0 border border-cyan-500/30" />}
                          <div className="flex-1 overflow-hidden">
                            <strong className="block text-white truncate text-[11px]">{member.name}</strong>
                            <span className="text-[9px] text-gray-400 truncate block">{cardObj?.mas}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button onClick={handleCreateTask} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-xs text-white shadow">Criar Atividade</button>
              </div>
            </div>
          </div>
        )}

        {isNoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="arcana-parchment px-7 py-10 sm:px-10 max-w-md w-full relative shadow-2xl">
              <button onClick={() => setIsNoteModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
              <h3 className="text-xl font-serif font-bold mb-5 text-center text-cyan-100">Novo Pergaminho</h3>
              <input type="text" placeholder="Título..." value={newNoteTitle} onChange={e => setNewNoteTitle(e.target.value)} className="w-full bg-transparent border-b border-cyan-400/40 py-3 text-2xl font-serif font-bold text-center text-white mb-3 focus:outline-none" />
              <textarea placeholder="Escreva sua anotação..." value={newNoteContent} onChange={e => setNewNoteContent(e.target.value)} rows={5} className="w-full bg-transparent border-none p-3 text-sm font-serif text-slate-200 leading-[31px] mb-3 focus:outline-none" />
              <select value={newNoteFolder} onChange={e => setNewNoteFolder(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl p-3 text-xs text-white mb-4">
                <option value="">Deixar solto no Palácio</option>
                {folders.map(f => <option key={f.id} value={f.id}>Pasta: {f.name}</option>)}
              </select>
              <button onClick={handleCreateNote} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-xs text-white">Salvar no Palácio</button>
            </div>
          </div>
        )}

        {isFolderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#121624] border border-cyan-500/60 rounded-3xl p-6 max-w-sm w-full relative shadow-2xl">
              <button onClick={() => setIsFolderModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
              <h3 className="text-base font-bold mb-3">Criar Nova Pasta</h3>
              <input type="text" placeholder="Nome da pasta..." value={newFolderName} onChange={e => setNewFolderName(e.target.value)} className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl p-3 text-xs text-white mb-4" />
              <button onClick={handleCreateFolder} className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs">Criar Pasta</button>
            </div>
          </div>
        )}

        {selectedNoteDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="arcana-parchment px-6 py-8 sm:px-10 sm:py-10 max-w-2xl w-full relative space-y-4 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedNoteDetails(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white z-30"><X className="w-5 h-5" /></button>

              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#101722]/90 p-2.5 rounded-xl border border-cyan-500/30 text-xs z-30 relative">
                <div className="flex items-center gap-1.5 bg-[#1a2233] p-1 rounded-lg border border-gray-700">
                  <button
                    onClick={() => setEditMode('text')}
                    className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition ${editMode === 'text' ? 'bg-cyan-500 text-black shadow' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Type className="w-4 h-4" /> Digitar
                  </button>
                  <button
                    onClick={() => setEditMode('draw')}
                    className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition ${editMode === 'draw' ? 'bg-cyan-500 text-black shadow' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Edit3 className="w-4 h-4" /> Caneta
                  </button>
                </div>

                {editMode === 'draw' && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[ { size: 2, label: 'Fina' }, { size: 5, label: 'Média' }, { size: 9, label: 'Grossa' } ].map((item) => (
                        <button
                          key={item.size}
                          onClick={() => setPenThickness(item.size)}
                          className={`px-2 py-1 rounded-md text-[11px] font-bold transition ${penThickness === item.size ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 ml-1">
                      {[ '#00e5ff', '#ef4444', '#eab308' ].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPenColor(color)}
                          style={{ backgroundColor: color }}
                          className={`w-5 h-5 rounded-full border-2 transition ${penColor === color ? 'border-white scale-110' : 'border-transparent opacity-70'}`}
                        />
                      ))}
                    </div>

                    <button onClick={handleUndoDrawing} className="ml-1 p-1.5 rounded-lg bg-gray-800 text-cyan-300 hover:bg-gray-700 transition" title="Desfazer último traço">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button onClick={handleClearCanvas} className="p-1.5 rounded-lg bg-gray-800 text-gray-300 hover:text-red-400 transition" title="Limpar riscos">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative min-h-[300px] border border-cyan-500/20 rounded-xl p-4 bg-transparent overflow-hidden">
                <input 
                  type="text" 
                  value={editingNoteTitle} 
                  onChange={e => setEditingNoteTitle(e.target.value)} 
                  className="w-full bg-transparent border-b border-cyan-400/40 pb-3 text-2xl sm:text-3xl font-serif font-bold text-center text-[#f0ebdc] focus:border-cyan-400 transition relative z-10" 
                  placeholder="Título da Nota"
                />
                <textarea 
                  value={editingNoteContent} 
                  onChange={e => setEditingNoteContent(e.target.value)} 
                  rows={6} 
                  className="w-full bg-transparent border-none px-2 py-3 text-base font-serif text-slate-200 leading-[31px] focus:outline-none transition min-h-52 relative z-10" 
                  placeholder="Escreva sua anotação aqui..."
                />

                <canvas
                  ref={canvasRef}
                  width={600}
                  height={350}
                  onMouseDown={handleStartDrawing}
                  onMouseMove={handleDraw}
                  onMouseUp={handleStopDrawing}
                  onMouseLeave={handleStopDrawing}
                  onTouchStart={handleStartDrawing}
                  onTouchMove={handleDraw}
                  onTouchEnd={handleStopDrawing}
                  className={`absolute inset-0 w-full h-full z-20 touch-none transition-all ${editMode === 'draw' ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'}`}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button onClick={() => handleDeleteNote(selectedNoteDetails.id)} className="w-1/2 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold hover:bg-red-500/30 transition flex items-center justify-center gap-1.5">
                  <Trash2 className="w-4 h-4" /> Excluir Nota
                </button>
                <button onClick={handleSaveNoteEdit} className="w-1/2 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20">
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedFolderDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#121624] border border-cyan-500/60 rounded-3xl p-6 max-w-md w-full relative space-y-4">
              <button onClick={() => { setSelectedFolderDetails(null); setIsEditingFolder(false); }} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
              
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <Folder className="w-6 h-6" style={{ color: selectedFolderDetails.color || '#00e5ff' }} />
                  <h3 className="text-lg font-bold text-white">{selectedFolderDetails.name}</h3>
                </div>
                
                <button 
                  onClick={() => setIsEditingFolder(!isEditingFolder)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${isEditingFolder ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-gray-800 text-gray-300 border-gray-700 hover:text-white'}`}
                >
                  <Settings className="w-3.5 h-3.5" /> {isEditingFolder ? 'Ver Notas' : 'Editar Pasta'}
                </button>
              </div>

              {isEditingFolder ? (
                <div className="space-y-4 py-2">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">Nome da Pasta</label>
                    <input 
                      type="text" 
                      value={folderNameInput} 
                      onChange={e => setFolderNameInput(e.target.value)}
                      className="w-full bg-[#1a1f33] border border-gray-700 rounded-xl p-3 text-xs text-white focus:border-cyan-400 transition" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-2">Cor do Ícone</label>
                    <div className="flex items-center gap-2">
                      {FOLDER_COLORS.map(color => (
                        <button
                          key={color}
                          onClick={() => setFolderColorInput(color)}
                          style={{ backgroundColor: color }}
                          className={`w-7 h-7 rounded-full border-2 transition ${folderColorInput === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleDeleteFolder(selectedFolderDetails.id)} 
                      className="w-1/2 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold hover:bg-red-500/30 transition flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" /> Apagar Pasta
                    </button>
                    <button 
                      onClick={handleSaveFolderEdit} 
                      className="w-1/2 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition flex items-center justify-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Salvar Alterações
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notes.filter(n => n.folderId === selectedFolderDetails.id).length === 0 ? (
                    <p className="text-xs text-gray-500 italic">Pasta vazia. Arraste notas soltas para dentro desta pasta no Palácio.</p>
                  ) : (
                    notes.filter(n => n.folderId === selectedFolderDetails.id).map(n => (
                      <div key={n.id} className="p-3 bg-[#1a1f33] rounded-xl border border-gray-800 flex justify-between items-center gap-2">
                        <span onClick={() => { setSelectedFolderDetails(null); setSelectedNoteDetails(n); setEditingNoteTitle(n.title); setEditingNoteContent(n.content); setEditMode('text'); }} className="text-xs font-bold text-white cursor-pointer hover:text-cyan-400 truncate flex-1">{n.title}</span>
                        <button
                          onClick={() => {
                            const updated = notes.map(item => item.id === n.id ? { ...item, folderId: null } : item);
                            savePalaceNotes(updated);
                          }}
                          className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded-md border border-cyan-500/30"
                        >
                          Tirar da pasta
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}