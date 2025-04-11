import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Progress,
  Card,
  CardBody,
  SimpleGrid,
  Icon,
  useToast,
  Alert,
  AlertIcon,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { FaMicrophone, FaStop, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

const SpeechAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const toast = useToast();

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setError(null);
        toast({
          title: 'Recording Started',
          description: 'Speak clearly into your microphone',
          status: 'success',
          duration: 3000,
        });
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Error: ${event.error}. Please make sure your microphone is connected and you've given permission to use it.`);
        stopRecording();
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (!error) {
          toast({
            title: 'Recording Stopped',
            description: 'Analyzing your speech...',
            status: 'info',
            duration: 2000,
          });
        }
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        if (finalTranscript) {
          analyzeSpeech(fullTranscript);
        }
      };

      setRecognition(recognition);
    } else {
      setError('Speech recognition is not supported in your browser. Please use Chrome.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startRecording = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not initialized. Please refresh the page.');
      return;
    }

    try {
      recognition.start();
      setTranscript('');
      setAnalysis(null);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Error starting recording. Please refresh the page and try again.');
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const analyzeSpeech = (text) => {
    try {
      const words = text.trim().split(' ');
      const wordsPerMinute = calculateWordsPerMinute(words);
      const clarity = calculateClarity(text);
      const confidence = calculateConfidence(text);
      const fluency = calculateFluency(text);
      const pronunciation = calculatePronunciation(text);

      setAnalysis({
        wordsPerMinute,
        clarity,
        confidence,
        fluency,
        pronunciation,
        timestamp: new Date().toISOString(),
        textLength: words.length,
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Error analyzing speech. Please try again.');
    }
  };

  const calculateWordsPerMinute = (words) => {
    // Assuming average speaking time of 10 seconds for demo
    return Math.round((words.length / 10) * 60);
  };

  const calculateClarity = (text) => {
    const words = text.trim().split(' ');
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    const score = Math.min(100, Math.max(0, avgWordLength * 12));
    return Math.round(score);
  };

  const calculateConfidence = (text) => {
    const words = text.toLowerCase().split(' ');
    const fillerWords = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of'];
    const fillerCount = words.filter(word => fillerWords.includes(word)).length;
    const score = Math.max(0, 100 - (fillerCount * 15));
    return Math.round(score);
  };

  const calculateFluency = (text) => {
    const words = text.split(' ');
    const pauseCount = (text.match(/\.\.\./g) || []).length;
    const speed = words.length / 10; // words per second
    const score = Math.min(100, Math.max(0, 85 + (speed * 3) - (pauseCount * 10)));
    return Math.round(score);
  };

  const calculatePronunciation = (text) => {
    // Simplified pronunciation scoring based on word complexity
    const words = text.split(' ');
    const complexWords = words.filter(word => word.length > 6).length;
    const score = Math.min(100, Math.max(0, 90 - (complexWords * 5)));
    return Math.round(score);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 75) return 'blue';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={4}>Speech Analysis</Heading>
          <Text color="gray.500">
            Practice your interview responses and get instant feedback on your speech patterns
          </Text>
        </Box>

        <Card>
          <CardBody>
            <VStack spacing={6}>
              <Button
                size="lg"
                colorScheme={isRecording ? 'red' : 'blue'}
                leftIcon={<Icon as={isRecording ? FaStop : FaMicrophone} />}
                onClick={isRecording ? stopRecording : startRecording}
                isDisabled={!!error && !isRecording}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>

              {error && (
                <Alert status="error" variant="left-accent">
                  <AlertIcon as={FaExclamationTriangle} />
                  {error}
                </Alert>
              )}

              {transcript && (
                <Box p={4} bg="gray.50" borderRadius="md" w="100%">
                  <Text fontWeight="bold" mb={2}>Your Speech:</Text>
                  <Text>{transcript}</Text>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>

        {analysis && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontWeight="bold">Words per Minute</Text>
                    <Badge colorScheme={getScoreColor(analysis.wordsPerMinute)}>
                      {analysis.wordsPerMinute} WPM
                    </Badge>
                  </HStack>
                  <Progress 
                    value={Math.min(100, (analysis.wordsPerMinute / 150) * 100)} 
                    colorScheme={getScoreColor(analysis.wordsPerMinute)}
                  />
                  <Text fontSize="sm" color="gray.500">
                    Ideal range: 120-150 WPM
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <HStack justify="space-between">
                      <Text mb={1}>Clarity</Text>
                      <Badge colorScheme={getScoreColor(analysis.clarity)}>
                        {analysis.clarity}%
                      </Badge>
                    </HStack>
                    <Progress value={analysis.clarity} colorScheme={getScoreColor(analysis.clarity)} />
                  </Box>
                  
                  <Box>
                    <HStack justify="space-between">
                      <Text mb={1}>Confidence</Text>
                      <Badge colorScheme={getScoreColor(analysis.confidence)}>
                        {analysis.confidence}%
                      </Badge>
                    </HStack>
                    <Progress value={analysis.confidence} colorScheme={getScoreColor(analysis.confidence)} />
                  </Box>
                  
                  <Box>
                    <HStack justify="space-between">
                      <Text mb={1}>Fluency</Text>
                      <Badge colorScheme={getScoreColor(analysis.fluency)}>
                        {analysis.fluency}%
                      </Badge>
                    </HStack>
                    <Progress value={analysis.fluency} colorScheme={getScoreColor(analysis.fluency)} />
                  </Box>
                  
                  <Box>
                    <HStack justify="space-between">
                      <Text mb={1}>Pronunciation</Text>
                      <Badge colorScheme={getScoreColor(analysis.pronunciation)}>
                        {analysis.pronunciation}%
                      </Badge>
                    </HStack>
                    <Progress value={analysis.pronunciation} colorScheme={getScoreColor(analysis.pronunciation)} />
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default SpeechAnalysis; 