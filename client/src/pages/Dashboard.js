import React, { useContext } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Stack,
  Button,
  Divider,
  Icon,
  Progress,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { 
  FaCalendarAlt, 
  FaChartLine, 
  FaCheckCircle, 
  FaClipboardList, 
  FaClock, 
  FaGraduationCap, 
  FaStar 
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  // Mock data for dashboard
  const dashboardData = {
    stats: {
      completedInterviews: 8,
      upcomingInterviews: 3,
      totalPractice: 24,
      averageScore: 78,
    },
    upcomingInterviews: [
      {
        id: 1,
        company: 'Tech Solutions Inc',
        position: 'Senior Frontend Developer',
        date: '2023-07-15',
        time: '10:00 AM',
        type: 'Technical Interview',
      },
      {
        id: 2,
        company: 'DataViz Analytics',
        position: 'React Developer',
        date: '2023-07-18',
        time: '2:30 PM',
        type: 'Coding Challenge',
      },
      {
        id: 3,
        company: 'Web Innovations',
        position: 'Full Stack Engineer',
        date: '2023-07-22',
        time: '11:15 AM',
        type: 'System Design',
      },
    ],
    recentPractice: [
      {
        id: 1,
        title: 'React Hooks and Context API',
        date: '2023-07-10',
        score: 85,
        questions: 15,
      },
      {
        id: 2,
        title: 'JavaScript Algorithms',
        date: '2023-07-08',
        score: 72,
        questions: 12,
      },
      {
        id: 3,
        title: 'System Design Basics',
        date: '2023-07-05',
        score: 90,
        questions: 8,
      },
    ],
    recommendedTopics: [
      { id: 1, title: 'React Performance Optimization', difficulty: 'Intermediate' },
      { id: 2, title: 'Advanced CSS Layouts', difficulty: 'Advanced' },
      { id: 3, title: 'RESTful API Design', difficulty: 'Intermediate' },
      { id: 4, title: 'Data Structures: Trees & Graphs', difficulty: 'Advanced' },
    ],
    progress: {
      technical: 72,
      behavioral: 88,
      systemDesign: 65,
      codingChallenge: 81,
    },
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg">Dashboard</Heading>
          <Text color="gray.500">Welcome back, {user?.name || 'User'}</Text>
        </Box>
        <Button leftIcon={<FaCalendarAlt />} colorScheme="blue">
          Schedule Interview
        </Button>
      </Flex>
      
      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Stat
          px={{ base: 4, md: 6 }}
          py="5"
          shadow="md"
          border="1px"
          borderColor={borderColor}
          rounded="lg"
          bg={bgColor}
        >
          <Flex justifyContent="space-between">
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight="medium">Completed Interviews</StatLabel>
              <StatNumber fontSize="2xl">{dashboardData.stats.completedInterviews}</StatNumber>
              <StatHelpText>
                <Text as="span" color="green.400">↑ 23%</Text> from last month
              </StatHelpText>
            </Box>
            <Box
              my="auto"
              color="green.400"
              alignContent="center"
            >
              <Icon as={FaCheckCircle} w={8} h={8} />
            </Box>
          </Flex>
        </Stat>
        
        <Stat
          px={{ base: 4, md: 6 }}
          py="5"
          shadow="md"
          border="1px"
          borderColor={borderColor}
          rounded="lg"
          bg={bgColor}
        >
          <Flex justifyContent="space-between">
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight="medium">Upcoming Interviews</StatLabel>
              <StatNumber fontSize="2xl">{dashboardData.stats.upcomingInterviews}</StatNumber>
              <StatHelpText>
                Next one in 3 days
              </StatHelpText>
            </Box>
            <Box
              my="auto"
              color="blue.400"
              alignContent="center"
            >
              <Icon as={FaCalendarAlt} w={8} h={8} />
            </Box>
          </Flex>
        </Stat>
        
        <Stat
          px={{ base: 4, md: 6 }}
          py="5"
          shadow="md"
          border="1px"
          borderColor={borderColor}
          rounded="lg"
          bg={bgColor}
        >
          <Flex justifyContent="space-between">
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight="medium">Practice Sessions</StatLabel>
              <StatNumber fontSize="2xl">{dashboardData.stats.totalPractice}</StatNumber>
              <StatHelpText>
                <Text as="span" color="green.400">↑ 12%</Text> from last month
              </StatHelpText>
            </Box>
            <Box
              my="auto"
              color="purple.400"
              alignContent="center"
            >
              <Icon as={FaGraduationCap} w={8} h={8} />
            </Box>
          </Flex>
        </Stat>
        
        <Stat
          px={{ base: 4, md: 6 }}
          py="5"
          shadow="md"
          border="1px"
          borderColor={borderColor}
          rounded="lg"
          bg={bgColor}
        >
          <Flex justifyContent="space-between">
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight="medium">Average Score</StatLabel>
              <StatNumber fontSize="2xl">{dashboardData.stats.averageScore}%</StatNumber>
              <StatHelpText>
                <Text as="span" color="green.400">↑ 5%</Text> improvement
              </StatHelpText>
            </Box>
            <Box
              my="auto"
              color="orange.400"
              alignContent="center"
            >
              <Icon as={FaChartLine} w={8} h={8} />
            </Box>
          </Flex>
        </Stat>
      </SimpleGrid>
      
      {/* Progress Tracking */}
      <Box
        mb={8}
        p={6}
        shadow="md"
        border="1px"
        borderColor={borderColor}
        rounded="lg"
        bg={bgColor}
      >
        <Heading size="md" mb={4}>Your Progress</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text>Technical Interview</Text>
              <Text>{dashboardData.progress.technical}%</Text>
            </Flex>
            <Progress value={dashboardData.progress.technical} colorScheme="blue" size="sm" mb={4} borderRadius="full" />
            
            <Flex justify="space-between" mb={2}>
              <Text>Behavioral Interview</Text>
              <Text>{dashboardData.progress.behavioral}%</Text>
            </Flex>
            <Progress value={dashboardData.progress.behavioral} colorScheme="green" size="sm" mb={4} borderRadius="full" />
          </Box>
          
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text>System Design</Text>
              <Text>{dashboardData.progress.systemDesign}%</Text>
            </Flex>
            <Progress value={dashboardData.progress.systemDesign} colorScheme="purple" size="sm" mb={4} borderRadius="full" />
            
            <Flex justify="space-between" mb={2}>
              <Text>Coding Challenge</Text>
              <Text>{dashboardData.progress.codingChallenge}%</Text>
            </Flex>
            <Progress value={dashboardData.progress.codingChallenge} colorScheme="orange" size="sm" mb={4} borderRadius="full" />
          </Box>
        </SimpleGrid>
      </Box>
      
      {/* Main Content */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Upcoming Interviews */}
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md">Upcoming Interviews</Heading>
            <Button size="sm" variant="outline" rightIcon={<FaCalendarAlt />}>
              View All
            </Button>
          </Flex>
          
          <Stack spacing={4}>
            {dashboardData.upcomingInterviews.map(interview => (
              <Box
                key={interview.id}
                p={5}
                shadow="md"
                border="1px"
                borderColor={borderColor}
                rounded="md"
                bg={bgColor}
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Heading size="sm">{interview.company}</Heading>
                  <Badge colorScheme="blue">{interview.type}</Badge>
                </Flex>
                <Text color="gray.600" mb={3}>{interview.position}</Text>
                <Flex align="center" color="gray.500">
                  <Icon as={FaCalendarAlt} mr={2} />
                  <Text mr={4}>{interview.date}</Text>
                  <Icon as={FaClock} mr={2} />
                  <Text>{interview.time}</Text>
                </Flex>
                <Divider my={3} />
                <Flex justify="space-between">
                  <Button size="sm" colorScheme="blue">Prepare</Button>
                  <Button size="sm" variant="outline">Reschedule</Button>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
        
        {/* Recent Practice Sessions */}
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md">Recent Practice</Heading>
            <Button size="sm" variant="outline" rightIcon={<FaClipboardList />}>
              View All
            </Button>
          </Flex>
          
          <Stack spacing={4}>
            {dashboardData.recentPractice.map(practice => (
              <Box
                key={practice.id}
                p={5}
                shadow="md"
                border="1px"
                borderColor={borderColor}
                rounded="md"
                bg={bgColor}
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Heading size="sm">{practice.title}</Heading>
                  <Badge colorScheme={practice.score > 80 ? "green" : practice.score > 70 ? "yellow" : "red"}>
                    {practice.score}%
                  </Badge>
                </Flex>
                <Text color="gray.600" mb={3}>{practice.questions} questions completed</Text>
                <Flex align="center" color="gray.500">
                  <Icon as={FaCalendarAlt} mr={2} />
                  <Text>{practice.date}</Text>
                </Flex>
                <Divider my={3} />
                <Button size="sm" colorScheme="blue" width="full">
                  Review Session
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </SimpleGrid>
      
      {/* Recommended Topics */}
      <Box
        mt={8}
        p={6}
        shadow="md"
        border="1px"
        borderColor={borderColor}
        rounded="lg"
        bg={bgColor}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">Recommended Practice Topics</Heading>
          <Button size="sm" variant="outline">View All Topics</Button>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          {dashboardData.recommendedTopics.map(topic => (
            <Card key={topic.id} variant="outline">
              <CardHeader pb={2}>
                <Heading size="sm">{topic.title}</Heading>
              </CardHeader>
              <CardBody py={2}>
                <Badge colorScheme={
                  topic.difficulty === 'Beginner' ? 'green' : 
                  topic.difficulty === 'Intermediate' ? 'blue' : 'purple'
                }>
                  {topic.difficulty}
                </Badge>
              </CardBody>
              <CardFooter pt={2}>
                <Button size="sm" leftIcon={<FaStar />} colorScheme="blue" variant="outline" width="full">
                  Start Practice
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Dashboard; 