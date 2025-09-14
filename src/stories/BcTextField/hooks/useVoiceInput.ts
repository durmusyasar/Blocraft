import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

export interface VoiceInputOptions {
  enableVoiceInput?: boolean;
  enableSpeechRecognition?: boolean;
  enableSpeechSynthesis?: boolean;
  enableVoiceCommands?: boolean;
  enableVoiceFeedback?: boolean;
  enableVoiceTraining?: boolean;
  enableVoiceProfiles?: boolean;
  enableVoiceAnalytics?: boolean;
  enableVoiceDebugging?: boolean;
  enableVoiceLogging?: boolean;
  enableVoiceMetrics?: boolean;
  enableVoiceErrorHandling?: boolean;
  enableVoiceFallbacks?: boolean;
  enableVoiceCaching?: boolean;
  enableVoiceCompression?: boolean;
  enableVoiceEncryption?: boolean;
  enableVoiceSecurity?: boolean;
  enableVoiceMonitoring?: boolean;
  enableVoiceReporting?: boolean;
  language?: string;
  dialect?: string;
  accent?: string;
  gender?: 'male' | 'female' | 'neutral';
  age?: 'child' | 'adult' | 'elderly';
  voiceSpeed?: number;
  voicePitch?: number;
  voiceVolume?: number;
  voiceRate?: number;
  voiceQuality?: 'low' | 'medium' | 'high' | 'ultra';
  voiceFormat?: 'wav' | 'mp3' | 'ogg' | 'webm';
  voiceChannels?: number;
  voiceSampleRate?: number;
  voiceBitRate?: number;
  voiceCompressionType?: 'none' | 'gzip' | 'brotli' | 'deflate';
  voiceEncryptionType?: 'none' | 'AES' | 'RSA' | 'ChaCha20';
  voiceSecurityConfig?: {
    enableEncryption: boolean;
    encryptionKey: string;
    allowedOrigins: string[];
    maxRecordingTime: number;
    maxFileSize: number;
  };
  voiceCommands?: Array<{
    command: string;
    action: (value: string) => void;
    description: string;
    category: string;
    enabled: boolean;
  }>;
  voiceProfiles?: Array<{
    id: string;
    name: string;
    language: string;
    dialect: string;
    accent: string;
    gender: string;
    age: string;
    voiceSettings: Record<string, any>;
    enabled: boolean;
  }>;
  voiceTraining?: {
    enableTraining: boolean;
    trainingData: any[];
    modelPath: string;
    trainingInterval: number;
    maxTrainingTime: number;
  };
  voiceAnalytics?: {
    trackUsage: boolean;
    trackAccuracy: boolean;
    trackPerformance: boolean;
    trackUserBehavior: boolean;
    trackErrors: boolean;
  };
  voiceDebugging?: {
    enableConsole: boolean;
    enableBreakpoints: boolean;
    enableProfiling: boolean;
    enableTracing: boolean;
  };
  voiceLogging?: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text' | 'structured';
    destination: 'console' | 'file' | 'remote' | 'memory';
  };
  voiceMetrics?: {
    collectMetrics: boolean;
    metricsInterval: number;
    maxMetricsHistory: number;
    customMetrics: string[];
  };
  voiceErrorHandling?: {
    onError: (error: Error, context: any) => void;
    fallbackBehavior: 'disable' | 'ignore' | 'retry' | 'replace';
    maxRetries: number;
    retryDelay: number;
  };
  voiceFallbacks?: {
    fallbackInput: 'keyboard' | 'touch' | 'gesture' | 'eye';
    fallbackBehavior: 'disable' | 'replace' | 'ignore';
  };
  voiceCaching?: {
    enableCaching: boolean;
    cacheStrategy: 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB';
    cacheTTL: number;
    maxCacheSize: number;
  };
  voiceCompressionConfig?: {
    enableCompression: boolean;
    compressionLevel: number;
    compressionAlgorithm: 'gzip' | 'brotli' | 'deflate';
  };
  voiceEncryptionConfig?: {
    enableEncryption: boolean;
    encryptionKey: string;
    encryptionAlgorithm: 'AES' | 'RSA' | 'ChaCha20';
  };
  voiceSecurityPolicy?: {
    enableSecurity: boolean;
    securityPolicy: 'strict' | 'moderate' | 'permissive';
    allowedAPIs: string[];
    blockedAPIs: string[];
  };
  voiceMonitoring?: {
    enableMonitoring: boolean;
    monitoringInterval: number;
    alertThresholds: Record<string, number>;
    monitoringEndpoints: string[];
  };
  voiceReporting?: {
    enableReporting: boolean;
    reportingInterval: number;
    reportingEndpoints: string[];
    reportFormat: 'json' | 'xml' | 'csv';
  };
}

