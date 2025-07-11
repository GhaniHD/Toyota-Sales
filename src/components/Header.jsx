import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = ({ salesInfo, isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Katalog', href: '#catalog' },
    { name: 'Promo', href: '#promo' },
    { name: 'Pembayaran', href: '#payment' },
    { name: 'Testimoni', href: '#testimoni' },
  ];

  const headerStyles = `fixed top-0 z-50 w-full transition-all duration-500 ${
    isScrolled
      ? 'backdrop-blur-lg bg-white/95 shadow-xl border-b border-gray-200/50'
      : 'bg-transparent'
  }`;

  const logoStyles = isScrolled
    ? 'bg-gradient-to-r from-red-600 to-rose-700 bg-clip-text text-transparent'
    : 'text-white drop-shadow-lg';

  const navLinkStyles = (baseStyles) =>
    `relative px-4 py-2 font-medium transition-all duration-500 group ${
      isScrolled
        ? 'text-gray-700 hover:text-red-600'
        : `${baseStyles} hover:text-red-200 drop-shadow-lg`
    }`;

  const mobileMenuButtonStyles = `relative p-2 rounded-xl transition-all duration-500 md:hidden ${
    isScrolled ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
  }`;

  const mobileMenuStyles = `overflow-hidden border-t border-gray-200/50 md:hidden ${
    isScrolled ? 'bg-white/95 backdrop-blur-lg' : 'bg-black/30 backdrop-blur-lg'
  }`;

  const mobileNavLinkStyles = `relative px-4 py-3 font-medium rounded-xl transition-all duration-200 ${
    isScrolled ? 'text-gray-700 hover:bg-gray-50 hover:text-red-600' : 'text-white hover:bg-white/10 hover:text-red-200'
  }`;

  const contactButtonStyles =
    'flex items-center px-6 py-3 space-x-2 text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:shadow-xl hover:from-green-600 hover:to-green-700 hover:scale-105';

  const renderNavLinks = (isMobile = false, onClick = () => {}) =>
    navItems.map((item, index) => (
      <motion.a
        key={item.name}
        href={item.href}
        className={isMobile ? mobileNavLinkStyles : navLinkStyles(isMobile ? '' : 'text-white')}
        onClick={onClick}
        initial={{ opacity: 0, [isMobile ? 'x' : 'y']: isMobile ? -20 : -10 }}
        animate={{ opacity: 1, [isMobile ? 'x' : 'y']: 0 }}
        transition={{ duration: isMobile ? 0.3 : 0.5, delay: index * 0.1 }}
      >
        {item.name}
        {!isMobile && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-300 group-hover:w-full" />
        )}
      </motion.a>
    ));

  const renderContactButton = (isMobile = false, onClick = () => {}) => (
    <motion.a
      href={`https://wa.me/${salesInfo.phone}`}
      className={`${contactButtonStyles} ${isMobile ? 'w-fit' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, [isMobile ? 'y' : 'scale']: isMobile ? 20 : 0.8 }}
      animate={{ opacity: 1, [isMobile ? 'y' : 'scale']: isMobile ? 0 : 1 }}
      transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Phone className="w-5 h-5" />
      <span className="font-semibold">Hubungi</span>
    </motion.a>
  );

  return (
    <header className={headerStyles}>
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        {/* Logo Section */}
        <motion.div className="flex items-center space-x-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl blur opacity-20" />
            <div className="relative p-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl">
              <img 
                src="/images/logo.png"
                alt="Toyota Cimahi Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          <h1 className={`text-2xl font-bold transition-all duration-500 ${logoStyles}`}>Toyota Cimahi</h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="items-center hidden space-x-8 md:flex">
          {renderNavLinks()}
          {renderContactButton()}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className={mobileMenuButtonStyles}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className={`w-6 h-6 transition-colors duration-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className={`w-6 h-6 transition-colors duration-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={mobileMenuStyles}
          >
            <div className="container flex flex-col px-6 py-6 mx-auto space-y-4">
              {renderNavLinks(true, () => setIsMenuOpen(false))}
              {renderContactButton(true, () => setIsMenuOpen(false))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;