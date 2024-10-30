import {ReactNode} from "react";

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

export default function ThemeProviderComponent({ children }: { children: ReactNode }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
        components: {
            MuiTable: {
                styleOverrides: {
                    root: {
                        border: '1px solid #e0e0e0', // Adds a border around the table
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
                        borderRadius: '8px', // Rounds the corners
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: '16px', // Adjust padding for better spacing
                        minWidth: '100px', // Set a minimum width for table cells
                        minHeight: '48px', // Optionally set a minimum height
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Normalize CSS */}
            {children} {/* Render children components */}
        </ThemeProvider>
    );
}