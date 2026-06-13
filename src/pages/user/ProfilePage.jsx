import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  updateProfile,
  addAddress,
  deleteAddress,
} from "../../api/profileApi";

const ProfilePage = () => {
  const [user,
    setUser] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [addressForm,
    setAddressForm] =
    useState({
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const data =
          await getProfile();

        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleProfileUpdate =
    async (e) => {
      e.preventDefault();

      try {
        await updateProfile({
          name: user.name,
          phone: user.phone,
        });

        alert(
          "Profile updated successfully"
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleAddressSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await addAddress(
          addressForm
        );

        setAddressForm({
          fullName: "",
          phone: "",
          addressLine: "",
          city: "",
          state: "",
          pincode: "",
        });

        fetchProfile();

        alert(
          "Address added successfully"
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleDeleteAddress =
    async (index) => {
      try {
        await deleteAddress(
          index
        );

        fetchProfile();
      } catch (error) {
        console.error(error);
      }
    };

  if (
    loading ||
    !user
  ) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      {/* Profile */}

      <form
        onSubmit={
          handleProfileUpdate
        }
        className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
      >

        <h2 className="text-xl font-semibold">
          Profile Details
        </h2>

        <input
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name:
                e.target.value,
            })
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          value={
            user.phone || ""
          }
          onChange={(e) =>
            setUser({
              ...user,
              phone:
                e.target.value,
            })
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          value={user.email}
          disabled
          className="w-full border p-3 rounded bg-gray-100"
        />

        <button
          className="bg-pink-500 text-white px-6 py-3 rounded"
        >
          Update Profile
        </button>

      </form>

      {/* Add Address */}

      <form
        onSubmit={
          handleAddressSubmit
        }
        className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
      >

        <h2 className="text-xl font-semibold">
          Add Address
        </h2>

        {Object.keys(
          addressForm
        ).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={
              addressForm[
                field
              ]
            }
            onChange={(e) =>
              setAddressForm({
                ...addressForm,
                [field]:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />
        ))}

        <button
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Save Address
        </button>

      </form>

      {/* Address List */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Saved Addresses
        </h2>

        {user.addresses
          ?.length ===
        0 ? (
          <p>
            No addresses saved
          </p>
        ) : (
          <div className="space-y-4">

            {user.addresses.map(
              (
                address,
                index
              ) => (
                <div
                  key={index}
                  className="border rounded-lg p-4"
                >

                  <p>
                    {
                      address.fullName
                    }
                  </p>

                  <p>
                    {
                      address.phone
                    }
                  </p>

                  <p>
                    {
                      address.addressLine
                    }
                    ,
                    {
                      address.city
                    }
                    ,
                    {
                      address.state
                    }
                    {" - "}
                    {
                      address.pincode
                    }
                  </p>

                  <button
                    onClick={() =>
                      handleDeleteAddress(
                        index
                      )
                    }
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default ProfilePage;