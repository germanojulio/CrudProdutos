import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "../../validators/productValidator"
import api from "../../services/api"
import { useRouter } from "next/router"

export default function EditarProduto() {
  const router = useRouter()
  const { id } = router.query

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
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
        })
        .catch((err) => {
          console.error("Erro ao carregar produto:", err.response?.data || err.message)
          router.push("/produtos")
        })
    }
  }, [id])

  const onSubmit = async (data) => {
    try {
      await api.put(`/products/${id}`, data)
      router.push("/produtos")
    } catch (err) {
      console.error("Erro ao atualizar:", err.response?.data || err.message)
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Editar Produto</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Nome" {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <br /><br />

        <input placeholder="Preço" type="number" step="0.01" {...register("price")} />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
        <br /><br />

        <button type="submit">Salvar alterações</button>
      </form>
    </div>
  )
}