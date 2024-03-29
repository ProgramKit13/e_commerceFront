type ReponseData = {
    code: number;
    data?: any;
    error?: string;
}



export const api = {
    registerUser: async (name: string, email: string, password: string): Promise<ReponseData> => {
        try {
            let response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            let json = await response.json();
            return json
        } catch (error) {
           return error as ReponseData;
        }
        },




        loginUser: async (email: string, password: string): Promise<ReponseData> => {
            try {
              let response = await fetch('http://127.0.0.1:5000/dashadmin/login', {
                method: 'POST',
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
        
              let json = await response.json();
              return { code: response.status, data: json };
            } catch (error: any) {
              return error as ReponseData;
            }
          },


          AuthCheck: async (token: string, refreshToken: string): Promise<ReponseData> => {
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
            prodName: string, valueResale: number, cust: number, tax: number = 0, supplier: string = '', discount: number = 0, description: string = '', qt: number = 0, datePurchase: Date | string
          ) : Promise<ReponseData> => {
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
                  datePurchase: datePurchase
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                }
              });
          
              let json = await response.json();
              return { code: response.status, data: json };
            } catch (error: any) {
              return error as ReponseData;
            }
          },
          

          consultAdminProducts: async (page: number = 1): Promise<ReponseData> => {
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
              return error as ReponseData;
            }
          },


          updatePerPageProductsEnum: async (perPage: number): Promise<ReponseData> => {
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
              return error as ReponseData;
            }
          },
          

}