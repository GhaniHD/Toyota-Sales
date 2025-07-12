import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const DealerMap = ({ dealerAddress, dealerCoordinates }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={itemVariants}
      viewport={{ once: true }}
      className="py-8 sm:py-16 bg-white mt-16 relative" // Added mt-16 and relative positioning
      style={{ zIndex: 0 }} // Ensure map is below header
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200 overflow-hidden" // Added overflow-hidden
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            Lokasi Dealer Toyota Cimahi
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 text-center">
            {dealerAddress}
          </p>
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-md relative" // Added overflow-hidden and relative
            style={{ zIndex: 1 }} // Keep map content within this container
          >
            <MapContainer
              center={dealerCoordinates}
              zoom={15}
              style={{ height: '100%', width: '100%', zIndex: 1 }} // Explicit z-index for map
              className="rounded-2xl" // Ensure rounding applies
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={dealerCoordinates}>
                <Popup>
                  Toyota Cimahi<br />
                  {dealerAddress}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DealerMap;