// DealerMap.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icon path for build environments
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

const DealerMap = () => {
  const dealerAddress = "Jl. Raya Cimahi No.165, Cibabat, Cimahi Utara, Cimahi, Jawa Barat 40513";
  const dealerCoordinates = [-6.869510, 107.544895]; // latitude, longitude

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={itemVariants}
      viewport={{ once: true }}
      className="py-8 sm:py-16 bg-white mt-16 relative"
      style={{ zIndex: 0 }}
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            Lokasi Dealer Toyota Cimahi
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 text-center">
            {dealerAddress}
          </p>
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-md relative" style={{ zIndex: 1 }}>
            <MapContainer
              center={dealerCoordinates}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
              className="rounded-2xl"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
