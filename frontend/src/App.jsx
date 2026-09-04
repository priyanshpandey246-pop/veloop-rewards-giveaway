import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import GiveawayHome from "./pages/GiveawayHome/GiveawayHome";
import GiveawayDetails from "./pages/GiveawayDetails/GiveawayDetails";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/giveaways" replace />}
      />

      <Route
        path="/giveaways"
        element={<GiveawayHome />}
      />

      <Route
        path="/giveaway/:slug"
        element={<GiveawayDetails />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;