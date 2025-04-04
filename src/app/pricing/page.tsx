"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStripe, calculatePrice, formatPrice, createCheckoutSession } from '@/lib/stripe.js'; 


export default function PricingPage() {
  const [selectedDevices, setSelectedDevices] = useState(['windows']);
  const [totalPrice, setTotalPrice] = useState(29.99);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update total price when selected devices change
  useEffect(() => {
    const price = calculatePrice(selectedDevices);
    setTotalPrice(price);
  }, [selectedDevices]);
  
  // Toggle device selection
  const toggleDevice = (device) => {
    // Only Windows is available for now
    if (device !== 'windows') return;
    
    if (selectedDevices.includes(device)) {
      setSelectedDevices(selectedDevices.filter(d => d !== device));
    } else {
      setSelectedDevices([...selectedDevices, device]);
    }
  };
  
  // Handle checkout
  const handleCheckout = async () => {
    if (selectedDevices.length === 0) return;
    
    setIsLoading(true);
    try {
      // Create checkout session
      const session = await createCheckoutSession(selectedDevices, 'paul_chelimo');
      
      // Redirect to Stripe checkout
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
      
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      {/* Pricing Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get CopyAthlete</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Choose your devices and start improving your technique today.
          </p>
        </div>
      </section>

      {/* Sport & Coach Selection */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">1. Choose Your Sport & Coach</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Sport</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <input type="radio" id="sport-running" name="sport" className="h-5 w-5 text-blue-600" checked disabled />
                <label htmlFor="sport-running" className="text-lg">Running</label>
              </div>
              <div className="mt-4 text-gray-500 italic">
                <p>More sports coming soon!</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Coach</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <input type="radio" id="coach-paul" name="coach" className="h-5 w-5 text-blue-600" checked disabled />
                <label htmlFor="coach-paul" className="text-lg">Paul Chelimo - Olympic Silver Medalist</label>
              </div>
              <div className="mt-4 text-gray-500 italic">
                <p>More coaches coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">2. Select Your Devices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div 
              className={`device-selector bg-white rounded-lg shadow-md overflow-hidden border-2 p-6 cursor-pointer ${selectedDevices.includes('windows') ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => toggleDevice('windows')}
            >
              <div className="flex items-center mb-4">
                <input 
                  type="checkbox" 
                  id="device-windows" 
                  name="device" 
                  className="h-5 w-5 text-blue-600" 
                  checked={selectedDevices.includes('windows')}
                  readOnly
                />
                <label htmlFor="device-windows" className="ml-3 text-xl font-bold">Windows</label>
              </div>
              <p className="text-gray-600 mb-2">Windows 10 or later</p>
              <p className="text-2xl font-bold text-blue-600">$29.99</p>
            </div>
            
            <div className="device-selector bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 p-6 opacity-50">
              <div className="flex items-center mb-4">
                <input type="checkbox" id="device-mac" name="device" className="h-5 w-5 text-blue-600" disabled />
                <label htmlFor="device-mac" className="ml-3 text-xl font-bold text-gray-400">Mac</label>
              </div>
              <p className="text-gray-400 mb-2">Coming soon</p>
              <p className="text-2xl font-bold text-gray-400">$29.99</p>
            </div>
            
            <div className="device-selector bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 p-6 opacity-50">
              <div className="flex items-center mb-4">
                <input type="checkbox" id="device-android" name="device" className="h-5 w-5 text-blue-600" disabled />
                <label htmlFor="device-android" className="ml-3 text-xl font-bold text-gray-400">Android</label>
              </div>
              <p className="text-gray-400 mb-2">Coming soon</p>
              <p className="text-2xl font-bold text-gray-400">$19.99</p>
            </div>
            
            <div className="device-selector bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 p-6 opacity-50">
              <div className="flex items-center mb-4">
                <input type="checkbox" id="device-ios" name="device" className="h-5 w-5 text-blue-600" disabled />
                <label htmlFor="device-ios" className="ml-3 text-xl font-bold text-gray-400">iPhone/iPad</label>
              </div>
              <p className="text-gray-400 mb-2">Coming soon</p>
              <p className="text-2xl font-bold text-gray-400">$19.99</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Total</h3>
              <p className="text-3xl font-bold text-blue-600">{formatPrice(totalPrice)}</p>
            </div>
            <p className="text-gray-600 mb-6">One-time payment, no subscription</p>
            <div className="text-center">
              <button 
                className="get-app-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg w-full md:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={isLoading || selectedDevices.length === 0}
              >
                {isLoading ? 'Processing...' : 'Purchase Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Is this a subscription?</h3>
              <p className="text-gray-600">
                No, CopyAthlete is available for a one-time purchase. You pay once and own the app forever.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Can I use the app on multiple devices?</h3>
              <p className="text-gray-600">
                You need to purchase a license for each type of device you want to use. For example, if you want to use CopyAthlete on both your Windows computer and Android phone, you would need to purchase both options.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">When will other sports and coaches be available?</h3>
              <p className="text-gray-600">
                We're actively working on adding more sports and coaches. When new options become available, you'll be able to purchase them separately.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">What if I need help using the app?</h3>
              <p className="text-gray-600">
                We provide comprehensive documentation with the app. If you need additional assistance, you can contact our support team through the Contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
