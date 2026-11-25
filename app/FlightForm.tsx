"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { DOMESTIC_AIRPORTS, INTERNATIONAL_AIRPORTS } from "../data/airports";

export default function FlightForm({ phoneNumber = "2347069150984" }) {
  const [airportType, setAirportType] = useState("domestic");
  const [form, setForm] = useState({
    from: "", to: "", departureDate: "", departureTime: "",
    arrivalDate: "", arrivalTime: "", passengers: "1", name: "", phone: "", notes: "",
  });

  const currentAirports = airportType === "domestic" ? DOMESTIC_AIRPORTS : INTERNATIONAL_AIRPORTS;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setAirportType(type);
    setForm((prev) => ({ ...prev, from: "", to: "" }));
  };

  const fromAirport = currentAirports.find((a) => a.code === form.from);
  const toAirport = currentAirports.find((a) => a.code === form.to);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [
      `Hi Smart4Us Flight, I'd like a flight quote:`,
      `Airport type: ${airportType === "domestic" ? "Domestic" : "International"}`,
      `From: ${fromAirport?.name} (${fromAirport?.code})`,
      `Address: ${fromAirport?.address || "—"}`,
      `To: ${toAirport?.name} (${toAirport?.code})`,
      `Address: ${toAirport?.address || "—"}`,
      `Departure: ${form.departureDate} at ${form.departureTime || "flexible"}`,
      `Return: ${form.arrivalDate || "—"} at ${form.arrivalTime || "flexible"}`,
      `Passengers: ${form.passengers}`,
      `Name: ${form.name} | Phone: ${form.phone}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean);
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Airport type selector */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold mb-2">Airport Type</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="airportType" value="domestic"
              checked={airportType === "domestic"}
              onChange={() => handleTypeChange("domestic")} />
            <span>Domestic Airport</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="airportType" value="international"
              checked={airportType === "international"}
              onChange={() => handleTypeChange("international")} />
            <span>International Airport</span>
          </label>
        </div>
      </div>

      {/* From */}
      <div>
        <label className="block text-sm font-semibold mb-1">From <span className="text-red-500">*</span></label>
        <select name="from" value={form.from} onChange={handleChange} required className="border p-3 rounded w-full bg-white">
          <option value="">Select departure airport…</option>
          {currentAirports.map((a) => (
            <option key={a.code} value={a.code}>{a.city} — {a.name} ({a.code})</option>
          ))}
        </select>
        <input type="text" readOnly value={fromAirport?.address || ""} placeholder="Address will appear here"
          className="border p-2 rounded w-full mt-1 bg-gray-100 text-sm text-gray-600" />
      </div>

      {/* To */}
      <div>
        <label className="block text-sm font-semibold mb-1">To <span className="text-red-500">*</span></label>
        <select name="to" value={form.to} onChange={handleChange} required className="border p-3 rounded w-full bg-white">
          <option value="">Select destination airport…</option>
          {currentAirports.map((a) => (
            <option key={a.code} value={a.code}>{a.city} — {a.name} ({a.code})</option>
          ))}
        </select>
        <input type="text" readOnly value={toAirport?.address || ""} placeholder="Address will appear here"
          className="border p-2 rounded w-full mt-1 bg-gray-100 text-sm text-gray-600" />
      </div>

      {/* Date/Time */}
      <div>
        <label className="block text-sm font-semibold mb-1">Departure Date <span className="text-red-500">*</span></label>
        <input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} required className="border p-3 rounded w-full" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Preferred Departure Time</label>
        <input type="time" name="departureTime" value={form.departureTime} onChange={handleChange} className="border p-3 rounded w-full" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Return/Arrival Date</label>
        <input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} className="border p-3 rounded w-full" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Preferred Arrival Time</label>
        <input type="time" name="arrivalTime" value={form.arrivalTime} onChange={handleChange} className="border p-3 rounded w-full" />
      </div>

      {/* Passengers */}
      <div>
        <label className="block text-sm font-semibold mb-1">Passengers <span className="text-red-500">*</span></label>
        <select name="passengers" value={form.passengers} onChange={handleChange} required className="border p-3 rounded w-full bg-white">
          {[1,2,3,4,5,6,7,8,9,10].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
          ))}
          <option value="10+">10+ Passengers</option>
        </select>
      </div>

      {/* Name + Phone */}
      <div>
        <label className="block text-sm font-semibold mb-1">Your Name <span className="text-red-500">*</span></label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g., Ada Okafor" required className="border p-3 rounded w-full" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Your Phone <span className="text-red-500">*</span></label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g., 0706 915 0984" required className="border p-3 rounded w-full" />
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold mb-1">Additional Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
          placeholder="Cabin class, baggage, special requests…" className="border p-3 rounded w-full" />
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition w-full">
          Get Best Price on WhatsApp
        </button>
      </div>
    </form>
  );
}