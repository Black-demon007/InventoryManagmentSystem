
import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const QRCodeScanner = () => {
    const [scannedData, setScannedData] = useState(null);
    const [scanner, setScanner] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();

    const validateQRCode = (decodedText) => {
        return true; 
    };

    const startScanner = () => {
        setIsScanning(true);
        setErrorMessage('');
        setIsValid(true);

        const html5QrCode = new Html5Qrcode("qr-scanner");
        setScanner(html5QrCode);

        const config = {
            fps: 40,
            qrbox: 400,
        };

        html5QrCode.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
                if (validateQRCode(decodedText)) {
                    setScannedData(decodedText);
                    setIsValid(true);
                    setErrorMessage('');
                    html5QrCode.stop().catch(err => console.log(err));
                    setIsScanning(false);
                } else {
                    setErrorMessage('Invalid QR code. Please scan a valid QR code.');
                    setIsValid(false);
                }
            }
        ).catch(err => console.log(err));

        const intervalId = setInterval(() => {
            if (!isValid) {
                setErrorMessage('No valid QR code in front of the camera.');
            }
        }, 2000);

        html5QrCode.stop().then(() => {
            clearInterval(intervalId);
        }).catch(err => console.log(err));
    };

    const stopScanner = () => {
        if (scanner) {
            scanner.stop().catch(err => console.log(err));
        }
        setIsScanning(false);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const html5QrCode = new Html5Qrcode("qr-upload");
        try {
            const decodedText = await html5QrCode.scanFile(file, true);
            const parsedData = JSON.parse(decodedText);
            console.log('decodedText:', parsedData);

            if (validateQRCode(decodedText)) {
                setScannedData(parsedData);
                setIsValid(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Invalid QR code. Please upload a valid QR code.');
                setIsValid(false);
            }
        } catch (err) {
            console.error("Error scanning file:", err);
            setErrorMessage('Error scanning file. Please upload a valid QR code.');
        }
    };

    useEffect(() => {
        if (scannedData) {
            navigate(`/editproduct/${scannedData}`);
        }
    }, [scannedData, navigate]);

    return (
        <div className='w-full'>
            <Navbar />
            <div className='w-full flex justify-center'>
                <div className="flex flex-col items-center justify-start p-6">
                    <h1 className="text-xl font-semibold mb-2">Scan QR Code</h1>
                    <div id="qr-scanner" className="w-80 h-64 bg-gray-200" />

                    {!isScanning && (
                        <button
                            className="px-4 py-2 bg-blue-600 mt-4 text-white rounded"
                            onClick={startScanner}
                        >
                            Enable Webcam
                        </button>
                    )}

                    {isScanning && (
                        <button
                            className="px-4 py-2 bg-red-600 mt-4 text-white rounded"
                            onClick={stopScanner}
                        >
                            Stop Scanning
                        </button>
                    )}

                    {errorMessage && (
                        <p className="text-red-500 mt-4">{errorMessage}</p>
                    )}
                </div>

                <div className="flex flex-col items-center justify-start p-6">
                    <h1 className="text-xl font-semibold mb-2">Upload QR Code</h1>
                    <div id="qr-upload" className="w-80 h-64 bg-gray-200" />

                    <div className="flex flex-col items-center">
                        <label htmlFor="image-upload" className="mb-2 text-gray-700 cursor-pointer">Select a QR code image file</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="border border-gray-300 p-2 rounded"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </div>

            {scannedData && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-semibold">Scanned Data:</h2>
                    <p className="text-gray-700">{scannedData}</p>
                </div>
            )}
        </div>
    );
};

export default QRCodeScanner;