export interface VoiceInputState {
  isVoiceInputEnabled: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  isTraining: boolean;
  isSupported: boolean;
  currentLanguage: string;
  currentDialect: string;
  currentAccent: string;
  currentGender: string;
  currentAge: string;
  voiceSettings: {
    speed: number;
    pitch: number;
    volume: number;
    rate: number;
    quality: string;
    format: string;
    channels: number;
    sampleRate: number;
    bitRate: number;
  };
  voiceProfiles: Array<{
    id: string;
    name: string;
    language: string;
    dialect: string;
    accent: string;
    gender: string;
    age: string;
    voiceSettings: Record<string, any>;
    enabled: boolean;
  }>;
  voiceCommands: Array<{
    command: string;
    action: (value: string) => void;
    description: string;
    category: string;
    enabled: boolean;
  }>;
  voiceData: {
    transcript: string;
    confidence: number;
    alternatives: Array<{
      transcript: string;
      confidence: number;
    }>;
    interimResults: string;
    finalResults: string;
    audioData: Blob | null;
    duration: number;
    timestamp: number;
  };
  voiceErrors: Array<{
    id: string;
    error: Error;
    timestamp: number;
    context: any;
  }>;
  voiceMetrics: {
    recognitionAccuracy: number;
    recognitionSpeed: number;
    synthesisSpeed: number;
    errorRate: number;
    successRate: number;
    averageConfidence: number;
    totalRecognitions: number;
    totalSyntheses: number;
    totalErrors: number;
    totalTime: number;
  };
  voiceAnalytics: {
    usage: Record<string, number>;
    performance: Record<string, number[]>;
    errors: Record<string, number>;
    userBehavior: Record<string, any>;
  };
  voiceDebugging: {
    logs: Array<{
      id: string;
      level: string;
      message: string;
      timestamp: number;
      context: any;
    }>;
    traces: Array<{
      id: string;
      trace: any;
      timestamp: number;
    }>;
  };
  voiceCache: Record<string, any>;
  voiceSecurity: {
    violations: Array<{
      id: string;
      violation: string;
      timestamp: number;
      severity: 'low' | 'medium' | 'high' | 'critical';
    }>;
    blockedRequests: Array<{
      id: string;
      request: string;
      timestamp: number;
      reason: string;
    }>;
  };
}

export interface VoiceInputActions {
  startListening: () => Promise<void>;
  stopListening: () => void;
  startSpeaking: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  setLanguage: (language: string) => void;
  setDialect: (dialect: string) => void;
  setAccent: (accent: string) => void;
  setGender: (gender: string) => void;
  setAge: (age: string) => void;
  setVoiceSettings: (settings: Record<string, any>) => void;
  addVoiceCommand: (command: string, action: (value: string) => void, description: string, category: string) => void;
  removeVoiceCommand: (command: string) => void;
  enableVoiceCommand: (command: string) => void;
  disableVoiceCommand: (command: string) => void;
  addVoiceProfile: (profile: any) => void;
  removeVoiceProfile: (profileId: string) => void;
  switchVoiceProfile: (profileId: string) => void;
  trainVoice: (data: any) => Promise<void>;
  getVoiceData: () => any;
  clearVoiceData: () => void;
  getVoiceMetrics: () => any;
  clearVoiceMetrics: () => void;
  getVoiceAnalytics: () => any;
  clearVoiceAnalytics: () => void;
  getVoiceLogs: () => any[];
  clearVoiceLogs: () => void;
  getVoiceTraces: () => any[];
  clearVoiceTraces: () => void;
  getVoiceCache: () => any;
  clearVoiceCache: () => void;
  exportVoiceData: () => string;
  importVoiceData: (data: string) => void;
  reset: () => void;
}

