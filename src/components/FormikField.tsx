import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useContext } from "react";
import { PrimaryColorContext } from "../utils/context";

interface Props {
    touched?: boolean;
    error?: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

const FormikField = ({
    touched,
    error,
    label,
    name,
    value,
    onChange,
    type,
}: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    return (
        <FormControl isInvalid={touched && Boolean(error)} w={"full"}>
            <Input
                type={type}
                id={name}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                variant="flushed"
                w={"full"}
                borderColor={"lightgray"}
                _focus={{
                    borderColor: primaryColor,
                    boxShadow: "none !important",
                }}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikField;
