function Login() {
  const fields = [
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "traveler_01",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-6" />
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500">
            Log in to manage your trips and itineraries.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          {fields.map((field) => (
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
