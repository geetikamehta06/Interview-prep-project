import React from 'react';
import { 
  Box, 
  Flex, 
  HStack, 
  Button, 
  useColorMode,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavLink = ({ children, to }) => (
  <Link to={to}>
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Box>
  </Link>
);

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Check if user is authenticated (simplified)
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  return (
    <Box 
      bg={useColorModeValue('white', 'gray.800')} 
      px={4} 
      position="sticky" 
      top={0} 
      zIndex={10}
      boxShadow="sm"
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        
        <HStack spacing={8} alignItems={'center'}>
          <Link to="/">
            <Box fontWeight="bold" fontSize="xl">Interview Prep</Box>
          </Link>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/practice">Practice</NavLink>
            <NavLink to="/progress">Progress</NavLink>
            <NavLink to="/mock-interviews">Mock Interviews</NavLink>
            <NavLink to="/forum">Community</NavLink>
          </HStack>
        </HStack>
        
        <Flex alignItems={'center'}>
          <IconButton
            mr={4}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
          />
          
          {isAuthenticated ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                Profile
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/dashboard">Dashboard</MenuItem>
                <MenuItem as={Link} to="/profile">My Profile</MenuItem>
                <MenuItem as={Link} to="/interviews">My Interviews</MenuItem>
                <MenuItem onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={2}>
              <Button as={Link} to="/login" variant="ghost">
                Sign In
              </Button>
              <Button as={Link} to="/register" colorScheme="blue">
                Sign Up
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/practice">Practice</NavLink>
            <NavLink to="/progress">Progress</NavLink>
            <NavLink to="/mock-interviews">Mock Interviews</NavLink>
            <NavLink to="/forum">Community</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/profile">My Profile</NavLink>
                <NavLink to="/interviews">My Interviews</NavLink>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header; 