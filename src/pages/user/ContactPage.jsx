import {
  useState,
} from "react";

import {
  createContact,
} from "../../api/contactApi";

const ContactPage = () => {
  const [loading,
    setLoading] =
    useState(false);

  const [form,
    setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  const handleChange =
    (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await createContact(
          form
        );

        alert(
          "Message sent successfully"
        );

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to send message"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Contact Us
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={
            handleChange
          }
          required
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={
            handleChange
          }
          required
          className="w-full border rounded-lg p-3"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={
            handleChange
          }
          required
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={
            handleChange
          }
          required
          rows="6"
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading
            ? "Sending..."
            : "Send Message"}
        </button>

      </form>

    </div>
  );
};

export default ContactPage;