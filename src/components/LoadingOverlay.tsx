import { Center, Spinner } from "@chakra-ui/react";

const LoadingOverlay = () => {
    return (
        <Center
            w={"full"}
            h={"full"}
            position={"fixed"}
            top={"50%"}
            left={"50%"}
            bgColor={"white"}
            zIndex={1000}
            pointerEvents={"none"}
            transform={"translate(-50%, -50%)"}
        >
            <Spinner zIndex={1000} size={"xl"} color={"steelblue"} />
        </Center>
    );
};
export default LoadingOverlay;
