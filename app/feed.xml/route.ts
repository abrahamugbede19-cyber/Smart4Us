// app/feed.xml/route.ts

export async function GET() {
  const baseUrl = "https://your-domain.com"; // ⚠️ replace with your actual domain later
  const siteName = "Smart4Us Flight";
  const siteDescription = "Domestic & International Flight Booking Nigeria";

  const items = [
    {
      title: "Book Domestic & International Flights with Smart4Us Flight",
      link: `${baseUrl}/`,
      description:
        "Request flight quotes for Lagos, Abuja, Kano, Port Harcourt, Enugu, Uyo and international destinations. Get the best fares via WhatsApp.",
      pubDate: new Date().toUTCString(),
      guid: `${baseUrl}/`,
    },
  ];

  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description><![CDATA[${item.description}]]></description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${baseUrl}</link>
    <description>${siteDescription}</description>
    <language>en-ng</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}