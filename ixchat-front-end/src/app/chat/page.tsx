import Image from 'next/image';

export default function Chat() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-blue-800 via-purple-700 to-pink-700">
      < div className="text-black h-[80%] w-[80%] lg:w-[60%] bg-white rounded-xl shadow-lg" >
        {/* Cabeçalho do chat */}
        < div className="p-4 flex justify-between items-center border-b" >
          <h1 className="text-lg font-semibold">Mensagens</h1>
          <div className="flex items-center space-x-2">
            <div className="flex flex-col text-right">
              <span className="font-medium">Maria</span>
              <span className="text-sm text-gray-500">maria@gmail.com</span>
        </div>

        <div className='bg-black grid grid-cols-[200px_1fr] h-full'>
          <div className='bg-red-300 p-2'><h1>teste</h1></div>
          <div className='bg-yellow-300 p-2'>
            <h1>teste2</h1>
          </div>
        </div>

      </div>
    </div >
  );
}