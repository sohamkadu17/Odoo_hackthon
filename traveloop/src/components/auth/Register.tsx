function Register() {
  const standardFields = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Avery",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Chen",
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "you@email.com",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      placeholder: "+1 (555) 123-4567",
    },
    {
      label: "City",
      name: "city",
      type: "text",
      placeholder: "San Francisco",
    },
    {
      label: "Country",
      name: "country",
      type: "text",
      placeholder: "United States",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-6" />
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-sm text-gray-500">
            Join Traveloop to start planning your next journey.
          </p>
        </div>

        <form className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {standardFields.map((field) => (
              <label
                key={field.name}
                className="flex flex-col gap-2 text-sm font-semibold text-gray-900"
              >
                {field.label}
                <input
                  type={field.type}
                  name={field.name}
                  required
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </label>
            ))}
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-gray-900">
            Additional Information
            <textarea
              name="additionalInfo"
              rows={4}
              placeholder="Tell us about your travel preferences."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
