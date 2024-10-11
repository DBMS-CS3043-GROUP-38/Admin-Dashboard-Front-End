import { createContext, useState, useMemo } from "react";

// Main Colors

export const tokens = (mode) => ({
    ...(mode === "dark")
    ? {
        indigo: {
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#858585",
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#141414"
        },
        black: {
            100: "#ccd1d7",
            200: "#99a3af",
            300: "#677586",
            400: "#34475e",
            500: "#011936",
            600: "#01142b",
            700: "#010f20",
            800: "#000a16",
            900: "#00050b"
        },
        indigo: {
            100: "#cce0d6",
            200: "#99c1ac",
            300: "#67a383",
            400: "#348459",
            500: "#016530",
            600: "#015126",
            700: "#013d1d",
            800: "#002813",
            900: "#00140a"
        },
        black: {
            100: "#e5d0d1",
            200: "#cba1a3",
            300: "#b07176",
            400: "#964248",
            500: "#7c131a",
            600: "#630f15",
            700: "#4a0b10",
            800: "#32080a",
            900: "#190405"
        },
        orange: {
            100: "#f8edcc",
            200: "#f2db9a",
            300: "#ebc867",
            400: "#e5b635",
            500: "#dea402",
            600: "#b28302",
            700: "#856201",
            800: "#594201",
            900: "#2c2100"
        },
    }
})

