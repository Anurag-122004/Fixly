"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/app/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Ensure proper hydration for SSR compatibility
    React.useEffect(() => {
    setMounted(true);
    }, []);

    // Return null if the component isn't mounted yet (prevents mismatch issues)
    if (!mounted) return null;

    return (
    <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme" // Accessibility improvement
    >
        {/* Sun icon for light mode */}
        <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
            theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
        />
        {/* Moon icon for dark mode */}
        <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
            theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
        />
    </Button>
    );
}
