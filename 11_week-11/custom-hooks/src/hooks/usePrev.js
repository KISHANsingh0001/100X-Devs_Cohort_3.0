import { useEffect, useRef } from "react";

export function usePrev(value) {
    const ref = useRef();
    console.log("re-render happened with new value " + value);

    useEffect(() => {
        console.log("updated the ref to be " + value);
        
        ref.current = value;
    }, [value]);
    
    console.log("returned " + ref.current);
    return ref.current;
}

// Property of react in useEffect :- it return first and useEffect gets called later