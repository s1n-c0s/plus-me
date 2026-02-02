import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  User02Icon,
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
  Projector01Icon,
} from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <main className="container mx-auto min-h-screen p-4 md:p-8">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Profile/Intro Card - 2x2 */}
        <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-center">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <HugeiconsIcon icon={User02Icon} className="text-primary" />
            </div>
            <CardTitle className="text-3xl">Hi, I&apos;m Alex</CardTitle>
            <CardDescription className="text-lg">
              Full-stack developer building digital experiences with Next.js and
              Tailwind.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-2">
            <Badge variant="secondary">Available for work</Badge>
            <Badge variant="outline">Based in SF</Badge>
          </CardFooter>
        </Card>

        {/* Projects Card - 2x1 */}
        <Card className="md:col-span-2 md:row-span-1 group cursor-pointer hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Featured Projects</CardTitle>
              <CardDescription>View my latest open-source work</CardDescription>
            </div>
            <HugeiconsIcon
              icon={Projector01Icon}
              className="group-hover:text-primary transition-colors"
            />
          </CardHeader>
        </Card>

        {/* Tech Stack - 1x1 */}
        <Card className="md:col-span-1 md:row-span-1 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Stack</CardTitle>
            <div className="flex flex-wrap gap-1 pt-2">
              <Badge
                variant="secondary"
                className="bg-white/20 border-transparent text-white"
              >
                React
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/20 border-transparent text-white"
              >
                Next.js
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/20 border-transparent text-white"
              >
                TS
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Experience - 1x1 */}
        <Card className="md:col-span-1 md:row-span-1">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription className="font-bold text-foreground">
              5+ Years
            </CardDescription>
            <CardDescription>Industry experience</CardDescription>
          </CardHeader>
        </Card>

        {/* Social Card - GitHub - 1x1 */}
        <Card className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all">
          <HugeiconsIcon icon={GithubIcon} size={32} />
          <span className="text-sm font-medium">GitHub</span>
        </Card>

        {/* Social Card - LinkedIn - 1x1 */}
        <Card className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all">
          <HugeiconsIcon icon={Linkedin01Icon} size={32} />
          <span className="text-sm font-medium">LinkedIn</span>
        </Card>

        {/* Contact/CTA - 2x1 */}
        <Card className="md:col-span-2 md:row-span-1 flex flex-row items-center justify-between px-6">
          <div className="flex flex-col gap-1">
            <CardTitle>Let&apos;s collaborate</CardTitle>
            <CardDescription>
              Send me a message for new projects
            </CardDescription>
          </div>
          <Button>
            <HugeiconsIcon icon={Mail01Icon} data-icon="inline-start" />
            Contact
          </Button>
        </Card>
      </div>
    </main>
  );
}
