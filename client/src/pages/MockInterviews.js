import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaClock,
  FaFileAlt,
  FaPlus,
  FaTrash,
  FaUserTie,
  FaVideo,
} from 'react-icons/fa';

const MockInterviews = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const feedbackBgColor = useColorModeValue('gray.50', 'gray.600');
  
  // Mock data for scheduled interviews
  const [scheduledInterviews, setScheduledInterviews] = useState([
    {
      id: 1,
      type: 'Technical',
      focus: 'Frontend Development',
      interviewer: 'Alex Johnson',
      date: '2023-07-15',
      time: '10:00 AM',
      duration: 60,
      platform: 'Zoom',
      notes: 'Prepare React hooks and state management questions',
      status: 'upcoming',
    },
    {
      id: 2,
      type: 'Behavioral',
      focus: 'Leadership Skills',
      interviewer: 'Samantha Lee',
      date: '2023-07-10',
      time: '2:00 PM',
      duration: 45,
      platform: 'Google Meet',
      notes: 'Focus on conflict resolution and team management scenarios',
      status: 'upcoming',
    },
    {
      id: 3,
      type: 'System Design',
      focus: 'Distributed Systems',
      interviewer: 'Michael Chen',
      date: '2023-06-28',
      time: '11:30 AM',
      duration: 90,
      platform: 'Microsoft Teams',
      notes: 'Review scalability and database design principles',
      status: 'completed',
      feedback: 'Good understanding of basic concepts. Need to work on explaining trade-offs better.',
      rating: 4,
    },
    {
      id: 4,
      type: 'Technical',
      focus: 'Algorithms',
      interviewer: 'David Wilson',
      date: '2023-06-25',
      time: '3:00 PM',
      duration: 60,
      platform: 'Zoom',
      notes: 'Practice dynamic programming and graph algorithms',
      status: 'completed',
      feedback: 'Strong problem-solving skills. Could improve time complexity analysis.',
      rating: 3,
    },
  ]);
  
  // Available interviewers
  const availableInterviewers = [
    { id: 1, name: 'Alex Johnson', specialization: 'Frontend Development', rating: 4.8 },
    { id: 2, name: 'Samantha Lee', specialization: 'Leadership & Behavioral', rating: 4.9 },
    { id: 3, name: 'Michael Chen', specialization: 'System Design', rating: 4.7 },
    { id: 4, name: 'David Wilson', specialization: 'Algorithms & Data Structures', rating: 4.6 },
    { id: 5, name: 'Emily Rodriguez', specialization: 'Backend Development', rating: 4.8 },
    { id: 6, name: 'Robert Kim', specialization: 'Mobile Development', rating: 4.5 },
  ];
  
  // State for new interview form
  const [newInterview, setNewInterview] = useState({
    type: 'Technical',
    focus: '',
    interviewer: '',
    date: '',
    time: '',
    duration: 60,
    platform: 'Zoom',
    notes: '',
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Schedule a new interview
  const scheduleInterview = () => {
    // Simple validation
    if (!newInterview.focus || !newInterview.interviewer || !newInterview.date || !newInterview.time) {
      toast({
        title: 'Missing information',
        description: 'Please fill out all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    const interview = {
      id: scheduledInterviews.length + 1,
      ...newInterview,
      status: 'upcoming',
    };
    
    setScheduledInterviews(prev => [...prev, interview]);
    
    toast({
      title: 'Interview scheduled',
      description: `Your ${newInterview.type} interview has been scheduled successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Reset form and close modal
    setNewInterview({
      type: 'Technical',
      focus: '',
      interviewer: '',
      date: '',
      time: '',
      duration: 60,
      platform: 'Zoom',
      notes: '',
    });
    onClose();
  };
  
  // Cancel an interview
  const cancelInterview = (id) => {
    setScheduledInterviews(prev => prev.filter(interview => interview.id !== id));
    
    toast({
      title: 'Interview cancelled',
      description: 'The interview has been cancelled successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Filter interviews by status
  const upcomingInterviews = scheduledInterviews.filter(interview => interview.status === 'upcoming');
  const completedInterviews = scheduledInterviews.filter(interview => interview.status === 'completed');
  
  // Get interviewer by name
  const getInterviewer = (name) => {
    return availableInterviewers.find(interviewer => interviewer.name === name) || { rating: 0 };
  };
  
  return (
    <Container maxW="container.lg" py={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg">Mock Interviews</Heading>
          <Text color="gray.500">Schedule and manage your interview practice sessions</Text>
        </Box>
        
        <Button 
          leftIcon={<FaPlus />} 
          colorScheme="blue" 
          onClick={onOpen}
        >
          Schedule Interview
        </Button>
      </Flex>
      
      <Tabs colorScheme="blue" variant="enclosed">
        <TabList>
          <Tab>Upcoming ({upcomingInterviews.length})</Tab>
          <Tab>Completed ({completedInterviews.length})</Tab>
          <Tab>Find Interviewers</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            {upcomingInterviews.length > 0 ? (
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                {upcomingInterviews.map(interview => (
                  <GridItem key={interview.id}>
                    <Box 
                      p={5} 
                      bg={bgColor} 
                      borderRadius="md" 
                      borderWidth="1px" 
                      borderColor={borderColor}
                      position="relative"
                    >
                      <Tag 
                        size="sm" 
                        colorScheme={
                          interview.type === 'Technical' ? 'blue' : 
                          interview.type === 'Behavioral' ? 'green' : 'purple'
                        } 
                        position="absolute" 
                        top={3} 
                        right={3}
                      >
                        {interview.type}
                      </Tag>
                      
                      <Heading size="md" mb={3}>{interview.focus}</Heading>
                      
                      <Grid templateColumns="1fr 1fr" gap={3} mt={4}>
                        <HStack>
                          <Icon as={FaUserTie} color="gray.500" />
                          <Text fontSize="sm">{interview.interviewer}</Text>
                        </HStack>
                        
                        <HStack>
                          <Icon as={FaCalendarAlt} color="gray.500" />
                          <Text fontSize="sm">{interview.date}</Text>
                        </HStack>
                        
                        <HStack>
                          <Icon as={FaClock} color="gray.500" />
                          <Text fontSize="sm">{interview.time} ({interview.duration} min)</Text>
                        </HStack>
                        
                        <HStack>
                          <Icon as={FaVideo} color="gray.500" />
                          <Text fontSize="sm">{interview.platform}</Text>
                        </HStack>
                      </Grid>
                      
                      {interview.notes && (
                        <Box mt={4}>
                          <Text fontSize="sm" fontWeight="bold">Notes:</Text>
                          <Text fontSize="sm" color="gray.600">{interview.notes}</Text>
                        </Box>
                      )}
                      
                      <Flex mt={5} justify="space-between">
                        <Button 
                          size="sm" 
                          leftIcon={<FaCalendarCheck />} 
                          colorScheme="blue" 
                          variant="outline"
                        >
                          Join Meeting
                        </Button>
                        
                        <Button 
                          size="sm" 
                          leftIcon={<FaTrash />} 
                          colorScheme="red" 
                          variant="ghost" 
                          onClick={() => cancelInterview(interview.id)}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Box 
                p={8} 
                textAlign="center" 
                bg={bgColor} 
                borderRadius="md" 
                borderWidth="1px" 
                borderColor={borderColor}
              >
                <Heading size="md" mb={3}>No Upcoming Interviews</Heading>
                <Text mb={5}>Schedule a mock interview to practice your skills</Text>
                <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
                  Schedule Now
                </Button>
              </Box>
            )}
          </TabPanel>
          
          <TabPanel>
            {completedInterviews.length > 0 ? (
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                {completedInterviews.map(interview => (
                  <GridItem key={interview.id}>
                    <Box 
                      p={5} 
                      bg={bgColor} 
                      borderRadius="md" 
                      borderWidth="1px" 
                      borderColor={borderColor}
                    >
                      <Tag 
                        size="sm" 
                        colorScheme={
                          interview.type === 'Technical' ? 'blue' : 
                          interview.type === 'Behavioral' ? 'green' : 'purple'
                        } 
                        position="absolute" 
                        top={3} 
                        right={3}
                      >
                        {interview.type}
                      </Tag>
                      
                      <Heading size="md" mb={3}>{interview.focus}</Heading>
                      
                      <Grid templateColumns="1fr 1fr" gap={3} mt={4}>
                        <HStack>
                          <Icon as={FaUserTie} color="gray.500" />
                          <Text fontSize="sm">{interview.interviewer}</Text>
                        </HStack>
                        
                        <HStack>
                          <Icon as={FaCalendarAlt} color="gray.500" />
                          <Text fontSize="sm">{interview.date}</Text>
                        </HStack>
                      </Grid>
                      
                      <Box mt={4} p={3} bg={feedbackBgColor} borderRadius="md">
                        <Text fontWeight="bold" mb={1}>Feedback:</Text>
                        <Text fontSize="sm">{interview.feedback}</Text>
                        
                        <Text mt={3} fontWeight="bold">Rating:</Text>
                        <HStack spacing={1} mt={1}>
                          {[...Array(5)].map((_, i) => (
                            <Box 
                              key={i} 
                              w={4} 
                              h={4} 
                              bg={i < interview.rating ? 'yellow.400' : 'gray.200'} 
                              borderRadius="sm"
                            />
                          ))}
                        </HStack>
                      </Box>
                      
                      <Button 
                        mt={4} 
                        size="sm" 
                        leftIcon={<FaFileAlt />} 
                        colorScheme="blue" 
                        variant="outline"
                        w="full"
                      >
                        View Detailed Report
                      </Button>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Box 
                p={8} 
                textAlign="center" 
                bg={bgColor} 
                borderRadius="md" 
                borderWidth="1px" 
                borderColor={borderColor}
              >
                <Heading size="md" mb={3}>No Completed Interviews</Heading>
                <Text>Your completed interviews will appear here</Text>
              </Box>
            )}
          </TabPanel>
          
          <TabPanel>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {availableInterviewers.map(interviewer => (
                <GridItem key={interviewer.id}>
                  <Box 
                    p={5} 
                    bg={bgColor} 
                    borderRadius="md" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    position="relative"
                  >
                    <Flex direction="column" align="center">
                      <Box 
                        bg="blue.500" 
                        color="white" 
                        borderRadius="full" 
                        w={16} 
                        h={16} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                        mb={3}
                      >
                        <Icon as={FaUserTie} boxSize={8} />
                      </Box>
                      
                      <Heading size="md" mb={1}>{interviewer.name}</Heading>
                      <Text fontWeight="medium" color="gray.500" mb={2}>{interviewer.specialization}</Text>
                      
                      <HStack spacing={1} mb={4}>
                        {[...Array(5)].map((_, i) => (
                          <Box 
                            key={i} 
                            w={3} 
                            h={3} 
                            bg={i < Math.floor(interviewer.rating) ? 'yellow.400' : 'gray.200'} 
                            borderRadius="sm"
                          />
                        ))}
                        <Text ml={1} fontSize="sm">{interviewer.rating}</Text>
                      </HStack>
                      
                      <Button 
                        colorScheme="blue" 
                        size="sm" 
                        leftIcon={<FaCalendarAlt />}
                        onClick={() => {
                          setNewInterview(prev => ({
                            ...prev,
                            interviewer: interviewer.name
                          }));
                          onOpen();
                        }}
                      >
                        Schedule
                      </Button>
                    </Flex>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Schedule Interview Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule Mock Interview</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Interview Type</FormLabel>
                <RadioGroup 
                  value={newInterview.type} 
                  onChange={(value) => setNewInterview(prev => ({ ...prev, type: value }))}
                >
                  <Stack direction={{ base: 'column', md: 'row' }} spacing={5}>
                    <Radio value="Technical">Technical</Radio>
                    <Radio value="Behavioral">Behavioral</Radio>
                    <Radio value="System Design">System Design</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Focus Area</FormLabel>
                <Input 
                  name="focus" 
                  value={newInterview.focus} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Frontend Development, Leadership Skills"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Interviewer</FormLabel>
                <Select 
                  name="interviewer" 
                  value={newInterview.interviewer} 
                  onChange={handleInputChange}
                  placeholder="Select interviewer"
                >
                  {availableInterviewers.map(interviewer => (
                    <option key={interviewer.id} value={interviewer.name}>
                      {interviewer.name} - {interviewer.specialization}
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input 
                    name="date" 
                    value={newInterview.date} 
                    onChange={handleInputChange} 
                    type="date"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Time</FormLabel>
                  <Input 
                    name="time" 
                    value={newInterview.time} 
                    onChange={handleInputChange} 
                    type="time"
                  />
                </FormControl>
              </Grid>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                <FormControl>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <Select 
                    name="duration" 
                    value={newInterview.duration} 
                    onChange={handleInputChange}
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Platform</FormLabel>
                  <Select 
                    name="platform" 
                    value={newInterview.platform} 
                    onChange={handleInputChange}
                  >
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="Skype">Skype</option>
                  </Select>
                </FormControl>
              </Grid>
              
              <FormControl>
                <FormLabel>Additional Notes</FormLabel>
                <Textarea 
                  name="notes" 
                  value={newInterview.notes} 
                  onChange={handleInputChange}
                  placeholder="Any specific topics or scenarios you want to practice"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={scheduleInterview}>
              Schedule Interview
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MockInterviews; 