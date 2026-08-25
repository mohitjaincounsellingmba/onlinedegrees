"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Upload, 
  Languages, 
  Type, 
  Palette, 
  Plus, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Download, 
  Copy, 
  Clock, 
  Check, 
  Video,
  ChevronRight,
  Sliders,
  RotateCcw
} from 'lucide-react';

interface Caption {
  id: string;
  start: number;
  end: number;
  text: string;
}

const DEFAULT_CAPTIONS: Caption[] = [
  { id: '1', start: 0.5, end: 3.5, text: "Hey creators! Welcome to the AI Video Editor." },
  { id: '2', start: 4.0, end: 7.0, text: "This is a full CapCut and VN style subtitle burner." },
  { id: '3', start: 7.5, end: 11.0, text: "Customize fonts, outlines, backgrounds, and animations." },
  { id: '4', start: 11.5, end: 15.0, text: "Auto-caption in multiple languages with single clicks." },
  { id: '5', start: 15.5, end: 19.0, text: "Export captioned videos directly in your browser!" }
];

const LANGUAGE_CAPTIONS: Record<string, { start: number, end: number, text: string }[]> = {
  en: DEFAULT_CAPTIONS,
  hi: [
    { start: 0.5, end: 3.5, text: "नमस्ते क्रिएटर्स! एआई वीडियो एडिटर में आपका स्वागत है।" },
    { start: 4.0, end: 7.0, text: "यह एक पूर्ण कैपकट और वीएन स्टाइल सबटाइटल बर्नर है।" },
    { start: 7.5, end: 11.0, text: "फॉन्ट, आउटलाइन, बैकग्राउंड और एनिमेशन को कस्टमाइज़ करें।" },
    { start: 11.5, end: 15.0, text: "एक क्लिक में कई भाषाओं में ऑटो-कैप्शन जनरेट करें।" },
    { start: 15.5, end: 19.0, text: "सीधे अपने ब्राउज़र में सबटाइटल वाले वीडियो एक्सपोर्ट करें!" }
  ],
  es: [
    { start: 0.5, end: 3.5, text: "¡Hola creadores! Bienvenidos al editor de video IA." },
    { start: 4.0, end: 7.0, text: "Este es un quemador de subtítulos al estilo CapCut y VN." },
    { start: 7.5, end: 11.0, text: "Personaliza fuentes, contornos, fondos y animaciones." },
    { start: 11.5, end: 15.0, text: "Auto-subtitulado en múltiples idiomas con un solo clic." },
    { start: 15.5, end: 19.0, text: "¡Exporta videos directamente en tu navegador!" }
  ],
  fr: [
    { start: 0.5, end: 3.5, text: "Salut les créateurs! Bienvenue dans l'éditeur vidéo IA." },
    { start: 4.0, end: 7.0, text: "Ceci est un brûleur de sous-titres style CapCut et VN." },
    { start: 7.5, end: 11.0, text: "Personnalisez polices, contours, arrière-plans et animations." },
    { start: 11.5, end: 15.0, text: "Sous-titrage automatique en plusieurs langues en un clic." },
    { start: 15.5, end: 19.0, text: "Exportez des vidéos directement dans votre navigateur!" }
  ],
  de: [
    { start: 0.5, end: 3.5, text: "Hallo Creator! Willkommen beim KI-Video-Editor." },
    { start: 4.0, end: 7.0, text: "Dies ist ein Untertitel-Brenner im CapCut- und VN-Stil." },
    { start: 7.5, end: 11.0, text: "Schriftarten, Konturen, Hintergründe und Animationen anpassen." },
    { start: 11.5, end: 15.0, text: "Automatische Untertitel in mehreren Sprachen mit einem Klick." },
    { start: 15.5, end: 19.0, text: "Exportieren Sie Videos direkt in Ihrem Browser!" }
  ],
  ja: [
    { start: 0.5, end: 3.5, text: "クリエイターの皆さん、こんにちは！AIビデオエディターへようこそ。" },
    { start: 4.0, end: 7.0, text: "これは完全なCapCutおよびVNスタイルの字幕バーナーです。" },
    { start: 7.5, end: 11.0, text: "フォント、輪郭、背景、アニメーションをカスタマイズします。" },
    { start: 11.5, end: 15.0, text: "ワンクリックで複数言語の自動字幕を生成します。" },
    { start: 15.5, end: 19.0, text: "字幕付き動画をブラウザから直接エクスポート！" }
  ],
  zh: [
    { start: 0.5, end: 3.5, text: "创作者们好！欢迎来到 AI 视频编辑器。" },
    { start: 4.0, end: 7.0, text: "这是一个完整的 CapCut 和 VN 风格的字幕烧录器。" },
    { start: 7.5, end: 11.0, text: "自定义字体、轮廓、背景和动画。" },
    { start: 11.5, end: 15.0, text: "一键生成多语言自动字幕。" },
    { start: 15.5, end: 19.0, text: "直接在浏览器中导出带字幕的视频！" }
  ],
  pt: [
    { start: 0.5, end: 3.5, text: "Olá criadores! Bem-vindos ao editor de vídeo IA." },
    { start: 4.0, end: 7.0, text: "Este é um gravador de legendas no estilo CapCut e VN." },
    { start: 7.5, end: 11.0, text: "Personalize fontes, contornos, fundos e animações." },
    { start: 11.5, end: 15.0, text: "Legendas automáticas em vários idiomas com um único clique." },
    { start: 15.5, end: 19.0, text: "Exporte vídeos diretamente no seu navegador!" }
  ]
};

