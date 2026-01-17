import { Footer, Navbar, TagHeader } from "@/components/shared";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen">
        <section className="container mx-auto max-w-6xl px-4 py-20 sm:px-0 sm:py-40">
          <div className="space-y-4">
            <TagHeader title="Privacy Policy" />
            <p className="text-xl font-medium text-gray-600 sm:text-2xl"></p>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl px-4 py-10 sm:px-0 sm:py-20"></section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
