import { NavLink } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

import { navbarData } from '@Constants/navbarData';

import BindContentContainer from '../BindContentContainer';
import { FlexColumn, FlexRow, Grid } from '../Layouts';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute z-[10] w-full bg-primary-600 py-6 text-gray-100">
      <BindContentContainer>
        {/* Main Footer Content */}
        <FlexColumn className="gap-8">
          <Grid className="grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Company Info & Social Media */}
            <FlexColumn className="min-w-[250px] flex-1 gap-4">
              <h2 className="text-xl font-bold">MockSewa</h2>
              <p className="text-gray-300">
                Your trusted platform for comprehensive mock test preparation.
              </p>

              {/* Social Links */}
              <FlexRow className="mt-2 gap-4">
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <Instagram size={20} />
                </a>
              </FlexRow>
            </FlexColumn>

            {/* Quick Links */}
            {/* <h3 className="text-lg font-semibold">Quick Links</h3> */}
            <FlexRow className="h-full items-center justify-center gap-4">
              {navbarData.map(nav => (
                <NavLink to={nav.link} key={nav.id}>
                  <p className="text-white hover:text-gray-200 text-md md:text-base">{nav.name}</p>
                </NavLink>
              ))}
            </FlexRow>

            {/* Contact Info */}
            <FlexColumn className="min-w-[250px] flex-1 gap-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p className="text-gray-300">
                Need help? Get in touch with our support team for assistance
                with mock tests, account issues, or any other questions.
              </p>
              <FlexColumn className="mt-2 gap-2">
                <FlexRow className="items-center gap-2">
                  <Mail size={16} />
                  <span className='text-md md:text-md lg:text-base '>support@mocksewa.com</span>
                </FlexRow>
                <FlexRow className="items-center gap-2">
                  <Phone size={16} />
                  <span className='text-md md:text-md lg:text-base '>+1 (555) 123-4567</span>
                </FlexRow>
                <FlexRow className="items-center gap-2">
                  <MapPin size={16} />
                  <span className='text-md md:text-md lg:text-base '>123 Test Lane, Examville</span>
                </FlexRow>
              </FlexColumn>
            </FlexColumn>
          </Grid>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-6">
            <p className="text-center text-gray-400">
              © {currentYear} MockSewa. All rights reserved.
            </p>
          </div>
        </FlexColumn>
      </BindContentContainer>
    </footer>
  );
};

export default Footer;
