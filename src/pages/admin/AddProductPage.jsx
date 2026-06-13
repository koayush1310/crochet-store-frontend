import {
  useEffect,
  useState,
} from "react";

import {
  createProduct,
} from "../../api/adminProductApi";

import {
  getCategories,
} from "../../api/categoryApi";

import {
  uploadImage,
} from "../../api/uploadApi";

const AddProductPage = () => {
  const [categories,
    setCategories] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [imageUploading,
    setImageUploading] =
    useState(false);

  const [imageUrl,
    setImageUrl] =
    useState("");

  const [form,
    setForm] =
    useState({
      name: "",
      description: "",
      price: "",
      category: "",
      featured: false,
    });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories =
    async () => {
      try {
        const data =
          await getCategories();

        setCategories(
          data.categories || []
        );
      } catch (error) {
        console.error(error);
      }
    };

const handleChange =
  (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

const handleImageUpload =
  async (e) => {
    try {
      const file =
        e.target.files[0];

      if (!file) return;

      setImageUploading(
        true
      );

      const data =
        await uploadImage(
          file
        );

      console.log(
        "Upload Response:",
        data
      );

      setImageUrl(
        data.images?.[0]?.url || ""
      );

      alert(
        "Image uploaded successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Image upload failed"
      );
    } finally {
      setImageUploading(
        false
      );
    }
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await createProduct({
          ...form,

          images: imageUrl
            ? [
                {
                  url: imageUrl,
                },
              ]
            : [],
        });

        alert(
          "Product created successfully"
        );

        setForm({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
          featured: false,
        });

        setImageUrl("");
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to create product"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={
            handleChange
          }
          required
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            form.description
          }
          onChange={
            handleChange
          }
          required
          rows="4"
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={
            handleChange
          }
          required
          className="w-full border p-3 rounded"
        />

        <select
          name="category"
          value={
            form.category
          }
          onChange={
            handleChange
          }
          required
          className="w-full border p-3 rounded"
        >

          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={
                  category._id
                }
                value={
                  category._id
                }
              >
                {
                  category.name
                }
              </option>
            )
          )}

        </select>

        <div className="flex items-center gap-3">

  <input
    type="checkbox"
    name="featured"
    checked={form.featured}
    onChange={handleChange}
  />

  <label>
    Featured Product
  </label>

</div>

        <div>

          <label className="block mb-2 font-medium">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageUpload
            }
            className="w-full border p-3 rounded"
          />

        </div>

        {imageUploading && (
          <p>
            Uploading image...
          </p>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-40 h-40 object-cover rounded"
          />
        )}

        <button
          type="submit"
          disabled={
            loading
          }
          className="bg-pink-500 text-white px-6 py-3 rounded"
        >
          {loading
            ? "Creating..."
            : "Create Product"}
        </button>

      </form>

    </div>
  );
};

export default AddProductPage;