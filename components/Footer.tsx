import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center">
      <div className="hidden sm:flex"></div>

      <div className="hidden sm:flex italic text-sm">
        Created by
        <a
          className="hover:opacity-50 mx-1"
          href="https://twitter.com/kentuckeytom"
          target="_blank"
          rel="noreferrer"
        >
          Tangping.eth
        </a>
        based on the book
        <a
          className="hover:opacity-50 ml-1"
          href="https://en.wikipedia.org/wiki/Zen_and_the_Art_of_Motorcycle_Maintenance"
          target="_blank"
          rel="noreferrer"
        >
          Zen and the Art of Motorcycle Maintenance
        </a>
        .
      </div>

      <div className="flex space-x-4">
        <a
          className="flex items-center hover:opacity-50"
          href="https://twitter.com/kentuckeytom"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandTwitter size={24} />
        </a>

        <a
          className="flex items-center hover:opacity-50"
          href="https://github.com/mckaywrigley/paul-graham-gpt"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub size={24} />
        </a>
      </div>
    </div>
  );
};
