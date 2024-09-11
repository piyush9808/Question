import FlickeringGrid from '@/components/magicui/flickering-grid'
import Ripple from '@/components/magicui/ripple'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      {/* <FlickeringGrid

      /> */}
      
        <div className=' flex justify-center h-full w-full mt-20 items-center'>
          <SignIn />
        </div>
    </>
  )

}