import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Select,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { 
  FaBookmark, 
  FaChevronDown, 
  FaCode, 
  FaFilter, 
  FaLaptopCode, 
  FaRegBookmark, 
  FaSearch, 
  FaStar, 
  FaTags 
} from 'react-icons/fa';

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [activeQuestions, setActiveQuestions] = useState([]);
  
  // Mock data for questions
  const questionsData = {
    technical: [
      {
        id: 1,
        title: "Explain React's Virtual DOM and its benefits",
        difficulty: "Medium",
        category: "Frontend",
        tags: ["React", "JavaScript", "Performance"],
        isBookmarked: false,
        rating: 4.8,
        answers: 230,
      },
      {
        id: 2,
        title: "How does event delegation work in JavaScript?",
        difficulty: "Easy",
        category: "Frontend",
        tags: ["JavaScript", "DOM", "Events"],
        isBookmarked: true,
        rating: 4.5,
        answers: 195,
      },
      {
        id: 3,
        title: "Implement a function to detect a cycle in a linked list",
        difficulty: "Hard",
        category: "Algorithms",
        tags: ["Data Structures", "Linked Lists", "Algorithms"],
        isBookmarked: false,
        rating: 4.7,
        answers: 156,
      },
      {
        id: 4,
        title: "Explain the differences between REST and GraphQL",
        difficulty: "Medium",
        category: "Backend",
        tags: ["API", "REST", "GraphQL"],
        isBookmarked: false,
        rating: 4.6,
        answers: 210,
      },
      {
        id: 5,
        title: "How would you optimize database queries for performance?",
        difficulty: "Hard",
        category: "Database",
        tags: ["SQL", "Performance", "Optimization"],
        isBookmarked: true,
        rating: 4.9,
        answers: 178,
      },
      {
        id: 6,
        title: "Explain how browser caching works and its benefits",
        difficulty: "Medium",
        category: "Web",
        tags: ["Caching", "Performance", "HTTP"],
        isBookmarked: false,
        rating: 4.4,
        answers: 145,
      },
    ],
    behavioral: [
      {
        id: 7,
        title: "Describe a situation where you had to meet a tight deadline",
        difficulty: "Medium",
        category: "Time Management",
        tags: ["Deadlines", "Pressure", "Prioritization"],
        isBookmarked: false,
        rating: 4.3,
        answers: 220,
      },
      {
        id: 8,
        title: "Tell me about a time when you had to resolve a conflict within your team",
        difficulty: "Medium",
        category: "Teamwork",
        tags: ["Conflict Resolution", "Communication", "Teamwork"],
        isBookmarked: true,
        rating: 4.7,
        answers: 245,
      },
      {
        id: 9,
        title: "Describe a project that failed and what you learned from it",
        difficulty: "Hard",
        category: "Problem Solving",
        tags: ["Failure", "Learning", "Growth"],
        isBookmarked: false,
        rating: 4.8,
        answers: 198,
      },
      {
        id: 10,
        title: "How do you handle feedback, especially when it's critical?",
        difficulty: "Easy",
        category: "Self Improvement",
        tags: ["Feedback", "Growth", "Communication"],
        isBookmarked: false,
        rating: 4.5,
        answers: 230,
      },
    ],
    system_design: [
      {
        id: 11,
        title: "Design a URL shortening service like bit.ly",
        difficulty: "Medium",
        category: "Web Services",
        tags: ["System Design", "Scalability", "Databases"],
        isBookmarked: true,
        rating: 4.9,
        answers: 175,
      },
      {
        id: 12,
        title: "How would you design Twitter's backend?",
        difficulty: "Hard",
        category: "Social Media",
        tags: ["System Design", "Scalability", "Real-time"],
        isBookmarked: false,
        rating: 4.8,
        answers: 156,
      },
      {
        id: 13,
        title: "Design a distributed file storage system",
        difficulty: "Hard",
        category: "Storage",
        tags: ["System Design", "Distribution", "Reliability"],
        isBookmarked: false,
        rating: 4.7,
        answers: 135,
      },
    ],
  };
  
  const categories = [
    "Frontend", "Backend", "Algorithms", "Database", "Web", 
    "Time Management", "Teamwork", "Problem Solving", "Self Improvement",
    "Web Services", "Social Media", "Storage"
  ];
  
  // Filter questions based on search and filters
  useEffect(() => {
    const currentTabQuestions = getCurrentTabQuestions();
    
    const filtered = currentTabQuestions.filter(question => {
      const matchesSearch = searchTerm === '' || 
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = difficultyFilter === '' || 
        question.difficulty === difficultyFilter;
      
      const matchesCategory = categoryFilter === '' || 
        question.category === categoryFilter;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
    
    setActiveQuestions(filtered);
  }, [searchTerm, difficultyFilter, categoryFilter]);
  
  // Get questions for the current active tab
  const getCurrentTabQuestions = () => {
    const activeTab = document.querySelector('.chakra-tabs__tab[aria-selected="true"]')?.getAttribute('data-tab-id');
    
    switch(activeTab) {
      case 'technical':
        return questionsData.technical;
      case 'behavioral':
        return questionsData.behavioral;
      case 'system_design':
        return questionsData.system_design;
      default:
        return [...questionsData.technical, ...questionsData.behavioral, ...questionsData.system_design];
    }
  };
  
  // Handle tab change
  const handleTabChange = (index) => {
    // Reset filters when changing tabs
    setSearchTerm('');
    setDifficultyFilter('');
    setCategoryFilter('');
    
    // Update active questions based on new tab
    setTimeout(() => {
      setActiveQuestions(getCurrentTabQuestions());
    }, 0);
  };
  
  // Toggle bookmark
  const toggleBookmark = (id) => {
    // In a real app, this would call an API to update the bookmark status
    // For this demo, we'll just update the local state
    
    // Find which category the question belongs to
    let category = null;
    let questionIndex = -1;
    
    for (const [key, questions] of Object.entries(questionsData)) {
      const index = questions.findIndex(q => q.id === id);
      if (index !== -1) {
        category = key;
        questionIndex = index;
        break;
      }
    }
    
    if (category && questionIndex !== -1) {
      questionsData[category][questionIndex].isBookmarked = !questionsData[category][questionIndex].isBookmarked;
      setActiveQuestions([...getCurrentTabQuestions()]);
    }
  };
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={2}>Interview Questions</Heading>
      <Text color="gray.500" mb={8}>
        Practice with our curated collection of interview questions
      </Text>
      
      {/* Search and Filter */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4} 
        mb={8}
        align={{ base: 'stretch', md: 'center' }}
      >
        <InputGroup maxW={{ base: 'full', md: '60%' }}>
          <InputLeftElement pointerEvents='none'>
            <Icon as={FaSearch} color='gray.300' />
          </InputLeftElement>
          <Input 
            placeholder='Search questions by keyword or tag' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <Flex gap={4} width={{ base: 'full', md: 'auto' }}>
          <Select 
            placeholder='Difficulty' 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            icon={<FaChevronDown />}
            width={{ base: 'full', md: '150px' }}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<FaChevronDown />} 
              variant="outline"
              leftIcon={<FaFilter />}
            >
              {categoryFilter || 'Category'}
            </MenuButton>
            <MenuList maxH="300px" overflowY="auto">
              <MenuItem onClick={() => setCategoryFilter('')}>All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem 
                  key={category} 
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      
      {/* Question Tabs */}
      <Tabs isFitted variant="enclosed" onChange={handleTabChange} mb={8}>
        <TabList mb={4}>
          <Tab data-tab-id="all">All Questions</Tab>
          <Tab data-tab-id="technical">Technical</Tab>
          <Tab data-tab-id="behavioral">Behavioral</Tab>
          <Tab data-tab-id="system_design">System Design</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel padding={0}>
            <QuestionsGrid 
              questions={activeQuestions.length > 0 ? activeQuestions : [...questionsData.technical, ...questionsData.behavioral, ...questionsData.system_design]}
              toggleBookmark={toggleBookmark}
              cardBg={cardBg}
              cardBorder={cardBorder}
            />
          </TabPanel>
          
          <TabPanel padding={0}>
            <QuestionsGrid 
              questions={activeQuestions.length > 0 ? activeQuestions : questionsData.technical}
              toggleBookmark={toggleBookmark}
              cardBg={cardBg}
              cardBorder={cardBorder}
            />
          </TabPanel>
          
          <TabPanel padding={0}>
            <QuestionsGrid 
              questions={activeQuestions.length > 0 ? activeQuestions : questionsData.behavioral}
              toggleBookmark={toggleBookmark}
              cardBg={cardBg}
              cardBorder={cardBorder}
            />
          </TabPanel>
          
          <TabPanel padding={0}>
            <QuestionsGrid 
              questions={activeQuestions.length > 0 ? activeQuestions : questionsData.system_design}
              toggleBookmark={toggleBookmark}
              cardBg={cardBg}
              cardBorder={cardBorder}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

// Component for the grid of questions
const QuestionsGrid = ({ questions, toggleBookmark, cardBg, cardBorder }) => {
  // Map difficulty to colors
  const difficultyColor = {
    'Easy': 'green',
    'Medium': 'blue',
    'Hard': 'red'
  };
  
  return (
    <>
      {questions.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Heading size="md" color="gray.500">No questions match your filters</Heading>
          <Text mt={2}>Try adjusting your search or filters</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {questions.map(question => (
            <Card 
              key={question.id} 
              bg={cardBg}
              borderColor={cardBorder}
              borderWidth="1px"
              overflow="hidden"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            >
              <CardBody>
                <Flex justify="space-between" align="flex-start" mb={2}>
                  <Badge colorScheme={difficultyColor[question.difficulty]} mb={2}>
                    {question.difficulty}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(question.id)}
                    aria-label={question.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    <Icon 
                      as={question.isBookmarked ? FaBookmark : FaRegBookmark} 
                      color={question.isBookmarked ? "blue.500" : "gray.400"}
                    />
                  </Button>
                </Flex>
                
                <Heading size="md" mb={3}>{question.title}</Heading>
                
                <Flex align="center" mb={3} color="gray.500">
                  <Icon as={FaTags} mr={2} />
                  <Text fontSize="sm">{question.category}</Text>
                </Flex>
                
                <Flex wrap="wrap" gap={2} mb={3}>
                  {question.tags.map((tag, index) => (
                    <Tag key={index} size="sm" colorScheme="blue" variant="subtle">
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
                
                <Flex justify="space-between" fontSize="sm" color="gray.500">
                  <Flex align="center">
                    <Icon as={FaStar} color="yellow.400" mr={1} />
                    <Text>{question.rating}</Text>
                  </Flex>
                  <Text>{question.answers} answers</Text>
                </Flex>
              </CardBody>
              
              <CardFooter 
                pt={0} 
                px={4} 
                pb={4} 
                mt={-2}
              >
                <Button 
                  width="full" 
                  leftIcon={<FaCode />} 
                  colorScheme="blue"
                >
                  Practice Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default Questions; 