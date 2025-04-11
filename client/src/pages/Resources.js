import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Select,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaBook,
  FaCode,
  FaExternalLinkAlt,
  FaFilter,
  FaGraduationCap,
  FaLaptopCode,
  FaPencilAlt,
  FaRegBookmark,
  FaRegStar,
  FaSearch,
  FaStar,
  FaVideo,
} from 'react-icons/fa';

const Resources = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');
  
  // Resource categories
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'algorithms', name: 'Algorithms & Data Structures' },
    { id: 'system_design', name: 'System Design' },
    { id: 'behavioral', name: 'Behavioral' },
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'language', name: 'Programming Languages' },
  ];
  
  // Types of resources
  const resourceTypes = [
    { id: 'all', name: 'All Types', icon: null },
    { id: 'article', name: 'Articles', icon: FaPencilAlt },
    { id: 'video', name: 'Videos', icon: FaVideo },
    { id: 'book', name: 'Books', icon: FaBook },
    { id: 'course', name: 'Courses', icon: FaGraduationCap },
    { id: 'practice', name: 'Practice', icon: FaLaptopCode },
  ];
  
  // Sample resources data
  const allResources = [
    {
      id: 1,
      title: 'Cracking the Coding Interview',
      description: 'The most popular book for preparing for coding interviews. Covers algorithms, data structures, and much more.',
      type: 'book',
      categories: ['algorithms', 'system_design', 'behavioral'],
      rating: 4.8,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.example.com/ctci',
      difficulty: 'Intermediate',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'System Design Interview',
      description: 'A comprehensive guide to answering system design questions in technical interviews.',
      type: 'book',
      categories: ['system_design'],
      rating: 4.7,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.example.com/sdi',
      difficulty: 'Advanced',
      isFeatured: true,
    },
    {
      id: 3,
      title: 'LeetCode Patterns',
      description: 'Learn common patterns to solve algorithmic problems efficiently.',
      type: 'practice',
      categories: ['algorithms'],
      rating: 4.9,
      image: 'https://via.placeholder.com/100',
      url: 'https://leetcode.com',
      difficulty: 'Intermediate',
      isFeatured: true,
    },
    {
      id: 4,
      title: 'Frontend Interview Handbook',
      description: 'Everything you need to know to ace your frontend interviews.',
      type: 'article',
      categories: ['frontend'],
      rating: 4.6,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.example.com/fih',
      difficulty: 'Intermediate',
      isFeatured: false,
    },
    {
      id: 5,
      title: 'System Design Primer',
      description: 'Learn how to design large-scale systems. Prep for the system design interview.',
      type: 'article',
      categories: ['system_design'],
      rating: 4.9,
      image: 'https://via.placeholder.com/100',
      url: 'https://github.com/donnemartin/system-design-primer',
      difficulty: 'Advanced',
      isFeatured: true,
    },
    {
      id: 6,
      title: 'Master the Coding Interview: Data Structures + Algorithms',
      description: 'The ultimate course to prepare for coding interviews.',
      type: 'course',
      categories: ['algorithms'],
      rating: 4.7,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/',
      difficulty: 'Beginner to Advanced',
      isFeatured: false,
    },
    {
      id: 7,
      title: 'Grokking the Behavioral Interview',
      description: 'Learn strategies to tackle behavioral interview questions.',
      type: 'course',
      categories: ['behavioral'],
      rating: 4.5,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.educative.io/courses/grokking-the-behavioral-interview',
      difficulty: 'Beginner',
      isFeatured: false,
    },
    {
      id: 8,
      title: 'HackerRank',
      description: 'Practice coding challenges and prepare for interviews with real companies.',
      type: 'practice',
      categories: ['algorithms', 'language'],
      rating: 4.6,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.hackerrank.com/',
      difficulty: 'Beginner to Advanced',
      isFeatured: false,
    },
    {
      id: 9,
      title: 'React Interview Questions',
      description: 'Comprehensive list of React interview questions and answers.',
      type: 'article',
      categories: ['frontend'],
      rating: 4.5,
      image: 'https://via.placeholder.com/100',
      url: 'https://github.com/sudheerj/reactjs-interview-questions',
      difficulty: 'Intermediate',
      isFeatured: false,
    },
    {
      id: 10,
      title: 'Backend Developer Interview Questions',
      description: 'Collection of questions to help you prepare for backend interviews.',
      type: 'article',
      categories: ['backend'],
      rating: 4.4,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.example.com/backend-questions',
      difficulty: 'Intermediate to Advanced',
      isFeatured: false,
    },
    {
      id: 11,
      title: 'Effective Java',
      description: 'Best practices for the Java platform, important for Java interviews.',
      type: 'book',
      categories: ['language', 'backend'],
      rating: 4.8,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.example.com/effective-java',
      difficulty: 'Intermediate',
      isFeatured: false,
    },
    {
      id: 12,
      title: 'STAR Method for Behavioral Interviews',
      description: 'Learn the STAR method to effectively answer behavioral interview questions.',
      type: 'video',
      categories: ['behavioral'],
      rating: 4.6,
      image: 'https://via.placeholder.com/100',
      url: 'https://www.youtube.com/watch?v=example',
      difficulty: 'Beginner',
      isFeatured: false,
    },
  ];
  
  // State for filters and search
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  // Filter resources based on selected criteria
  const filteredResources = allResources.filter(resource => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || resource.categories.includes(selectedCategory);
    
    // Filter by type
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    
    // Filter by search query
    const searchMatch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && typeMatch && searchMatch;
  });
  
  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'featured') {
      // Featured items first, then by rating
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  // Get icon for resource type
  const getResourceTypeIcon = (type) => {
    const resourceType = resourceTypes.find(rt => rt.id === type);
    return resourceType?.icon || FaCode;
  };
  
  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>Interview Resources</Heading>
        <Text color="gray.500">Explore resources to help you prepare for your interviews</Text>
      </Box>
      
      {/* Search and Filters */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4} 
        mb={8} 
        p={5} 
        bg={bgColor} 
        borderRadius="md" 
        borderWidth="1px" 
        borderColor={borderColor}
      >
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search resources..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        
        <Flex gap={4} wrap={{ base: 'wrap', md: 'nowrap' }}>
          <Select 
            w={{ base: 'full', md: '200px' }} 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            icon={<FaFilter />}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Select>
          
          <Select 
            w={{ base: 'full', md: '200px' }} 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {resourceTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </Select>
          
          <Select 
            w={{ base: 'full', md: '200px' }} 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="rating">Highest Rated</option>
            <option value="title">Alphabetical</option>
          </Select>
        </Flex>
      </Flex>
      
      {/* Featured Resources */}
      {sortBy === 'featured' && (
        <>
          <Heading size="md" mb={4}>Featured Resources</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={10}>
            {sortedResources
              .filter(resource => resource.isFeatured)
              .slice(0, 3)
              .map(resource => (
                <GridItem key={resource.id}>
                  <Link href={resource.url} isExternal _hover={{ textDecoration: 'none' }}>
                    <Box 
                      p={5} 
                      h="full"
                      bg={bgColor} 
                      borderRadius="md" 
                      borderWidth="1px" 
                      borderColor={borderColor}
                      transition="all 0.3s"
                      _hover={{ transform: 'translateY(-5px)', boxShadow: 'md', borderColor: 'blue.300' }}
                    >
                      <Flex alignItems="center" mb={4}>
                        <Image 
                          src={resource.image} 
                          alt={resource.title} 
                          boxSize="70px" 
                          borderRadius="md" 
                          mr={4} 
                          objectFit="cover"
                        />
                        <Box>
                          <Flex align="center" mb={1}>
                            <Icon 
                              as={getResourceTypeIcon(resource.type)} 
                              mr={2} 
                              color="blue.500" 
                              boxSize={4}
                            />
                            <Text fontSize="sm" fontWeight="medium" color="blue.500" textTransform="uppercase">
                              {resourceTypes.find(rt => rt.id === resource.type)?.name || resource.type}
                            </Text>
                          </Flex>
                          <Heading size="md" mb={1}>{resource.title}</Heading>
                          <Flex align="center">
                            <HStack color="yellow.400" mr={2}>
                              {[...Array(5)].map((_, i) => (
                                <Icon 
                                  key={i} 
                                  as={i < Math.floor(resource.rating) ? FaStar : FaRegStar} 
                                  boxSize={3} 
                                />
                              ))}
                            </HStack>
                            <Text fontSize="sm" color="gray.500">{resource.rating}/5.0</Text>
                          </Flex>
                        </Box>
                      </Flex>
                      <Text fontSize="sm" noOfLines={3} mb={4} color="gray.600">
                        {resource.description}
                      </Text>
                      <Flex justify="space-between" align="center">
                        <Tag size="sm" colorScheme="blue">{resource.difficulty}</Tag>
                        <Icon as={FaExternalLinkAlt} boxSize={3} color="gray.400" />
                      </Flex>
                    </Box>
                  </Link>
                </GridItem>
              ))}
          </Grid>
        </>
      )}
      
      {/* All Resources */}
      <Heading size="md" mb={4}>{selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.name}</Heading>
      {sortedResources.length > 0 ? (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {sortedResources
            .filter(resource => sortBy !== 'featured' || !resource.isFeatured)
            .map(resource => (
              <GridItem key={resource.id}>
                <Link href={resource.url} isExternal _hover={{ textDecoration: 'none' }}>
                  <Box 
                    p={4} 
                    bg={bgColor} 
                    borderRadius="md" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    transition="all 0.2s"
                    _hover={{ bg: hoverBg }}
                  >
                    <Flex mb={3}>
                      <Image 
                        src={resource.image} 
                        alt={resource.title} 
                        boxSize="50px" 
                        borderRadius="md" 
                        mr={3} 
                        objectFit="cover"
                      />
                      <Box>
                        <Heading size="sm" mb={1}>{resource.title}</Heading>
                        <Flex align="center">
                          <Icon 
                            as={getResourceTypeIcon(resource.type)} 
                            mr={1} 
                            color="blue.500" 
                            boxSize={3} 
                          />
                          <Text fontSize="xs" color="blue.500" mr={2}>
                            {resourceTypes.find(rt => rt.id === resource.type)?.name || resource.type}
                          </Text>
                          <Flex align="center" color="yellow.400">
                            <Icon as={FaStar} boxSize={3} mr={1} />
                            <Text fontSize="xs" color="gray.500">{resource.rating}</Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                    <Text fontSize="sm" noOfLines={2} mb={3} color="gray.600">
                      {resource.description}
                    </Text>
                    <Flex wrap="wrap" gap={2}>
                      {resource.categories.map(categoryId => {
                        const category = categories.find(c => c.id === categoryId);
                        return category ? (
                          <Tag key={categoryId} size="sm" colorScheme="gray" variant="subtle">
                            {category.name}
                          </Tag>
                        ) : null;
                      })}
                    </Flex>
                  </Box>
                </Link>
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
          <Heading size="md" mb={3}>No resources found</Heading>
          <Text>Try adjusting your filters or search query</Text>
        </Box>
      )}
      
      {/* Suggestion Box */}
      <Box 
        mt={12} 
        p={6} 
        bg="blue.50" 
        _dark={{ bg: 'blue.900', borderColor: 'blue.700' }} 
        borderRadius="md" 
        borderWidth="1px" 
        borderColor="blue.100"
      >
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <Box mb={{ base: 4, md: 0 }}>
            <Heading size="md" mb={2}>Have a resource to suggest?</Heading>
            <Text>Help others by sharing valuable interview preparation resources</Text>
          </Box>
          <Button colorScheme="blue" leftIcon={<FaRegBookmark />} size="lg">
            Suggest Resource
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

const HStack = ({ children, ...props }) => (
  <Flex direction="row" {...props}>
    {children}
  </Flex>
);

export default Resources; 