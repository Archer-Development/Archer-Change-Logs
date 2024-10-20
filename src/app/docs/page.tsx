import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

const DocsIndex = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'docs'));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Image
          src="/banner.png"
          alt="Archer Security Banner"
          width={1200}
          height={300}
          className="w-full h-auto object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Archer Security 👋</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who Are We❓</h2>
        <p className="text-lg leading-relaxed">
          We are a volunteered but passionate group of developers undertaking the journey to create a
          new Discord moderation and safety bot. Sounds niche? But wait! Before initiating this project,
          all members of this team have been administrative/moderation teams of accomplished servers
          covering all interest fields such as recreation, programming, infosec, study groups as well as
          game servers. This makes us aware of the need and the vacuum of an all-comprehensive,
          reliable security/moderation bot with a focus on user privacy and dealing with outside-Discord threats.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission 🌐</h2>
        <p className="text-lg leading-relaxed">
          Our mission with this project is to create a bot that does not only cover the usual standards
          of server and user security but also protects you from dangers ⚠️ such as:
        </p>
        <ul className="list-disc list-inside ml-4 text-lg leading-relaxed">
          <li>Malicious websites</li>
          <li>NSFW websites</li>
          <li>Phishing websites</li>
          <li>Malicious files injected into Discord</li>
          <li>Spontaneous server raids</li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed">
          And many more such threats that we wish to cover and expand towards, which is only possible
          with your support to this project and the team 🫶.
        </p>
      </section>
    </div>
  );
};

export default DocsIndex;
