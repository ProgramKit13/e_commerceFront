import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { api } from "../../../../api/admin/api_admin_products";
import { NotFound } from "../../../NotFound";
import { DataProducts } from "./DataProducts";

type ParamsType = {
    slug: string;
}

export const InfoProdutos = () => {
    const params = useParams<ParamsType>();
    const [loading, setLoading] = useState(false);
    const [returnReponse, setReturnReponse] = useState<any>([]);

    
    const fetchProduct = async () => {
        setLoading(true);
        try {
            if(params.slug !== undefined) {
                const response = await api.getProductByToken(`${params.slug}`);
                if (response.code === 200) {
                    setLoading(false);
                    setReturnReponse(response.data);
                } else {
                    setLoading(false);
                    setReturnReponse([]);
                }
            } else {
                setLoading(false);
                setReturnReponse([]);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [params.slug]);

    return (
        <>
            {loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : returnReponse.length === 0 ? (
                <NotFound/>
            ) : (
                <>
                     <DataProducts productData={returnReponse}/>
                </>
            )}
        </>
    );

}
  