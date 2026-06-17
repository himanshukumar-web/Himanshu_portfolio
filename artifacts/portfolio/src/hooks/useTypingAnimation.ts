import { useState, useEffect } from 'react';

export function useTypingAnimation(phrases: string[], typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDelay);
      return () => clearTimeout(timer);
    }

    const currentPhrase = phrases[loopNum % phrases.length];

    if (isDeleting) {
      setText(currentPhrase.substring(0, text.length - 1));
      timer = setTimeout(() => {}, deletingSpeed);
    } else {
      setText(currentPhrase.substring(0, text.length + 1));
      timer = setTimeout(() => {}, typingSpeed);
    }

    if (!isDeleting && text === currentPhrase) {
      setIsPaused(true);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, isPaused, phrases, typingSpeed, deletingSpeed, pauseDelay]);

  return text;
}
