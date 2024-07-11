import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

function Home() {
  return (
    <div>
      <Header />
      <Hero />

      <footer className="bg-primary text-white p-4 text-center">
        © 2024 Samarjeet Singh. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
