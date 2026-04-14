import { DottedMap, type Marker } from "@/components/ui/dotted-map";

const markers: Marker[] = [
  {
    lat: 47.2184,
    lng: 0.5536,
    size: 0.2,
    pulse: true,
  },
];

export function MapSection() {
  return (
    <div className="relative h-92 bg-white mx-4 mb-4 rounded-3xl mt-4 flex items-center justify-center text-center flex-col overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ top: "-15%" }}>
        <DottedMap dotColor="#08559E" mapSamples={20000} dotRadius={0.35} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ top: "-15%" }}>
        <DottedMap dotColor="transparent" mapSamples={20000} dotRadius={0.35} markers={markers} pulse markerColor="#FF0000" />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full px-8">
        <h1 className="max-w-4xl text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
          Studio Lavvy est une agence web indépendante basée à Nantes.
        </h1>
        <div className="max-w-2xl mt-6">
          <h3>On accompagne les entreprises qui veulent un site simple, professionnel et surtout utile pour leur activité.</h3>
        </div>
      </div>
    </div>
  );
}
