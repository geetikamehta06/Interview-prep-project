import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Flex,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const ListHeader = ({ children }) => {
  return (
    <Heading
      fontWeight={'500'}
      fontSize={'lg'}
      mb={2}
      color={useColorModeValue('gray.900', 'gray.50')}
    >
      {children}
    </Heading>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <Box
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      color={useColorModeValue('gray.700', 'white')}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        color: useColorModeValue('primary.500', 'primary.300'),
      }}
    >
      {children}
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
      py={6}
      borderTopWidth={1}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW={'container.xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>Home</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/contact'}>Contact</Link>
          <Link href={'/resources'}>Resources</Link>
        </Stack>
        <Text>© 2023 Interview Prep Platform. All rights reserved</Text>
      </Container>
    </Box>
  );
};

export default Footer; 