import { FaFacebook, FaTwitter, FaInstagram, FaTwitch } from "react-icons/fa"

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400 transition-colors"
      >
        <FaFacebook size={24} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400 transition-colors"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-pink-400 transition-colors"
      >
        <FaInstagram size={24} />
      </a>
      <a
        href="https://twitch.tv"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-purple-400 transition-colors"
      >
        <FaTwitch size={24} />
      </a>
    </div>
  )
}