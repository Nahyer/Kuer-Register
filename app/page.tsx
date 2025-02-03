import { getServerSession } from "next-auth/next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { SocialLinks } from "@/components/SocialLinks"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 relative overflow-hidden">
      {/* Background image */}
      <Image
        src="https://res.cloudinary.com/djeyyn3yi/image/upload/v1738490915/B06_S02_COD-HP_Desktop-L_BG_chvvei.webp"
        alt="Gaming background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

   {/* Improved overlay for better readability */}
   <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-blue-900 opacity-80"></div>

<div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto text-white">
  {/* Clearer KUER logo placement */}
  <div className="mb-8">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KUER%20transparent-ADWTe637irf50TF7gvZ0Xc3edWtDMY.png"
      alt="KUER Logo"
      width={150}
      height={150}
      className="mx-auto"
      priority
    />
  </div>

  {/* Enhanced heading with gradient effect */}
  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 leading-tight">
    Epic Gaming Revolution is Coming!
  </h1>

  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-blue-300 font-orbitron">
    Get Ready for Kenya s Ultimate University Esports Experience
  </p>

  <div className="space-y-8">
    <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
      Join the ranks of elite gamers, represent your university, and compete for glory in KUER  s groundbreaking
      esports tournaments!
    </p>

    {/* Improved CTA button */}
    <div>
      <Link href="/select-game">
        <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full text-xl sm:text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Start Your Epic Journey
        </Button>
      </Link>
    </div>
  </div>

  {/* High-quality gaming-related visuals */}
  <div
    className="flex justify-center space-x-8 mt-12 px-12"
    style={{ filter: "brightness(0) invert(1)" }}
  >
    <Image src="/controller_icon_160216.svg" alt="Game Controller" width={60} height={60} />
    <Image src="/trophy_icon-icons.com_64403.svg" alt="Trophy" width={60} height={60} />
    <Image src="/headset-mic_119056.svg" alt="Gaming Headset" width={60} height={60} />
  </div>

  <div className="mt-12 text-lg text-gray-300">
    <p>🎮 Multiple Games • 🏆 Amazing Prizes • 🌟 Become a Legend</p>
  </div>

  {/* Announcement about the upcoming website */}
  <div className="mt-16 p-8 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur-lg">
    <h2 className="text-3xl font-bold text-yellow-300 mb-4 font-orbitron">An Amazing Website is Coming Soon!</h2>
    <p className="text-xl text-gray-200 leading-relaxed">
      This is just a glimpse of what  s to come. We  re working on an incredible platform that will revolutionize
      university esports in Kenya. Stay tuned for mind-blowing features, seamless tournament experiences, and a
      community like no other!
    </p>
  </div>
</div>

{/* Footer with social media links */}
<div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 text-sm text-gray-400">
  <p>© {new Date().getFullYear()} KUER - Igniting the Esports Revolution</p>
  <SocialLinks />
</div>
</div>
)
}

