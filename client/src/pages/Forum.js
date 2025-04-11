import React from 'react';
import { Box, Container, Heading, Text, Button, SimpleGrid, Input, InputGroup, InputLeftElement, Stack, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';

const Forum = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" mb={6}>
          <Heading size="lg">Discussion Forum</Heading>
          <Button as={Link} to="/forum/new" colorScheme="blue">
            Create New Post
          </Button>
        </Stack>
        
        <InputGroup mb={8}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Search discussions..." />
        </InputGroup>
        
        <Text mb={6} fontSize="xl">Forum will be implemented in the next phase.</Text>
        
        <Divider mb={6} />
        
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
          {/* Forum posts will be displayed here */}
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading size="md">Sample Discussion Topic</Heading>
            <Text mt={2}>This is a placeholder for forum functionality.</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Forum; 