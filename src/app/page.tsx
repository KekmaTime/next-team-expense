import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚧 Under Construction 🚧
        </h1>
        
        <Image 
          src="https://media.giphy.com/media/13FrpeVH09Zrb2/giphy.gif"
          alt="Construction worker gif" 
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
          unoptimized
        />

        <p className="text-xl text-gray-600">
          Our hamsters are working very hard to build this page...
        </p>
        
        <div className="text-gray-500 text-lg animate-bounce">
          Please check back later! 🐹
        </div>
      </div>
    </main>
  )
}


