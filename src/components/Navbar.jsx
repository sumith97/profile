import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close,atlogo } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState(navLinks[0].id);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Add a new state to store the PDF link
  const [pdfLink] = useState("https://drive.google.com/file/d/1LUibK4ZAVbDo7P87NKbkJsspXKey8jrO/view?usp=sharing");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Find the section currently in view and update the active state accordingly
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionId = section.id;
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add an event handler to open the PDF in a new window
  const handlePdfClick = () => {
    window.open(pdfLink, '_blank');
  };

  // Add an event handler to open the LinkedIn profile in a new window
  const handleLinkedInClick = () => {
  const linkedInProfileUrl = 'https://www.linkedin.com/in/guthasumith/';
    window.open(linkedInProfileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterClick = () => {
    const twitterProfileUrl = 'https://x.com/sumithreddy99';
      window.open(twitterProfileUrl, '_blank', 'noopener,noreferrer');
    };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
      ref={navRef}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/portfolio'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={atlogo} alt='atlogo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Sumith Reddy Gutha &nbsp;
            <span className='sm:block hidden'> | Software Developer</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.id)}
            >
              {/* <a href={nav.title.toLowerCase() === 'google' ? `${nav.id}` : `#${nav.id}`}>{nav.title}</a> */}
              <a 
                    href={['resume', 'linkedin', 'twitter'].includes(nav.title.toLowerCase()) ? `${nav.id}` : `#${nav.id}`}
                    target={['resume', 'linkedin', 'twitter'].includes(nav.title.toLowerCase()) ? "_blank" : "_self"}
                    rel={['resume', 'linkedin', 'twitter'].includes(nav.title.toLowerCase()) ? "noopener,noreferrer" : undefined}
                  >{nav.title}</a>
            </li>
          ))}
          {/* Add a new button element next to the contact link for Resume, LinkedIn*/}

          {/* <button
            className={`${
              active === 'Resume' ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={handlePdfClick}
          >
            Resume
          </button> */}

          {/* <button
            className={`${
              active === 'LinkedIn' ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={handleLinkedInClick}
          >
            LinkedIn
          </button> */}
          
          {/* <button
            className={`${
              active === 'LinkedIn' ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={handleTwitterClick}
          >
            Twitter
          </button> */}

        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.id);
                  }}
                >
                  {/* <a href={nav.title.toLowerCase() === 'google' ? `${nav.id}` : `#${nav.id}`}>{nav.title}</a> */}
                  <a 
                    href={['resume', 'linkedin', 'twitter'].includes(nav.title.toLowerCase()) ? `${nav.id}` : `#${nav.id}`}
                    target={['resume', 'linkedin', 'twitter'].includes(nav.title.toLowerCase()) ? "_blank" : "_self"}
                    rel={['resume', 'linkedin', 'twitter'].includes(nav.title.toLowerCase()) ? "noopener,noreferrer" : undefined}
                  >{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;