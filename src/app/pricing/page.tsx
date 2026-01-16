import { Footer, Navbar } from "@/components/shared";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen">
        <section className="container mx-auto py-20 sm:py-40">
          <p className="text-6xl font-semibold">Pricing</p>
        </section>
        <section className="container mx-auto py-10 sm:py-20"></section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
