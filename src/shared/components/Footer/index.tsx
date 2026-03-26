import { Divider, FooterWrapper, SocialLink } from "./style";
import GithubIcon from '../../assets/icons/githubIcon.svg';
import LinkedInIcon from '../../assets/icons/linkedInIcon.svg';
import EmailIcon from '../../assets/icons/emailIcon.svg';

const Footer = () => {
  return (
    <FooterWrapper>
      <SocialLink
        href="https://github.com/YuriValenca"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GithubIcon />
        GitHub
      </SocialLink>

      <Divider />

      <SocialLink
        href="https://linkedin.com/in/yuri-valenca"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
        LinkedIn
      </SocialLink>

      <Divider />

      <SocialLink
        href="mailto:valencacunhayuri@gmail.com"
        aria-label="Email"
      >
        <EmailIcon />
        Email
      </SocialLink>
    </FooterWrapper>
  );
};

export default Footer;
