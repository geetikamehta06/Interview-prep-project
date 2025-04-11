import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Button, 
  Select,
  VStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CreateForumPost = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Button as={Link} to="/forum" size="sm" colorScheme="blue" variant="outline" mb={6}>
        Back to Forum
      </Button>
      
      <Box mb={10}>
        <Heading size="lg" mb={6}>Create New Discussion</Heading>
        
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder="Enter discussion title" />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category">
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="career">Career Advice</option>
              <option value="offer">Offer Negotiation</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea 
              placeholder="Write your discussion post..." 
              minH="200px"
            />
          </FormControl>
          
          <Button colorScheme="blue" size="lg">
            Post Discussion
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreateForumPost; 