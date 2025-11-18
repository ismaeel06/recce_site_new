import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TeamMember from "@/components/team/TeamMember";

export default function Team() {
  const teamMembers = [
    {
      name: 'Jasmine Kaur',
      title: 'Founder & CEO',
      description: 'A lifelong cinephile who believes the perfect recommendation can change your day. Started Recce to end "what to watch" debates for good.',
      you: false
    },
    {
      name: 'Ben Carter',
      title: 'Head of Product',
      description: "Obsessed with building an app that's both powerful and intuitively simple.He's the reason our filters are so satisfying.",
      you: false
    },
    {
      name: 'Leo Martinez',
      title: 'Lead Engineer',
      description: 'The architect behind our platform. He turns complex ideas and endless streams of caffeine into a seamless user experience.',
      you: false
    },
    {
      name: 'Sophie Chen',
      title: 'Community Manager',
      description: "The heart of Recce. She's our number one user champion, curator of good vibes, and host of our Auteur Club events.",
      you: false
    },
    {
      name: 'Aisha Patel',
      title: 'UX/UI Designer',
      description: 'The visual storyteller who ensures Recce not only works great but looks and feels beautiful. Every pixel has a purpose.',
      you: false
    },
    {
      name: 'David Miller',
      title: 'Marketing Lead',
      description: "Spreads the word about Recce. If you've seen us on social media or read our newsletter, that's David's work.",
      you: false
    },
    {
      name: 'Kenji Tanaka',
      title: 'Data Scientist',
      description: 'Uncovers the trends and insights that help us improve our recommendation systems and reward our top contributors fairly.',
      you: false
    },
    {
      name: 'Join Our Team',
      title: 'Future Recce Star',
      description: "Love movies, TV, and building great products? We're always looking for talented people.Check our open positions.",
      you: true
    }
  ]
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[60px] font-medium mb-6 md:w-[800px] text-center">The people behind the <span className="text-[#ff7802]">Picks</span></h1>
            <p className="text-base md:text-xl text-white/60 md:max-w-5xl mx-auto text-center">
              We're a collective of film buffs, tech enthusiasts, and design nerds united by a single mission: to cure content overload. We believe that the best recommendations come from people, not algorithms. Our values are rooted in authenticity, community, and a genuine passion for storytelling.
            </p>
          </div>
        </div>
        <div className="md:grid md:grid-cols-4 justify-center">
          {teamMembers.map((teamMember: any, index: number) => {
            return <TeamMember
              key={index}
              name={teamMember.name}
              title={teamMember.title}
              description={teamMember.description}
              you={teamMember.you}
            />
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}