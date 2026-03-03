import { useEffect, useState } from "react";

function App() {
  const [info1, setInfo1] = useState({});
  const [info2, setInfo2] = useState({});
  const [info3, setInfo3] = useState({});
  const [info4, setInfo4] = useState({});
  const [info5, setInfo5] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/getinfo")
      .then(res => res.json())
      .then(data => setInfo1(data));

    fetch("http://localhost:5000/getinfo2")
      .then(res => res.json())
      .then(data => setInfo2(data));

    fetch("http://localhost:5000/getinfo3")
      .then(res => res.json())
      .then(data => setInfo3(data));

    fetch("http://localhost:5000/getinfo4")
      .then(res => res.json())
      .then(data => setInfo4(data));

    fetch("http://localhost:5000/getinfo5")
      .then(res => res.json())
      .then(data => setInfo5(data));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200 flex items-center justify-center p-6">

      <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-40 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-40 bottom-10 right-10 animate-pulse"></div>

      <div className="relative w-full max-w-5xl">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-pink-600 drop-shadow-md">
            ✨ Hello, I'm {info1.FirstName} ✨
          </h1>
          
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white/70 backdrop-blur-lg rounded-[40px] shadow-2xl p-8 border-4 border-pink-200 hover:rotate-1 transition duration-500">
            <h2 className="text-2xl font-bold text-pink-500 mb-6">💖 About Me</h2>
            <div className="space-y-3 text-gray-700 text-lg">
              <p><span className="font-semibold text-pink-600">Age:</span> {info2.Age}</p>
              <p><span className="font-semibold text-pink-600">Course:</span> {info1.Course}</p>
              <p><span className="font-semibold text-pink-600">Year Level:</span> {info2.YearLevel}</p>
              <p><span className="font-semibold text-pink-600">School:</span> {info2.School}</p>
              <p><span className="font-semibold text-pink-600">Motto:</span> {info1.Motto}</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-[40px] shadow-2xl p-8 border-4 border-purple-200 hover:-rotate-1 transition duration-500">
            <h2 className="text-2xl font-bold text-purple-500 mb-6">🌸 My Hobbies</h2>
            <p className="text-gray-700 text-lg">{info3.Hobbies}</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-[40px] shadow-2xl p-8 border-4 border-rose-200 hover:rotate-1 transition duration-500">
            <h2 className="text-2xl font-bold text-rose-500 mb-6">🎂 Birthday</h2>
            <p className="text-gray-700 text-lg">{info4.Birthday}</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-[40px] shadow-2xl p-8 border-4 border-pink-300 hover:-rotate-1 transition duration-500">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">🍓 Favorite Food</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{info5.Favorite_Food}</p>
          </div>

        </div>


      </div>
    </div>
  );
}

export default App;