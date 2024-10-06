import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-black  text-white">

      <header className="lg:px-6 h-fit py-2 flex items-center border-b border-white ">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Image src={"/logo.png"} width={200} height={200} alt="logo-svg" />
          <span className="sr-only">AI Interview Generator</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <div className="border border-white rounded-full bg-white flex items-center justify-center">
            <UserButton />
          </div>
        </nav>
      </header>



      <main className="flex-1">


        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">

          <div className="container px-4 md:px-6">

            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">

              <div className="flex flex-col justify-center items-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter flex justify-center items-center w-full sm:text-4xl md:text-5xl xl:text-6xl/none">
                    Ace Your Next Interview with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our AI-powered mock interview generator helps you prepare for your next big interview. Get
                    personalized feedback and practice answering tough questions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 "
                    prefetch={false}
                  >
                    Start Mock Interview
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-10 text-black items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              /> */}
            </div>
          </div>

        </section>


        <section id="features" className="w-full py-5 md:py-24 h-full lg:py-12 text-black bg-muted">
          <div className="container px-4 md:px-6 ">
            <div className="flex flex-col items-center justify-center space-y-4 text-center ">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-4 text-sm">How it Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl py-4">Personalized Interview Preparation</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered mock interview generator creates personalized practice sessions tailored to your
                  specific job role and experience level. Get instant feedback and tips to improve your performance.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-full items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://cdn.analyticsvidhya.com/wp-content/uploads/2024/09/AI-interview-questions-2048x1151.webp"
                width="550"
                height="310"
                alt="Interview Process"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />

              <div className="flex flex-col justify-center space-y-4 max-w-full ">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Personalized Questions</h3>
                      <p className="text-muted-foreground">
                        Our AI analyzes your profile and generates custom interview questions tailored to your
                        background and experience.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Instant Feedback</h3>
                      <p className="text-muted-foreground">
                        Get real-time feedback on your responses, including suggestions for improvement and tips to ace
                        your interview.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Practice Anytime</h3>
                      <p className="text-muted-foreground">
                        Practice as many times as you need, on your own schedule, to build confidence and master the
                        interview process.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 text-black bg-black  py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from real people who have used our AI-powered mock interview generator to land their dream jobs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-4 rounded-lg border bg-background p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-sm text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground">
                    The AI-powered mock interviews were a game-changer for me.\n They helped me identify and improve on
                    my weaknesses, and\n ultimately land my dream job at a top tech company.
                  </blockquote>
                </div>
                <div className="grid gap-4 rounded-lg border bg-background p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Anderson</p>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground">
                    I was really nervous about my upcoming interview, but the\n AI-powered mock interviews helped me
                    feel confident and\n prepared. I aced the real interview and got the job!
                  </blockquote>
                </div>
              </div>
              {/* <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Testimonials"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              /> */}
            </div>
          </div>
        </section>

      </main>


      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AI Interview Generator. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="mailto: piyushkumarsings@gmail.com" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Contact Us
          </Link>
          <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Follow Us
          </Link>
        </nav>
      </footer>

    </div>
  )
}

