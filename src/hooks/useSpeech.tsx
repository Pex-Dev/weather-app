import { useEffect, useRef, useState } from "react";

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onaudiostart?: (event: Event) => void;
  onaudioend?: (event: Event) => void;
  onend?: (event: Event) => void;
  onerror?: (event: SpeechRecognitionErrorEvent) => void;
  onresult?: (event: SpeechRecognitionEvent) => void;
}

export default function useSpeech(onResult: (result: string) => void) {
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState<boolean>(false);
  const [microphonePermission, setMicrophonePermission] =
    useState<boolean>(true);
  const [listening, setListening] = useState<boolean>(false);

  type SpeechRecognitionConstructor = new () => ISpeechRecognition;

  //Ref to instance of speech recognition
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    //Check if the browse support the sepeech recognition
    const SpeechRecognition: SpeechRecognitionConstructor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechRecognitionSupported(false);
      return;
    }
    setSpeechRecognitionSupported(true);

    //Create instance of speech recognition
    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.stop = () => {
      console.log("speech recognition stopped");
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    //Handle the result
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };

    //Set the ref
    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current === null) return;
    setListening(true);
    recognitionRef.current.start();
    navigator.permissions.query({ name: "microphone" }).then((result) => {
      if (result.state === "denied") {
        setMicrophonePermission(false);
        return;
      }
      setMicrophonePermission(true);
    });
  };

  const stopListening = () => {
    if (recognitionRef.current === null) return;
    setListening(false);
    recognitionRef.current.stop();
  };

  return {
    listening,
    setListening,
    startListening,
    stopListening,
    speechRecognitionSupported,
    microphonePermission,
  };
}
