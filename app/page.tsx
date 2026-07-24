import { LogisticsWorkbench } from "@/components/logistics-workbench";
import { DEMO_INTELLIGENCE_RESPONSE } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <LogisticsWorkbench
      initialResponse={DEMO_INTELLIGENCE_RESPONSE}
    />
  );
}