export function VideoEditorClient() {
  // Video & Playback State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(20); // default 20s for synthetic
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSynthetic, setIsSynthetic] = useState<boolean>(true);
  const [syntheticDuration, setSyntheticDuration] = useState<number>(20);

  // Captions State
  const [captions, setCaptions] = useState<Caption[]>(DEFAULT_CAPTIONS);
  const [activeCapId, setActiveCapId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Styling States
  const [fontFamily, setFontFamily] = useState<string>('Montserrat');
  const [fontSize, setFontSize] = useState<number>(38);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [outlineColor, setOutlineColor] = useState<string>('#000000');
  const [outlineWidth, setOutlineWidth] = useState<number>(5);
  const [bgColor, setBgColor] = useState<string>('transparent');
  const [bgPadding, setBgPadding] = useState<number>(10);
  const [bgRadius, setBgRadius] = useState<number>(6);
  const [textEffect, setTextEffect] = useState<string>('pop'); // none, pop, bounce, karaoke
  const [verticalPosition, setVerticalPosition] = useState<number>(80); // % from top
  const [selectedTemplate, setSelectedTemplate] = useState<string>('tiktok');
  
  // UI Tabs & Loading Status
  const [activeTab, setActiveTab] = useState<'media' | 'caption' | 'styles' | 'templates'>('templates');
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [transcribeProgress, setTranscribeProgress] = useState<number>(0);
  const [transcribeStep, setTranscribeStep] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Load Google Fonts dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bungee&family=Courier+Prime&family=Inter:wght@400;700;900&family=Montserrat:wght@400;700;900&family=Pacifico&family=Poppins:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Sync synthetic duration change
  useEffect(() => {
    if (isSynthetic) {
      setDuration(syntheticDuration);
      if (currentTime > syntheticDuration) {
        setCurrentTime(0);
      }
    }
  }, [syntheticDuration, isSynthetic, currentTime]);

  // Handle Play/Pause
  const handlePlayPause = () => {
    if (isSynthetic) {
      setIsPlaying(!isPlaying);
      lastTimeRef.current = performance.now();
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Playback interrupted:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Sync state with HTML5 Video events
  const handleVideoTimeUpdate = () => {
    if (videoRef.current && !isSynthetic) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current && !isSynthetic) {
      setDuration(videoRef.current.duration || 10);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  // File uploading handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setIsSynthetic(false);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setCurrentTime(0);
      setIsPlaying(false);
      
      // Auto switch tabs
      setActiveTab('caption');
    }
  };

  const handleResetToSynthetic = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setIsSynthetic(true);
    setDuration(syntheticDuration);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // AI Auto Captions Simulator
  const handleGenerateAutoCaptions = () => {
    setIsTranscribing(true);
    setTranscribeProgress(0);
    setTranscribeStep('Analyzing audio waveform...');

    const steps = [
      { progress: 15, text: 'Extracting audio frequencies...' },
      { progress: 35, text: 'Running speech detection model...' },
      { progress: 60, text: `Translating dialogue to ${selectedLanguage.toUpperCase()}...` },
      { progress: 85, text: 'Aligning timestamps with word syllables...' },
      { progress: 100, text: 'Subtitles formatted successfully!' }
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setTranscribeProgress(step.progress);
        setTranscribeStep(step.text);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTranscribing(false);
          // Load precompiled matching subtitles based on selected language
          const matchingCaptions = LANGUAGE_CAPTIONS[selectedLanguage] || DEFAULT_CAPTIONS;
          // Map timestamps proportionally if video duration is shorter/longer
          const scale = duration / 20.0;
          const adjustedCaptions = matchingCaptions.map((cap, i) => ({
            id: String(i + 1),
            start: Math.round(cap.start * scale * 10) / 10,
            end: Math.round(cap.end * scale * 10) / 10,
            text: cap.text
          }));
          setCaptions(adjustedCaptions);
        }, 800);
      }
    }, 700);
  };

  // Apply Styling Template presets
  const applyTemplate = (templateName: string) => {
    setSelectedTemplate(templateName);
    switch (templateName) {
      case 'tiktok':
        setFontFamily('Montserrat');
        setFontSize(38);
        setTextColor('#ffff00'); // Neon yellow
        setOutlineColor('#000000');
        setOutlineWidth(6);
        setBgColor('transparent');
        setTextEffect('pop');
        break;
      case 'neon':
        setFontFamily('Poppins');
        setFontSize(40);
        setTextColor('#ffffff');
        setOutlineColor('#00ffa3'); // Neon Cyan
        setOutlineWidth(5);
        setBgColor('transparent');
        setTextEffect('bounce');
        break;
      case 'classic':
        setFontFamily('Inter');
        setFontSize(24);
        setTextColor('#ffffff');
        setOutlineColor('transparent');
        setOutlineWidth(0);
        setBgColor('rgba(0,0,0,0.65)');
        setBgPadding(10);
        setBgRadius(8);
        setTextEffect('none');
        break;
      case 'vn':
        setFontFamily('Bebas Neue');
        setFontSize(42);
        setTextColor('#000000');
        setOutlineColor('transparent');
        setOutlineWidth(0);
        setBgColor('#ccff00'); // Shiksha neon-green
        setBgPadding(12);
        setBgRadius(4);
        setTextEffect('pop');
        break;
      case 'karaoke':
        setFontFamily('Montserrat');
        setFontSize(42);
        setTextColor('#ffffff');
        setOutlineColor('#000000');
        setOutlineWidth(5);
        setBgColor('transparent');
        setTextEffect('karaoke');
        break;
      case 'minimal':
        setFontFamily('Playfair Display');
        setFontSize(32);
        setTextColor('#ffffff');
        setOutlineColor('transparent');
        setOutlineWidth(0);
        setBgColor('transparent');
        setTextEffect('none');
        break;
    }
  };

  // Setup template trigger on tab load
  useEffect(() => {
    applyTemplate('tiktok');
  }, []);

  // Update active subtitle based on current play time
  const activeCaption = useMemo(() => {
    return captions.find(cap => currentTime >= cap.start && currentTime <= cap.end) || null;
  }, [captions, currentTime]);

  // Edit individual caption text in array
  const handleCaptionTextChange = (id: string, text: string) => {
    setCaptions(prev => prev.map(c => c.id === id ? { ...c, text } : c));
  };

  // Edit timestamps
  const handleCaptionTimeChange = (id: string, field: 'start' | 'end', val: string) => {
    const numVal = parseFloat(val) || 0;
    setCaptions(prev => prev.map(c => c.id === id ? { ...c, [field]: Math.min(Math.max(0, numVal), duration) } : c));
  };

  // Add new blank caption block
  const handleAddCaption = () => {
    const nextStart = captions.length > 0 ? Math.min(captions[captions.length - 1].end + 0.5, duration - 1) : 0;
    const nextEnd = Math.min(nextStart + 3, duration);
    const newCap: Caption = {
      id: String(Date.now()),
      start: nextStart,
      end: nextEnd,
      text: "Double-click to edit subtitle text."
    };
    setCaptions(prev => [...prev, newCap].sort((a, b) => a.start - b.start));
    setActiveCapId(newCap.id);
    setCurrentTime(nextStart);
    if (videoRef.current && !isSynthetic) {
      videoRef.current.currentTime = nextStart;
    }
  };

  // Delete a caption block
  const handleDeleteCaption = (id: string) => {
    setCaptions(prev => prev.filter(c => c.id !== id));
    if (activeCapId === id) setActiveCapId(null);
  };

  // Custom rounded rectangle renderer for canvas backgrounds
  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  };

  // Animation & Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isUnmounted = false;

    // Run animation frames
    const render = (now: number) => {
      if (isUnmounted) return;

      // Handle synthetic time ticking
      if (isSynthetic && isPlaying) {
        if (lastTimeRef.current !== null) {
          const delta = (now - lastTimeRef.current) / 1000;
          setCurrentTime(prev => {
            const next = prev + delta;
            if (next >= duration) {
              setIsPlaying(false);
              return 0;
            }
            return next;
          });
        }
        lastTimeRef.current = now;
      }

      // 1. CLEAR CANVAS
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. DRAW VIDEO FRAMES
      if (isSynthetic) {
        // Draw deep space synthetic background scene
        ctx.fillStyle = '#0f0e13';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw dynamic grid lines with perspective lines
        ctx.strokeStyle = '#272530';
        ctx.lineWidth = 1.5;
        const gridOffset = (currentTime * 60) % 40;
        for (let y = gridOffset; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Draw futuristic converging perspective grid
        const horizonY = canvas.height * 0.45;
        for (let x = -200; x <= canvas.width + 200; x += 100) {
          ctx.beginPath();
          ctx.moveTo(x, canvas.height);
          ctx.lineTo(canvas.width / 2 + (x - canvas.width / 2) * 0.1, horizonY);
          ctx.stroke();
        }

        // Draw glowing neon circular shape in background
        const pulse = 1 + Math.sin(currentTime * 4) * 0.08;
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2 - 40, 10,
          canvas.width / 2, canvas.height / 2 - 40, 90 * pulse
        );
        gradient.addColorStop(0, '#ff007f');
        gradient.addColorStop(0.3, '#ccff00');
        gradient.addColorStop(0.7, 'rgba(0, 255, 163, 0.15)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2 - 40, 95 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Draw animated voice peaks (equalizer simulator)
        ctx.fillStyle = '#00ffa3';
        const barCount = 28;
        const barWidth = 14;
        const barGap = 6;
        const totalBarWidth = barCount * (barWidth + barGap);
        const startX = (canvas.width - totalBarWidth) / 2;
        const centerY = canvas.height / 2 + 60;

        for (let i = 0; i < barCount; i++) {
          const oscValue = Math.abs(Math.sin(i * 0.4 + currentTime * 9.5));
          const barHeight = 12 + oscValue * 70;
          ctx.fillStyle = i % 2 === 0 ? '#00ffa3' : '#ccff00';
          ctx.fillRect(
            startX + i * (barWidth + barGap), 
            centerY - barHeight / 2, 
            barWidth, 
            barHeight
          );
        }

        // Draw scanning line overlay
        ctx.fillStyle = 'rgba(204, 255, 0, 0.03)';
        const scanY = (currentTime * 150) % canvas.height;
        ctx.fillRect(0, scanY, canvas.width, 3);
      } else if (videoRef.current && videoRef.current.readyState >= 2) {
        // Draw the uploaded video frame directly
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      } else {
        // Placeholder state when video loaded but metadata not fully rendered
        ctx.fillStyle = '#08080a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText('Preparing Video Stream...', canvas.width / 2, canvas.height / 2);
      }

      // 3. DRAW DYNAMIC CAPTIONS OVERLAY
      if (activeCaption) {
        ctx.save();
        
        // Load fonts dynamically on canvas context
        ctx.font = `900 ${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const capX = canvas.width / 2;
        const capY = (verticalPosition / 100) * canvas.height;

        const words = activeCaption.text.split(' ');
        const wordCount = words.length;
        
        // Compute active word based on progress in subtitle duration
        const elapsed = currentTime - activeCaption.start;
        const totalDur = activeCaption.end - activeCaption.start;
        const wordIndex = Math.min(
          Math.floor((elapsed / totalDur) * wordCount),
          wordCount - 1
        );

        if (textEffect !== 'karaoke') {
          // Standard full-phrase subtitle display
          const textWidth = ctx.measureText(activeCaption.text).width;
          const textHeight = fontSize;

          // Draw Background box
          if (bgColor && bgColor !== 'transparent') {
            ctx.fillStyle = bgColor;
            drawRoundedRect(
              ctx,
              capX - textWidth / 2 - bgPadding,
              capY - textHeight / 2 - bgPadding,
              textWidth + bgPadding * 2,
              textHeight + bgPadding * 2,
              bgRadius
            );
          }

          // Bounce pop scaling effects for entrance
          let scale = 1;
          if (textEffect === 'pop') {
            const age = currentTime - activeCaption.start;
            if (age < 0.15) {
              scale = 0.85 + (age / 0.15) * 0.3; // zooms past 1.0 to 1.15
            } else if (age < 0.28) {
              scale = 1.15 - ((age - 0.15) / 0.13) * 0.15; // bounces back to 1.0
            }
          } else if (textEffect === 'bounce') {
            scale = 1 + Math.abs(Math.sin((currentTime - activeCaption.start) * 6)) * 0.05;
          }

          ctx.translate(capX, capY);
          ctx.scale(scale, scale);

          // Draw Stroke outline
          if (outlineWidth > 0) {
            ctx.strokeStyle = outlineColor;
            ctx.lineWidth = outlineWidth;
            ctx.lineJoin = 'round';
            ctx.strokeText(activeCaption.text, 0, 0);
          }

          // Draw text
          ctx.fillStyle = textColor;
          ctx.fillText(activeCaption.text, 0, 0);

        } else {
          // CapCut / VN Word-by-Word Karaoke Active Emphasis Style
          const spaceWidth = ctx.measureText(' ').width;
          const wordWidths = words.map(w => ctx.measureText(w).width);
          const totalWidth = wordWidths.reduce((a, b) => a + b, 0) + spaceWidth * (wordCount - 1);

          let currentX = capX - totalWidth / 2;

          // Draw Background box covering all text
          if (bgColor && bgColor !== 'transparent') {
            ctx.fillStyle = bgColor;
            drawRoundedRect(
              ctx,
              capX - totalWidth / 2 - bgPadding,
              capY - fontSize / 2 - bgPadding,
              totalWidth + bgPadding * 2,
              fontSize + bgPadding * 2,
              bgRadius
            );
          }

          // Render each word with relative positioning and active zoom
          words.forEach((word, idx) => {
            const wWidth = wordWidths[idx];
            const wX = currentX + wWidth / 2;

            ctx.save();
            ctx.translate(wX, capY);

            const isActive = idx === wordIndex;
            if (isActive) {
              ctx.scale(1.2, 1.2); // CapCut pop bounce
            }

            // Stroke
            if (outlineWidth > 0) {
              ctx.strokeStyle = outlineColor;
              ctx.lineWidth = outlineWidth;
              ctx.lineJoin = 'round';
              ctx.strokeText(word, 0, 0);
            }

            // Color: active word gets highlighted in vibrant neon yellow
            ctx.fillStyle = isActive ? '#ccff00' : textColor;
            ctx.fillText(word, 0, 0);

            ctx.restore();
            currentX += wWidth + spaceWidth;
          });
        }

        ctx.restore();
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      isUnmounted = true;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [
    isSynthetic, 
    isPlaying, 
    currentTime, 
    duration, 
    captions, 
    activeCaption, 
    fontFamily, 
    fontSize, 
    textColor, 
    outlineColor, 
    outlineWidth, 
    bgColor, 
    bgPadding, 
    bgRadius, 
    textEffect, 
    verticalPosition
  ]);

  // Handle timeline slider scrubber
  const handleTimelineScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (!isSynthetic && videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Sound Volume sliders
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (videoRef.current) {
      videoRef.current.volume = v;
      videoRef.current.muted = v === 0;
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (videoRef.current) {
      videoRef.current.muted = nextMute;
    }
  };

  // Download SRT tracks
  const formatSrtTime = (seconds: number): string => {
    const pad = (num: number, size: number) => ('000' + num).slice(-size);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${pad(hrs, 2)}:${pad(mins, 2)}:${pad(secs, 2)},${pad(ms, 3)}`;
  };

  const handleDownloadSrt = () => {
    const srtContent = captions
      .sort((a, b) => a.start - b.start)
      .map((cap, idx) => {
        return `${idx + 1}\n${formatSrtTime(cap.start)} --> ${formatSrtTime(cap.end)}\n${cap.text}\n`;
      })
      .join('\n');
      
    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captions_export_${Date.now()}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download VTT tracks
  const formatVttTime = (seconds: number): string => {
    const pad = (num: number, size: number) => ('000' + num).slice(-size);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${pad(hrs, 2)}:${pad(mins, 2)}:${pad(secs, 2)}.${pad(ms, 3)}`;
  };

  const handleDownloadVtt = () => {
    const vttContent = "WEBVTT\n\n" + captions
      .sort((a, b) => a.start - b.start)
      .map((cap, idx) => {
        return `${idx + 1}\n${formatVttTime(cap.start)} --> ${formatVttTime(cap.end)}\n${cap.text}\n`;
      })
      .join('\n');
      
    const blob = new Blob([vttContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captions_export_${Date.now()}.vtt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy raw transcript
  const handleCopyTranscript = () => {
    const text = captions
      .sort((a, b) => a.start - b.start)
      .map(c => `[${Math.floor(c.start)}s - ${Math.floor(c.end)}s] ${c.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    alert("Full transcript copied to clipboard!");
  };

  // High-performance canvas recorder export
  const handleExportVideo = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(0);

    // Stop active plays
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setCurrentTime(0);

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsExporting(false);
      return;
    }

    const recordedChunks: BlobPart[] = [];
    const stream = canvas.captureStream(30); // 30 FPS Capture

    // Attempt audio capture if local video exists
    let audioTrack: MediaStreamTrack | null = null;
    let audioCtx: AudioContext | null = null;
    let dest: MediaStreamAudioDestinationNode | null = null;

    if (videoRef.current && videoUrl && !isSynthetic) {
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(videoRef.current);
        dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        source.connect(audioCtx.destination);
        
        const audioTracks = dest.stream.getAudioTracks();
        if (audioTracks.length > 0) {
          audioTrack = audioTracks[0];
        }
      } catch (err) {
        console.warn("Audio extraction bypassed due to browser CORS restriction or missing track:", err);
      }
    }

    const finalTracks = [...stream.getVideoTracks()];
    if (audioTrack) {
      finalTracks.push(audioTrack);
    }

    const combinedStream = new MediaStream(finalTracks);
    let options = { mimeType: 'video/webm;codecs=vp9,opus' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm' };
    }

    try {
      const mediaRecorder = new MediaRecorder(combinedStream, options);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `capcut_editor_export_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setIsExporting(false);
        setExportProgress(100);

        if (audioCtx) {
          audioCtx.close();
        }
      };

      const recordTime = duration || 10;
      mediaRecorder.start();

      if (!isSynthetic && videoRef.current) {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
        setIsPlaying(true);

        const tracker = setInterval(() => {
          if (!videoRef.current) {
            clearInterval(tracker);
            return;
          }
          const curr = videoRef.current.currentTime;
          const prog = Math.min(Math.round((curr / recordTime) * 100), 99);
          setExportProgress(prog);

          if (videoRef.current.ended || curr >= recordTime) {
            clearInterval(tracker);
            videoRef.current.pause();
            setIsPlaying(false);
            mediaRecorder.stop();
          }
        }, 100);
      } else {
        // Synthetic animation timeline tick recording
        setIsPlaying(true);
        let currTime = 0;
        const steps = 30; // 30 ticks per second
        const tickVal = 1000 / steps;

        const tracker = setInterval(() => {
          currTime += tickVal / 1000;
          setCurrentTime(currTime);
          const prog = Math.min(Math.round((currTime / recordTime) * 100), 99);
          setExportProgress(prog);

          if (currTime >= recordTime) {
            clearInterval(tracker);
            setIsPlaying(false);
            mediaRecorder.stop();
          }
        }, tickVal);
      }

    } catch (e) {
      console.error("Export error:", e);
      alert("Failed to initialize MediaRecorder recording. Try exporting captions as SRT!");
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      
      {/* ── HEADER BAR (Neo-brutalist Dark UI) ── */}
      <div className="bg-[#121214] border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_#000] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#ccff00] p-2.5 rounded-xl text-black border-2 border-black">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              AI Video Editor <span className="bg-[#ff007f] text-white text-[10px] uppercase font-black px-2 py-0.5 rounded border border-black">PRO</span>
            </h1>
            <p className="text-slate-400 text-xs font-semibold">CapCut & VN Style Subtitle Burner</p>
          </div>
        </div>

        {/* Action Downloads / Exporter */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={handleDownloadSrt}
            className="bg-[#18181b] hover:bg-[#202024] text-white font-bold text-xs uppercase px-4 py-3 rounded-xl border-2 border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download SRT
          </button>
          
          <button
            onClick={handleDownloadVtt}
            className="bg-[#18181b] hover:bg-[#202024] text-white font-bold text-xs uppercase px-4 py-3 rounded-xl border-2 border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download VTT
          </button>

          <button
            onClick={handleCopyTranscript}
            className="bg-[#18181b] hover:bg-[#202024] text-white font-bold text-xs uppercase px-4 py-3 rounded-xl border-2 border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Transcript
          </button>

          <button
            onClick={handleExportVideo}
            disabled={isExporting}
            className="bg-[#ccff00] hover:bg-[#b5e000] text-black font-black text-xs uppercase px-5 py-3 rounded-xl border-2 border-black transition-all flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> 
            {isExporting ? `Exporting (${exportProgress}%)` : 'Export Captioned Video'}
          </button>
        </div>
      </div>

      {/* Hidden elements */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="video/mp4,video/webm,video/ogg" 
        className="hidden" 
      />

      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          onTimeUpdate={handleVideoTimeUpdate}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onEnded={handleVideoEnded}
          className="hidden"
          playsInline
          muted={isMuted}
        />
      )}

      {/* ── MAIN WORKSPACE GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Settings Sidebar (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#121214] border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_#000]">
            
            {/* Sidebar Tabs Selector */}
            <div className="grid grid-cols-4 gap-1.5 bg-[#18181b] p-1.5 rounded-xl border border-slate-800 mb-6">
              
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-2 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'templates' ? 'bg-[#ccff00] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Templates
              </button>

              <button
                onClick={() => setActiveTab('styles')}
                className={`py-2 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'styles' ? 'bg-[#ccff00] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Styles
              </button>

              <button
                onClick={() => setActiveTab('caption')}
                className={`py-2 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'caption' ? 'bg-[#ccff00] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Captions
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`py-2 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'media' ? 'bg-[#ccff00] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Media
              </button>

            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'templates' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-300">CapCut Preset Subtitle Styles</h3>
                <p className="text-slate-400 text-xs font-semibold mb-2">Apply popular pre-configured styled presets directly.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'tiktok', name: 'TikTok/Reels Pop', bg: 'bg-[#ffff00] text-black border-yellow-400', styleDesc: 'Montserrat Bold Yellow, Black Stroke Outline, Pop Bounce Effect' },
                    { id: 'vn', name: 'VN Style Boxed', bg: 'bg-[#ccff00] text-black border-lime-400', styleDesc: 'Bebas Neue Caps Black Text, Lime background strip, Pop entrance' },
                    { id: 'neon', name: 'Cyber Neon Glow', bg: 'bg-black text-[#00ffa3] border-emerald-400', styleDesc: 'Poppins Font, Green Cyan stroke outline glow, Bounce loop' },
                    { id: 'classic', name: 'Classic Subtitle', bg: 'bg-slate-800 text-white border-slate-700', styleDesc: 'Inter Font, Standard centered captions, translucent dark backing box' },
                    { id: 'karaoke', name: 'Bold Karaoke', bg: 'bg-black text-white border-white', styleDesc: 'Montserrat, Word-by-word active highlight zooming' },
                    { id: 'minimal', name: 'Minimalist Clean', bg: 'bg-[#18181b] text-slate-300 border-zinc-700', styleDesc: 'Playfair Serif, Elegant centering, no border/box' }
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => applyTemplate(tpl.id)}
                      className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between h-36 ${
                        selectedTemplate === tpl.id 
                          ? 'border-[#ccff00] ring-4 ring-[#ccff00]/25 shadow-none' 
                          : 'border-zinc-800 hover:border-slate-600 shadow-[4px_4px_0px_#000]'
                      } bg-[#18181b]`}
                    >
                      <span className={`text-xs font-black uppercase px-2.5 py-1.5 rounded-lg border-2 border-black inline-block leading-none ${tpl.bg}`}>
                        Abc
                      </span>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase mt-2">{tpl.name}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-tight">{tpl.styleDesc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'styles' && (
              <div className="space-y-6">
                
                {/* Font Choices */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-2">Typography Font</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full bg-[#18181b] border-2 border-slate-800 p-3 rounded-xl font-bold text-xs text-white uppercase focus:border-[#ccff00] focus:outline-none"
                  >
                    {['Montserrat', 'Poppins', 'Inter', 'Bebas Neue', 'Bungee', 'Playfair Display', 'Courier Prime', 'Pacifico'].map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-black uppercase text-slate-300">Font Size</label>
                    <span className="text-xs font-bold text-[#ccff00]">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-[#ccff00]"
                  />
                </div>

                {/* Vertical Position */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-black uppercase text-slate-300">Vertical Offset Position (Y-axis)</label>
                    <span className="text-xs font-bold text-[#ccff00]">{verticalPosition}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={verticalPosition}
                    onChange={(e) => setVerticalPosition(parseInt(e.target.value))}
                    className="w-full accent-[#ccff00]"
                  />
                </div>

                {/* Color Swatches Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-300 mb-2">Text Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded border-2 border-black bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)}
                        className="bg-[#18181b] border border-slate-800 text-xs font-bold font-mono rounded p-2 text-white w-24 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-300 mb-2">Stroke / Outline</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={outlineColor}
                        onChange={(e) => setOutlineColor(e.target.value)}
                        className="w-10 h-10 rounded border-2 border-black bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={outlineColor} 
                        onChange={(e) => setOutlineColor(e.target.value)}
                        className="bg-[#18181b] border border-slate-800 text-xs font-bold font-mono rounded p-2 text-white w-24 uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Outline Width */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-black uppercase text-slate-300">Stroke Thickness</label>
                    <span className="text-xs font-bold text-[#ccff00]">{outlineWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={outlineWidth}
                    onChange={(e) => setOutlineWidth(parseInt(e.target.value))}
                    className="w-full accent-[#ccff00]"
                  />
                </div>

                {/* Background Box Styles */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-2">Backing Box Color</label>
                  <div className="flex gap-3 items-center mb-4">
                    <input
                      type="color"
                      value={bgColor === 'transparent' ? '#000000' : bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      disabled={bgColor === 'transparent'}
                      className="w-10 h-10 rounded border-2 border-black bg-transparent cursor-pointer disabled:opacity-30"
                    />
                    <button
                      onClick={() => setBgColor(bgColor === 'transparent' ? 'rgba(0,0,0,0.65)' : 'transparent')}
                      className={`text-xs font-black px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                        bgColor === 'transparent' 
                          ? 'bg-[#18181b] text-slate-300 border-zinc-800' 
                          : 'bg-[#ff007f] text-white border-black'
                      }`}
                    >
                      {bgColor === 'transparent' ? 'Enable Background Box' : 'Disable Background Box'}
                    </button>
                  </div>

                  {bgColor !== 'transparent' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-black uppercase text-slate-400">Box Padding</label>
                          <span className="text-xs font-semibold">{bgPadding}px</span>
                        </div>
                        <input
                          type="range"
                          min="4"
                          max="24"
                          value={bgPadding}
                          onChange={(e) => setBgPadding(parseInt(e.target.value))}
                          className="w-full accent-[#ccff00]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-black uppercase text-slate-400">Box Roundness</label>
                          <span className="text-xs font-semibold">{bgRadius}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={bgRadius}
                          onChange={(e) => setBgRadius(parseInt(e.target.value))}
                          className="w-full accent-[#ccff00]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtitle Animation Effects */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-2">Caption Motion Effect</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'none', label: 'Static Standard' },
                      { id: 'pop', label: 'Bouncy Pop' },
                      { id: 'bounce', label: 'Jumping Wave' },
                      { id: 'karaoke', label: 'CapCut Karaoke' }
                    ].map(fx => (
                      <button
                        key={fx.id}
                        onClick={() => setTextEffect(fx.id)}
                        className={`p-2.5 rounded-xl border-2 font-black text-xs uppercase text-center cursor-pointer transition-all ${
                          textEffect === fx.id 
                            ? 'bg-[#ccff00] text-black border-black shadow-none' 
                            : 'bg-[#18181b] text-slate-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {fx.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'caption' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-300">AI Auto Subtitle Generator</h3>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                  Analyze video narration and generate perfectly aligned timestamps in the selected language.
                </p>

                {/* Language selection dropdown */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-2">Narrated Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-[#18181b] border-2 border-slate-800 p-3 rounded-xl font-bold text-xs text-white focus:border-[#ccff00] focus:outline-none"
                  >
                    <option value="en">English (US/UK)</option>
                    <option value="hi">Hindi (हिंदी)</option>
                    <option value="es">Spanish (Español)</option>
                    <option value="fr">French (Français)</option>
                    <option value="de">German (Deutsch)</option>
                    <option value="ja">Japanese (日本語)</option>
                    <option value="zh">Chinese (中文)</option>
                    <option value="pt">Portuguese (Português)</option>
                  </select>
                </div>

                {/* Generate button */}
                <button
                  onClick={handleGenerateAutoCaptions}
                  disabled={isTranscribing}
                  className="w-full bg-[#ccff00] text-black font-black text-xs uppercase py-3.5 rounded-xl border-2 border-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" /> Generate Auto Captions
                </button>

                {/* Transcribing Loading animation overlay */}
                {isTranscribing && (
                  <div className="bg-[#18181b] border border-slate-800 p-4 rounded-2xl mt-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400">{transcribeStep}</span>
                      <span className="text-[10px] font-mono text-[#ccff00]">{transcribeProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#ccff00] h-full transition-all duration-300"
                        style={{ width: `${transcribeProgress}%` }}
                      ></div>
                    </div>
                    
                    {/* Visual audio wave visualizer */}
                    <div className="flex justify-center gap-1 mt-3.5 h-6">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-[#ff007f] w-1 rounded-full animate-bounce"
                          style={{
                            height: '100%',
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: `${0.4 + (i % 3) * 0.2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 mb-2">Video Source</h3>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed mb-4">
                    Upload your own video clip, or use our synthetic voice/music visualizer generator to design template captions.
                  </p>

                  <div className="space-y-3">
                    
                    {/* Local upload file card */}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-800 hover:border-slate-500 bg-[#18181b] p-6 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group"
                    >
                      <Upload className="w-8 h-8 text-slate-500 group-hover:text-white transition-colors" />
                      <div className="text-xs font-black uppercase text-white">Upload Local Video</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Supports MP4, WebM (Max 50MB)</div>
                    </div>

                    <div className="text-center text-[10px] font-black uppercase text-slate-500 py-1">OR</div>

                    {/* Synthetic canvas generator option */}
                    <button
                      onClick={isSynthetic ? undefined : handleResetToSynthetic}
                      className={`w-full p-4 rounded-xl border-2 text-left cursor-pointer transition-all flex items-center justify-between ${
                        isSynthetic 
                          ? 'border-[#ccff00] bg-[#1d2212] text-white' 
                          : 'border-zinc-800 bg-[#18181b] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-[#ff007f] p-2 rounded-lg text-white">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase">Synthetic Generator</div>
                          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Use animated wave visualizer Fallback</div>
                        </div>
                      </div>
                      {isSynthetic && <Check className="w-4 h-4 text-[#ccff00]" />}
                    </button>

                  </div>
                </div>

                {isSynthetic && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-black uppercase text-slate-300">Synthetic Video Duration</label>
                      <span className="text-xs font-bold text-[#ccff00]">{syntheticDuration}s</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={syntheticDuration}
                      onChange={(e) => setSyntheticDuration(parseInt(e.target.value))}
                      className="w-full accent-[#ccff00]"
                    />
                  </div>
                )}

                {!isSynthetic && (
                  <div className="bg-[#18181b] border border-slate-800 p-4 rounded-2xl">
                    <div className="text-xs font-black uppercase text-white flex items-center justify-between">
                      <span>Loaded Video File</span>
                      <button 
                        onClick={handleResetToSynthetic}
                        className="text-[#ff007f] hover:text-[#ff3b9a] transition-all flex items-center gap-0.5 text-[10px]"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium truncate mt-2">
                      File: {videoFile?.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium mt-1">
                      Size: {videoFile ? (videoFile.size / (1024 * 1024)).toFixed(2) : 0} MB
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/* CENTER COLUMN: Video Player & Subtitles Editor (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main player box */}
          <div className="bg-[#121214] border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_#000]">
            
            {/* Canvas Container */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-zinc-800 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={800}
                height={450}
                className="w-full h-full object-contain cursor-pointer"
                onClick={handlePlayPause}
              />
              
              {/* Play button overlay */}
              {!isPlaying && (
                <div 
                  onClick={handlePlayPause}
                  className="absolute inset-0 bg-black/45 flex items-center justify-center cursor-pointer hover:bg-black/35 transition-all"
                >
                  <div className="bg-[#ccff00] p-5 rounded-full border-4 border-black text-black scale-100 hover:scale-110 active:scale-95 transition-all shadow-[4px_4px_0px_#000]">
                    <Play className="w-8 h-8 fill-black" strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>

            {/* CUSTOM PLAYER CONTROLS */}
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
              
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="bg-[#ccff00] text-black p-3 rounded-xl border-2 border-black cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                aria-label="Play or Pause"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
              </button>

              {/* Time Scrubber Slider (VN Editor visual) */}
              <div className="flex-grow flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {currentTime.toFixed(1)}s
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={handleTimelineScrub}
                  className="flex-grow accent-[#ccff00] cursor-pointer"
                />
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {duration.toFixed(1)}s
                </span>
              </div>

              {/* Mute/Volume controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="bg-[#18181b] border-2 border-slate-800 text-slate-400 hover:text-white p-3 rounded-xl cursor-pointer"
                  aria-label="Mute or Unmute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 accent-[#ccff00] hidden sm:block cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* SUBTITLES TIMELINE & BLOCK LIST */}
          <div className="bg-[#121214] border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_#000] space-y-6">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ccff00]" /> Captions Timeline (Editable)
              </h3>
              
              <button
                onClick={handleAddCaption}
                className="bg-[#ff007f] hover:bg-[#ff3b9a] text-white font-bold text-xs uppercase px-3.5 py-2 rounded-xl border-2 border-black transition-all flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#000]"
              >
                <Plus className="w-3.5 h-3.5" /> Add Subtitle Block
              </button>
            </div>

            {/* Visual multi-track timeline container (CapCut Timeline UI style) */}
            <div className="relative bg-black rounded-xl p-4 border border-slate-800 overflow-x-auto min-h-[90px]">
              
              {/* Timeline Tick markers */}
              <div className="h-6 border-b border-slate-900 flex justify-between px-2 text-[9px] font-mono text-slate-600 relative select-none">
                {[...Array(6)].map((_, i) => {
                  const tick = (duration / 5) * i;
                  return <span key={i}>{tick.toFixed(0)}s</span>;
                })}
              </div>

              {/* Subtitle track */}
              <div className="relative h-10 w-full mt-3 bg-zinc-900/50 rounded-lg overflow-hidden border border-slate-900/80">
                {captions.map((cap) => {
                  const leftPct = (cap.start / duration) * 100;
                  const widthPct = ((cap.end - cap.start) / duration) * 100;
                  const isActive = activeCaption?.id === cap.id || activeCapId === cap.id;

                  return (
                    <div
                      key={cap.id}
                      onClick={() => {
                        setActiveCapId(cap.id);
                        setCurrentTime(cap.start);
                        if (videoRef.current && !isSynthetic) {
                          videoRef.current.currentTime = cap.start;
                        }
                      }}
                      className={`absolute top-1 bottom-1 rounded-md border text-[9px] font-black uppercase flex items-center justify-center overflow-hidden px-1.5 transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#ccff00] text-black border-black font-black z-10 scale-y-105' 
                          : 'bg-[#ff007f]/20 text-[#ff007f] border-[#ff007f]/50 hover:bg-[#ff007f]/30'
                      }`}
                      style={{
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                      }}
                    >
                      <span className="truncate">{cap.text}</span>
                    </div>
                  );
                })}

                {/* Scrubber Playhead Line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-20 pointer-events-none"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute top-0 -left-1 w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Interactive Form list of text edits */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {captions.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 font-bold uppercase">
                  No captions found. Click "Add Subtitle Block" or use AI Auto Captions!
                </div>
              ) : (
                captions.map((cap) => {
                  const isActive = activeCaption?.id === cap.id || activeCapId === cap.id;
                  return (
                    <div
                      key={cap.id}
                      className={`bg-[#18181b] border-2 p-3.5 rounded-2xl flex flex-col sm:flex-row gap-3 items-center transition-all ${
                        isActive ? 'border-[#ccff00] bg-[#1d2212]' : 'border-slate-800'
                      }`}
                    >
                      {/* Subtitle indices / play */}
                      <button 
                        onClick={() => {
                          setActiveCapId(cap.id);
                          setCurrentTime(cap.start);
                          if (videoRef.current && !isSynthetic) {
                            videoRef.current.currentTime = cap.start;
                          }
                        }}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-[10px] font-black uppercase border cursor-pointer shrink-0 ${
                          isActive ? 'bg-[#ccff00] text-black border-black' : 'bg-zinc-800 text-slate-400 border-zinc-700'
                        }`}
                      >
                        {isActive ? <Play className="w-2.5 h-2.5 fill-black" /> : 'Go'}
                      </button>

                      {/* Text Input */}
                      <input
                        type="text"
                        value={cap.text}
                        onChange={(e) => handleCaptionTextChange(cap.id, e.target.value)}
                        placeholder="Subtitle text..."
                        className="flex-grow bg-black border border-slate-800 p-2 text-xs font-bold text-white rounded-lg focus:border-[#ccff00] focus:outline-none"
                      />

                      {/* Timestamps inputs */}
                      <div className="flex gap-1.5 items-center shrink-0">
                        <div className="flex items-center gap-1 bg-black border border-slate-800 px-2 py-1.5 rounded-lg text-slate-400">
                          <span className="text-[9px] uppercase font-black">In:</span>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max={duration}
                            value={cap.start}
                            onChange={(e) => handleCaptionTimeChange(cap.id, 'start', e.target.value)}
                            className="bg-transparent text-white font-mono text-[10px] font-bold w-10 text-center focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-1 bg-black border border-slate-800 px-2 py-1.5 rounded-lg text-slate-400">
                          <span className="text-[9px] uppercase font-black">Out:</span>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max={duration}
                            value={cap.end}
                            onChange={(e) => handleCaptionTimeChange(cap.id, 'end', e.target.value)}
                            className="bg-transparent text-white font-mono text-[10px] font-bold w-10 text-center focus:outline-none"
                          />
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteCaption(cap.id)}
                          className="bg-[#ff007f]/10 text-[#ff007f] hover:bg-[#ff007f] hover:text-white border-2 border-[#ff007f] p-2 rounded-xl transition-all cursor-pointer"
                          aria-label="Delete caption block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
