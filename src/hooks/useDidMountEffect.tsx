import React, { useEffect, useRef } from "react";

const useDidMountEffect = (func: (params?: any) => any, deps: any[]) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};

export default useDidMountEffect;
