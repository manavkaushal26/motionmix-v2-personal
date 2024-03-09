import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import NewsletterSubscriptionForm from "../forms/newsletter-subscription";
import MaxWidthWrapper from "../global/MaxWidthWrapper";

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
            <NewsletterSubscriptionForm />
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
              &copy; {new Date().getFullYear()} Joyverse Innovation Labs Inc.
              All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
