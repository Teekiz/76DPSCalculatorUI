import LoadoutNavigationBar from "./components/general_components/LoadoutNavigationBar.tsx";
import LoadoutDataAccordion from "./components/general_components/LoadoutDataAccordion.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

function App()
{
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <div className='App' data-bs-theme="dark">
                <LoadoutNavigationBar />
                <LoadoutDataAccordion />
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </div>
        </QueryClientProvider>
    );
}

export default App;