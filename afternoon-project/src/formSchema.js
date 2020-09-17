import * as yup from "yup"

export default yup.object().shape({
    name: yup.string().required("name is required").min(3, "name must be 3 characters long"),
    email: yup.string().notRequired(),
    password: yup.string().required("password is required").min(8, "password must be 8 characters long"),
    termsOfService: yup.boolean()
})