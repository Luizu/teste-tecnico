import Image, { type ImageProps } from 'next/image';
import { Button } from '@repo/ui/button';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-svh p-20 gap-16">
      <main className="flex flex-col gap-8 row-start-2">
        <ThemeImage
          className="dark:invert"
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside font-mono text-sm leading-6 -tracking-[0.01em] pl-0 m-0">
          <li className="mb-2">
            Get started by editing <code className="bg-black/5 dark:bg-white/6 px-1 py-0.5 rounded font-semibold">apps/web/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4">
          <a
            className="flex items-center justify-center gap-2 rounded-full h-12 px-5 bg-foreground text-background font-medium text-base leading-5 transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="shrink-0"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://turborepo.com/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full h-12 px-5 border border-black/8 dark:border-white/[0.145] min-w-45 font-medium text-base leading-5 transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            Read our docs
          </a>
        </div>
        <Button appName="web" className="flex items-center justify-center rounded-full h-12 px-5 border border-black/8 dark:border-white/[0.145] min-w-45 font-medium text-base leading-5 bg-transparent transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]">
          Open alert
        </Button>
      </main>
      <footer className="row-start-3 flex gap-6">
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            className="shrink-0"
          />
          Examples
        </a>
        <a
          href="https://turborepo.com?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            className="shrink-0"
          />
          Go to turborepo.com →
        </a>
      </footer>
    </div>
  );
}
