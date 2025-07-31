import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "../validators/productValidator"
import api from "../services/api"
import { useRouter } from "next/router"
import { useEffect } from "react"
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react"

export default function CriarProduto() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(productSchema)
  })

  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
    }
  }, [])

  const onSubmit = async (data) => {
    try {
      await api.post("/products", data)
      toast({
        title: "Produto criado com sucesso.",
        status: "success",
        isClosable: true,
      })
      router.push("/produtos")
    } catch (err) {
      toast({
        title: "Erro ao criar produto.",
        status: "error",
        isClosable: true,
      })
    }
  }

  return (
    <Box maxW="500px" mx="auto" p={6}>
      <Heading mb={6}>Criar Produto</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Nome do produto" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.price} mb={6}>
          <FormLabel>Preço</FormLabel>
          <Input type="number" step="0.01" placeholder="Preço" {...register("price")} />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Salvar
        </Button>
      </form>
    </Box>
  )
}