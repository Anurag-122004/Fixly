"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({
    children,
    attribute,
    defaultTheme,
    enableSystem,
    }: {
    children: React.ReactNode;
    attribute: "class" | "data-theme" | undefined;
    defaultTheme: string;
    enableSystem?: boolean;
    }) {
    const [mounted, setMounted] = useState(false);

    // Ensure the theme is correctly hydrated on the client side
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Prevent mismatches during server-side rendering
        return <>{children}</>;
    }

    return (
        <NextThemesProvider
        attribute={attribute}
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}
        >
        {children}
        </NextThemesProvider>
    );
}
