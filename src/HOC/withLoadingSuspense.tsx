import React from "react";
import loading from './../assets/images/loading-1.svg'

export const withLoading = (Component: any) => {
    return () => {
        return <React.Suspense fallback={<img src={loading} alt=""/>}>
            <Component/>
        </React.Suspense>
    };
};