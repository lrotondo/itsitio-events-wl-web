import { Button, chakra, Heading, useToast, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import { PrimaryColorContext } from "../utils/context";
import * as Yup from "yup";
import FormikField from "./FormikField";
import { useMutation } from "react-query";
import { apiClient } from "../api/lib";

interface Props {
    eventId: string;
    setSubmitted: (submitted: boolean) => void;
}

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Nombre es requerido"),
    email: Yup.string()
        .email("Email no es válido")
        .required("Email es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    company: Yup.string(),
    city: Yup.string(),
    country: Yup.string(),
});

const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    country: "",
};

const Form = ({ eventId, setSubmitted }: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    const toast = useToast();

    const { mutateAsync: sendFormAsync } = useMutation(
        () => apiClient.post(`/events/${eventId}/register`, formik.values),
        {
            onSuccess: () => {
                setSubmitted(true);
            },
            onError: (err) => {
                console.log(err);
                toast({
                    title: "Error",
                    description:
                        "Ocurrió un error al enviar el formulario, intenta de nuevo más tarde",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        }
    );

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await sendFormAsync();
            setSubmitting(false);
        },
    });

    return (
        <VStack
            w={"full"}
            h={"fit-content"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={12}
        >
            <Heading color={primaryColor}>Inscripciones</Heading>
            <chakra.form
                onSubmit={formik.handleSubmit}
                minW={"40vw"}
                w={{ base: "full", md: "fit-content" }}
                px={10}
            >
                <VStack w={"full"} alignItems="center" spacing={12}>
                    <VStack w={"full"} spacing={5}>
                        <FormikField
                            label="Nombre y apellido"
                            name="fullName"
                            type="text"
                            error={formik.errors.fullName}
                            touched={formik.touched.fullName}
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                        />
                        <FormikField
                            label="E-mail"
                            name="email"
                            type="email"
                            error={formik.errors.email}
                            touched={formik.touched.email}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <FormikField
                            label="Teléfono"
                            name="phone"
                            type="tel"
                            error={formik.errors.phone}
                            touched={formik.touched.phone}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        <FormikField
                            label="Empresa"
                            name="company"
                            type="text"
                            error={formik.errors.company}
                            touched={formik.touched.company}
                            value={formik.values.company}
                            onChange={formik.handleChange}
                        />
                        <FormikField
                            label="Ciudad"
                            name="city"
                            type="text"
                            error={formik.errors.city}
                            touched={formik.touched.city}
                            value={formik.values.city}
                            onChange={formik.handleChange}
                        />
                        <FormikField
                            label="País"
                            name="country"
                            type="text"
                            error={formik.errors.country}
                            touched={formik.touched.country}
                            value={formik.values.country}
                            onChange={formik.handleChange}
                        />
                    </VStack>
                    <Button
                        colorScheme={"blue"}
                        bgColor={primaryColor}
                        type="submit"
                        px={10}
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                    >
                        Inscribirme
                    </Button>
                </VStack>
            </chakra.form>
        </VStack>
    );
};

export default Form;
