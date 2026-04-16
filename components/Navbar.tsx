import CardNav from "@/components/CardNav";

const items = [
  {
    label: "Services",
    bgColor: "#1B1722",
    textColor: "#fff",
    links: [
      { label: "Par secteur", ariaLabel: "Services par secteur", href: "#" },
      { label: "Par CMS", ariaLabel: "Services par CMS", href: "#" },
    ],
  },
  {
    label: "Studio",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "À propos", ariaLabel: "À propos de nous", href: "#" },
      { label: "Processus", ariaLabel: "Notre processus", href: "#" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "Études de cas", ariaLabel: "Études de cas", href: "#" },
      { label: "Plan d'action", ariaLabel: "Obtenir un plan d'action", href: "#" },
    ],
  },
];

export function Navbar() {
  return (
    <CardNav
      logo="/logo.svg"
      logoAlt="Studio Lavvy"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#0967c2"
      buttonTextColor="#fff"
      buttonLabel="Audit gratuit"
      ease="power3.out"
    />
  );
}
