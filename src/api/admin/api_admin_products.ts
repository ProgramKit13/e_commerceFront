type ResponseData = {
    code: number;
    data?: any;
    error?: string;
}


export const api = {
          AuthCheck: async (token: string, refreshToken: string): Promise<ResponseData> => {
            try {
              const response = await fetch('http://127.0.0.1:5000/protected', 
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
              const json = await response.json();
              if (json.msg === 'Token has expired') {
                const refreshResponse = await fetch('http://127.0.0.1:5000/protected/refresh', 
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${refreshToken}`
                    }
                  }
                );
                const refreshJson = await refreshResponse.json();
                if (refreshJson.access_token) {
                  localStorage.setItem('token', refreshJson.access_token);
                  localStorage.setItem('refreshToken', refreshJson.refresh_token);
                  return { code: response.status, data: refreshJson };
                } else {
                  localStorage.removeItem('token');
                  localStorage.removeItem('refreshToken');
                  return { code: refreshResponse.status, error: 'Could not refresh token' };
                }
              } else {
                return { code: response.status, data: json };
              }
            } catch (error: any) {
              return { code: error.status || 500, error: error.message };
            }
          },



          registerProduct: async (
            prodName: string, valueResale: number, cust: number, tax: number = 0, supplier: string = '', discount: number = 0, description: string = '', qt: number = 0, datePurchase: Date | string, sector: string = '', 
            supplierCode: string = '', manufacturer: string = '', weight: number = 0, weightUnit: string = '', dimensions: string = '', dimensionsUnit: string = '', barCode: string = '', lastUpdate: Date | string, 
            reorderPoint: number = 0, restockTime: number = 0, warrantyInfo: string = '', batchInfo: string = '', expireDate: Date | string, materialOrIngredients: string = '', safetyRating: string = '', shippingRestrictions: string = ''
          ) : Promise<ResponseData> => {
            try {
              const token = localStorage.getItem('token') || '';
              const refreshToken = localStorage.getItem('refreshToken') || '';
          
              const authCheckResponse = await api.AuthCheck(token, refreshToken);
          
              if (authCheckResponse.code !== 200) {
                throw new Error('Invalid token');
              }
          
              let response = await fetch('http://127.0.0.1:5000/admin_dashboard/product_register', {
                method: 'POST',
                body: JSON.stringify({
                  prodName: prodName,
                  valueResale: valueResale,
                  cust: cust,
                  tax: tax,
                  supplier: supplier,
                  discount: discount,
                  description: description,
                  qt: qt,
                  datePurchase: datePurchase,
                  sector: sector,
                  supplierCode: supplierCode,
                  manufacturer: manufacturer,
                  weight: weight,
                  weightUnit: weightUnit,
                  dimensions: dimensions,
                  dimensionsUnit: dimensionsUnit,
                  barcode: barCode,
                  lastUpdated: lastUpdate,
                  reorderPoint: reorderPoint,
                  restockTime: restockTime,
                  warrantyInfo: warrantyInfo,
                  batchInfo: batchInfo,
                  expiryDate: expireDate,
                  materialOrIngredients: materialOrIngredients,
                  safetyRating: safetyRating,
                  shippingRestrictions: shippingRestrictions
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                }
              });
          
              let json = await response.json();
              console.log(json);
              return { code: response.status, data: json };
            } catch (error: any) {
              return error as ResponseData;
            }
          },
          

          consultAdminProducts: async (page: number = 1): Promise<ResponseData> => {
            try {
              const token = localStorage.getItem('token') || '';
              const refreshToken = localStorage.getItem('refreshToken') || '';
          
              const authCheckResponse = await api.AuthCheck(token, refreshToken);
          
              if (authCheckResponse.code !== 200) {
                throw new Error('Invalid token');
              }
          
              let response = await fetch(`http://127.0.0.1:5000/axiosadmin/gestao/produtos?page=${page}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });

              let json = await response.json();
              return { code: response.status, data: json };
            } catch (error: any) {
              return error as ResponseData;
            }
          },


          updatePerPageProductsEnum: async (perPage: number): Promise<ResponseData> => {
            try {
              const token = localStorage.getItem('token') || '';
              const refreshToken = localStorage.getItem('refreshToken') || '';
          
              const authCheckResponse = await api.AuthCheck(token, refreshToken);
          
              if (authCheckResponse.code !== 200) {
                throw new Error('Invalid token');
              }
          
              let response = await fetch('http://127.0.0.1:5000/axiosadmin/adminPreferences/updatePerPage', {
                method: 'PUT',
                body: JSON.stringify({
                  new_value: perPage
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });

              let json = await response.json();
              return { code: response.status, data: json };
            } catch (error: any) {
              return error as ResponseData;
            }
          },

          searchProduct: async (type: string, search: string, page: number = 1): Promise<ResponseData> => {
            try {
              const token = localStorage.getItem('token') || '';
              const refreshToken = localStorage.getItem('refreshToken') || '';
          
              const authCheckResponse = await api.AuthCheck(token, refreshToken);
          
              if (authCheckResponse.code !== 200) {
                throw new Error('Invalid token');
              }
          
              let response = await fetch(`http://127.0.0.1:5000/axiosadmin/gestao/produtos/busca/${type}/${search}?page=${page}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
          
              let json = await response.json();
              
              let products = json.list;
              let paginationInfo = {
                total: json.total,
                pages: json.pages,
                page: json.page,
                per_page: json.per_page
              };
              
              return { code: response.status, data: {products: products, pagination: paginationInfo}};
            } catch (error: any) {
              return error as ResponseData;
            }
          },
          

}