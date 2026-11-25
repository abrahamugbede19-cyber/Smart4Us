import Image from "next/image";
import FlightForm from "./FlightForm";
import { DOMESTIC_AIRPORTS, INTERNATIONAL_AIRPORTS } from "../data/airports";

export const metadata = {
  title: "Smart4Us Flight — Domestic & International Flight Booking Nigeria",
  description: "Book flights from Lagos, Abuja, Kano, Port Harcourt, Enugu, Uyo and more. Domestic and international flight deals via WhatsApp.",
  keywords: ["Nigeria flights", "Lagos flights", "Abuja flights", "international flights Nigeria", "Smart4Us Flight"],
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function Home() {
  const phoneNumber = "2347069150984";
  const allAirports = [...DOMESTIC_AIRPORTS, ...INTERNATIONAL_AIRPORTS];
  const uniqueAirports = Array.from(new Map(allAirports.map((a: any) => [a.code, a])).values());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Smart4Us Flight",
    legalName: "SMART TECH AND ENERGY SOLUTION 4US LTD",
    identifier: "RC 7366411",
    email: "SMART.4US@YAHOO.COM",
    telephone: "+2347069150984",
    address: { "@type": "PostalAddress", addressRegion: "Lagos", addressCountry: "NG" },
    areaServed: uniqueAirports.map((a: any) => ({
      "@type": "Airport",
      name: a.name,
      address: a.address,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            {/* LOGO RECTANGLE */}
            <div className="w-28 h-12 md:w-36 md:h-14 relative rounded-md overflow-hidden border-2 border-blue-400 bg-blue-50 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Smart4Us Flight Logo" 
                fill 
                sizes="(max-width: 768px) 112px, 144px" 
                className="object-contain p-1" 
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-600">Smart4Us Flight</h1>
          </div>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold transition text-sm md:text-base whitespace-nowrap"
          >
            Chat on WhatsApp
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Book Your Next Flight with Ease</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          We find the best deals on domestic and international flights. Fill in your flight details and we'll send you the best price on WhatsApp.
        </p>
      </section>

      {/* FORM */}
      <section className="px-4 -mt-10">
        <div className="bg-white text-gray-800 p-6 md:p-8 rounded-xl shadow-xl max-w-4xl mx-auto text-left">
          <h3 className="text-2xl font-bold mb-1">Request a Flight Quote</h3>
          <p className="text-sm text-gray-500 mb-6">Fields marked <span className="text-red-500">*</span> are required.</p>
          <FlightForm phoneNumber={phoneNumber} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Smart4Us Flight</h3>
          <p className="mb-1 text-sm text-gray-400">A brand of SMART TECH AND ENERGY SOLUTION 4US LTD</p>
          <p className="mb-4 text-sm text-gray-400">RC Number: 7366411</p>
          <p className="mb-2">Lagos State, Nigeria</p>
          <p className="mb-4">
            Email: <a href="mailto:SMART.4US@YAHOO.COM" className="underline">SMART.4US@YAHOO.COM</a> | Phone/WhatsApp: <a href={`https://wa.me/${phoneNumber}`} className="underline" target="_blank" rel="noopener noreferrer">+{phoneNumber}</a>
          </p>
          <p className="text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
            © {new Date().getFullYear()} SMART TECH AND ENERGY SOLUTION 4US LTD. All rights reserved.
          </p>
        </div>
      </footer>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}