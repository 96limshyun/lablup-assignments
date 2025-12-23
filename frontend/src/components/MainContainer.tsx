import { type ReactNode } from 'react'

interface MainContainerProps {
  children: ReactNode
}
const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className='w-full h-full min-w-[400px] max-w-[600px] px-4 py-8 overflow-y-auto'>
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainContainer