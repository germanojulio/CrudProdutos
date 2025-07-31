import { useState } from "react"
import { useRouter } from "next/router"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import api from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()
  const toast = useToast()

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', {email, password})
      localStorage.setItem('token', res.data.token)
      router.push('/produtos')
    }catch (error) {
      setErro('Email ou senha inválidos');
      setErro("Credenciais inválidas");
      toast({
        title: "Erro ao fazer login",
        description: "Verifique o e-mail e senha.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        rounded="xl"
        shadow="lg"
        maxW="md"
        w="100%"
        border="1px solid"
        borderColor="gray.100"
      >
        <VStack spacing={6} align="stretch">
          <Heading size="lg" textAlign="center" color="blue.500">
            Login
          </Heading>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="exemplo@email.com"
              bg="blue.50"
              _focus={{ bg: "white" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
              bg="blue.50"
              _focus={{ bg: "white" }}
            />
          </FormControl>

          {erro && <Text color="red.500">{erro}</Text>}

          <Button colorScheme="blue" onClick={handleLogin}>
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}