import { Map } from "./components";
import { FeatureSourceProvider } from "./contexts/FeatureSourceContext";

export function App() {
  return (
    <FeatureSourceProvider>
      <Map />
    </FeatureSourceProvider>
  );
}
