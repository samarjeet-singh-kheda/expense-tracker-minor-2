import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expense.
            <strong className="font-extrabold text-primary sm:block">
              Control Your Money.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start creating your own budget and get in control!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/sign-in"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div className=" flex justify-center aliign-center">
        <Image
          src={"/dashboard.png"}
          height="1000"
          width="1000"
          className="block mb-16"
        />
      </div>
    </section>
  );
}

export default Hero;
