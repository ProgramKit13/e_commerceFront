import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {api} from '../../api/admin/api_admin_user';

type Props = {
  children: JSX.Element
}

export const RequireAuth = ({children}: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');      
        if (!token) {
          setAuthenticated(false);
          return;
        } else {
            if (!refreshToken) {
                setAuthenticated(false);
                return;
            } else {
            try {
                const response = await api.AuthCheck(token, refreshToken);
                if (response.code >= 200 && response.code < 300) {
                setAuthenticated(true);
                } else {
                setAuthenticated(false);
                }
            } catch (error) {
                console.log(error);
                setAuthenticated(false);
            }
        }
        }
        
      }

    checkToken();
  }, []);

  if (authenticated === null) {
    return <div></div>;
  } else if (authenticated === false) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
