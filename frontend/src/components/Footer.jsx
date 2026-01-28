import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export function Component() {
  return (
    <Footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 transition-colors duration-300" container>
      <FooterCopyright href="#" by="Darshan Dhakal™" year={2025} />
      <FooterLinkGroup>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink href="/licensing">Licensing</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
export default Component;
