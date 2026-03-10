import { useState } from "react"

export default function HomePage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()

    const result = await fetch('http://localhost:5000/form', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const response = await result.json()

    console.log(response.username, response.password)

    setData(response)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-fuchsia-200">

      <form
        onSubmit={submitHandler}
        className="backdrop-blur-md bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-center text-pink-600">
          Welcome
        </h1>

        <p className="text-center text-gray-500 text-sm">
          Login to continue
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-pink-700">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border border-pink-200 rounded-xl p-3"
            type="text"
            placeholder="Enter your username"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-pink-700">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-pink-200 rounded-xl p-3"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl"
          type="submit"
        >
          Submit
        </button>
      </form>

      {data && (
        <div className="absolute bottom-10 backdrop-blur-md bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6 w-80 text-center">

          <h3 className="text-xl font-bold text-pink-600 mb-4">
            Returned Data
          </h3>

          <div className="flex flex-col gap-2 text-gray-700">
            <p className="bg-pink-100 rounded-lg p-2">
              <span className="font-semibold text-pink-600">Username:</span> {data.username}
            </p>

            <p className="bg-rose-100 rounded-lg p-2">
              <span className="font-semibold text-rose-600">Password:</span> {data.password}
            </p>
          </div>

        </div>
      )}

    </div>
  )
}