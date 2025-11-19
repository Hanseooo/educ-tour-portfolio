import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

// Placeholder companies — replace with real ones later
const companies = [
  {
    name: "Placeholder Corp",
    description: "A leading innovator in placeholder technologies.",
    img: "/placeholder/company1.png",
  },
  {
    name: "Sample Industries",
    description: "Creators of sample solutions for modern businesses.",
    img: "/placeholder/company2.png",
  },
  {
    name: "Demo Labs",
    description: "Pioneers of demonstration-driven development.",
    img: "/placeholder/company3.png",
  },
];

export default function CompaniesVisited() {
  return (
    <section className="w-full py-20 flex flex-col items-center px-6">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Companies I've Visited</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {companies.map((company, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="shadow-md hover:shadow-xl transition rounded-xl overflow-hidden bg-card border border-border">
              <CardHeader className="p-0">
                <img
                  src={company.img}
                  alt={company.name}
                  className="w-full h-40 object-cover bg-muted"
                />
              </CardHeader>
              <CardContent className="p-6 text-center">
                <CardTitle className="text-xl font-semibold mb-2">
                  {company.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {company.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}