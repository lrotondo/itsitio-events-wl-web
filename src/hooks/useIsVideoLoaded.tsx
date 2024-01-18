import { useState, useEffect } from "react";

export const useIsVideoLoaded = (ref: React.RefObject<HTMLVideoElement>) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("loadeddata", () => {
                setIsVideoLoaded(true);
            });
        }
        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                ref.current.removeEventListener("loadeddata", () => {
                    setIsVideoLoaded(true);
                });
            }
        };
    }, [ref]);
    return isVideoLoaded;
};
