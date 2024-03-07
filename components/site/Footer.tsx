import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import MaxWidthWrapper from "../global/MaxWidthWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {};

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "X",
      href: "#",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
  ],
};

const Footer = (props: Props) => {
  return (
    <footer className="mt-20" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <MaxWidthWrapper>
        <div className="py-8 border-t border-muted-foreground">
          <div className="lg:flex lg:items-center lg:justify-between xl:mt-0">
            <div>
              <h3 className="text-base font-semibold">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
            </div>
            <form className="mt-4 sm:flex sm:max-w-md lg:mt-0">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:flex-shrink-0">
                <Button variant="secondary">Subscribe</Button>
              </div>
            </form>
          </div>
          <div className="mt-8 w-full text-center text-5xl font-semibold">
            JOIN OUR COMMUNITY
          </div>
          <div className="mt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-muted-foreground text-sm md:order-1 md:mt-0">
              &copy; 2024 Joyverse Innovation Labs Inc. All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
