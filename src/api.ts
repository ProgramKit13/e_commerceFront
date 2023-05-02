type LoginResponse = {
    code: number;
    data: any;
    error ?: string;
  }



  type AuthCheckResponse = {
    code: number;
    data?: any;
    error?: string;
  }
  

export const api = {
    registerUser: async (name: string, email: string, password: string, phone?: string) => {
        try {
            let response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            let json = await response.json();
            return json
        } catch (error) {
           return error
        }
        },




        loginUser: async (email: string, password: string): Promise<LoginResponse> => {
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
              return error as LoginResponse;
            }
          },


          AuthCheck: async (token: string, refreshToken: string): Promise<AuthCheckResponse> => {
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
          }

}