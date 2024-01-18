import { Route, Routes } from "react-router-dom";
import EventView from "./components/Event";
import { SubmittedContext } from "./utils/context";

const App = () => {
    return (
        <SubmittedContext.Provider value={"false"}>
            <Routes>
                <Route path={"/events/:slug"} element={<EventView />} />
            </Routes>
        </SubmittedContext.Provider>
    );
};

export default App;
