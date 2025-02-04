import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

interface GameRulesModalProps {
  isOpen: boolean
  onClose: () => void
  gameId: string
  gameName: string
}

const getTournamentRulesLink = (gameId: string) => {
  switch (gameId) {
    case "1": // CODM BR
      return "https://drive.google.com/file/d/1xtwCIuW7uGkjRvM9Odt0h4mbSuo6GuzT/view?usp=drive_link"
    case "2": // PUBGM
      return "https://drive.google.com/file/d/1NNsdKOKa4H2m-BoSXG301--ek34mD9rS/view?usp=drive_link"
    case "4": // EAFC 1v1 Women
      return "https://drive.google.com/file/d/1Ed4F-jZC_d5h4K6sw4U1PnpcxnceKvdl/view?usp=sharing"
    case "7": // CODM MP
      return "https://drive.google.com/file/d/1hOR4PBMK5u0H6RmbHOVDUhCEofJkmOVE/view?usp=drive_link"
    case "8": // eFootball Mobile (assuming this is the default case)
      return "https://drive.google.com/file/d/1Ed4F-jZC_d5h4K6sw4U1PnpcxnceKvdl/view?usp=sharing"
      default:
        return
  }
}

export function GameRulesModal({ isOpen, onClose, gameId, gameName }: GameRulesModalProps) {
  const [hasReadRules, setHasReadRules] = useState(false)
  const router = useRouter()

  const handleProceed = () => {
    onClose()
    router.push(`/register?game=${gameId}&gameName=${encodeURIComponent(gameName)}`)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      console.log("Scroll reached the end of the modal content")
    }
  }

  const gameRules = {
    "1": {
      title: "Call of Duty Mobile (BR) Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Each university can register a maximum of <strong>2 teams</strong> (each team consisting of{" "}
                <strong>4 players and 4 substitutes</strong>).
              </li>
              <li>
                <strong>Team Merging for Branches:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    Universities with multiple campuses in the same region <strong>must merge</strong> and form a single
                    team.
                  </li>
                  <li>
                    <em>
                      Example: UON Main Campus, Parklands, and Chiromo cannot form separate teams if they are in the
                      same region.
                    </em>
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Regional Slots</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The <strong>top 2 teams from each region</strong> will advance to the finals.
              </li>
              <li>If a region does not have enough participants, its slots will be reassigned to other regions.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Competition Structure</h3>
            <div className="pl-5 space-y-4">
              <div>
                <h4 className="font-bold">Regional Qualifiers</h4>
                <ul className="list-disc pl-5">
                  <li>
                    Teams from each region will compete in qualifiers to determine the <strong>top 2 teams</strong>{" "}
                    advancing to the finals.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Finals</h4>
                <ul className="list-disc pl-5">
                  <li>
                    A total of <strong>16 teams (2 from each region)</strong> will compete for prizes.
                  </li>
                  <li>
                    The format for the finals (<strong>Online or LAN</strong>) will be announced later in the season.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Transportation & Participation</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Travel Arrangements:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    Universities <strong>far from Nairobi</strong> should seek transportation support from their
                    institution  s relevant offices (if the finals are LAN).
                  </li>
                  <li>
                    <strong>KUER may attempt to facilitate transportation</strong>, but this is not guaranteed.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Open Category:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    Participation is <strong>open to all genders</strong>.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✔ Universities <strong>must ensure teams are registered on time</strong>.
              </li>
              <li>
                ✔ <strong>Team captains must verify their region</strong> and confirm eligibility of all members.
              </li>
              <li>
                ✔ Finals may be <strong>online or LAN</strong>, and the format will be announced later.
              </li>
              <li>
                ✔ Some universities <strong>already have captains</strong> – reach out if you wish to become a captain.
              </li>
            </ul>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    },
    "2": {
      title: "PUBG Mobile Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Each university can register a maximum of <strong>2 teams</strong> (each team consisting of{" "}
                <strong>4 players and 4 substitutes</strong>).
              </li>
              <li>
                <strong>Team Merging for Branches:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    Universities with multiple campuses in the same region <strong>must merge</strong> to form the{" "}
                    <strong>2 allowed teams</strong>.
                  </li>
                  <li>
                    <em>Example: UON Main Campus, Parklands, and Chiromo must combine to form the 2 teams.</em>
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Regional Slots</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The <strong>top 2 teams from each region</strong> will advance to the finals.
              </li>
              <li>If a region does not have enough participants, its slots will be reassigned to other regions.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Competition Structure</h3>
            <div className="pl-5 space-y-4">
              <div>
                <h4 className="font-bold">Regional Qualifiers</h4>
                <ul className="list-disc pl-5">
                  <li>
                    Teams from each region will compete in qualifiers to determine the <strong>top 2 teams</strong>{" "}
                    advancing to the finals.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Finals</h4>
                <ul className="list-disc pl-5">
                  <li>
                    A total of <strong>16 teams (2 from each region)</strong> will compete for prizes.
                  </li>
                  <li>
                    The format for the finals (<strong>Online or LAN</strong>) will be announced later in the season.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Transportation & Participation</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Travel Arrangements:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    Universities <strong>far from Nairobi</strong> should seek transportation support from their
                    institution  s relevant offices.
                  </li>
                  <li>
                    <strong>KUER may attempt to facilitate transportation</strong>, but this is not guaranteed.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Open Category:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    Participation is <strong>open to all genders</strong>.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✔ Universities <strong>must ensure teams are registered on time</strong>.
              </li>
              <li>
                ✔ <strong>Team captains must verify their region</strong> and confirm eligibility of all members.
              </li>
              <li>
                ✔ If your region does not have enough participants, you{" "}
                <strong>may be given a chance to represent another region</strong>.
              </li>
              <li>
                ✔ Finals may be <strong>online or LAN</strong>, and the format will be announced later.
              </li>
              <li>
                ✔ Some universities <strong>already have captains</strong> – reach out if you wish to become a captain.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">6. Gameplay Rules</h3>
            <p className="pl-5 italic">📌 (The specific gameplay rules follow this section.)</p>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    },
    "3": {
      title: "EAFC 2v2 Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Region Restriction</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>EAFC 2v2 is exclusively for universities in the Nairobi region.</strong>
                  </li>
                  <li>
                    Universities <strong>outside Nairobi</strong> may participate but{" "}
                    <strong>must cover their own travel expenses</strong> for both{" "}
                    <strong>qualifiers and finals</strong> if they qualify.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Regional Splitting</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>Nairobi region is divided into North and South zones</strong>.
                  </li>
                  <li>
                    Upon registration, you will be <strong>assigned a region</strong> based on your university  s
                    location.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Team Limits</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each university can register a <strong>maximum of 2 teams</strong> (
                    <strong>2 players per team, with 1 optional substitute</strong>).
                  </li>
                  <li>
                    If a university registers <strong>more than 2 teams</strong>, they must conduct{" "}
                    <strong>internal leagues or knockout rounds</strong> to determine their top 2 teams.
                  </li>
                  <li>
                    If internal selection is <strong>not viable</strong>, the{" "}
                    <strong>first 2 teams to register will automatically represent their university</strong>.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Open Category</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Participation is open to all genders</strong>.
                  </li>
                  <li>
                    There are <strong>no restrictions on gender composition</strong> in teams.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Competition Structure</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Regional Qualifiers</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each zone (<strong>North and South</strong>) will host <strong>qualifiers</strong>.
                  </li>
                  <li>
                    The <strong>top 4 teams from each region</strong> will advance to the finals.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Finals</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>finalists</strong> will compete for{" "}
                    <strong>awards and university ranking points</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Scoring System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                For <strong>every match a team wins</strong>, their university earns <strong>3 points</strong> toward
                its <strong>ranking in EAFC</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✔ Universities <strong>outside Nairobi must cover their own travel expenses</strong> if they choose to
                participate.
              </li>
              <li>
                ✔ Teams should <strong>register on time</strong> to secure a spot in the tournament.
              </li>
              <li>
                ✔ The tournament is <strong>LAN/offline</strong>, and{" "}
                <strong>detailed rules will be shared at the event</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Gameplay Rules</h3>
            <p className="pl-5 italic">📌 (The specific gameplay rules will be shared during the event.)</p>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    },
    "4": {
      title: "EAFC Women 1v1 Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Region Restriction</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>EAFC Women 1v1 is exclusively for universities in the Nairobi region.</strong>
                  </li>
                  <li>
                    Universities <strong>outside Nairobi</strong> may participate but{" "}
                    <strong>must cover their own travel expenses</strong> for both{" "}
                    <strong>qualifiers and finals</strong> if they qualify.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Regional Splitting</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>Nairobi region is divided into North and South zones</strong>.
                  </li>
                  <li>
                    Each university <strong>must verify its zone</strong> and register under the correct region.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Participant Limits</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each university can register a <strong>maximum of 4 female participants</strong> for the{" "}
                    <strong>1v1 category</strong>.
                  </li>
                  <li>
                    If <strong>more than 4 players</strong> register, they must compete in an{" "}
                    <strong>internal league or tournament</strong> to determine the top 4.
                  </li>
                  <li>
                    If internal selection is <strong>not possible</strong>, the{" "}
                    <strong>first 4 to register will automatically represent their university</strong>.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Open to Women Only</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    This category is <strong>exclusively for female players</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Competition Structure</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Regional Qualifiers</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each zone (<strong>North and South</strong>) will host <strong>qualifiers</strong>.
                  </li>
                  <li>
                    The <strong>top 4 players from each zone</strong> will advance to the finals.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Finals</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>finalists</strong> will compete for{" "}
                    <strong>awards and university ranking points</strong>.
                  </li>
                  <li>
                    <strong>Final dates will be shared</strong> in the groups created after student confirmation.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Scoring System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                For <strong>every match a player wins</strong>, their university earns <strong>3 points</strong> toward
                its ranking.
              </li>
              <li>
                A <strong>draw earns 1 point</strong> (if applicable).
              </li>
              <li>
                <strong>Creating content</strong> showing participation in <strong>KUER events</strong> also awards{" "}
                <strong>extra points</strong> to the university ranking system.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✔ Universities <strong>outside Nairobi must cover their own travel expenses</strong> if they choose to
                participate.
              </li>
              <li>
                ✔ Participants should <strong>register on time</strong> to secure a spot in the tournament.
              </li>
              <li>
                ✔ The tournament is <strong>LAN/offline</strong>, and{" "}
                <strong>detailed rules will be shared at the event</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Gameplay Rules</h3>
            <p className="pl-5 italic">📌 (The specific gameplay rules will be shared during the event.)</p>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    },
    "5": {
      title: "Tekken Open Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Region Restriction</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>The Tekken Open category is exclusively for universities in the Nairobi region.</strong>
                  </li>
                  <li>
                    Universities <strong>outside Nairobi</strong> may participate but{" "}
                    <strong>must cover their own travel expenses</strong> for both{" "}
                    <strong>qualifiers and finals</strong> if they qualify.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Regional Splitting</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>Nairobi region is divided into North and South zones</strong>.
                  </li>
                  <li>
                    Once registered, you will be <strong>assigned a region</strong> based on your university  s location.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Participant Limits</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each university can register a <strong>maximum of 4 participants</strong> for the{" "}
                    <strong>Tekken Open category</strong>.
                  </li>
                  <li>
                    If <strong>more than 4 players</strong> register, they must compete in an{" "}
                    <strong>internal competition</strong> to determine the top 4.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Open to All Genders</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    This category is <strong>open to both male and female players</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Competition Structure</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Regional Qualifiers</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each zone (<strong>North and South</strong>) will host <strong>qualifiers</strong>.
                  </li>
                  <li>
                    The <strong>top 4 players from each zone</strong> will advance to the finals.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Finals</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>finalists</strong> will compete for{" "}
                    <strong>awards and university ranking points</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Scoring System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                For <strong>every match a player wins</strong>, their university earns <strong>3 points</strong> toward
                its ranking in the <strong>Tekken Open category</strong>.
              </li>
              <li>
                <strong>Creating and tagging KUER in esports content</strong> related to the competition{" "}
                <strong>earns additional points</strong> for the university ranking.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✔ Universities <strong>outside Nairobi must cover their own travel expenses</strong> if they choose to
                participate.
              </li>
              <li>
                ✔ Participants should <strong>register on time</strong> to secure a spot in the tournament.
              </li>
              <li>
                ✔ The tournament is <strong>LAN/offline</strong>, and{" "}
                <strong>detailed rules will be shared at the event</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Gameplay Rules</h3>
            <p className="pl-5 italic">📌 (The specific gameplay rules will be shared during the event.)</p>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    },
    "6": {
      title: "Tekken Women Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Region Restriction</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Exclusively for universities in the Nairobi region.</strong>
                  </li>
                  <li>
                    Universities <strong>outside Nairobi</strong> can participate but{" "}
                    <strong>must cover their own travel expenses</strong> for both{" "}
                    <strong>qualifiers and finals</strong> if they qualify.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Regional Splitting</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>Nairobi region is divided into North and South zones</strong>.
                  </li>
                  <li>
                    Once registered, you will be <strong>assigned a region</strong> based on your university  s location.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Participant Limits</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each university can register a <strong>maximum of 4 female participants</strong> for the{" "}
                    <strong>Tekken Women category</strong>.
                  </li>
                  <li>
                    If <strong>more than 4 players</strong> register, they must compete in an{" "}
                    <strong>internal competition</strong> to determine the top 4.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Open to Women Only</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    This category is <strong>exclusively for female players</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Competition Structure</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Regional Qualifiers</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each zone (<strong>North and South</strong>) will host <strong>qualifiers</strong>.
                  </li>
                  <li>
                    The <strong>top 4 players from each zone</strong> will advance to the finals.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Finals</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>finalists</strong> will compete for{" "}
                    <strong>awards and university ranking points</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Scoring System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Each match won</strong> earns the university <strong>3 points</strong> toward its ranking in the{" "}
                <strong>Tekken Women category</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✔ Universities <strong>outside Nairobi must cover their own travel expenses</strong> if they choose to
                participate.
              </li>
              <li>
                ✔ Participants should <strong>register on time</strong> to secure a spot in the tournament.
              </li>
              <li>
                ✔ The tournament is <strong>LAN/offline</strong>, and{" "}
                <strong>detailed rules will be shared at the event</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Gameplay Rules</h3>
            <p className="pl-5 italic">📌 (The specific gameplay rules will be shared during the event.)</p>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    },
    "7": {
      title: "Call of Duty Mobile (MP) Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Team Limits</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each university can register a <strong>maximum of 2 teams</strong>.
                  </li>
                  <li>
                    Each team consists of <strong>5 players</strong> and <strong>up to 3 substitutes</strong>.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Regional Distribution</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Universities are divided into <strong>8 regions</strong> for competition.
                  </li>
                  <li>
                    <strong>Campuses with branches in the same region must merge</strong> and form a single team.
                  </li>
                  <li>
                    Example: UON Main Campus, Parklands Campus, and Chiromo Campus will all compete as{" "}
                    <strong>UON Nairobi</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Competition Structure</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Regional Slots</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>top team from each region</strong> will advance to the <strong>finals</strong>.
                  </li>
                  <li>
                    If a region <strong>does not have enough participants</strong>, its slot will be reallocated to
                    other regions.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Finals</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>top 8 teams</strong> (one from each region) will compete in the{" "}
                    <strong>finals for awards</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Scoring System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Each match win</strong> awards the university <strong>3 points</strong> towards KUER rankings.
              </li>
              <li>
                <strong>Creating content and tagging KUER</strong> in posts also <strong>earns ranking points</strong>{" "}
                for the university.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Transportation and Participation</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Teams from regions far from Nairobi must arrange transportation and accommodation</strong>{" "}
                through their universities.
              </li>
              <li>
                Teams <strong>should contact the necessary university departments</strong> for support.
              </li>
              <li>
                KUER <strong>will attempt to facilitate transportation</strong>, but this{" "}
                <strong>is not guaranteed</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Open Category</h3>
            <ul className="list-disc pl-5">
              <li>
                <strong>Participation is open to all genders.</strong>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">6. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✅ <strong>Ensure your team registers before the deadline</strong> to secure participation.
              </li>
              <li>
                ✅ <strong>Campuses with branches in the same region must coordinate</strong> to form teams.
              </li>
              <li>
                ✅ Some universities <strong>already have team captains</strong>—reach out to{" "}
                <strong>confirm or volunteer</strong> as a captain.
              </li>
              <li>
                ✅ <strong>Tournament rules will be shared before the event.</strong>
              </li>
            </ul>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    }, 
    "8": {
      title: "eFootball Mobile Tournament Rules",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">1. Eligibility</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">University Leagues or Knockouts</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each university (branch) is allowed <strong>only 4 participants</strong>.
                  </li>
                  <li>
                    If more than4 players register, the university{" "}
                    <strong>must hold internal leagues or knockouts</strong> to determine its top 4.
                  </li>
                  <li>
                    Some universities have <strong>appointed captains</strong> to manage the process.
                  </li>
                  <li>
                    If a university <strong>does not have a captain</strong>, students can <strong>volunteer</strong> to
                    take on this role.
                  </li>
                  <li>
                    If internal leagues are not feasible,{" "}
                    <strong>the first 4 to register will represent the university</strong>.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Top Participants Selection</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    After internal leagues/knockouts, each university will <strong>submit their top 4 players</strong>{" "}
                    for the next stage.
                  </li>
                  <li>
                    The <strong>university captain is responsible for registering the top players</strong>.
                  </li>
                  <li>
                    If you would like to become a <strong>university captain</strong>, reach out to KUER.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">2. Competition Structure</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Regional Distribution</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Universities are divided into <strong>8 regions</strong> for competition.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Regional Slots</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>The top player from each region advances to the finals</strong>.
                  </li>
                  <li>
                    If a region <strong>does not have enough participants</strong>, its slot will be reassigned to other
                    regions.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Internal Leagues/Knockouts</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Each university will <strong>organize its own internal competitions</strong> to determine the{" "}
                    <strong>top 4 participants</strong>.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Qualifiers</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Players from each region will <strong>compete in knockouts</strong> to determine{" "}
                    <strong>the top player</strong> who advances to the finals.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Finals</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The <strong>8 regional champions</strong> will meet at the <strong>finals</strong> to compete for{" "}
                    <strong>awards and university ranking points</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">3. Scoring System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The <strong>top player from each region earns a spot in the finals</strong>.
              </li>
              <li>
                Winning players <strong>contribute ranking points</strong> to their universities.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">4. Transportation and Participation</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>
                  Players from regions far from Nairobi must arrange their own transportation and accommodation
                </strong>{" "}
                through their universities.
              </li>
              <li>
                Participants should <strong>contact their sports leaders</strong> early to discuss travel arrangements.
              </li>
              <li>
                KUER <strong>may attempt to assist with transportation</strong>, but this{" "}
                <strong>is not guaranteed</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">5. Open Category</h3>
            <ul className="list-disc pl-5">
              <li>
                <strong>Participation is open to all genders.</strong>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">6. Important Notes</h3>
            <ul className="list-none pl-5 space-y-2">
              <li>
                ✅ <strong>Universities must organize internal competitions</strong> to select their top 4 participants.
              </li>
              <li>
                ✅ <strong>Game captains are responsible for registering their university s top players.</strong>
              </li>
              <li>
                ✅ <strong>Players must register on time</strong> to avoid missing out.
              </li>
              <li>
                ✅ <strong>Reach out if you wish to be a captain for your university.</strong>
              </li>
              <li>
                ✅ <strong>Tournament rules will be shared before the event.</strong>
              </li>
            </ul>
          </section>
          <TornamentRuleLink gameId={gameId}/>
        </div>
      ),
    },
    
  }

  const currentRules = gameRules[gameId as keyof typeof gameRules] || {
    title: "Game Rules",
    content: <p>Rules not available for this game.</p>,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] w-[95vw]">
        <DialogHeader>
          <DialogTitle>{currentRules.title}</DialogTitle>
          <DialogDescription>
            Please read the following rules carefully before proceeding to registration.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh] pr-6" onScroll={handleScroll}>
          <div className="p-4 text-sm">{currentRules.content}</div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <div className="flex items-center space-x-2 w-full">
            <Checkbox id="rules" checked={hasReadRules} onCheckedChange={(checked) => setHasReadRules(checked === true)} />
            <label
              htmlFor="rules"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and agree to the rules
            </label>
          </div>
          <Button type="submit" disabled={!hasReadRules} onClick={handleProceed} className="w-full mt-4">
            Proceed to Registration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TornamentRuleLink({ gameId }: { gameId: string }) {

  return (
    <section>
    <h3 className="text-lg font-bold mb-2">Full Rules Document</h3>
    <p className="pl-5">
      For complete details, please refer to the{" "}
      <a
        href={getTournamentRulesLink(gameId)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        full rules document
      </a>.
    </p>
  </section>
  )
}
