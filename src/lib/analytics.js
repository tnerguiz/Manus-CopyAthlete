export async function trackDownload(productId) {
  try {
    const response = await fetch('/api/track-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    
    if (!response.ok) {
      console.error('Failed to track download');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error tracking download:', error);
    return { success: false };
  }
}
