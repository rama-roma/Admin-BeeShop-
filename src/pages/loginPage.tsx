const LoginPage = () => {
  return (
    <main className="flex items-center h-150 justify-center">
      <section className="bg-white rounded-2xl shadow-2xl p-10 w-[350px] flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
        <div className="flex flex-col gap-4 w-full">
          <input 
            type="text" 
            placeholder="Username" 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="cursor-pointer bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition-colors">
            Login
          </button>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
