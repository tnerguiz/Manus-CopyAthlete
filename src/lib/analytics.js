export const trackDownload = async (sessionId, platform) => {
  try {
    const response = await fetch('/api/track-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        platform
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error tracking download:', error);
    // Don't throw error to avoid blocking download
    return { success: false };
  }
};
