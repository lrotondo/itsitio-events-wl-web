import { Link } from "@chakra-ui/react";
import { useContext } from "react";
import { PrimaryColorContext } from "../utils/context";

interface Props {
    label: string;
    href: string;
}

const checkVisible = (elm: HTMLElement, threshold: number = 0) => {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
    );
    var above = rect.bottom - threshold < 0;
    var below = rect.top - viewHeight + threshold >= 0;

    return !above && !below;
};

const NavbarItem = ({ label, href }: Props) => {
    const element = document.getElementById(href.replace("#", ""));
    const isVisible = element ? checkVisible(element, 500) : false;
    const primaryColor = useContext(PrimaryColorContext);

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            // change hash of url history
            window.history.pushState(null, "", href);
        }
    };

    return (
        <Link
            onClick={onClick}
            href={href}
            color={isVisible ? primaryColor : "black"}
            borderBottomColor={primaryColor}
            borderBottomStyle={"solid"}
            borderBottomWidth={isVisible ? 1 : 0}
            px={0.5}
            textDecor={"none !important"}
        >
            {label}
        </Link>
    );
};

export default NavbarItem;
