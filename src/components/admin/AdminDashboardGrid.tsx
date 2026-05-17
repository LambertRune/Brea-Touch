"use client";

import { AdminNavLink } from "@/components/admin/AdminNavLink";

const links = [
  {
    href: "/admin/homepage",
    title: "Homepage",
    description: "Wie wij zijn — foto en tekst, persoonlijke verhalen",
  },
  {
    href: "/admin/verhalen",
    title: "Verhalen",
    description: "Maximaal 3 gepubliceerde getuigenissen",
  },
  {
    href: "/admin/voorwaarden",
    title: "Voorwaarden",
    description: "Juridische pagina's voor in de footer",
  },
  {
    href: "/admin/sponsors",
    title: "Sponsors",
    description: "Hexagon-grid op sponsorovereenkomst",
  },
];

export function AdminDashboardGrid() {
  return (
    <div className="admin-dash-grid">
      {links.map((item) => (
        <AdminNavLink key={item.href} href={item.href} className="card admin-dash-card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </AdminNavLink>
      ))}
    </div>
  );
}
