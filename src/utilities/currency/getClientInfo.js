"use server";

export default async function getClientInfo() {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;
    
    const locationResponse = await fetch(
      `https://get.geojs.io/v1/ip/geo/${ipAddress}.json`
    );
    const locationData = await locationResponse.json();
    
    const country = locationData.country || 'Unknown';
    const state = locationData.region || 'Unknown';
    const city = locationData.city || 'Unknown';
    const locationString = `${city}, ${state}, ${country}`;
    
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZoneName: 'short' 
    });
    
    return {
      ipAddress,
      location: locationString,
      date: dateString,
      time: timeString,
      rawData: {
        ip: ipData,
        location: locationData
      }
    };
}

