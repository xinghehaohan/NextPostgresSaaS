import Link from 'next/link';
import { CircleIcon, Github, Linkedin, Twitter, Rss, Newspaper, MessageCircle, FileText, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const teamMembers = [
  { name: 'Lianna Su', role: 'CEO', avatar: '/avatars/lianna-su.jpg', twitter: '@su', linkedin: 'lianna-su', github: 'Su' },
  { name: 'Johnsmith', role: 'CTO', avatar: '/avatars/john-smith.jpg', twitter: '@johnsmith', linkedin: 'john-smith', github: 'johnsmith' },
  { name: 'Alice Johnson', role: 'Lead Analyst', avatar: '/avatars/alice-johnson.jpg', twitter: '@alicejohnson', linkedin: 'alice-johnson', github: 'alicejohnson' },
];

const communityLinks = [
  { name: 'Substack', url: 'https://panterahub.substack.com', icon: <Newspaper className="h-4 w-4" /> },
  { name: 'Hashnode', url: 'https://panterahub.hashnode.dev', icon: <FileText className="h-4 w-4" /> },
  { name: 'Mastodon', url: 'https://mastodon.social/@panterahub', icon: <MessageCircle className="h-4 w-4" /> },
  { name: 'Dev.to', url: 'https://dev.to/panterahub', icon: <FileText className="h-4 w-4" /> },
  { name: 'Reddit', url: 'https://www.reddit.com/r/PanteraHub', icon: <Users className="h-4 w-4" /> },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center">
              <CircleIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-semibold text-foreground">PanteraHub</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Empowering investors with expert analysis, comprehensive data, and powerful tools.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Meet Our Team</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex flex-col items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="mt-2 text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <div className="mt-2 flex space-x-2">
                      <a href={`https://twitter.com/${member.twitter}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Join Our Community</h3>
            <ul className="mt-4 space-y-4">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-base text-muted-foreground hover:text-foreground">
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Stay Connected</h3>
              <div className="mt-4">
                <Button variant="default">
                  Subscribe to our newsletter
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/about" className="text-base text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="/careers" className="text-base text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link href="/contact" className="text-base text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/privacy" className="text-base text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-base text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-muted-foreground">&copy; 2024 PanteraHub. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="https://twitter.com/PanteraHub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/company/panterahub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://github.com/PanteraHub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
