import React, { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRCodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const startScanner = () => {
    setShowScanner(true);
    const html5QrCode = new Html5Qrcode("qr-reader");
    setScanner(html5QrCode);

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      (decodedText) => {
        setScannedData(JSON.parse(decodedText));
        html5QrCode.stop().catch((err) => console.log(err));
      },
      (errorMessage) => {
        console.error("QR Code not detected.", errorMessage);
      }
    ).catch((err) => console.log(err));
  };

  const stopScanner = () => {
    if (scanner) {
      scanner.stop().catch((err) => console.log(err));
    }
    setShowScanner(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("file-reader");
    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      setScannedData(JSON.parse(decodedText));
    } catch (err) {
      console.error("Error scanning file:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-white tracking-wide">
        QR Code Scanner
      </h1>

   
      {showScanner ? (
        <div id="qr-reader" className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-md bg-white" />
      ) : (
        <button
          className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={startScanner}
        >
          Start Camera Scan
        </button>
      )}

      {showScanner && (
        <button
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-500 transition duration-300"
          onClick={stopScanner}
        >
          Stop Camera Scan
        </button>
      )}

      
      <div className="w-full max-w-md bg-white p-4 border border-gray-300 rounded-lg shadow-md flex flex-col items-center space-y-4">
        <label className="text-lg font-semibold text-blue-600">
          Upload QR Code Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          onChange={handleFileUpload}
        />
      </div>

      
      {scannedData && (
        <div className="w-full max-w-md bg-gray-200 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-blue-800">Scanned Data:</h2>
          <pre className="whitespace-pre-wrap break-all text-gray-800 mt-2">
            {JSON.stringify(scannedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
