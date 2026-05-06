"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CONTACT_DATA } from "@/lib/contants";

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const Banner = () => {
  const [form, setForm] = useState<FormType>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    <div className="bg-black min-h-screen px-4 py-12">

      {/* TOP HEADING */}
      <div className="text-center text-white mb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {CONTACT_DATA.heading}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* LEFT IMAGE */}
        <div className="relative h-[450px] md:h-[500px] rounded-xl overflow-hidden">

          <Image
            src={'/building.jpg'}
            alt="Contact Banner"
            fill
            priority
            quality={100}
            className="object-cover scale-105"
          />

          {/* ✅ LIGHT GRADIENT (instead of heavy black overlay) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* TEXT */}
          <div className="absolute bottom-6 left-6 text-white space-y-2">
            <h2 className="text-xl font-semibold">
              Find Your Dream Property
            </h2>

            <div className="text-xs mt-3 space-y-1">
              <p>{CONTACT_DATA.contactInfo.address}</p>
              <p>{CONTACT_DATA.contactInfo.timing}</p>
              <p>{CONTACT_DATA.contactInfo.phone}</p>
              <p>{CONTACT_DATA.contactInfo.email}</p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-8 rounded-xl text-gray-700 placeholder:text-gray-400 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">
            Contact Us
          </h2>

          <p className="text-sm mb-6 text-gray-500">
            Fill in your details and we’ll get back to you.
          </p>

          <form className="space-y-4">

            <div className="flex gap-3">
              <input
                id="firstName"
                placeholder="First Name"
                className="w-1/2 p-2 border rounded placeholder:text-gray-400"
                value={form.firstName}
                onChange={handleChange}
              />

              <input
                id="lastName"
                placeholder="Last Name"
                className="w-1/2 p-2 border rounded"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <input
              id="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              id="message"
              placeholder="Your Message"
              className="w-full p-2 border rounded h-24"
              value={form.message}
              onChange={handleChange}
            />

            <button
              type="button"
              className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition"
            >
              Submit
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Banner;