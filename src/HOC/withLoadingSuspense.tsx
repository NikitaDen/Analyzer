import React from "react";

export const withLoading = (Component: any) => {
    return () => {
        return <React.Suspense fallback={'Loading'}>
            <Component/>
        </React.Suspense>
    };
};