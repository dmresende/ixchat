import Image from 'next/image';

export default function Chat() {
  return (

    <div className=" flex justify-center items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className='h-[70%] w-[70%] lg:w-[60%]  bg-background rounded-xl '>

        <div className=' p-4 flex justify-between bg-red-500'>
          <h1>mensagem</h1>
          <h1>icon</h1>

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