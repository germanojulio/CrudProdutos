import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Button,
  List,
  ListItem,
  Text,
  Flex,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import api from "../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [tokenStatus, setTokenStatus] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    setIsClient(true); // garante que estamos no client

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setTokenStatus("Sem token ⛔");
      setErro("Você precisa estar logado para ver os produtos.");
      setLoading(false);
      return;
    }

    setTokenStatus("Token detectado ✅");

    const fetchProdutos = async () => {
      try {
        const response = await api.get("/products");
        setProdutos(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setErro("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    if (isClient && !localStorage.getItem("token") && !loading) {
      router.push("/");
    }
  }, [isClient, loading]);

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Lista de Produtos</Heading>
        <Button colorScheme="blue" onClick={() => router.push("/criar")}>
          Criar novo produto
        </Button>
      </Flex>

      {tokenStatus && (
        <Text fontSize="sm" color="gray.500" mb={4}>
          {tokenStatus}
        </Text>
      )}

      {erro && <Text color="red.500">{erro}</Text>}

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <List spacing={4}>
          {produtos.map((produto) => (
            <ListItem
              key={produto.id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              shadow="sm"
            >
              <Flex justify="space-between" align="center">
                <Text>
                  <strong>{produto.name}</strong> – R$ {produto.price}
                </Text>
                <Flex gap={2}>
                  <Button
                    size="sm"
                    colorScheme="yellow"
                    onClick={() => router.push(`/editar/${produto.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={async () => {
                      try {
                        await api.delete(`/products/${produto.id}`);
                        setProdutos(produtos.filter((p) => p.id !== produto.id));
                        toast({
                          title: "Produto excluído.",
                          status: "success",
                          isClosable: true,
                        });
                      } catch {
                        toast({
                          title: "Erro ao excluir.",
                          status: "error",
                          isClosable: true,
                        });
                      }
                    }}
                  >
                    Excluir
                  </Button>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      )}

      <Button
        mt={6}
        variant="outline"
        colorScheme="red"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
      >
        Sair
      </Button>
    </Box>
  );
}