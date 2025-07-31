import * as yup from "yup"

export const productSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .positive("Preço deve ser maior que zero")
    .required("O preço é obrigatório"),
})