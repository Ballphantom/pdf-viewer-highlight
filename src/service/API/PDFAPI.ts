export const fetchPDFData = async () => {
  try {
    const response = await fetch(
      `https://proxy.cors.sh/https://www.africau.edu/images/default/sample.pdf`,
      {
        method: 'GET',
        headers: {
          'x-cors-api-key': 'temp_cb5213cc32d15c9a8ad8dcc8c2c1c9f3',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return null;
  }
};