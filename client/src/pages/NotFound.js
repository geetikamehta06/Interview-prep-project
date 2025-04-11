import React from 'react';
import { Box, Heading, Text, Button, Center, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Center h="80vh">
      <VStack spacing={6}>
        <Heading size="2xl">404</Heading>
        <Text fontSize="xl">Page Not Found</Text>
        <Text>The page you are looking for doesn't exist or has been moved.</Text>
        <Button as={Link} to="/" colorScheme="blue">
          Go to Home
        </Button>
      </VStack>
    </Center>
  );
};

export default NotFound; 