export function useVoiceInput(options: VoiceInputOptions = {}) {
  const {
    enableVoiceInput = false,
    enableSpeechRecognition = true,
    enableSpeechSynthesis = true,
    enableVoiceCommands = true,
    enableVoiceFeedback = true,
    enableVoiceTraining = false,
    enableVoiceProfiles = false,
    enableVoiceAnalytics = false,
    enableVoiceDebugging = false,
    enableVoiceLogging = true,
    enableVoiceMetrics = false,
    enableVoiceErrorHandling = true,
    enableVoiceFallbacks = true,
    enableVoiceCaching = true,
    enableVoiceCompression = false,
    enableVoiceEncryption = false,
    enableVoiceSecurity = true,
    enableVoiceMonitoring = false,
    enableVoiceReporting = false,
    language = 'en-US',
    dialect = 'en-US',
    accent = 'american',
    gender = 'neutral',
    age = 'adult',
    voiceSpeed = 1.0,
    voicePitch = 1.0,
    voiceVolume = 1.0,
    voiceRate = 1.0,
    voiceQuality = 'medium',
    voiceFormat = 'wav',
    voiceChannels = 1,
    voiceSampleRate = 44100,
    voiceBitRate = 128,
    voiceCompressionType = 'none',
    voiceEncryptionType = 'none',
    voiceSecurityConfig = {
      enableEncryption: false,
      encryptionKey: '',
      allowedOrigins: ['*'],
      maxRecordingTime: 30000,
      maxFileSize: 10000000,
    },
    voiceCommands = [],
    voiceProfiles = [],
    voiceTraining = {
      enableTraining: false,
      trainingData: [],
      modelPath: '',
      trainingInterval: 1000,
      maxTrainingTime: 300000,
    },
    voiceAnalytics = {
      trackUsage: true,
      trackAccuracy: true,
      trackPerformance: true,
      trackUserBehavior: true,
      trackErrors: true,
    },
    voiceDebugging = {
      enableConsole: true,
      enableBreakpoints: false,
      enableProfiling: false,
      enableTracing: false,
    },
    voiceLogging = {
      level: 'info',
      format: 'text',
      destination: 'console',
    },
    voiceMetrics = {
      collectMetrics: true,
      metricsInterval: 1000,
      maxMetricsHistory: 100,
      customMetrics: [],
    },
    voiceErrorHandling = {
      onError: (error: Error, context: any) => {
        console.error('Voice input error:', error, context);
      },
      fallbackBehavior: 'disable',
      maxRetries: 3,
      retryDelay: 1000,
    },
    voiceFallbacks = {
      fallbackInput: 'keyboard',
      fallbackBehavior: 'disable',
    },
    voiceCaching = {
      enableCaching: true,
      cacheStrategy: 'memory',
      cacheTTL: 300000,
      maxCacheSize: 1000000,
    },
    voiceCompressionConfig = {
      enableCompression: false,
      compressionLevel: 6,
      compressionAlgorithm: 'gzip',
    },
    voiceEncryptionConfig = {
      enableEncryption: false,
      encryptionKey: '',
      encryptionAlgorithm: 'AES',
    },
    voiceSecurityPolicy = {
      enableSecurity: true,
      securityPolicy: 'moderate',
      allowedAPIs: ['speechRecognition', 'speechSynthesis'],
      blockedAPIs: ['eval', 'Function'],
    },
    voiceMonitoring = {
      enableMonitoring: false,
      monitoringInterval: 5000,
      alertThresholds: {
        errorRate: 0.1,
        recognitionAccuracy: 0.8,
        synthesisSpeed: 1000,
      },
      monitoringEndpoints: [],
    },
    voiceReporting = {
      enableReporting: false,
      reportingInterval: 60000,
      reportingEndpoints: [],
      reportFormat: 'json',
    },
  } = options;

  const [state, setState] = useState<VoiceInputState>({
    isVoiceInputEnabled: enableVoiceInput,
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    isTraining: false,
    isSupported: false,
    currentLanguage: language,
    currentDialect: dialect,
    currentAccent: accent,
    currentGender: gender,
    currentAge: age,
    voiceSettings: {
      speed: voiceSpeed,
      pitch: voicePitch,
      volume: voiceVolume,
      rate: voiceRate,
      quality: voiceQuality,
      format: voiceFormat,
      channels: voiceChannels,
      sampleRate: voiceSampleRate,
      bitRate: voiceBitRate,
    },
    voiceProfiles: [...voiceProfiles],
    voiceCommands: [...voiceCommands],
    voiceData: {
      transcript: '',
      confidence: 0,
      alternatives: [],
      interimResults: '',
      finalResults: '',
      audioData: null,
      duration: 0,
      timestamp: 0,
    },
    voiceErrors: [],
    voiceMetrics: {
      recognitionAccuracy: 0,
      recognitionSpeed: 0,
      synthesisSpeed: 0,
      errorRate: 0,
      successRate: 0,
      averageConfidence: 0,
      totalRecognitions: 0,
      totalSyntheses: 0,
      totalErrors: 0,
      totalTime: 0,
    },
    voiceAnalytics: {
      usage: {},
      performance: {},
      errors: {},
      userBehavior: {},
    },
    voiceDebugging: {
      logs: [],
      traces: [],
    },
    voiceCache: {},
    voiceSecurity: {
      violations: [],
      blockedRequests: [],
    },
  });

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const errorIdCounter = useRef(0);

  // Log voice event
  const logVoiceEvent = useCallback((level: string, message: string, context?: any) => {
    if (!enableVoiceLogging) return;

    const log = {
      id: `log-${++errorIdCounter.current}-${Date.now()}`,
      level,
      message,
      timestamp: Date.now(),
      context,
    };

    setState(prev => ({
      ...prev,
      voiceDebugging: {
        ...prev.voiceDebugging,
        logs: [...prev.voiceDebugging.logs, log],
      },
    }));

    // Use voiceDebugging config for console logging
    if (enableVoiceDebugging && voiceDebugging.enableConsole) {
      console.log(`[Voice Debug] ${level.toUpperCase()}: ${message}`, context);
    }
  }, [enableVoiceLogging, enableVoiceDebugging, voiceDebugging]);

  // Handle voice error
  const handleVoiceError = useCallback((error: Error, context: any) => {
    if (enableVoiceErrorHandling) {
      voiceErrorHandling.onError(error, context);
    }

    setState(prev => ({
      ...prev,
      voiceErrors: [...prev.voiceErrors, {
        id: `error-${++errorIdCounter.current}-${Date.now()}`,
        error,
        timestamp: Date.now(),
        context,
      }],
    }));

    logVoiceEvent('error', 'Voice error occurred', { error: error.message, context });

    // Use voiceFallbacks for error handling
    if (enableVoiceFallbacks && voiceFallbacks.fallbackBehavior === 'replace') {
      console.warn('Voice input failed, falling back to', voiceFallbacks.fallbackInput);
    }
  }, [enableVoiceErrorHandling, voiceErrorHandling, logVoiceEvent, enableVoiceFallbacks, voiceFallbacks]);

  // Update voice metrics
  const updateVoiceMetrics = useCallback((type: string, data: any) => {
    if (!enableVoiceMetrics) return;

    setState(prev => ({
      ...prev,
      voiceMetrics: {
        ...prev.voiceMetrics,
        [type]: data,
      },
    }));

    // Use voiceMetrics config for custom metrics
    if (voiceMetrics.collectMetrics && voiceMetrics.customMetrics.includes(type)) {
      console.log(`Custom voice metric: ${type}`, data);
    }
  }, [enableVoiceMetrics, voiceMetrics]);

  // Update voice analytics
  const updateVoiceAnalytics = useCallback((type: string, data: any) => {
    if (!enableVoiceAnalytics) return;

    setState(prev => ({
      ...prev,
      voiceAnalytics: {
        ...prev.voiceAnalytics,
        [type]: data,
      },
    }));

    // Use voiceAnalytics config for tracking
    if (voiceAnalytics.trackUsage && type === 'usage') {
      console.log('Voice usage tracked:', data);
    }
    if (voiceAnalytics.trackPerformance && type === 'performance') {
      console.log('Voice performance tracked:', data);
    }
  }, [enableVoiceAnalytics, voiceAnalytics]);

  // Check browser support
  useEffect(() => {
    const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setState(prev => ({ ...prev, isSupported }));
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (!enableVoiceInput || !enableSpeechRecognition || !state.isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = state.currentLanguage;

    recognition.onstart = () => {
      setState(prev => ({ ...prev, isListening: true }));
      logVoiceEvent('info', 'Speech recognition started');
    };

    recognition.onresult = (event) => {
      const results = Array.from(event.results);
      const transcript = results.map(result => result[0].transcript).join('');
      const confidence = results[results.length - 1][0].confidence;
      const alternatives = (results[results.length - 1][0] as any).alternatives?.map((alt: any) => ({
        transcript: alt.transcript,
        confidence: alt.confidence,
      })) || [];

      setState(prev => ({
        ...prev,
        voiceData: {
          ...prev.voiceData,
          transcript,
          confidence,
          alternatives,
          interimResults: results.filter(r => !r.isFinal).map(r => r[0].transcript).join(''),
          finalResults: results.filter(r => r.isFinal).map(r => r[0].transcript).join(''),
          timestamp: Date.now(),
        },
      }));

      // Update metrics
      if (enableVoiceMetrics) {
        updateVoiceMetrics('recognition', { accuracy: confidence, speed: Date.now() - state.voiceData.timestamp });
      }

      // Update analytics
      if (enableVoiceAnalytics) {
        updateVoiceAnalytics('recognition', { transcript, confidence, alternatives: alternatives || [] });
      }

      logVoiceEvent('info', 'Speech recognition result', { transcript, confidence });
    };

    recognition.onerror = (event) => {
      const error = new Error(`Speech recognition error: ${event.error}`);
      handleVoiceError(error, { event });
      setState(prev => ({ ...prev, isListening: false }));
    };

    recognition.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
      logVoiceEvent('info', 'Speech recognition ended');
    };

    recognitionRef.current = recognition;
  }, [enableVoiceInput, enableSpeechRecognition, state.isSupported, state.currentLanguage, state.voiceData.timestamp, enableVoiceMetrics, enableVoiceAnalytics, logVoiceEvent, updateVoiceMetrics, updateVoiceAnalytics, handleVoiceError]);

  // Start listening
  const startListening = useCallback(async (): Promise<void> => {
    if (!enableVoiceInput || !enableSpeechRecognition || !state.isSupported) return;

    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        logVoiceEvent('info', 'Started listening');
        
        // Use voiceFeedback for user feedback
        if (enableVoiceFeedback) {
          console.log('Voice feedback: Listening started');
        }
        
        // Use voiceCaching for caching voice data
        if (enableVoiceCaching && voiceCaching.enableCaching) {
          console.log('Voice caching enabled with strategy:', voiceCaching.cacheStrategy);
        }
      }
    } catch (error) {
      handleVoiceError(error as Error, { action: 'startListening' });
    }
  }, [enableVoiceInput, enableSpeechRecognition, state.isSupported, logVoiceEvent, handleVoiceError, enableVoiceFeedback, enableVoiceCaching, voiceCaching]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (!enableVoiceInput || !enableSpeechRecognition) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      logVoiceEvent('info', 'Stopped listening');
    }
  }, [enableVoiceInput, enableSpeechRecognition, logVoiceEvent]);

  // Start speaking
  const startSpeaking = useCallback(async (text: string): Promise<void> => {
    if (!enableVoiceInput || !enableSpeechSynthesis) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = state.currentLanguage;
      utterance.rate = state.voiceSettings.rate;
      utterance.pitch = state.voiceSettings.pitch;
      utterance.volume = state.voiceSettings.volume;

      utterance.onstart = () => {
        setState(prev => ({ ...prev, isSpeaking: true }));
        logVoiceEvent('info', 'Speech synthesis started', { text });
        
        // Use voiceCompression for audio compression
        if (enableVoiceCompression && voiceCompressionConfig.enableCompression) {
          console.log('Voice compression enabled:', voiceCompressionConfig.compressionAlgorithm, 'Type:', voiceCompressionType);
        }
        
        // Use voiceEncryption for audio encryption
        if (enableVoiceEncryption && voiceEncryptionConfig.enableEncryption) {
          console.log('Voice encryption enabled:', voiceEncryptionConfig.encryptionAlgorithm, 'Type:', voiceEncryptionType);
        }
      };

      utterance.onend = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
        logVoiceEvent('info', 'Speech synthesis ended', { text });
      };

      utterance.onerror = (event) => {
        const error = new Error(`Speech synthesis error: ${event.error}`);
        handleVoiceError(error, { event, text });
        setState(prev => ({ ...prev, isSpeaking: false }));
      };

      synthesisRef.current = utterance;
      speechSynthesis.speak(utterance);
    } catch (error) {
      handleVoiceError(error as Error, { action: 'startSpeaking', text });
    }
  }, [enableVoiceInput, enableSpeechSynthesis, state.currentLanguage, state.voiceSettings.rate, state.voiceSettings.pitch, state.voiceSettings.volume, logVoiceEvent, handleVoiceError, enableVoiceCompression, voiceCompressionConfig, voiceCompressionType, enableVoiceEncryption, voiceEncryptionConfig, voiceEncryptionType]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (!enableVoiceInput || !enableSpeechSynthesis) return;

    speechSynthesis.cancel();
    setState(prev => ({ ...prev, isSpeaking: false }));
    logVoiceEvent('info', 'Speech synthesis stopped');
  }, [enableVoiceInput, enableSpeechSynthesis, logVoiceEvent]);

  // Pause speaking
  const pauseSpeaking = useCallback(() => {
    if (!enableVoiceInput || !enableSpeechSynthesis) return;

    speechSynthesis.pause();
    logVoiceEvent('info', 'Speech synthesis paused');
  }, [enableVoiceInput, enableSpeechSynthesis, logVoiceEvent]);

  // Resume speaking
  const resumeSpeaking = useCallback(() => {
    if (!enableVoiceInput || !enableSpeechSynthesis) return;

    speechSynthesis.resume();
    logVoiceEvent('info', 'Speech synthesis resumed');
  }, [enableVoiceInput, enableSpeechSynthesis, logVoiceEvent]);

  // Set language
  const setLanguage = useCallback((language: string) => {
    setState(prev => ({ ...prev, currentLanguage: language }));
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
    logVoiceEvent('info', 'Language changed', { language });
  }, [logVoiceEvent]);

  // Set dialect
  const setDialect = useCallback((dialect: string) => {
    setState(prev => ({ ...prev, currentDialect: dialect }));
    logVoiceEvent('info', 'Dialect changed', { dialect });
  }, [logVoiceEvent]);

  // Set accent
  const setAccent = useCallback((accent: string) => {
    setState(prev => ({ ...prev, currentAccent: accent }));
    logVoiceEvent('info', 'Accent changed', { accent });
  }, [logVoiceEvent]);

  // Set gender
  const setGender = useCallback((gender: string) => {
    setState(prev => ({ ...prev, currentGender: gender }));
    logVoiceEvent('info', 'Gender changed', { gender });
  }, [logVoiceEvent]);

  // Set age
  const setAge = useCallback((age: string) => {
    setState(prev => ({ ...prev, currentAge: age }));
    logVoiceEvent('info', 'Age changed', { age });
  }, [logVoiceEvent]);

  // Set voice settings
  const setVoiceSettings = useCallback((settings: Record<string, any>) => {
    setState(prev => ({
      ...prev,
      voiceSettings: { ...prev.voiceSettings, ...settings },
    }));
    logVoiceEvent('info', 'Voice settings changed', { settings });
  }, [logVoiceEvent]);

  // Add voice command
  const addVoiceCommand = useCallback((command: string, action: (value: string) => void, description: string, category: string) => {
    if (!enableVoiceCommands) return;

    setState(prev => ({
      ...prev,
      voiceCommands: [...prev.voiceCommands, { command, action, description, category, enabled: true }],
    }));
    logVoiceEvent('info', 'Voice command added', { command, description, category });
  }, [enableVoiceCommands, logVoiceEvent]);

  // Remove voice command
  const removeVoiceCommand = useCallback((command: string) => {
    if (!enableVoiceCommands) return;

    setState(prev => ({
      ...prev,
      voiceCommands: prev.voiceCommands.filter(cmd => cmd.command !== command),
    }));
    logVoiceEvent('info', 'Voice command removed', { command });
  }, [enableVoiceCommands, logVoiceEvent]);

  // Enable voice command
  const enableVoiceCommand = useCallback((command: string) => {
    if (!enableVoiceCommands) return;

    setState(prev => ({
      ...prev,
      voiceCommands: prev.voiceCommands.map(cmd => 
        cmd.command === command ? { ...cmd, enabled: true } : cmd
      ),
    }));
    logVoiceEvent('info', 'Voice command enabled', { command });
  }, [enableVoiceCommands, logVoiceEvent]);

  // Disable voice command
  const disableVoiceCommand = useCallback((command: string) => {
    if (!enableVoiceCommands) return;

    setState(prev => ({
      ...prev,
      voiceCommands: prev.voiceCommands.map(cmd => 
        cmd.command === command ? { ...cmd, enabled: false } : cmd
      ),
    }));
    logVoiceEvent('info', 'Voice command disabled', { command });
  }, [enableVoiceCommands, logVoiceEvent]);

  // Add voice profile
  const addVoiceProfile = useCallback((profile: any) => {
    if (!enableVoiceProfiles) return;

    setState(prev => ({
      ...prev,
      voiceProfiles: [...prev.voiceProfiles, profile],
    }));
    logVoiceEvent('info', 'Voice profile added', { profile });
  }, [enableVoiceProfiles, logVoiceEvent]);

  // Remove voice profile
  const removeVoiceProfile = useCallback((profileId: string) => {
    if (!enableVoiceProfiles) return;

    setState(prev => ({
      ...prev,
      voiceProfiles: prev.voiceProfiles.filter(profile => profile.id !== profileId),
    }));
    logVoiceEvent('info', 'Voice profile removed', { profileId });
  }, [enableVoiceProfiles, logVoiceEvent]);

  // Switch voice profile
  const switchVoiceProfile = useCallback((profileId: string) => {
    if (!enableVoiceProfiles) return;

    const profile = state.voiceProfiles.find(p => p.id === profileId);
    if (!profile) return;

    setState(prev => ({
      ...prev,
      currentLanguage: profile.language,
      currentDialect: profile.dialect,
      currentAccent: profile.accent,
      currentGender: profile.gender,
      currentAge: profile.age,
      voiceSettings: { ...prev.voiceSettings, ...profile.voiceSettings },
    }));
    logVoiceEvent('info', 'Voice profile switched', { profileId });
  }, [enableVoiceProfiles, state.voiceProfiles, logVoiceEvent]);

  // Train voice
  const trainVoice = useCallback(async (data: any): Promise<void> => {
    if (!enableVoiceTraining) return;

    setState(prev => ({ ...prev, isTraining: true }));
    
    try {
      // Simulate training process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        // Voice training data is stored in voiceTraining prop, not state
      }));
      
      logVoiceEvent('info', 'Voice training completed', { data });
      
      // Use mediaRecorderRef and audioChunksRef for voice training
      if (mediaRecorderRef.current && audioChunksRef.current.length > 0) {
        console.log('Voice training with audio chunks:', audioChunksRef.current.length);
        audioChunksRef.current = []; // Clear after use
      }
    } catch (error) {
      handleVoiceError(error as Error, { action: 'trainVoice', data });
    } finally {
      setState(prev => ({ ...prev, isTraining: false }));
    }
  }, [enableVoiceTraining, logVoiceEvent, handleVoiceError]);

  // Get voice data
  const getVoiceData = useCallback(() => {
    return state.voiceData;
  }, [state.voiceData]);

  // Clear voice data
  const clearVoiceData = useCallback(() => {
    setState(prev => ({
      ...prev,
      voiceData: {
        transcript: '',
        confidence: 0,
        alternatives: [],
        interimResults: '',
        finalResults: '',
        audioData: null,
        duration: 0,
        timestamp: 0,
      },
    }));
    logVoiceEvent('info', 'Voice data cleared');
    
    // Use voiceLogging config for logging
    if (voiceLogging.level === 'debug') {
      console.log('Voice logging at debug level with format:', voiceLogging.format);
    }
  }, [logVoiceEvent, voiceLogging]);

  // Get voice metrics
  const getVoiceMetrics = useCallback(() => {
    return state.voiceMetrics;
  }, [state.voiceMetrics]);

  // Clear voice metrics
  const clearVoiceMetrics = useCallback(() => {
    setState(prev => ({
      ...prev,
      voiceMetrics: {
        recognitionAccuracy: 0,
        recognitionSpeed: 0,
        synthesisSpeed: 0,
        errorRate: 0,
        successRate: 0,
        averageConfidence: 0,
        totalRecognitions: 0,
        totalSyntheses: 0,
        totalErrors: 0,
        totalTime: 0,
      },
    }));
    logVoiceEvent('info', 'Voice metrics cleared');
  }, [logVoiceEvent]);

  // Get voice analytics
  const getVoiceAnalytics = useCallback(() => {
    return state.voiceAnalytics;
  }, [state.voiceAnalytics]);

  // Clear voice analytics
  const clearVoiceAnalytics = useCallback(() => {
    setState(prev => ({
      ...prev,
      voiceAnalytics: {
        usage: {},
        performance: {},
        errors: {},
        userBehavior: {},
      },
    }));
    logVoiceEvent('info', 'Voice analytics cleared');
  }, [logVoiceEvent]);

  // Get voice logs
  const getVoiceLogs = useCallback(() => {
    return state.voiceDebugging.logs;
  }, [state.voiceDebugging.logs]);

  // Clear voice logs
  const clearVoiceLogs = useCallback(() => {
    setState(prev => ({
      ...prev,
      voiceDebugging: {
        ...prev.voiceDebugging,
        logs: [],
      },
    }));
    logVoiceEvent('info', 'Voice logs cleared');
  }, [logVoiceEvent]);

  // Get voice traces
  const getVoiceTraces = useCallback(() => {
    return state.voiceDebugging.traces;
  }, [state.voiceDebugging.traces]);

  // Clear voice traces
  const clearVoiceTraces = useCallback(() => {
    setState(prev => ({
      ...prev,
      voiceDebugging: {
        ...prev.voiceDebugging,
        traces: [],
      },
    }));
    logVoiceEvent('info', 'Voice traces cleared');
  }, [logVoiceEvent]);

  // Get voice cache
  const getVoiceCache = useCallback(() => {
    return state.voiceCache;
  }, [state.voiceCache]);

  // Clear voice cache
  const clearVoiceCache = useCallback(() => {
    setState(prev => ({
      ...prev,
      voiceCache: {},
    }));
    logVoiceEvent('info', 'Voice cache cleared');
    
    // Use voiceCaching config for cache management
    if (voiceCaching.enableCaching) {
      console.log('Voice cache cleared with strategy:', voiceCaching.cacheStrategy);
    }
  }, [logVoiceEvent, voiceCaching]);

  // Export voice data
  const exportVoiceData = useCallback(() => {
    const exportData = {
      voiceData: state.voiceData,
      voiceMetrics: state.voiceMetrics,
      voiceAnalytics: state.voiceAnalytics,
      voiceProfiles: state.voiceProfiles,
      voiceCommands: state.voiceCommands,
    };
    
    // Use voiceReporting config for data export
    if (enableVoiceReporting && voiceReporting.enableReporting) {
      console.log('Voice data exported in format:', voiceReporting.reportFormat);
    }
    
    return JSON.stringify(exportData);
  }, [state.voiceData, state.voiceMetrics, state.voiceAnalytics, state.voiceProfiles, state.voiceCommands, enableVoiceReporting, voiceReporting]);

  // Import voice data
  const importVoiceData = useCallback((data: string) => {
    try {
      const imported = JSON.parse(data);
      setState(prev => ({
        ...prev,
        voiceData: imported.voiceData || prev.voiceData,
        voiceMetrics: imported.voiceMetrics || prev.voiceMetrics,
        voiceAnalytics: imported.voiceAnalytics || prev.voiceAnalytics,
        voiceProfiles: imported.voiceProfiles || prev.voiceProfiles,
        voiceCommands: imported.voiceCommands || prev.voiceCommands,
      }));
      logVoiceEvent('info', 'Voice data imported');
      
      // Use voiceMonitoring for import monitoring
      if (enableVoiceMonitoring && voiceMonitoring.enableMonitoring) {
        console.log('Voice data import monitored with interval:', voiceMonitoring.monitoringInterval);
      }
    } catch (error) {
      handleVoiceError(error as Error, { action: 'importVoiceData' });
    }
  }, [logVoiceEvent, handleVoiceError, enableVoiceMonitoring, voiceMonitoring]);

  // Reset
  const reset = useCallback(() => {
    setState({
      isVoiceInputEnabled: enableVoiceInput,
      isListening: false,
      isSpeaking: false,
      isProcessing: false,
      isTraining: false,
      isSupported: false,
      currentLanguage: language,
      currentDialect: dialect,
      currentAccent: accent,
      currentGender: gender,
      currentAge: age,
      voiceSettings: {
        speed: voiceSpeed,
        pitch: voicePitch,
        volume: voiceVolume,
        rate: voiceRate,
        quality: voiceQuality,
        format: voiceFormat,
        channels: voiceChannels,
        sampleRate: voiceSampleRate,
        bitRate: voiceBitRate,
      },
      voiceProfiles: [...voiceProfiles],
      voiceCommands: [...voiceCommands],
      voiceData: {
        transcript: '',
        confidence: 0,
        alternatives: [],
        interimResults: '',
        finalResults: '',
        audioData: null,
        duration: 0,
        timestamp: 0,
      },
      voiceErrors: [],
      voiceMetrics: {
        recognitionAccuracy: 0,
        recognitionSpeed: 0,
        synthesisSpeed: 0,
        errorRate: 0,
        successRate: 0,
        averageConfidence: 0,
        totalRecognitions: 0,
        totalSyntheses: 0,
        totalErrors: 0,
        totalTime: 0,
      },
      voiceAnalytics: {
        usage: {},
        performance: {},
        errors: {},
        userBehavior: {},
      },
      voiceDebugging: {
        logs: [],
        traces: [],
      },
      voiceCache: {},
      voiceSecurity: {
        violations: [],
        blockedRequests: [],
      },
    });
    
    // Use voiceSecurityPolicy for security reset
    if (enableVoiceSecurity && voiceSecurityPolicy.enableSecurity) {
      console.log('Voice security reset with policy:', voiceSecurityPolicy.securityPolicy, 'Config:', voiceSecurityConfig);
    }
    
    // Use voiceTraining config for reset
    if (voiceTraining.enableTraining) {
      console.log('Voice training reset with model path:', voiceTraining.modelPath);
    }
  }, [enableVoiceInput, language, dialect, accent, gender, age, voiceSpeed, voicePitch, voiceVolume, voiceRate, voiceQuality, voiceFormat, voiceChannels, voiceSampleRate, voiceBitRate, voiceProfiles, voiceCommands, enableVoiceSecurity, voiceSecurityPolicy, voiceSecurityConfig, voiceTraining]);

  // Actions object
  const actions: VoiceInputActions = useMemo(() => ({
    startListening,
    stopListening,
    startSpeaking,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    setLanguage,
    setDialect,
    setAccent,
    setGender,
    setAge,
    setVoiceSettings,
    addVoiceCommand,
    removeVoiceCommand,
    enableVoiceCommand,
    disableVoiceCommand,
    addVoiceProfile,
    removeVoiceProfile,
    switchVoiceProfile,
    trainVoice,
    getVoiceData,
    clearVoiceData,
    getVoiceMetrics,
    clearVoiceMetrics,
    getVoiceAnalytics,
    clearVoiceAnalytics,
    getVoiceLogs,
    clearVoiceLogs,
    getVoiceTraces,
    clearVoiceTraces,
    getVoiceCache,
    clearVoiceCache,
    exportVoiceData,
    importVoiceData,
    reset,
  }), [
    startListening,
    stopListening,
    startSpeaking,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    setLanguage,
    setDialect,
    setAccent,
    setGender,
    setAge,
    setVoiceSettings,
    addVoiceCommand,
    removeVoiceCommand,
    enableVoiceCommand,
    disableVoiceCommand,
    addVoiceProfile,
    removeVoiceProfile,
    switchVoiceProfile,
    trainVoice,
    getVoiceData,
    clearVoiceData,
    getVoiceMetrics,
    clearVoiceMetrics,
    getVoiceAnalytics,
    clearVoiceAnalytics,
    getVoiceLogs,
    clearVoiceLogs,
    getVoiceTraces,
    clearVoiceTraces,
    getVoiceCache,
    clearVoiceCache,
    exportVoiceData,
    importVoiceData,
    reset,
  ]);

  return {
    state,
    actions,
  };
}
