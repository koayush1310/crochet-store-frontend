import {
  useEffect,
  useState,
} from "react";

import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../../api/contactApi";

const AdminContactsPage = () => {
  const [contacts,
    setContacts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts =
    async () => {
      try {
        const data =
          await getContacts();

        setContacts(
          data.contacts || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleStatusChange =
    async (
      contactId,
      status
    ) => {
      try {
        await updateContactStatus(
          contactId,
          status
        );

        fetchContacts();
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete =
    async (contactId) => {
      const confirmDelete =
        window.confirm(
          "Delete this enquiry?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteContact(
          contactId
        );

        fetchContacts();
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <h2>
        Loading Contacts...
      </h2>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Contact Enquiries
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100 text-center">

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Phone
              </th>

              <th className="p-4">
                Message
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {contacts.map(
              (contact) => (
                <tr
                  key={
                    contact._id
                  }
                  className="border-t text-center"
                >

                  <td className="p-4">
                    {
                      contact.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      contact.email
                    }
                  </td>

                  <td className="p-4">
                    {
                      contact.phone
                    }
                  </td>

                  <td className="p-4 max-w-xs truncate">
                    {
                      contact.message
                    }
                  </td>

                  <td className="p-4">

                    <select
                      value={
                        contact.status
                      }
                      onChange={(
                        e
                      ) =>
                        handleStatusChange(
                          contact._id,
                          e.target
                            .value
                        )
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="new">
                        New
                      </option>

                      <option value="contacted">
                        Contacted
                      </option>

                      <option value="closed">
                        Closed
                      </option>

                    </select>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          contact._id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminContactsPage;