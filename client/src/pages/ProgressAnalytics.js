import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Select,
  HStack,
  Icon,
  Flex,
  Badge,
  Divider,
} from '@chakra-ui/react';
import {
  FaChartLine,
  FaStar,
  FaCode,
  FaMicrophone,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

const ProgressAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [progressData, setProgressData] = useState({
    technicalScore: 75,
    behavioralScore: 82,
    communicationScore: 78,
    practiceStats: {
      questionsAttempted: 45,
      questionsSolved: 38,
      averageRating: 4.2,
      streak: 7,
    },
    recentActivities: [
      {
        type: 'technical',
        title: 'Solved: React Virtual DOM',
        score: 85,
        date: '2024-03-15',
      },
      {
        type: 'behavioral',
        title: 'Mock Interview: Leadership',
        score: 90,
        date: '2024-03-14',
      },
      {
        type: 'speech',
        title: 'Speech Analysis',
        score: 88,
        date: '2024-03-13',
      },
    ],
    strengthAreas: ['React', 'System Design', 'Problem Solving'],
    improvementAreas: ['Data Structures', 'SQL', 'Behavioral'],
    weeklyProgress: [
      { day: 'Mon', score: 75 },
      { day: 'Tue', score: 78 },
      { day: 'Wed', score: 82 },
      { day: 'Thu', score: 80 },
      { day: 'Fri', score: 85 },
      { day: 'Sat', score: 88 },
      { day: 'Sun', score: 92 },
    ],
  });

  // Simulate fetching data based on time range
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For demo, we'll just update the state
    const fetchProgressData = () => {
      // Simulated API call
      setTimeout(() => {
        setProgressData(prev => ({
          ...prev,
          technicalScore: Math.floor(Math.random() * 20) + 70,
          behavioralScore: Math.floor(Math.random() * 20) + 70,
          communicationScore: Math.floor(Math.random() * 20) + 70,
        }));
      }, 500);
    };

    fetchProgressData();
  }, [timeRange]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'yellow';
    return 'red';
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Progress Analytics</Heading>
          <Text color="gray.500">Track your interview preparation progress and identify areas for improvement</Text>
        </Box>

        <HStack justify="flex-end">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            w="200px"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </Select>
        </HStack>

        {/* Overall Progress */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Technical Skills</StatLabel>
                <StatNumber>{progressData.technicalScore}%</StatNumber>
                <Progress
                  value={progressData.technicalScore}
                  colorScheme={getScoreColor(progressData.technicalScore)}
                  mt={2}
                />
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Behavioral Skills</StatLabel>
                <StatNumber>{progressData.behavioralScore}%</StatNumber>
                <Progress
                  value={progressData.behavioralScore}
                  colorScheme={getScoreColor(progressData.behavioralScore)}
                  mt={2}
                />
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Communication</StatLabel>
                <StatNumber>{progressData.communicationScore}%</StatNumber>
                <Progress
                  value={progressData.communicationScore}
                  colorScheme={getScoreColor(progressData.communicationScore)}
                  mt={2}
                />
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Practice Statistics */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Practice Statistics</Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Stat>
                <StatLabel>Questions Attempted</StatLabel>
                <StatNumber>{progressData.practiceStats.questionsAttempted}</StatNumber>
                <StatHelpText>
                  <Icon as={FaCode} mr={1} />
                  Total Practice
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Questions Solved</StatLabel>
                <StatNumber>{progressData.practiceStats.questionsSolved}</StatNumber>
                <StatHelpText>
                  <Icon as={FaCheckCircle} mr={1} color="green.500" />
                  Successful
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Average Rating</StatLabel>
                <StatNumber>{progressData.practiceStats.averageRating}</StatNumber>
                <StatHelpText>
                  <Icon as={FaStar} mr={1} color="yellow.400" />
                  Out of 5.0
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Current Streak</StatLabel>
                <StatNumber>{progressData.practiceStats.streak} days</StatNumber>
                <StatHelpText>
                  <Icon as={FaChartLine} mr={1} color="blue.500" />
                  Keep it up!
                </StatHelpText>
              </Stat>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Recent Activities */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Recent Activities</Heading>
              <VStack spacing={4} align="stretch">
                {progressData.recentActivities.map((activity, index) => (
                  <Box key={index}>
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Icon
                          as={
                            activity.type === 'technical' ? FaCode :
                            activity.type === 'behavioral' ? FaStar :
                            FaMicrophone
                          }
                          color={
                            activity.type === 'technical' ? 'blue.500' :
                            activity.type === 'behavioral' ? 'purple.500' :
                            'green.500'
                          }
                        />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{activity.title}</Text>
                          <Text fontSize="sm" color="gray.500">{activity.date}</Text>
                        </VStack>
                      </HStack>
                      <Badge
                        colorScheme={getScoreColor(activity.score)}
                      >
                        {activity.score}%
                      </Badge>
                    </Flex>
                    {index < progressData.recentActivities.length - 1 && <Divider mt={2} />}
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Areas of Focus</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontWeight="medium" mb={2}>Strengths</Text>
                  <VStack align="stretch" spacing={2}>
                    {progressData.strengthAreas.map((area, index) => (
                      <HStack key={index}>
                        <Icon as={FaCheckCircle} color="green.500" />
                        <Text>{area}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Box>
                  <Text fontWeight="medium" mb={2}>Need Improvement</Text>
                  <VStack align="stretch" spacing={2}>
                    {progressData.improvementAreas.map((area, index) => (
                      <HStack key={index}>
                        <Icon as={FaExclamationCircle} color="red.500" />
                        <Text>{area}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Weekly Progress Chart */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Weekly Progress</Heading>
            <Flex justify="space-between" h="100px" align="flex-end">
              {progressData.weeklyProgress.map((day, index) => (
                <VStack key={index} spacing={1}>
                  <Text fontSize="sm">{day.score}%</Text>
                  <Box
                    w="30px"
                    bg={getScoreColor(day.score)}
                    h={`${day.score}%`}
                    borderRadius="md"
                  />
                  <Text fontSize="sm">{day.day}</Text>
                </VStack>
              ))}
            </Flex>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default ProgressAnalytics; 