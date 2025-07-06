import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, RotateCcw, Copy, Check } from 'lucide-react';
import '../styles/TranslatingPage.css';

const TranslationPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Mock speech-to-text function
  const transcribeAudio = async (audioBlob) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockTranscriptions = [
      "I feel a little anxious today.",
      "Can we go home now?",
      "I like the red ball.",
      "This noise is too loud.",
      "I want to take a break.",
      "Please help me.",
      "Can we go to the park?",
      "I'm feeling okay."
    ];

    return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
  };

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

        setIsProcessing(true);
        try {
          const text = await transcribeAudio(audioBlob);
          setTranscription(text);
        } catch (error) {
          console.error('Error processing audio:', error);
          setTranscription('Error processing audio. Please try again.');
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTranscription('');
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleRecordingToggle = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const clearResults = () => {
    setTranscription('');
    setIsCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard error:', err);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="translation-page">
      <div className="container">

        {/* Header */}
        <div className="header">
        <div className="header-icon">
            <Mic className="icon" />
            <h1 className="title">Speech Helper</h1>
        </div>
        <div className="header-subtitle">
            <p className="subtitle">
            Tap the mic and speak how you feel. Your words will appear here.
            </p>
        </div>
        </div>


        {/* Recording Section */}
        <div className="recording-section">
          <div className="recording-card">
            <div className="recording-button-container">
              <button
                onClick={handleRecordingToggle}
                disabled={isProcessing}
                className={`recording-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
              >
                {isProcessing ? (
                  <div className="loading-spinner"></div>
                ) : isRecording ? (
                  <MicOff className="button-icon" />
                ) : (
                  <Mic className="button-icon" />
                )}
              </button>
            </div>

            <div className="recording-status">
              {isRecording && <div className="status-recording">Recording... {formatTime(recordingTime)}</div>}
              {isProcessing && <div className="status-processing">Processing your speech...</div>}
              {!isRecording && !isProcessing && <div className="status-idle">Tap to start recording</div>}
            </div>
          </div>
        </div>

        {/* Result Section */}
        {transcription && (
          <div className="results-section">
            <div className="results-card">
              <div className="result-item">
                <div className="result-header">
                  <h3 className="result-title">What You Said</h3>
                  <div className="action-buttons">
                    <button onClick={() => speakText(transcription)} className="action-button">
                      <Volume2 className="action-icon" />
                    </button>
                    <button onClick={copyToClipboard} className="action-button">
                      {isCopied ? <Check className="action-icon" /> : <Copy className="action-icon" />}
                    </button>
                  </div>
                </div>
                <p className="result-text">{transcription}</p>
              </div>

              <div className="result-actions">
                <button onClick={clearResults} className="clear-button">
                  <RotateCcw className="clear-icon" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!transcription && !isRecording && !isProcessing && (
          <div className="instructions-section">
            <div className="instructions-card">
              <h3 className="instructions-title">How to Use:</h3>
              <ol className="instructions-list">
                <li className="instruction-item"><span className="instruction-number">1</span> Tap the mic button</li>
                <li className="instruction-item"><span className="instruction-number">2</span> Speak clearly</li>
                <li className="instruction-item"><span className="instruction-number">3</span> Tap again to stop</li>
                <li className="instruction-item"><span className="instruction-number">4</span> See or hear your words!</li>
              </ol>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TranslationPage;
