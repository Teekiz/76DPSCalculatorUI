import {render} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from 'react-query'
import React from "react";

const testQueryClient =
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

export function renderWithQueryClient(ui: React.ReactElement) {
    return render(
        <QueryClientProvider client={testQueryClient}>
            {ui}
        </QueryClientProvider>
    );
}