import React, { useState, useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
  Badge,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { 
  FaEdit, 
  FaGithub, 
  FaLinkedin, 
  FaPlus, 
  FaSave, 
  FaUser
} from 'react-icons/fa';

// Mock user context - in a real app this would be from AuthContext
const UserContext = React.createContext();

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'Full Stack Developer with 5 years of experience. Passionate about React, Node.js, and cloud technologies.',
    location: 'San Francisco, CA',
    github: 'janedoe',
    linkedin: 'jane-doe',
    phone: '(555) 123-4567',
    jobTitle: 'Senior Frontend Developer',
    targetRole: 'Lead Frontend Developer',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    preferredCompanies: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
    interviewPreferences: {
      focusAreas: ['System Design', 'Frontend', 'Behavioral'],
      difficulty: 'Medium',
      notificationFrequency: 'Daily',
      receiveEmailReminders: true,
      showProfilePublicly: false,
    },
    progress: {
      technicalQuestions: 35,
      behavioralQuestions: 18,
      mockInterviews: 4,
      totalHours: 24
    }
  });
  
  // Form state
  const [formData, setFormData] = useState({ ...userData });
  const [newSkill, setNewSkill] = useState('');
  const [newCompany, setNewCompany] = useState('');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle nested preference changes
  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      interviewPreferences: {
        ...prev.interviewPreferences,
        [name]: value
      }
    }));
  };
  
  // Handle toggle switches
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interviewPreferences: {
        ...prev.interviewPreferences,
        [name]: checked
      }
    }));
  };
  
  // Add a new skill
  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };
  
  // Remove a skill
  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  // Add a new preferred company
  const addCompany = () => {
    if (newCompany && !formData.preferredCompanies.includes(newCompany)) {
      setFormData(prev => ({
        ...prev,
        preferredCompanies: [...prev.preferredCompanies, newCompany]
      }));
      setNewCompany('');
    }
  };
  
  // Remove a company
  const removeCompany = (company) => {
    setFormData(prev => ({
      ...prev,
      preferredCompanies: prev.preferredCompanies.filter(c => c !== company)
    }));
  };
  
  // Save profile changes
  const saveChanges = () => {
    setUserData(formData);
    setIsEditing(false);
    toast({
      title: 'Profile updated',
      description: "Your profile has been successfully updated.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };
  
  return (
    <Container maxW="container.lg" py={8}>
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        align={{ base: 'center', md: 'flex-start' }}
        justify="space-between"
        mb={6}
      >
        <Flex direction="column" align={{ base: 'center', md: 'flex-start' }}>
          <Heading size="lg">My Profile</Heading>
          <Text color="gray.500">Manage your personal information and preferences</Text>
        </Flex>
        
        {!isEditing ? (
          <Button 
            leftIcon={<FaEdit />} 
            colorScheme="blue" 
            onClick={() => setIsEditing(true)}
            mt={{ base: 4, md: 0 }}
          >
            Edit Profile
          </Button>
        ) : (
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
            <Button 
              leftIcon={<FaSave />} 
              colorScheme="blue" 
              onClick={saveChanges}
            >
              Save Changes
            </Button>
          </HStack>
        )}
      </Flex>
      
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Profile Info</Tab>
          <Tab>Interview Preferences</Tab>
          <Tab>Progress</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <VStack 
                  p={5} 
                  bg={bg} 
                  borderRadius="md" 
                  borderWidth="1px" 
                  borderColor={borderColor}
                  spacing={4}
                  align="center"
                >
                  <Avatar 
                    size="xl" 
                    name={userData.name} 
                    src="https://bit.ly/broken-link"
                    mb={2}
                  />
                  
                  <Heading size="md">{userData.name}</Heading>
                  <Text color="gray.500">{userData.jobTitle}</Text>
                  <Text fontSize="sm" color="gray.600">{userData.location}</Text>
                  
                  <Divider />
                  
                  <HStack>
                    <Button 
                      leftIcon={<FaGithub />} 
                      variant="outline" 
                      size="sm"
                      as="a" 
                      href={`https://github.com/${userData.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Button>
                    <Button 
                      leftIcon={<FaLinkedin />} 
                      variant="outline" 
                      size="sm"
                      as="a" 
                      href={`https://www.linkedin.com/in/${userData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </Button>
                  </HStack>
                </VStack>
              </GridItem>
              
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box 
                  p={5} 
                  bg={bg} 
                  borderRadius="md" 
                  borderWidth="1px" 
                  borderColor={borderColor}
                >
                  <Heading size="md" mb={4}>Personal Information</Heading>
                  
                  <Stack spacing={4}>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel>Full Name</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="name" 
                              value={formData.name} 
                              onChange={handleChange}
                            />
                          ) : (
                            <Text>{userData.name}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel>Email</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="email" 
                              value={formData.email} 
                              onChange={handleChange}
                              type="email"
                            />
                          ) : (
                            <Text>{userData.email}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel>Phone</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleChange}
                            />
                          ) : (
                            <Text>{userData.phone}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel>Location</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="location" 
                              value={formData.location} 
                              onChange={handleChange}
                            />
                          ) : (
                            <Text>{userData.location}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                    </Grid>
                    
                    <FormControl mt={4}>
                      <FormLabel>Bio</FormLabel>
                      {isEditing ? (
                        <Textarea 
                          name="bio" 
                          value={formData.bio} 
                          onChange={handleChange}
                          rows={3}
                        />
                      ) : (
                        <Text>{userData.bio}</Text>
                      )}
                    </FormControl>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mt={4}>
                      <GridItem>
                        <FormControl>
                          <FormLabel>Current Job Title</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="jobTitle" 
                              value={formData.jobTitle} 
                              onChange={handleChange}
                            />
                          ) : (
                            <Text>{userData.jobTitle}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel>Target Role</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="targetRole" 
                              value={formData.targetRole} 
                              onChange={handleChange}
                            />
                          ) : (
                            <Text>{userData.targetRole}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel>GitHub Username</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="github" 
                              value={formData.github} 
                              onChange={handleChange}
                            />
                          ) : (
                            <Text>{userData.github}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel>LinkedIn Username</FormLabel>
                          {isEditing ? (
                            <Input 
                              name="linkedin" 
                              value={formData.linkedin} 
                              onChange={handleChange}
                            />
                          ) : (
                            <Text>{userData.linkedin}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                    </Grid>
                    
                    <Box mt={4}>
                      <FormLabel>Skills</FormLabel>
                      <Flex wrap="wrap" gap={2} mb={isEditing ? 3 : 0}>
                        {formData.skills.map((skill, index) => (
                          <Tag 
                            key={index}
                            size="md"
                            borderRadius="full"
                            variant="solid"
                            colorScheme="blue"
                          >
                            <TagLabel>{skill}</TagLabel>
                            {isEditing && (
                              <TagCloseButton onClick={() => removeSkill(skill)} />
                            )}
                          </Tag>
                        ))}
                      </Flex>
                      
                      {isEditing && (
                        <Flex mt={2}>
                          <Input 
                            placeholder="Add a skill" 
                            value={newSkill} 
                            onChange={(e) => setNewSkill(e.target.value)}
                            mr={2}
                          />
                          <Button onClick={addSkill} leftIcon={<FaPlus />} colorScheme="blue">
                            Add
                          </Button>
                        </Flex>
                      )}
                    </Box>
                    
                    <Box mt={4}>
                      <FormLabel>Preferred Companies</FormLabel>
                      <Flex wrap="wrap" gap={2} mb={isEditing ? 3 : 0}>
                        {formData.preferredCompanies.map((company, index) => (
                          <Tag 
                            key={index}
                            size="md"
                            borderRadius="full"
                            variant="outline"
                            colorScheme="purple"
                          >
                            <TagLabel>{company}</TagLabel>
                            {isEditing && (
                              <TagCloseButton onClick={() => removeCompany(company)} />
                            )}
                          </Tag>
                        ))}
                      </Flex>
                      
                      {isEditing && (
                        <Flex mt={2}>
                          <Input 
                            placeholder="Add a company" 
                            value={newCompany} 
                            onChange={(e) => setNewCompany(e.target.value)}
                            mr={2}
                          />
                          <Button onClick={addCompany} leftIcon={<FaPlus />} colorScheme="purple">
                            Add
                          </Button>
                        </Flex>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>
          
          <TabPanel>
            <Box 
              p={5} 
              bg={bg} 
              borderRadius="md" 
              borderWidth="1px" 
              borderColor={borderColor}
            >
              <Heading size="md" mb={6}>Interview Preferences</Heading>
              
              <Stack spacing={6}>
                <FormControl>
                  <FormLabel>Focus Areas</FormLabel>
                  {isEditing ? (
                    <Flex wrap="wrap" gap={2}>
                      {['System Design', 'Frontend', 'Backend', 'Algorithms', 'Behavioral'].map((area) => (
                        <Tag 
                          key={area}
                          size="md"
                          borderRadius="full"
                          variant={formData.interviewPreferences.focusAreas.includes(area) ? 'solid' : 'outline'}
                          colorScheme="blue"
                          cursor="pointer"
                          onClick={() => {
                            const updated = formData.interviewPreferences.focusAreas.includes(area)
                              ? formData.interviewPreferences.focusAreas.filter(a => a !== area)
                              : [...formData.interviewPreferences.focusAreas, area];
                            
                            setFormData(prev => ({
                              ...prev,
                              interviewPreferences: {
                                ...prev.interviewPreferences,
                                focusAreas: updated
                              }
                            }));
                          }}
                        >
                          <TagLabel>{area}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  ) : (
                    <Flex wrap="wrap" gap={2}>
                      {userData.interviewPreferences.focusAreas.map((area, index) => (
                        <Tag key={index} colorScheme="blue" borderRadius="full">
                          <TagLabel>{area}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  )}
                </FormControl>
                
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                  <FormControl>
                    <FormLabel>Preferred Difficulty Level</FormLabel>
                    {isEditing ? (
                      <Select 
                        name="difficulty" 
                        value={formData.interviewPreferences.difficulty}
                        onChange={handlePreferenceChange}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </Select>
                    ) : (
                      <Text>{userData.interviewPreferences.difficulty}</Text>
                    )}
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Notification Frequency</FormLabel>
                    {isEditing ? (
                      <Select 
                        name="notificationFrequency" 
                        value={formData.interviewPreferences.notificationFrequency}
                        onChange={handlePreferenceChange}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Never">Never</option>
                      </Select>
                    ) : (
                      <Text>{userData.interviewPreferences.notificationFrequency}</Text>
                    )}
                  </FormControl>
                </Grid>
                
                <Stack spacing={4}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="receiveEmailReminders" mb="0">
                      Receive Email Reminders
                    </FormLabel>
                    <Switch 
                      id="receiveEmailReminders"
                      name="receiveEmailReminders"
                      isChecked={formData.interviewPreferences.receiveEmailReminders}
                      onChange={handleToggleChange}
                      isDisabled={!isEditing}
                      colorScheme="blue"
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="showProfilePublicly" mb="0">
                      Make My Profile Public
                    </FormLabel>
                    <Switch 
                      id="showProfilePublicly"
                      name="showProfilePublicly"
                      isChecked={formData.interviewPreferences.showProfilePublicly}
                      onChange={handleToggleChange}
                      isDisabled={!isEditing}
                      colorScheme="blue"
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Box>
          </TabPanel>
          
          <TabPanel>
            <Box 
              p={5} 
              bg={bg} 
              borderRadius="md" 
              borderWidth="1px" 
              borderColor={borderColor}
            >
              <Heading size="md" mb={6}>Your Progress</Heading>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem>
                  <Box 
                    p={5} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    borderColor={borderColor}
                  >
                    <Heading size="sm" mb={4}>Questions Completed</Heading>
                    
                    <VStack spacing={4} align="stretch">
                      <Flex justify="space-between">
                        <Text>Technical Questions</Text>
                        <Badge colorScheme="blue" fontSize="md">
                          {userData.progress.technicalQuestions}
                        </Badge>
                      </Flex>
                      
                      <Flex justify="space-between">
                        <Text>Behavioral Questions</Text>
                        <Badge colorScheme="green" fontSize="md">
                          {userData.progress.behavioralQuestions}
                        </Badge>
                      </Flex>
                      
                      <Flex justify="space-between">
                        <Text>Total</Text>
                        <Badge colorScheme="purple" fontSize="md">
                          {userData.progress.technicalQuestions + userData.progress.behavioralQuestions}
                        </Badge>
                      </Flex>
                    </VStack>
                  </Box>
                </GridItem>
                
                <GridItem>
                  <Box 
                    p={5} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    borderColor={borderColor}
                  >
                    <Heading size="sm" mb={4}>Interview Practice</Heading>
                    
                    <VStack spacing={4} align="stretch">
                      <Flex justify="space-between">
                        <Text>Mock Interviews</Text>
                        <Badge colorScheme="orange" fontSize="md">
                          {userData.progress.mockInterviews}
                        </Badge>
                      </Flex>
                      
                      <Flex justify="space-between">
                        <Text>Total Practice Hours</Text>
                        <Badge colorScheme="red" fontSize="md">
                          {userData.progress.totalHours}
                        </Badge>
                      </Flex>
                      
                      <Flex justify="space-between">
                        <Text>Current Streak</Text>
                        <Badge colorScheme="yellow" fontSize="md">
                          5 days
                        </Badge>
                      </Flex>
                    </VStack>
                  </Box>
                </GridItem>
              </Grid>
              
              <Box 
                mt={6} 
                p={5} 
                borderWidth="1px" 
                borderRadius="md" 
                borderColor={borderColor}
                bg={useColorModeValue('blue.50', 'blue.900')}
              >
                <Heading size="sm" mb={3}>Recommendation</Heading>
                <Text>
                  Based on your progress, we recommend focusing more on System Design questions to improve your overall readiness. 
                  Try to complete at least 2 mock interviews this week to prepare for your upcoming interviews.
                </Text>
                
                <Button mt={4} colorScheme="blue" size="sm">
                  Schedule a Mock Interview
                </Button>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Profile; 