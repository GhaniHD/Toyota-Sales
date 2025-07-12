import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <div className="py-16 bg-white">
      <Helmet>
        <title>Kebijakan Privasi - Toyota Cimahi</title>
        <meta name="description" content="Baca kebijakan privasi Toyota Cimahi untuk informasi tentang pengumpulan dan penggunaan data pribadi Anda." />
      </Helmet>
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h1>
        <p className="text-gray-600">Kami di Toyota Cimahi menghormati privasi Anda...</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;