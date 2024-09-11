import Ripple from '@/components/magicui/ripple'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
  <div className="flex justify-center bg-white h-screen  items-center flex-col">
    <SignIn />
    <Ripple/>
  </div>
  )

}