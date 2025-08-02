import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "../../validators/productValidator"
import api from "../../services/api"
import { useRouter } from "next/router"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  useToast,
  Spinner,
  Center
} from "@chakra-ui/react"

export default function EditarProduto() {
  const router = useRouter()
  const { id } = router.query
  const toast = useToast()

  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(productSchema)
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
      return
    }

    if (id) {
      api.get(`/products/${id}`)
        .then((res) => {
          setValue("name", res.data.name)
          setValue("price", res.data.price)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Erro ao carregar produto:", err)
          toast({
            title: "Erro ao carregar produto.",
            description: "Redirecionando para a lista.",
            status: "error",
            duration: 3000,
            isClosable: true
          })
          router.push("/produtos")
        })
    }
  }, [id])

  const onSubmit = async (data) => {
    try {
      await api.put(`/products/${id}`, data)
      toast({
        title: "Produto atualizado!",
        status: "success",
        duration: 2000,
        isClosable: true
      })
      router.push("/produtos")
    } catch (err) {
      console.error("Erro ao atualizar:", err)
      toast({
        title: "Erro ao atualizar produto.",
        status: "error",
        duration: 3000,
        isClosable: true
      })
    }
  }

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <Box maxW="500px" mx="auto" mt={12} p={6} borderWidth={1} borderRadius="lg">
      <Heading as="h2" size="lg" mb={6}>
        Editar Produto
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Nome do produto" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.price} mb={6}>
          <FormLabel>Preço (R$)</FormLabel>
          <Input type="number" step="0.01" placeholder="Preço" {...register("price")} />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          width="full"
        >
          Salvar Alterações
        </Button>
      </form>
    </Box>
  )
}