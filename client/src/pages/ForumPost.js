import React from 'react';
import { Box, Container, Heading, Text, Button, VStack, Avatar, HStack, Divider, Textarea } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const ForumPost = () => {
  const { id } = useParams();

  return (
    <Container maxW="container.xl" py={8}>
      <Button as={Link} to="/forum" size="sm" colorScheme="blue" variant="outline" mb={6}>
        Back to Forum
      </Button>
      
      <Box mb={10}>
        <Heading size="lg" mb={2}>Discussion Post #{id}</Heading>
        <Text fontSize="md" color="gray.500">Posted 2 days ago</Text>
        
        <Divider my={4} />
        
        <HStack spacing={4} mb={6} align="start">
          <Avatar name="User" size="md" />
          <Box>
            <Text fontWeight="bold">Username</Text>
            <Text>This is a placeholder for the forum post detail page. Content will be implemented in the next phase.</Text>
          </Box>
        </HStack>
        
        <Divider my={6} />
        
        <Heading size="md" mb={4}>Responses</Heading>
        <Text mb={6}>There are no responses yet.</Text>
        
        <VStack spacing={4} align="stretch" mb={8}>
          {/* Responses will be listed here */}
        </VStack>
        
        <Heading size="md" mb={4}>Add Your Response</Heading>
        <Textarea placeholder="Write your response..." mb={4} />
        <Button colorScheme="blue">Submit Response</Button>
      </Box>
    </Container>
  );
};

export default ForumPost; 