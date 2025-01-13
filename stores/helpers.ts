export function mapWPHeaders(res: {headers: Headers}): WPHeaders {
    const total = res.headers.get('x-wp-totalpages');
    const totalPages = res.headers.get('x-wp-totalpages');
  
    return {
      total: total || '',
      totalpages: totalPages ? parseInt(totalPages) : 0,
    }
  }